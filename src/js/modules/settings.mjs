/**
 * settings.mjs
 */

const _defaults = {
	drawGridLines: {
		name: 'drawGridLines',
		val: 'false'
	},

	drawPointerTrack: {
		name: 'drawPointerTrack',
		val: 'false'
	},

	pointerPos: {
		name: 'pointerPos',
		val: {x: -1, y: -1}
	},

	noClipDebug: {
		name: 'noClipDebug',
		val: 'false'
	},

	pauseAnimation: {
		name: 'pauseAnimation',
		val: 'false'
	}
}

const _state = { ..._defaults }

function _addDefaultSettings() {
	for (const setting in _defaults) {
		if (localStorage.getItem(setting) == null) {
			localStorage.setItem(setting, _defaults[setting].val)
		}
	}
}

function _updateCurrentSettings() {
	for (const setting in _state) {
		_state[setting].val = localStorage.getItem(setting)
	}
}

function _getValue(setting) {
	return _state[setting].val
}

function _setValue(setting, value) {
	localStorage.setItem(setting, value)
}

function _updateState(setting, value) {
	_state[setting].val = value
	_setValue(setting, value)
}

function _init() {
	_addDefaultSettings()
	_updateCurrentSettings()
}

const settings = {
	// initialize
	init: function () {
		_init()
	},

	// grid lines
	get drawGridLines() {
		return _getValue(_defaults.drawGridLines.name)
	},

	set drawGridLines(value) {
		_updateState(_defaults.drawGridLines.name, value)
	},

	// pointer track
	get drawPointerTrack() {
		return _getValue(_defaults.drawPointerTrack.name)
	},

	set drawPointerTrack(value) {
		_updateState(_defaults.drawPointerTrack.name, value)
	},

	// pointer pos
	get pointerPos() {
		return _getValue(_defaults.pointerPos.name)
	},

	set pointerPos(value) {
		_updateState(_defaults.pointerPos.name, value)
	},

	// no clip debug
	get noClipDebug() {
		return _getValue(_defaults.noClipDebug.name)
	},

	set noClipDebug(value) {
		_updateState(_defaults.noClipDebug.name, value)
	},

	// no clip debug
	get pauseAnimation() {
		return _getValue(_defaults.pauseAnimation.name)
	},

	set pauseAnimation(value) {
		_updateState(_defaults.pauseAnimation.name, value)
	}
}

export default settings