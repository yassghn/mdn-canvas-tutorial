/**
 * mdnCanvasTutorial.mjs
 */

import { log } from './util.mjs'
import { config } from './config.mjs'
import initLessons from './lessonsInit.mjs'
import uiCanvas from './uiCanvas.mjs'
import uiOverlayCanvas from './uiOverlayCanvas.mjs'
import lessonsCanvas from './lessonsCanvas.mjs'
import { initPallete } from './pallete.mjs'
import peripheralInput from './peripheralInput.mjs'
import settings from './settings.mjs'
import { enableAll } from './ui.mjs'

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
		// bring up debugger on error
		if (config.debug) {
			debugger
		}
		console.error(e)
	}
}

// main
async function _mdnCanvasTutorial() {
	// check browser support for canvas
	if (lessonsCanvas.isSupported()) {
		log('canvas is supported!')
		// init peripheral input
		peripheralInput.init()
		// start the lessons
		await initLessons(lessonsCanvas)
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

const mdnCanvasTutorial = async () => {
	await _mdnCanvasTutorial()
	// check for enable all
	if (settings.enableAll == true.toString()) {
		enableAll()
	}
}

export function resizeCanvasObjects() {
	lessonsCanvas.resize()
	uiCanvas.resize()
	uiOverlayCanvas.resize()
}

export default mdnCanvasTutorial