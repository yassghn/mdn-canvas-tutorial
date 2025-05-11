/**
 * uiCanvas.mjs
 */

import api from './api.mjs'
import pallete from './pallete.mjs'

/**
 * NOTES:
 * CanvasRenderingContext2D
 *  - object properties are getter/setter pairs not actual variables with values.
 *  - implement get/set propname function bindings
 *    	const obj = { get propname() { ... }, set propname() { ... } }
 *      console.log(obj.propname) // calls getter function for propname
 *      obj.propname = 'value' // calls setter function for propname
 *  - to get property names (without functions)
 *    getProps = (object) => {
 *       let props = [];
 *       for (const prop in object) {
 *         if (JSON.stringify(object[prop])) {
 *           props.push(prop)
 *         }
 *       }
 *       return props
 *    }
 *  - context ownership can be transferred to web workers
 */

// canvas object
const _cvs = {
	// canvas width/height
	width: undefined,
	height: undefined,
	// canvas rendering context
	ctx: undefined,
	// attach api
	api: api
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
	const canvas = document.getElementById('tutorial-canvas')
	// get canvas context
	_cvs.ctx = canvas.getContext('2d')
	// init api
	_cvs.api.init(_cvs.ctx)
	// set canvas dimentions
	_setDimensions()
}

// auto initialize
[_init()]

const lessonsCanvas = {
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
	draw: function (timestamp) {
		// clear canvas
		_clear()
		// draw pallete
		pallete(_get(), timestamp)
	}
}

export default lessonsCanvas