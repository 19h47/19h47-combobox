import { ENTER, ESCAPE, ARROW_UP, ARROW_DOWN, TAB } from '@19h47/keycode';

import isPromise from '@/utils/isPromise';

/**
 * Core
 */
class Core {
	constructor({
		search,
		onShow = () => {},
		setAttribute = () => {},
		onLoading = () => {},
		onUpdate = () => {},
		onHide = () => {},
		onSubmit = () => {},
		setValue = () => {},
	}) {
		this.value = '';
		this.counter = 0;
		this.selectedIndex = -1;
		this.results = [];

		this.setAttribute = setAttribute;
		this.onShow = onShow;
		this.onLoading = onLoading;
		this.onUpdate = onUpdate;
		this.onHide = onHide;
		this.onSubmit = onSubmit;
		this.setValue = setValue;
		this.search = isPromise(search) ? search : value => Promise.resolve(search(value));
	}

	handleInput = ({ target: { value } }) => {
		this.updateResults(value);

		this.value = value;
	};

	updateResults = value => {
		const currentSearch = this.searchCounter + 1;

		this.onLoading();

		this.search(value).then(results => {
			if (currentSearch !== this.searchCounter) {
				return;
			}

			this.results = results;
			this.onLoaded();

			if (0 === this.results.length) {
				this.hideResults();
				return;
			}

			this.selectedIndex = this.autoSelect ? 0 : -1;
			this.onUpdate(this.results, this.selectedIndex);
			this.showResults();
		});
	};

	handleKeydown = event => {
		const { keyCode } = event;

		const next = () => {
			this.selectedIndex =
				this.selectedIndex + 1 > this.results.length ? 0 : this.selectedIndex + 1;

			event.preventDefault();
			this.onUpdate(this.results, this.selectedIndex);
		};

		const previous = () => {
			this.selectedIndex =
				0 > this.selectedIndex - 1 ? this.results.length - 1 : this.selectedIndex - 1;

			event.preventDefault();
			this.onUpdate(this.results, this.selectedIndex);
		};

		const codes = {
			[ENTER]: () => {
				const result = this.results[this.selectedIndex];

				this.selectResult();
				this.onSubmit(result);
			},
			[ARROW_UP]: previous,
			[ARROW_DOWN]: next,
			[ESCAPE]: () => {
				this.hideResults();
				this.setValue();
			},
			[TAB]: () => {
				this.selectResult();
			},
			default: () => false,
		};

		return (codes[keyCode] || codes.default)();
	};

	handleOptionClick = ({ element }) => {
		this.selectedIndex = parseInt(element.getAttribute('dataindex'), 10);

		this.selectResult();
		this.onSubmit(this.results[this.selectedIndex]);
	};

	handleFocus = ({ target: { value } }) => {
		this.updateResults(value);
		this.value = value;
	};

	handleBlur = () => {
		this.hideResults();
	};

	selectResult = () => {
		const result = this.results[this.selectedIndex];

		if (result) {
			this.setValue(result);
		}

		this.hideResults();
	};

	hideResults() {
		this.selectedIndex = -1;
		this.results = [];
		this.setAttribute('aria-expanded', false);
		this.setAttribute('aria-activedescendant', '');
		this.onUpdate(this.results, this.selectedIndex);
		this.onHide();
	}

	showResults() {
		this.setAttribute('aria-expanded', true);
		this.onShow();
	}
}

export default Core;
