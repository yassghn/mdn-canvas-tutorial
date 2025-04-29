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
			code: 'Enter',
			key: 'Enter'
		},

		space: {
			code: 'Space',
			key: ' '
		}
	}
}

function _isTargetKey(event) {
	// check for enter key
	for (const keyName in _keyBindings.keys) {
		const key = _keyBindings.keys[keyName]
		if (key.code == event.code && key.code == event.code) {
			return true
		}
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
			if (_isValidModifier(event)) {
				const doDraw = settings.drawGridLines == true.toString()
				const newValue = doDraw == true ? 'false' : 'true'
				settings.drawGridLines = newValue
				settings.drawPointerTrack = newValue
				settings.noClipDebug = newValue
			}
			break;
		case _keyBindings.keys.space.key:
			// prevent pressing spacebar from scrolling page
			event.preventDefault()
			settings.pauseAnimation = settings.pauseAnimation == true.toString() ? 'false' : 'true'
			break;
	}
}

function _processPointerInput(coords) {
	settings.pointerPos = coords
}

function _addKeyboardListener() {
	document.addEventListener('keydown', (event) => {
		// check if key combo is valid
		if (_isTargetKey(event)) {
			_processKeyboardInput(event)
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