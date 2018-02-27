/**
 * Created by josh on 1/12/16.
 */
import {BlueshellState} from '../BlueshellState';

import {resultCodes as rc} from '../../utils/resultCodes';
import {Decorator} from '../Decorator';

export class Not<S extends BlueshellState, E> extends Decorator<S, E> {

	onEvent(state: S, event: E): Promise<string> {
		let p = this.child.handleEvent(state, event);

		return p.then((res: string) => {
			switch (res) {
			case rc.SUCCESS:
				res = rc.FAILURE;
				break;
			case rc.FAILURE:
				res = rc.SUCCESS;
				break;
			default:
				// no-op
			}

			return res;
		});
	}
}