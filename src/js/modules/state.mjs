/**
 * state.mjs
 */

const _defaults = {
	pointerPosX: {
		name: 'pointerPosX',
		val: -1
	},

	pointerPosY: {
		name: 'pointerPosY',
		val: -1
	},
}

const _state = { ..._defaults }

function _addDefaultsToLocalStorage() {
	for (const state in _defaults) {
		if (localStorage.getItem(state) == null) {
			localStorage.setItem(state, _defaults[state].val)
		}
	}
}

function _getLocalStorageState() {
	for (const state in _state) {
		_state[state].val = localStorage.getItem(state)
	}
}

function _getValue(name) {
	return _state[name].val
}

function _updateState(name, value) {
	_state[name].val = value
	localStorage.setItem(name, value)
}

function _setValue(state, value) {
	_updateState(state, value)
}

function _setInitialStateOnLoad() {
	// do not keep previous pointer coords
	_setValue(_state.pointerPosX.name, -1)
	_setValue(_state.pointerPosY.name, -1)
}

function _init() {
	_addDefaultsToLocalStorage()
	_getLocalStorageState()
	_setInitialStateOnLoad()
}

// auto init
[_init()]

const state = {
	// pointer pos
	get pointerPosX() {
		return _getValue(_state.pointerPosX.name)
	},

	set pointerPosX(value) {
		_setValue(_state.pointerPosX.name, value)
	},

	// pointer pos
	get pointerPosY() {
		return _getValue(_state.pointerPosY.name)
	},

	set pointerPosY(value) {
		_setValue(_state.pointerPosY.name, value)
	}
}

export default state