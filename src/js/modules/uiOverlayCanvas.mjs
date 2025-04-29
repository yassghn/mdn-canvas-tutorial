/**
 * uiCanvas.mjs
 */

import ui from './ui.mjs'

// canvas object
const _cvs = {
	// canvas width/height
	width: undefined,
	height: undefined,
	// canvas rendering contexts
	ctx: undefined
}

function _setDimensions() {
	// set widths to window
	_cvs.width = (_cvs.ctx.canvas.width = window.innerWidth)
	_cvs.height = (_cvs.ctx.canvas.height = window.innerHeight)
}

function _clear() {
	_cvs.ctx.clearRect(0, 0, _cvs.width, _cvs.height)
}

function _get() {
	return _cvs
}

function _isSupported() {
	if (_cvs.ctx.canvas.getContext) {
		return true
	}
	return false
}

function _init() {
	// get canvas
	const canvas = document.getElementById('ui-overlay-canvas')
	// get canvas context
	_cvs.ctx = canvas.getContext('2d')
	// set canvas dimentions
	_setDimensions()
}

// auto initialize
[_init()]

const uiOverlayCanvas = {
	// adjust canvas after window resize
	resize: function () {
		// set new dimensions
		_setDimensions()
	},

	// check browser for canvas support
	isSupported: function () {
		return _isSupported()
	},

	// clear canvas
	clear: function () {
		_clear()
	},

	// get canvas object
	get: function () {
		return _get()
	},

	// draw to canvas
	draw: function () {
		// clear canvas
		_clear()
		// draw ui
		ui.drawOver(_get())
		// get bmp
		//return _getImageBitmap()
	}
}

export default uiOverlayCanvas