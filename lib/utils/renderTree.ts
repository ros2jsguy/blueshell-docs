/**
 * Created by jpollak on 3/23/16.
 */
import {Base} from '../nodes/Base';
import {BlueshellState} from '../nodes/BlueshellState';

import * as archy from 'archy';
import {Data} from 'archy';

function buildArchyTree<S extends BlueshellState, E>(node: Base<S, E>, state?: S): Data {

	let nodeLabel = node.name;

	if (nodeLabel !== node.constructor.name) {
		nodeLabel += ' (' + node.constructor.name + ')';
	}

	if (state) {
		let eventCounter = node.getTreeEventCounter(state);
		let lastEventSeen = node.getLastEventSeen(state);
		let lastResult = node.getLastResult(state);

		if (lastEventSeen === eventCounter && lastResult) {
			nodeLabel += ' => ' + lastResult;
		}

	}

	const archyTree = {
		label: nodeLabel,
		nodes: new Array<Data | string>(),
	};

	if ((<any>node).children) {
		for (let child of (<any>node).children) {
			archyTree.nodes.push(buildArchyTree(<Base<S,E>>child, state));
		}
	}

	return archyTree;
}

export function toString<S extends BlueshellState, E>(tree: Base<S, E>, state?: S): string {
	let a = buildArchyTree(tree, state);
	let renderedTree = archy(a);

	return renderedTree;
}

export function toConsole<S extends BlueshellState, E>(tree: Base<S, E>, state?: S) {
	console.log(toString(tree, state)); // eslint-disable-line no-console
}