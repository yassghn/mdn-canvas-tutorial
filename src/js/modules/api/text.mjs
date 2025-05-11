/**
 * text.mjs
 */

import ContextState from '../ContextState.mjs'

function _verticalLabel(ctx, text, x, y) {
	// create svg element
	const textArray = text.split('')
	const state = new ContextState(ctx)
	state.apply((_ctx, _textArray, _x, _y) => {
		// get font size
		const height = parseInt(_ctx.font.split('px')[0])
		// transform to start position
		_ctx.translate(_x, _y)
		// iterate text array
		for (const char of _textArray) {
			// render character
			_ctx.fillText(char, 0, 0)
			// translate to new y pos
			_ctx.translate(0, height)
		}
	}, text, x, y)
}

const textApi = {
	label: {
		vertical: _verticalLabel
	}
}

export default textApi