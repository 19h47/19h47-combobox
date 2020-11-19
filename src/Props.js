class Props {
	constructor(index, selectedIndex, baseClass) {
		this.id = `${baseClass}-result-${index}`;
		this.class = `list-group-item list-group-item-action ${baseClass}-result`;
		this['aria-posinset'] = index + 1;
		this.role = 'option';
		if (index === selectedIndex) {
			this['aria-selected'] = 'true';
		}
	}

	toString() {
		return Object.keys(this).reduce((str, key) => `${str} ${key}="${this[key]}"`, '');
	}
}
export default Props;
