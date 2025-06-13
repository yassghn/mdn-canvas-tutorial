/**
 * util.mjs
 */

import { config } from './config.mjs'
import state from './state.mjs'

const _data = {
	fps: 0,
	framesTrack: 0,
	timeStart: null
}

export function fpsCalc() {
	_data.framesTrack++
	const time = document.timeline.currentTime
	if (_data.timeStart == null) {
		_data.timeStart = time
	} else {
		if (time - _data.timeStart >= 1000) {
			_data.timeStart = time
			_data.fps = _data.framesTrack
			state.fps = _data.fps
			_data.framesTrack = 0
		}
	}
}

// define log levels
export const loglvl = {
	INFO: 0,
	DEBUG: 1,
	ERROR: 2,
	WARN: 3
}

// logging
export function log(msg, lvl = loglvl.INFO) {
	if (config.debug) {
		switch (lvl) {
			case loglvl.WARN:
				console.warn(msg)
				break;
			case loglvl.ERROR:
				console.error(msg)
				break;
			case loglvl.DEBUG:
				console.debug(msg)
				break;
			case loglvl.INFO:
				console.info(msg)
				break;
			default:
				console.log(msg)
				break;
		}
	}
}