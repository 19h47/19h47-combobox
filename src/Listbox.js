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
		this.isOpen = 'block' === this.rootElement.style.display;

		this.handleMouseover = this.handleMouseover.bind(this);
		this.handleMouseout = this.handleMouseout.bind(this);
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

			option.on('Option.click', ({ option: element }) => {
				this.setOption(element);
				this.close(true);
			});
		});

		this.filterOptions('');
		this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('mouseover', this.handleMouseover);
		this.rootElement.addEventListener('mouseout', this.handleMouseout);
	}

	filterOptions(filter = '', currentOption) {
		let option = null;
		let textContent = null;
		let numItems = 0;

		filter = filter.toLowerCase(); // eslint-disable-line no-param-reassign

		this.options = [];
		this.firstChars = [];
		this.rootElement.innerHTML = '';

		for (let i = 0; i < this.allOptions.length; i += 1) {
			option = this.allOptions[i];
			if (0 === filter.length || 0 === option.textComparison.indexOf(filter)) {
				this.options.push(option);
				textContent = option.textContent.trim();
				this.firstChars.push(textContent.substring(0, 1).toLowerCase());
				this.rootElement.appendChild(option.rootElement);
			}
		}

		// Use populated.options array to initialize firstOption and lastOption.
		numItems = this.options.length;

		if (0 < numItems) {
			[this.firstOption] = this.options;
			this.lastOption = this.options[numItems - 1];

			if (currentOption && 0 <= this.options.indexOf(currentOption)) {
				option = currentOption;
			} else {
				option = this.firstOption;
			}
		} else {
			this.firstOption = false;
			option = false;
			this.lastOption = false;
		}

		return option;
	}

	setCurrentOptionStyle(option) {
		this.options.forEach($option => {
			if ($option === option) {
				$option.rootElement.setAttribute('aria-selected', true);
				this.rootElement.scrollTop = $option.rootElement.offsetTop;
			} else {
				$option.rootElement.removeAttribute('aria-selected');
			}
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
		this.rootElement.style.setProperty('display', 'block');

		this.emit('Listbox.open');
	}

	close(force = false) {
		if (force || (!this.hasFocus && !this.hasHover && !this.combobox.hasHover)) {
			console.info('🚩 Listbox.close');

			this.isOpen = false;
			this.rootElement.style.display = 'none';

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
