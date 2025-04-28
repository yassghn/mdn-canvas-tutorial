/**
 * canvasTutorial.mjs
 */

import { log } from './util.mjs'
import initLessons from './lessonsInit.mjs'
import canvas from './canvas.mjs'
import { initPallete } from './pallete.mjs'
import peripheralInput from './peripheralInput.mjs'
import settings from './settings.mjs'

// draw
function _draw(timestamp) {
	requestAnimationFrame((t) => _draw(t))
	canvas.canvasPallete(timestamp)
}

// main
async function _canvasTutorial() {
	// configure canvas object
	canvas.configCanvas()
	// check browser support for canvas
	if (canvas.isCanvasSupported()) {
		log('canvas is supported!')
		// init settings
		settings.init()
		// init peripheral input
		peripheralInput.init()
		// start the lessons
		await initLessons(canvas)
		// get timestamp
		const timestamp = document.timeline.currentTime
		// init pallete
		initPallete(timestamp)
		// start drawing
		requestAnimationFrame(_draw)
	} else {
		log('canvas is unsupported.')
	}
}

const canvasTutorial = async () => {
	await _canvasTutorial()
}

// adjust canvas
window.onresize = canvas.adjustCanvas

export default canvasTutorial