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
			const newValue = doDraw == true ? 'false' : 'true'
			settings.drawGridLines = newValue
			settings.drawPointerTrack = newValue
			settings.noClipDebug = newValue
			break;
	}
}

function _processPointerInput(coords) {
	settings.pointerPos = coords
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

function _addPointerMoveListener() {
	document.addEventListener('pointermove', (event) => {
		if (settings.drawPointerTrack) {
			const coords = { x: event.clientX, y: event.clientY }
			_processPointerInput(coords)
		}
	})
}

function _addPointerLeaveListener() {
	document.body.addEventListener('pointerleave', (event) => {
		settings.drawPointerTrack = 'false'
	})
}

function _addPointerEnterListener() {
	document.body.addEventListener('pointerenter', (event) => {
		settings.drawPointerTrack = 'true'
	})
}

function _addPointerEvents() {
	_addPointerMoveListener()
	_addPointerLeaveListener()
	_addPointerEnterListener()
}

function _init() {
	_addKeyboardListener()
	_addPointerEvents()
}

const peripheralInput = {
	init: function () {
		_init()
	}
}

export default peripheralInput