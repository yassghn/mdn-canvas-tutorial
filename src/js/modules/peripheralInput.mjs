/**
 * peripheralInput.mjs
 */

import settings from './settings.mjs'
import state from './state.mjs'
import ui, { enableAll } from './ui.mjs'
import pointer from './pointer.mjs'

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
		},

		s: {
			code: 'KeyS',
			key: 's'
		}
	}
}

function _isTargetKey(event) {
	// check for enter key
	for (const keyName in _keyBindings.keys) {
		const key = _keyBindings.keys[keyName]
		if (key.code == event.code && key.key == event.key) {
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
				const doDraw = settings.renderGridLines == true.toString()
				const newValue = doDraw == true ? 'false' : 'true'
				settings.renderGridLines = newValue
				settings.renderPointerTrack = newValue
				settings.noClipDebug = newValue
			}
			break
		case _keyBindings.keys.space.key:
			// check if modifier was used
			if (event.ctrlKey) {
				const enable = settings.enableAll == true.toString()
				settings.enableAll = enable ? 'false' : 'true'
				enableAll()
			} else {
				// prevent pressing spacebar from scrolling page
				event.preventDefault()
				settings.pauseAnimation = settings.pauseAnimation == true.toString() ? 'false' : 'true'
			}
			break
		case _keyBindings.keys.s.key:
			if (event.ctrlKey) {
				// prevent save dialog from comming up
				event.preventDefault()
				// save image
				ui.saveLessonsCanvas()
			}
			break
	}
}

function _processPointerMove(coords) {
	state.pointerPosX = coords.x
	state.pointerPosY = coords.y
}

function _processPointerClick(event) {
	// ignore non-ui level click events
	if (event.target.tagName == 'canvas'.toUpperCase()) {
		ui.colorPickerClick()
	}
}

function _addKeyboardListener() {
	document.addEventListener('keydown', (event) => {
		// check if key combo is valid
		if (_isTargetKey(event)) {
			_processKeyboardInput(event)
		}
	})
}

function _addPointerClickListener() {
	document.addEventListener('click', (event) => {
		_processPointerClick(event)
	})
}

function _addPointerMoveListener() {
	document.addEventListener('pointermove', (event) => {
		// check pointer in window. otherwise slowly moving at edges, near scroll bar,
		// incorrectly records move coordinates again
		if (pointer().inWindow) {
			const coords = { x: event.clientX, y: event.clientY }
			_processPointerMove(coords)
		}
	})
}

function _addPointerLeaveListener() {
	document.body.addEventListener('pointerleave', (event) => {
		settings.renderPointerTrack = 'false'
		// pointer left viewable document window, set coordinates out of bounds
		_processPointerMove({ x: -1, y: -1 })
	})
}

function _addPointerEnterListener() {
	document.body.addEventListener('pointerenter', (event) => {
		if (settings.renderGridLines == true.toString()) {
			settings.renderPointerTrack = 'true'
		}
		// update pointer coords
		const coords = { x: event.clientX, y: event.clientY }
		_processPointerMove(coords)
	})
}

function _addPointerEvents() {
	_addPointerMoveListener()
	_addPointerLeaveListener()
	_addPointerEnterListener()
	_addPointerClickListener()
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