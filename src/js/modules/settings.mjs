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

	noClipDebug: {
		name: 'noClipDebug',
		val: 'false'
	},

	pauseAnimation: {
		name: 'pauseAnimation',
		val: 'false'
	},

	enableAll: {
		name: 'enableAll',
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
	_updateState(setting, value)
}

function _updateState(setting, value) {
	_state[setting].val = value
	localStorage.setItem(setting, value)
}

function _init() {
	_addDefaultSettings()
	_updateCurrentSettings()
}

// auto init
[_init()]

const settings = {
	// grid lines
	get drawGridLines() {
		return _getValue(_defaults.drawGridLines.name)
	},

	set drawGridLines(value) {
		_setValue(_defaults.drawGridLines.name, value)
	},

	// pointer track
	get drawPointerTrack() {
		return _getValue(_defaults.drawPointerTrack.name)
	},

	set drawPointerTrack(value) {
		_setValue(_defaults.drawPointerTrack.name, value)
	},

	// no clip debug
	get noClipDebug() {
		return _getValue(_defaults.noClipDebug.name)
	},

	set noClipDebug(value) {
		_setValue(_defaults.noClipDebug.name, value)
	},

	// no clip debug
	get pauseAnimation() {
		return _getValue(_defaults.pauseAnimation.name)
	},

	set pauseAnimation(value) {
		_setValue(_defaults.pauseAnimation.name, value)
	},

	// no clip debug
	get enableAll() {
		return _getValue(_defaults.enableAll.name)
	},

	set enableAll(value) {
		_setValue(_defaults.enableAll.name, value)
	}
}

export default settings