/**
 * mdnCanvasTutorial.mjs
 */

import { fpsCalc, log, loglvl } from './util.mjs'
import { config } from './config.mjs'
import initLessons from './lessonsInit.mjs'
import uiCanvas from './uiCanvas.mjs'
import uiOverlayCanvas from './uiOverlayCanvas.mjs'
import lessonsCanvas from './lessonsCanvas.mjs'
import { initPallete } from './pallete.mjs'
import peripheralInput from './peripheralInput.mjs'
import settings from './settings.mjs'
import audio from './audio.mjs'

// render
function _render(timestamp) {
	requestAnimationFrame((t) => _render(t))
	fpsCalc()
	try {
		uiCanvas.render()
		if (settings.pauseAnimation == false.toString()) {
			lessonsCanvas.render(timestamp)
		}
		uiOverlayCanvas.render()
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
		initPallete(lessonsCanvas.get(), timestamp)
		// start rendering
		requestAnimationFrame(_render)
		// play audio
		audio.playAudio()
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