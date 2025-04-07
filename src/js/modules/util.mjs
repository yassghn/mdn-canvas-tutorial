/**
 * util.mjs
 */

import { config } from './config.mjs'

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