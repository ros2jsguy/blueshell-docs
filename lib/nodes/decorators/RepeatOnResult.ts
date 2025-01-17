/**
 * Created by josh on 1/12/16.
 */
import {BlueshellState, BaseNode} from '../../models';
import {RepeatWhen} from './RepeatWhen';

/**
 * The child Node repeats handling the event if the child resulted in a specified status.
 * 1/12/16
 * @author Joshua Chaitin-Pollak
 */
export class RepeatOnResult<S extends BlueshellState, E> extends RepeatWhen<S, E> {
	constructor(repeatRes: string, child: BaseNode<S, E>) {
		super('ResultEquals-' + repeatRes, child,
			(state, event, res) => res === repeatRes);
	}

	get symbol(): string {
		return '⊜↻';
	}
}
