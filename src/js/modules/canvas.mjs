/**
 * canvas.mjs
 */

import pallete from './pallete.mjs'

// canvas object
const cvs = {
	// canvas html element
	canvas: undefined,
	// canvas width/height
	width: undefined,
	height: undefined,
	// canvas rendering context
	ctx: undefined
}

function setCanvasDimensions() {
	// set widths to window
	cvs.width = (cvs.canvas.width = window.innerWidth)
	cvs.height = (cvs.canvas.height = window.innerHeight)
}

function clearCanvas() {
	cvs.ctx.fillStyle = 'rgb(0 0 0)'
	cvs.ctx.fillRect(0, 0, cvs.width, cvs.height)
}

const canvas = {
	// adjust canvas after window resize
	adjustCanvas: function () {
		// set new dimensions
		setCanvasDimensions()
	},

	// check browser for canvas support
	isCanvasSupported: function () {
		if (cvs.canvas.getContext) {
			return true
		}
		return false
	},

	// configure canvas object
	configCanvas: function () {
		// get canvas
		cvs.canvas = document.querySelector('#tutorial-canvas')
		// set canvas dimentions
		setCanvasDimensions()
		// get canvas context
		cvs.ctx = cvs.canvas.getContext('2d')
	},

	clear: function() {
		clearCanvas()
	},

	canvasPallete: function (timestamp) {
		// clear canvas
		//clearCanvas()
		// draw menu enabled lessons
		pallete(cvs, timestamp)
	}
}

export default canvas