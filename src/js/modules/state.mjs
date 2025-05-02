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

function _addDefaultState() {
	for (const state in _defaults) {
		if (localStorage.getItem(state) == null) {
			localStorage.setItem(state, _defaults[state].val)
		}
	}
}

function _updateCurrentState() {
	for (const state in _state) {
		_state[state].val = localStorage.getItem(state)
	}
}

function _getValue(state) {
	return _state[state].val
}

function _updateState(state, value) {
	_state[state].val = value
	localStorage.setItem(state, value)
}

function _setValue(state, value) {
	_updateState(state, value)
}

function _setInitialStateOnLoad() {
	// do not keep previous pointer coords
	_setValue(_defaults.pointerPosX.name, -1)
	_setValue(_defaults.pointerPosY.name, -1)
}

function _init() {
	_addDefaultState()
	_updateCurrentState()
	_setInitialStateOnLoad()
}

// auto init
[_init()]

const state = {
	// pointer pos
	get pointerPosX() {
		return _getValue(_defaults.pointerPosX.name)
	},

	set pointerPosX(value) {
		_setValue(_defaults.pointerPosX.name, value)
	},

	// pointer pos
	get pointerPosY() {
		return _getValue(_defaults.pointerPosY.name)
	},

	set pointerPosY(value) {
		_setValue(_defaults.pointerPosY.name, value)
	}
}

export default state