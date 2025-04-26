/**
 * peripheralInput.mjs
 */

import settings from './settings.mjs'

const _keyBindings = {
	modifier: {
		ctrl: true
	},

	keys: {
		enter: {
			key: 'Enter',
			keyCode: 13
		}
	}
}

function _isTargetKey(event) {
	// check for enter key
	const enter = _keyBindings.keys.enter
	if (event.key === enter.key && event.keyCode == enter.keyCode) {
		return true
	}
}

function _isValidModifier(event) {
	if (_keyBindings.modifier.ctrl) {
		return event.ctrlKey
	}
}

function _processKeyboardInput(event) {
	switch (event.key) {
		case _keyBindings.keys.enter.key:
			const doDraw = settings.drawGridLines == true.toString()
			settings.drawGridLines = doDraw == true ? 'false' : 'true'
			break;
	}
}

function _processMouseInput(coords) {
	settings.mousePos = coords
}

function _addKeyboardListener() {
	document.addEventListener('keydown', (event) => {
		// check if pre configured modifier was used
		if (_isValidModifier(event)) {
			// check if key combo is valid
			if (_isTargetKey(event)) {
				_processKeyboardInput(event)
			}
		}
	})
}

function _addMouseMoveListener() {
	document.addEventListener('mousemove', (event) => {
		const coords = {x: event.clientX, y: event.clientY}
		_processMouseInput(coords)
	})
}

function _init() {
	_addKeyboardListener()
	_addMouseMoveListener()
}

const peripheralInput = {
	init: function () {
		_init()
	}
}

export default peripheralInput