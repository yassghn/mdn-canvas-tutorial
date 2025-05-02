/**
 * pointer.mjs
 */

import state from './state.mjs'

function _pointerInWndowRange(x, y) {
	// check coords against window width/height
	if (x < 0 || x > window.innerWidth) {
		return false
	} else if (y < 0 || y > window.innerHeight) {
		return false
	}

	return true
}

function pointer() {
	// get pointer coords from program state
	const x = state.pointerPosX
	const y = state.pointerPosY
	const inRange =  _pointerInWndowRange(x, y)

	// create pointer state object
	const pointerState = {
		coords: {
			x: x,
			y: y
		},

		inWindow: inRange
	}

	// return state
	return pointerState
}

export default pointer