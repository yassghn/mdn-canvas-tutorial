/**
 * mdnCanvasTutorial.mjs
 */

import { log, loglvl } from './util.mjs'
import { config } from './config.mjs'
import initLessons from './lessonsInit.mjs'
import uiCanvas from './uiCanvas.mjs'
import uiOverlayCanvas from './uiOverlayCanvas.mjs'
import lessonsCanvas from './lessonsCanvas.mjs'
import { initPallete } from './pallete.mjs'
import peripheralInput from './peripheralInput.mjs'
import settings from './settings.mjs'

// draw
function _draw(timestamp) {
	requestAnimationFrame((t) => _draw(t))
	try {
		uiCanvas.draw()
		if (settings.pauseAnimation == false.toString()) {
			lessonsCanvas.draw(timestamp)
		}
		uiOverlayCanvas.draw()
	} catch (e) {
		log(e, loglvl.ERROR)
		// bring up debugger on error
		if (config.debug) {
			debugger
		}
	}
}

// main
function _mdnCanvasTutorial() {
	// check browser support for canvas
	if (lessonsCanvas.isSupported()) {
		log('canvas is supported!')
		// init peripheral input
		peripheralInput.init()
		// start the lessons
		initLessons(lessonsCanvas)
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

const mdnCanvasTutorial = () => {
	_mdnCanvasTutorial()
}

export function resizeCanvasObjects() {
	lessonsCanvas.resize()
	uiCanvas.resize()
	uiOverlayCanvas.resize()
}

export default mdnCanvasTutorial