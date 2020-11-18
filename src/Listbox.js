import Option from '@/Option';
import { EventEmitter } from 'events';

/*
 * Listbox
 *
 */
class Listbox extends EventEmitter {
	/**
	 *
	 * @param {Object} element
	 * @param {Object} comboboxObj
	 */
	constructor(element, comboboxObj) {
		super();

		this.rootElement = element;
		this.combobox = comboboxObj;

		this.allOptions = [];

		this.options = [];

		this.firstOption = null;
		this.lastOption = null;

		this.hasFocus = false;
		this.hasHover = false;
		this.isOpen = this.rootElement.classList.contains('is-active');

		// Bind.
		this.handleMouseover = this.handleMouseover.bind(this);
		this.handleMouseout = this.handleMouseout.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.close = this.close.bind(this);
	}

	init() {
		const options = [...this.rootElement.querySelectorAll('[role="option"]')];

		options.forEach($option => {
			if ($option.firstElementChild && 'separator' === $option.getAttribute('role')) {
				return;
			}

			const option = new Option($option, this);
			option.init();

			this.allOptions.push(option);

			option.on('Option.mouseout', () => {
				this.hasHover = false;
				setTimeout(() => this.close(false), 300);
			});

			option.on('Option.mouseover', () => {
				this.hasHover = true;
				this.open();
			});

			option.on('Option.click', opt => {
				this.setOption(opt);
				this.close(true);

				this.emit('Listbox.click', opt);
			});
		});

		this.filter('');
		this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('mouseover', this.handleMouseover);
		this.rootElement.addEventListener('mouseout', this.handleMouseout);
		this.rootElement.addEventListener('mousedown', this.handleMouseDown);
	}

	// eslint-disable-next-line class-methods-use-this
	handleMouseDown(event) {
		event.preventDefault();
	}

	filter(filter = '', currentOption) {
		// let option = null;

		this.options = [];
		this.rootElement.innerHTML = '';

		this.options = this.allOptions.filter(option => {
			return option.textComparison.toLowerCase().startsWith(filter.toLowerCase());
		});

		this.options.forEach(option => this.rootElement.appendChild(option.rootElement));

		if (0 < this.options.length) {
			[this.firstOption] = this.options;
			this.lastOption = this.options[this.options.length - 1];

			if (currentOption && 0 <= this.options.indexOf(currentOption)) {
				return currentOption;
			}

			return this.firstOption;
		}

		this.firstOption = false;
		this.lastOption = false;

		return false;
	}

	setCurrentOptionStyle(option) {
		this.options.forEach($option => {
			if ($option === option) {
				$option.rootElement.setAttribute('aria-selected', true);
				this.rootElement.scrollTop = $option.rootElement.offsetTop;

				return;
			}

			$option.rootElement.removeAttribute('aria-selected');
		});
	}

	setOption(option) {
		console.info('🚩 Listbox.setoption');

		if (option) {
			this.emit('Listbox.setoption', { option });
		}
	}

	handleMouseover() {
		this.hasHover = true;
	}

	handleMouseout() {
		this.hasHover = false;
		setTimeout(() => this.close(false), 300);
	}

	getFirstItem() {
		return this.firstOption;
	}

	getLastItem() {
		return this.lastOption;
	}

	getPreviousItem(currentOption) {
		let index = null;

		if (currentOption !== this.firstOption) {
			index = this.options.indexOf(currentOption);

			return this.options[index - 1];
		}

		return this.lastOption;
	}

	getNextItem(currentOption) {
		let index = null;

		if (currentOption !== this.lastOption) {
			index = this.options.indexOf(currentOption);

			return this.options[index + 1];
		}

		return this.firstOption;
	}

	open() {
		this.isOpen = true;
		this.rootElement.classList.add('is-active');

		this.emit('Listbox.open');
	}

	close(force = false) {
		if (force || (!this.hasFocus && !this.hasHover && !this.combobox.hasHover)) {
			console.info('🚩 Listbox.close');

			this.isOpen = false;
			this.rootElement.classList.remove('is-active');

			this.setCurrentOptionStyle(false);

			this.emit('Listbox.close');
		}
	}

	destroy() {
		console.debug('🗑️ Listbox.destroy');
		this.destroyEvents();
	}

	destroyEvents() {
		this.rootElement.removeEventListener('mouseover', this.handleMouseover);
		this.rootElement.removeEventListener('mouseout', this.handleMouseout);
	}
}

export default Listbox;
