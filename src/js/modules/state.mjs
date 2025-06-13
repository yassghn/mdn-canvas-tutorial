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

	fps: {
		name: 'fps',
		val: 0
	}
}

const _state = { ..._defaults }

function _addDefaultsToLocalStorage() {
	for (const name in _defaults) {
		if (localStorage.getItem(name) == null) {
			localStorage.setItem(name, _defaults[name].val)
		}
	}
}

function _getLocalStorageState() {
	for (const name in _state) {
		_state[name].val = localStorage.getItem(name)
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
	},

	// fps
	get fps() {
		return _getValue(_state.fps.name)
	},

	set fps(value) {
		_setValue(_state.fps.name, value)
	}
}

export default state