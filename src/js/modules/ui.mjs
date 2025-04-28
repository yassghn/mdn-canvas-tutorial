/**
 * ui.mjs
 */

import settings from './settings.mjs'
import { drawGridLines, trackGridLines } from './render.mjs'

const _pointerTrack = {
	elem: undefined,
	labelx: undefined,
	labely: undefined,
	width: 0,
	height: 0
}

function _updateLabels(coords) {
	_pointerTrack.labelx.innerText = `xpos: ${coords.x}`
	_pointerTrack.labely.innerText = `ypos: ${coords.y}`
}

function _updatePosition(coords) {
	const x = coords.x - _pointerTrack.width - 1
	const y = coords.y - _pointerTrack.height - 1
	_pointerTrack.elem.style.left = `${x}px`
	_pointerTrack.elem.style.top = `${y}px`
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

function _preparepointerTrack(coords) {
	const pointerTrack = document.getElementById('pointer-track')
	const content = pointerTrack.firstElementChild
	_pointerTrack.elem = pointerTrack
	_addLabels(content, coords)
	_setDimenstions()
}

function _togglepointerTrack() {
	const hidden = _pointerTrack.elem.hidden
	_pointerTrack.elem.hidden = hidden == true ? false : true
	// hide/unhide cursor from body
	document.body.style.cursor = hidden == true ? 'none' : 'default'
}

function _renderpointerTrack(coords) {
	// check for unhide
	if (_pointerTrack.elem.hidden) {
		_togglepointerTrack()
	}
	// update position
	_updatePosition(coords)
	_updateLabels(coords)
}

function _draw(cvs) {
	const coords = settings.pointerPos
	// check to initialize _pointerTrack
	if (!_pointerTrack.elem) {
		_preparepointerTrack(coords)
	}
	// draw grid lines and pointer track
	if (settings.drawGridLines == true.toString()) {
		drawGridLines(cvs)
	} else if (!_pointerTrack.elem.hidden) {
		// hide pointer track
		_togglepointerTrack()
	}
}

function _drawOver(cvs) {
	const coords = settings.pointerPos
	// draw grid lines and pointer track
	if (settings.drawPointerTrack == true.toString()) {
		trackGridLines(cvs, coords)
		_renderpointerTrack(coords)
	}
}

const ui = {
	draw: function(cvs) {
		_draw(cvs)
	},

	drawOver: function(cvs) {
		_drawOver(cvs)
	}
}

export default ui