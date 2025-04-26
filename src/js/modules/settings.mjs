/**
 * settings.mjs
 */

const _defaults = {
	drawGridLines: {
		name: 'drawGridLines',
		val: false
	},

	mousePos: {
		name: 'mousePos',
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

function _updateCurrentSettings(store) {
	for (const setting in store) {
		store[setting] = localStorage.getItem(setting)
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

	// mouse pos
	get mousePos() {
		return _getValue(_defaults.mousePos.name)
	},

	set mousePos(value) {
		_updateStore(_defaults.mousePos.name, value)
	}
}

export default settings