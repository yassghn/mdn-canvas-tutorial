/**
 * canvas.mjs
 */

import lessons from '../lessons/basicDrawingAndShapes.mjs'

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

	canvasPallete: function () {
		// clear canvas
		clearCanvas()
		// draw menu enabled lessons
		if (lessons.simpleExample) {
			lessons.drawSimpleExample(cvs)
		}
		if (lessons.rectangularShape) {
			lessons.drawRectangularShape(cvs)
		}
		if (lessons.triangleShapeAndPaths) {
			lessons.drawTriangleShapesAndPaths(cvs)
		}
		if (lessons.movingThePen) {
			lessons.drawMovingThePen(cvs)
		}
		if (lessons.lines) {
			lessons.drawLines(cvs)
		}
		if (lessons.arcs) {
			lessons.drawArcs(cvs)
		}
		if (lessons.bezierAndQuadraticCurves) {
			lessons.drawBezierAndQuadraticCurves(cvs)
		}
		if (lessons.combinations) {
			lessons.drawCombinations(cvs)
		}
		if (lessons.shapesWithHoles) {
			lessons.drawShapesWithHoles(cvs)
		}
		if (lessons.path2d) {
			lessons.drawPath2d(cvs)
		}
	}
}

export default canvas