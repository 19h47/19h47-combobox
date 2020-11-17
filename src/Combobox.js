import Listbox from '@/Listbox';
import {
	BACKSPACE,
	TAB,
	ENTER,
	ESC,
	END,
	HOME,
	ARROW_LEFT,
	ARROW_UP,
	ARROW_RIGHT,
	ARROW_DOWN,
} from '@19h47/keycode';

const isPrintableCharacter = string => 1 === string.length && string.match(/\S/);

class Combobox {
	constructor(domNode) {
		this.rootElement = domNode.querySelector('input');
		this.listbox = false;
		this.option = false;

		this.hasFocus = false;
		this.hasHover = false;
		this.filter = '';
		this.isNone = false;
		this.isList = false;
		this.isBoth = false;
	}

	init() {
		this.rootElement.setAttribute('aria-haspopup', true);

		let autocomplete = this.rootElement.getAttribute('aria-autocomplete');
		const $listbox = document.getElementById(this.rootElement.getAttribute('aria-controls'));

		if ('string' === typeof autocomplete) {
			autocomplete = autocomplete.toLowerCase();
			this.isNone = 'none' === autocomplete;
			this.isList = 'list' === autocomplete;
			this.isBoth = 'both' === autocomplete;
		} else {
			// default value of autocomplete
			this.isNone = true;
		}

		this.listbox = new Listbox($listbox, this);
		this.listbox.init();

		this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('keydown', this.handleKeydown.bind(this));
		this.rootElement.addEventListener('keyup', this.handleKeyup.bind(this));
		this.rootElement.addEventListener('click', this.handleClick.bind(this));
		this.rootElement.addEventListener('focus', this.handleFocus.bind(this));
		this.rootElement.addEventListener('blur', this.handleBlur.bind(this));
	}

	setActiveDescendant(option) {
		this.rootElement.setAttribute('aria-activedescendant', '');

		if (option && this.listbox.focus) {
			this.rootElement.setAttribute('aria-activedescendant', option.rootElement.id);
		}
	}

	setValue(value) {
		this.filter = value;
		this.rootElement.value = this.filter;
		this.rootElement.setSelectionRange(this.filter.length, this.filter.length);

		if (this.isList || this.isBoth) {
			this.listbox.filterOptions(this.filter, this.option);
		}
	}

	setOption(option, flag = false) {
		if (option) {
			this.option = option;
			this.listbox.setCurrentOptionStyle(this.option);
			this.setActiveDescendant(this.option);

			if (this.isBoth) {
				this.rootElement.value = this.option.textContent;
				if (flag) {
					this.rootElement.setSelectionRange(
						this.option.textContent.length,
						this.option.textContent.length,
					);
				} else {
					this.rootElement.setSelectionRange(
						this.filter.length,
						this.option.textContent.length,
					);
				}
			}
		}
	}

	setVisualFocusTextbox() {
		this.listbox.rootElement.classList.remove('focus');
		this.listbox.focus = false;
		this.rootElement.parentNode.classList.add('focus'); // set the focus class to the parent for easier styling
		this.hasFocus = true;
		this.setActiveDescendant(false);
	}

	setVisualFocusListbox() {
		this.rootElement.parentNode.classList.remove('focus');
		this.hasFocus = false;
		this.listbox.rootElement.classList.add('focus');
		this.listbox.focus = true;
		this.setActiveDescendant(this.option);
	}

	removeVisualFocusAll() {
		this.rootElement.parentNode.classList.remove('focus');
		this.hasFocus = false;
		this.listbox.rootElement.classList.remove('focus');
		this.listbox.focus = true;
		this.option = false;
		this.setActiveDescendant(false);
	}

	handleKeydown(event) {
		const { altKey, keyCode: key } = event;

		const codes = {
			[ENTER]: () => {
				if ((this.listbox.focus || this.isBoth) && this.option) {
					this.setValue(this.option.textContent);
				}

				this.listbox.close(true);

				event.stopPropagation();
				event.preventDefault();
			},
			[ARROW_DOWN]: () => {
				if (this.listbox.options.length) {
					if (this.listbox.focus || (this.isBoth && this.option)) {
						this.setOption(this.listbox.getNextItem(this.option), true);
					} else {
						this.listbox.open();
						if (!altKey) {
							this.setOption(this.listbox.getFirstItem(), true);
						}
					}
					this.setVisualFocusListbox();
				}

				event.stopPropagation();
				event.preventDefault();
			},
			[ARROW_UP]: () => {
				if (this.listbox.options.length) {
					if (this.listbox.focus || (this.isBoth && this.option)) {
						this.setOption(this.listbox.getPreviousItem(this.option), true);
					} else {
						this.listbox.open();
						if (!altKey) {
							this.setOption(this.listbox.getLastItem(), true);
						}
					}
					this.setVisualFocusListbox();
				}

				event.stopPropagation();
				event.preventDefault();
			},
			[ESC]: () => {
				this.listbox.close(true);
				this.setVisualFocusTextbox();
				this.setValue('');
				this.option = false;
			},
			[TAB]: () => {
				this.listbox.close(true);

				if (this.listbox.focus) {
					if (this.option) {
						this.setValue(this.option.textContent);
					}
				}
			},
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	handleKeyup(event) {
		let flag = false;
		let option = false;

		const { keyCode, key } = event;

		if (isPrintableCharacter(key)) {
			this.filter += key;
		}

		// console.log({ keyCode, key, filter: this.filter });

		// this is for the case when a selection in the textbox has been deleted
		if (this.rootElement.value.length < this.filter.length) {
			this.filter = this.rootElement.value;
			this.option = false;
		}

		if (keyCode === ESC) {
			return;
		}

		switch (keyCode) {
			case BACKSPACE:
				this.setValue(this.rootElement.value);
				this.setVisualFocusTextbox();

				this.listbox.setCurrentOptionStyle(false);
				this.option = false;
				flag = true;

				break;

			case ARROW_LEFT:
			case ARROW_RIGHT:
			case HOME:
			case END:
				if (this.isBoth) {
					this.filter = this.rootElement.value;
				} else {
					this.option = false;
					this.listbox.setCurrentOptionStyle(false);
				}

				this.setVisualFocusTextbox();
				flag = true;
				break;

			default:
				if (isPrintableCharacter(key)) {
					this.setVisualFocusTextbox();
					this.listbox.setCurrentOptionStyle(false);
					flag = true;

					if (this.isList || this.isBoth) {
						option = this.listbox.filterOptions(this.filter, this.option);

						if (option) {
							if (this.listbox.isClosed() && this.rootElement.value.length) {
								this.listbox.open();
							}

							if (
								0 ===
								option.textComparison.indexOf(this.rootElement.value.toLowerCase())
							) {
								this.option = option;
								if (this.isBoth || this.listbox.focus) {
									this.listbox.setCurrentOptionStyle(option);
									if (this.isBoth && isPrintableCharacter(key)) {
										this.setOption(option);
									}
								}
							} else {
								this.option = false;
								this.listbox.setCurrentOptionStyle(false);
							}
						} else {
							this.listbox.close();
							this.option = false;
							this.setActiveDescendant(false);
						}
					} else if (this.rootElement.value.length) {
						this.listbox.open();
					}
				}

				break;
		}

		// if (keyCode !== RETURN) {

		//   if (this.isList || this.isBoth) {
		//     option = this.listbox.filterOptions(this.filter, this.option);
		//     if (option) {
		//       if (this.listbox.isClosed() && this.rootElement.value.length) {
		//         this.listbox.open();
		//       }

		//       if (option.textComparison.indexOf(this.rootElement.value.toLowerCase()) === 0) {
		//         this.option = option;
		//         if (this.isBoth || this.listbox.focus) {
		//           this.listbox.setCurrentOptionStyle(option);
		//           if (this.isBoth && isPrintableCharacter(char)) {
		//             this.setOption(option);
		//           }
		//         }
		//       }
		//       else {
		//         this.option = false;
		//         this.listbox.setCurrentOptionStyle(false);
		//       }
		//     }
		//     else {
		//       this.listbox.close();
		//       this.option = false;
		//       this.setActiveDescendant(false);
		//     }
		//   }
		//   else if (this.rootElement.value.length) {
		//     this.listbox.open();
		//   }

		// }

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	handleClick() {
		if (this.listbox.isOpen()) {
			this.listbox.close(true);
		} else {
			this.listbox.open();
		}
	}

	handleFocus() {
		this.setVisualFocusTextbox();
		this.option = false;
		this.listbox.setCurrentOptionStyle(null);
	}

	handleBlur() {
		this.listbox.focus = false;
		this.listbox.setCurrentOptionStyle(null);
		this.removeVisualFocusAll();
		setTimeout(this.listbox.close.bind(this.listbox, false), 300);
	}
}

export default Combobox;
