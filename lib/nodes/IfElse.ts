/**
 * Created by jpollak on 5/29/16.
 */
import {Base} from './Base';
import {BlueshellState} from './BlueshellState';
import {resultCodes as rc} from '../utils/resultCodes';

interface Conditional<S, E> {
	(state: S, event: E): boolean;
}

/**
 * If-Else Conditional Composite Node.
 *
 * If conditional(state: S, event: E) returns true,
 * control is passed to the consequent node.
 *
 * If conditional(state: S, event: E) returns false,
 * control is passed to the alternative node, or
 * if one is not provided, 'FAILURE' is returned.
 *
 */
export class IfElse<S extends BlueshellState, E> extends Base<S, E> {

	constructor(name: string,
	            private conditional: Conditional<S, E>,
	            private consequent: any,
	            private alternative?: any) {
		super(name);
	}

	get children() {
		let children = [this.consequent];

		if (this.alternative) {
			children.push(this.alternative);
		}

		return children;
	}

	onEvent(state: S, event: E) {

		if (this.conditional(state, event)) {
			return this.consequent.handleEvent(state, event);
		} else if (this.alternative) {
			return this.alternative.handleEvent(state, event);
		} else {
			return rc.FAILURE;
		}
	}
}
