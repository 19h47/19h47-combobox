import Option from '@/Option';
// import { EventEmitter } from 'events';
// /* eslint-disable */
/*
 * Listbox
 *
 */
class Listbox {
	constructor(element, comboboxObj) {
		this.rootElement = element;
		this.combobox = comboboxObj;

		this.allOptions = [];

		this.options = []; // see PopupMenu init method

		this.firstOption = null; // see PopupMenu init method
		this.lastOption = null; // see PopupMenu init method

		this.hasFocus = false; // see MenuItem handleFocus, handleBlur
		this.hasHover = false; // see PopupMenu handleMouseover, handleMouseout

		this.handleMouseover = this.handleMouseover.bind(this);
		this.handleMouseout = this.handleMouseout.bind(this);
	}

	init() {
		this.rootElement.tabIndex = -1;

		this.rootElement.setAttribute('role', 'listbox');

		const options = [...this.rootElement.querySelectorAll('[role="option"]')];

		options.forEach($option => {
			if (!$option.firstElementChild && 'separator' !== $option.getAttribute('role')) {
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
			}
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
				$option.rootElement.setAttribute('aria-selected', 'true');
				this.rootElement.scrollTop = $option.rootElement.offsetTop;
			} else {
				$option.rootElement.removeAttribute('aria-selected');
			}
		});
	}

	setOption(option) {
		if (option) {
			this.combobox.setOption(option);
			this.combobox.setValue(option.textContent);
		}
	}

	/* EVENT HANDLERS */

	handleMouseover() {
		this.hasHover = true;
	}

	handleMouseout() {
		this.hasHover = false;
		setTimeout(this.close.bind(this, false), 300);
	}

	/* FOCUS MANAGEMENT METHODS */

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

	/* MENU DISPLAY METHODS */

	isOpen() {
		return 'block' === this.rootElement.style.display;
	}

	isClosed() {
		return 'block' !== this.rootElement.style.display;
	}

	hasOptions() {
		return this.options.length;
	}

	open() {
		this.rootElement.style.setProperty('display', 'block');
		this.combobox.rootElement.setAttribute('aria-expanded', true);
	}

	close(force = false) {
		if (force || (!this.hasFocus && !this.hasHover && !this.combobox.hasHover)) {
			this.setCurrentOptionStyle(false);
			this.rootElement.style.display = 'none';
			this.combobox.rootElement.setAttribute('aria-expanded', 'false');
			this.combobox.setActiveDescendant(false);
		}
	}
}

export default Listbox;
