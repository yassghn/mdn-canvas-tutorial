/**
 * settings.mjs
 */

const _defaults = {
	drawGridLines: {
		name: 'drawGridLines',
		val: false
	},

	drawPointerTrack: {
		name: 'drawPointerTrack',
		val: 'false'
	},

	pointerPos: {
		name: 'pointerPos',
		val: {x: -1, y: -1}
	}
}

const _store = { ..._defaults }

function _addDefaultSettings() {
	for (const setting in _defaults) {
		if (localStorage.getItem(setting) == null) {
			localStorage.setItem(setting, _defaults[setting])
		}
	}
}

function _updateCurrentSettings() {
	for (const setting in _store) {
		_store[setting].val = localStorage.getItem(setting)
	}
}

function _getValue(setting) {
	return _store[setting].val
}

function _setValue(setting, value) {
	localStorage.setItem(setting, value)
}

function _updateStore(setting, value) {
	_store[setting].val = value
	_setValue(setting, value)
}

const settings = {
	init: function () {
		_addDefaultSettings()
		_updateCurrentSettings()
	},

	// grid lines
	get drawGridLines() {
		return _getValue(_defaults.drawGridLines.name)
	},

	set drawGridLines(value) {
		_updateStore(_defaults.drawGridLines.name, value)
	},

	// pointer track
	get drawPointerTrack() {
		return _getValue(_defaults.drawPointerTrack.name)
	},

	set drawPointerTrack(value) {
		_updateStore(_defaults.drawPointerTrack.name, value)
	},

	// pointer pos
	get pointerPos() {
		return _getValue(_defaults.pointerPos.name)
	},

	set pointerPos(value) {
		_updateStore(_defaults.pointerPos.name, value)
	}
}

export default settings