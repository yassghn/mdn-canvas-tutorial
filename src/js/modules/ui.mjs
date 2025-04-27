/**
 * ui.mjs
 */

import settings from './settings.mjs'
import { drawGridLines } from './render.mjs'

function _draw(cvs) {
	if (settings.drawGridLines == true.toString()) {
		drawGridLines(cvs, settings.mousePos)
	}
}

const ui = {
	draw: function(cvs) {
		_draw(cvs)
	}
}

export default ui