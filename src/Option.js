import { EventEmitter } from 'events';

/*
 * Option
 *
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */
class Option extends EventEmitter {
	/**
	 * Constructor
	 *
	 * @param {Object} element
	 */
	constructor(element) {
		super();

		this.rootElement = element;

		this.textContent = this.rootElement.textContent.trim();
		this.textComparison = this.textContent.toLowerCase();

		this.handleClick = this.handleClick.bind(this);
		this.handleMouseover = this.handleMouseover.bind(this);
		this.handleMouseout = this.handleMouseout.bind(this);
	}

	init() {
		this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('click', this.handleClick);
		this.rootElement.addEventListener('mouseover', this.handleMouseover);
		this.rootElement.addEventListener('mouseout', this.handleMouseout);
	}

	handleClick() {
		this.emit('Option.click', this);
	}

	handleMouseover() {
		this.emit('Option.mouseover');
	}

	handleMouseout() {
		this.emit('Option.mouseout');
	}

	destroy() {
		console.debug('🗑️');
		this.destroyEvents();
	}

	destroyEvents() {
		this.rootElement.removeEventListener('click', this.handleClick);
		this.rootElement.removeEventListener('mouseover', this.handleMouseover);
		this.rootElement.removeEventListener('mouseout', this.handleMouseout);
	}
}

export default Option;
