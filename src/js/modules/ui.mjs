/**
 * ui.mjs
 */

import settings from './settings.mjs'
import { drawGridLines, trackGridLines } from './render.mjs'

const _mouseTrack = {
	elem: undefined,
	labelx: undefined,
	labely: undefined,
	width: 0,
	height: 0
}

function _updateLabels() {
	_mouseTrack.labelx.innerText = `xpos: ${settings.mousePos.x}`
	_mouseTrack.labely.innerText = `ypos: ${settings.mousePos.y}`
}

function _updatePosition() {
	const coords = settings.mousePos
	const x = coords.x - _mouseTrack.width - 1
	const y = coords.y - _mouseTrack.height - 1
	_mouseTrack.elem.style.left = `${x}px`
	_mouseTrack.elem.style.top = `${y}px`
}

function _addLabels(content) {
	const labelx = document.createElement('label')
	const labely = document.createElement('label')
	_mouseTrack.labelx = labelx
	_mouseTrack.labely = labely
	content.appendChild(labelx)
	content.appendChild(labely)
	_updateLabels()
}

function _setDimenstions() {
	const style = getComputedStyle(_mouseTrack.elem)
	_mouseTrack.width = parseInt(style.width.split('px')[0])
	_mouseTrack.height = parseInt(style.height.split('px')[0])
}

function _prepareMouseTrack() {
	const mouseTrack = document.getElementById('mouse-track')
	const content = mouseTrack.firstElementChild
	_mouseTrack.elem = mouseTrack
	_addLabels(content)
	_setDimenstions()
}

function _toggleMouseTrack() {
	const hidden = _mouseTrack.elem.hidden
	_mouseTrack.elem.hidden = hidden == true ? false : true
}

function _renderMouseTrack() {
	// check for unhide
	if (_mouseTrack.elem.hidden) {
		_toggleMouseTrack()
	}
	// update position
	_updatePosition()
	_updateLabels()
}

function _draw(cvs) {
	// check to initialize _mouseTrack
	if (!_mouseTrack.elem) {
		_prepareMouseTrack()
	}
	// draw grid lines and mouse track
	if (settings.drawGridLines == true.toString()) {
		_renderMouseTrack()
		drawGridLines(cvs, settings.mousePos)
	} else if (!_mouseTrack.elem.hidden) {
		// hide mouse track
		_toggleMouseTrack()
	}
}

function _drawOver(cvs) {
	// draw grid lines and mouse track
	if (settings.drawGridLines == true.toString()) {
		trackGridLines(cvs, settings.mousePos)
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