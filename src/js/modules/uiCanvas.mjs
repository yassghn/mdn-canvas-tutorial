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
	// set base width/height using window inner vals
	_cvs.width = _cvs.ctx.canvas.width = window.innerWidth
	_cvs.height = _cvs.ctx.canvas.height = window.innerHeight

	_cvs.ctx.canvas.style.width = `${_cvs.width}px`
	_cvs.ctx.canvas.style.height = `${_cvs.height}px`

	// scale to device pixel ratio
	const dpr = window.devicePixelRatio
	const rect = _cvs.ctx.canvas.getBoundingClientRect()

	_cvs.ctx.scale(dpr, dpr)

	_cvs.ctx.canvas.style.width = `${rect.width}px`
	_cvs.ctx.canvas.style.height = `${rect.height}px`
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
	const canvas = document.getElementById('ui-canvas')
	// get canvas context
	_cvs.ctx = canvas.getContext('2d')
	// set canvas dimentions
	_setDimensions()
}

// auto initialize
[_init()]

const uiCanvas = {
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

	// render to canvas
	render: function () {
		// clear canvas
		_clear()
		// render ui
		ui.render(_get())
	}
}

export default uiCanvas