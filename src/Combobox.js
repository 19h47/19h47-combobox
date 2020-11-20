// import Listbox from '@/Listbox';
import { EventEmitter } from 'events';
import { TAB, ENTER, ESCAPE, ARROW_UP, ARROW_DOWN } from '@19h47/keycode';

import Props from '@/Props';
import isPromise from '@/utils/isPromise';

const BASE_CLASS = 'Combobox';

class Combobox extends EventEmitter {
	/**
	 *
	 * @param {Object} $input
	 * @param {*} $listbox
	 */
	constructor(
		$input,
		$listbox,
		{
			search,
			autoselect = false,
			setValue = (input, value) => (input.value = value), // eslint-disable-line no-return-assign, no-param-reassign
			getValue = result => result,
		},
	) {
		super();

		this.$input = $input;
		this.$listbox = $listbox;

		this.selectedIndex = -1;
		this.results = [...this.$listbox.querySelectorAll('[role="option"]')].map(option =>
			option.textContent.trim(),
		);
		this.value = '';

		// Props
		this.search = isPromise(search) ? search : value => Promise.resolve(search(value));
		this.autoselect = autoselect;
		// inline, list, both
		this.autocomplete = this.$input.getAttribute('aria-autocomplete') || 'both'; // @TODO use setSelectionRange

		this.getValue = getValue;
		this.setValue = setValue;

		this.handleKeydown = this.handleKeydown.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleMousedown = this.handleMousedown.bind(this);
		this.handleDocumentClick = this.handleDocumentClick.bind(this);

		this.select = this.select.bind(this);
	}

	init() {
		this.update();
		this.initEvents();
	}

	initEvents() {
		// console.info('🚩 Combobox.initEvents');

		this.$input.addEventListener('input', this.handleInput);

		if ('inline' === this.autocomplete || 'both' === this.autocomplete) {
			this.$input.addEventListener('focus', this.handleFocus);
			this.$input.addEventListener('blur', this.handleBlur);

			this.$listbox.addEventListener('mousedown', this.handleMousedown);
			this.$input.addEventListener('keydown', this.handleKeydown);
			this.$listbox.addEventListener('click', this.handleClick);

			document.body.addEventListener('click', this.handleDocumentClick);
		}
	}

	handleDocumentClick({ target }) {
		if (this.$input.contains(target)) {
			return;
		}

		if (this.$listbox.contains(target)) {
			return;
		}

		this.hideListbox();
	}

	// eslint-disable-next-line class-methods-use-this
	handleMousedown(event) {
		event.preventDefault();
	}

	handleKeydown(event) {
		const { keyCode: key } = event;

		const previous = () => {
			this.selectedIndex =
				0 > this.selectedIndex - 1 ? this.results.length - 1 : this.selectedIndex - 1;

			event.preventDefault();
			this.handleUpdate(this.results, this.selectedIndex);
		};

		const next = () => {
			this.selectedIndex =
				this.selectedIndex + 1 > this.results.length - 1 ? 0 : this.selectedIndex + 1;

			event.preventDefault();
			this.handleUpdate(this.results, this.selectedIndex);
		};

		const codes = {
			[ENTER]: () => {
				this.select();

				this.emit('Combobox.onsubmit', {
					selectedResult: this.results[this.selectedIndex],
				});
			},
			[ARROW_DOWN]: next,
			[ARROW_UP]: previous,
			[ESCAPE]: () => {
				this.hideListbox();
				this.setValue(this.$input, '');
			},
			[TAB]: this.select,
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	handleInput({ target: { value } }) {
		// console.info('🚩 Combobox.handleInput');

		this.updateListbox(value);
		this.value = value;
	}

	handleClick({ target }) {
		// console.info('🚩 Combobox.handleClick');

		const result = target.closest('[aria-posinset]');

		if (result) {
			this.selectedIndex = parseInt(result.getAttribute('aria-posinset') - 1, 10);
			console.log(this.results[this.selectedIndex]);

			this.select();

			this.emit('Combobox.onsubmit', { selectedResult: this.results[this.selectedIndex] });
		}
	}

	handleFocus({ target: { value } }) {
		// console.info('🚩 Combobox.handleFocus');

		this.updateListbox(value);
		this.value = value;
	}

	handleBlur() {
		// console.info('🚩 Combobox.handleBlur');

		this.hideListbox();
	}

	handleUpdate(results, selectedIndex) {
		// console.log('🚩 Combobox.handleUpdate', selectedIndex);

		this.$listbox.innerHTML = '';

		results.forEach((result, index) => {
			const props = new Props(index, selectedIndex, BASE_CLASS, results.length);
			const resultHTML = this.renderResult(result, props);

			this.$listbox.insertAdjacentHTML('beforeend', resultHTML);
		});

		this.$input.setAttribute(
			'aria-activedescendant',
			-1 < selectedIndex ? `${BASE_CLASS}-result-${selectedIndex}` : '',
		);

		this.emit('Combobox.onupdate', { results, selectedIndex, value: this.value });
	}

	handleLoading() {
		this.loading = true;
		this.update();
	}

	handleLoaded() {
		this.loading = false;
		this.update();
	}

	select() {
		// console.info('🚩 Combobox.select', this.selectedIndex);

		const result = this.results[this.selectedIndex];

		if (result) {
			this.setValue(this.$input, result);
		}

		this.hideListbox();
	}

	updateListbox(value) {
		this.emit('Combobox.onloading');

		this.search(value).then(results => {
			this.results = results;

			this.emit('Combobox.onloaded');

			if (0 === this.results.length) {
				this.hideListbox();
				return;
			}

			this.selectedIndex = this.autoselect ? 0 : -1;

			this.handleUpdate(this.results, this.selectedIndex);

			this.showListbox();
		});
	}

	showListbox() {
		this.$input.setAttribute('aria-expanded', true);

		this.show();
	}

	hideListbox() {
		// console.info('🚩 Combobox.hideListbox', this.selectedIndex);

		const selectedResult = this.results[this.selectedIndex];

		if (this.autoselect && selectedResult) {
			this.setValue(this.$input, selectedResult);
		}

		this.selectedIndex = -1;
		this.results = [];

		this.$input.setAttribute('aria-expanded', false);
		this.$input.setAttribute('aria-activedescendant', '');

		this.handleUpdate(this.results, this.selectedIndex);

		this.hide();
	}

	renderResult(result, props) {
		return `<li ${props}>${this.getValue(result)}</li>`;
	}

	show() {
		this.expanded = true;
		this.update();
	}

	hide() {
		this.expanded = false;
		this.update();
	}

	// eslint-disable-next-line class-methods-use-this
	update() {
		// console.info('🚩 Combobox.update');
	}
}

export default Combobox;
