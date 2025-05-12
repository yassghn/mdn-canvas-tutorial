/**
 * settings.mjs
 */

const _defaults = {
	renderGridLines: {
		name: 'renderGridLines',
		val: 'false'
	},

	renderPointerTrack: {
		name: 'renderPointerTrack',
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

function _setInitialStateOnLoad() {
	// make sure animation is not paused on start
	_setValue(_defaults.pauseAnimation.name, 'false')
}

function _init() {
	_addDefaultSettings()
	_updateCurrentSettings()
	_setInitialStateOnLoad()
}

// auto init
[_init()]

const settings = {
	// grid lines
	get renderGridLines() {
		return _getValue(_defaults.renderGridLines.name)
	},

	set renderGridLines(value) {
		_setValue(_defaults.renderGridLines.name, value)
	},

	// pointer track
	get renderPointerTrack() {
		return _getValue(_defaults.renderPointerTrack.name)
	},

	set renderPointerTrack(value) {
		_setValue(_defaults.renderPointerTrack.name, value)
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