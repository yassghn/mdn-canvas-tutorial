/**
 * ui.mjs
 */

import settings from './settings.mjs'
import state from './state.mjs'
import { renderGridLines, trackGridLines } from './render.mjs'

const _pointerTrack = {
	elem: undefined,
	labelx: undefined,
	labely: undefined,
	width: 0,
	height: 0
}

const _state = {
	functions: {}
}

function _updateLabels(coords) {
	_pointerTrack.labelx.innerText = `xpos: ${coords.x}`
	_pointerTrack.labely.innerText = `ypos: ${coords.y}`
}

function _calculatePosition(coords) {
	// value of canvas rendering lineWidth for grid lines tracking
	const offsetConst = 2
	// check pointer track position is past any x/y 0 edge
	const xedge = coords.x - _pointerTrack.width < 0
	const yedge = coords.y - _pointerTrack.height < 0
	// set position coordinates based on edge intersection (mirror across x/y axis when necessary)
	const x = xedge ? coords.x + offsetConst + 1 : coords.x - _pointerTrack.width - 1
	const y = yedge ? coords.y + offsetConst + 1 : coords.y - _pointerTrack.height - 1
	// return pos
	return { x: x, y: y }
}

function _updatePosition(coords) {
	const pos = _calculatePosition(coords)
	_pointerTrack.elem.style.left = `${pos.x}px`
	_pointerTrack.elem.style.top = `${pos.y}px`
}

function _addLabels(content, coords) {
	const labelx = document.createElement('label')
	const labely = document.createElement('label')
	_pointerTrack.labelx = labelx
	_pointerTrack.labely = labely
	content.appendChild(labelx)
	content.appendChild(labely)
	_updateLabels(coords)
}

function _setDimenstions() {
	const style = getComputedStyle(_pointerTrack.elem)
	_pointerTrack.width = parseInt(style.width.split('px')[0])
	_pointerTrack.height = parseInt(style.height.split('px')[0])
}

function _preparePointerTrack(coords) {
	const pointerTrack = document.getElementById('pointer-track')
	const content = pointerTrack.firstElementChild
	_pointerTrack.elem = pointerTrack
	_addLabels(content, coords)
	_setDimenstions()
}

function _togglePointerTrack() {
	const hidden = _pointerTrack.elem.hidden
	_pointerTrack.elem.hidden = hidden == true ? false : true
	// hide/unhide cursor from body
	document.body.style.cursor = hidden == true ? 'none' : 'default'
}

function _renderpointerTrack(coords) {
	// check for unhide
	if (_pointerTrack.elem.hidden) {
		_togglePointerTrack()
	}
	// update position
	_updatePosition(coords)
	_updateLabels(coords)
}

function _getPointerCoords() {
	const x = state.pointerPosX
	const y = state.pointerPosY
	return { x: x, y: y }
}

function _render(cvs) {
	const coords = _getPointerCoords()
	// check to initialize _pointerTrack
	if (!_pointerTrack.elem) {
		_preparePointerTrack(coords)
	}
	// render grid lines and pointer track
	if (settings.renderGridLines == true.toString()) {
		renderGridLines(cvs)
	} else if (!_pointerTrack.elem.hidden) {
		// hide pointer track
		_togglePointerTrack()
	}
}

function _renderOver(cvs) {
	const coords = _getPointerCoords()
	// render grid lines and pointer track
	if (settings.renderGridLines == true.toString()) {
		if (settings.renderPointerTrack == true.toString()) {
			trackGridLines(cvs, coords)
			_renderpointerTrack(coords)
		} else {
			// make sure pointer track dom element is hidden
			if (!_pointerTrack.elem.hidden) {
				_togglePointerTrack()
			}
		}
	}
}

function _addFunction(lambda, ...params) {
	// store params and lambda
	const func = {
		params: [...params],
		fn: lambda
	}
	// add func object to functions
	_state.functions = { [func.fn.name]: func }
}

function _colorPickerClick() {
	console.log('colorpickerclick')
	if (_state.functions.colorPickerClickHandler) {
		const params = _state.functions.colorPickerClickHandler.params
		const fn = _state.functions.colorPickerClickHandler.fn
		fn(params)
	}
}

const ui = {
	render: function (cvs) {
		_render(cvs)
	},

	renderOver: function (cvs) {
		_renderOver(cvs)
	},

	colorPickerClick: function () {
		_colorPickerClick()
	},

	addFunction: function (lambda, ...params) {
		_addFunction(lambda, ...params)
	}
}

export function enableAll() {
	// get all enable all toggles
	const toggles = document.querySelectorAll('div[id|="enable-all"]')
	// check length
	if (toggles.length > 0) {
		// create a click event
		const event = new Event('click', { bubbles: true, cancelable: false, composed: true })
		// iterate toggles firing event
		for (const toggle of toggles) {
			// set toggle state
			toggle.checked = toggle.checked ? false : true
			// fire event
			toggle.dispatchEvent(event)
		}
	}
}

export default ui