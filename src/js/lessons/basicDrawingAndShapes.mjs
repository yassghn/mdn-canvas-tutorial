/**
 * basicDrawingAndShapes.mjs
 */

import ContextProperties from '../modules/ContextProperties.mjs'
import { roundedRect } from '../modules/render.mjs'
import settings from '../modules/settings.mjs'

const basicDrawingAndShapes = {
	renderSimpleExample: function (cvs) {
		// notes:
		// the grid: normally(?) 1 unit = 1px in canvas grid
		// top-left corner of canvas is coordinate (0, 0)
		// rendering moves as x units from left, y units from top
		cvs.ctx.fillStyle = 'rgb(200 0 0)'
		// fillRect(x, y, width, height)
		cvs.ctx.fillRect(10, 10, 50, 50)
		cvs.ctx.fillStyle = 'rgb(0 0 200 / 50%)'
		cvs.ctx.fillRect(30, 30, 50, 50)
	},

	renderRectangularShape: function (cvs) {
		cvs.ctx.fillStyle = 'rgb(0 100 100)'
		cvs.ctx.strokeStyle = 'rgb(355 100 100)'
		// render filled rectangle
		cvs.ctx.fillRect(40, 40, 100, 100)
		// render rectangular outline
		cvs.ctx.strokeRect(60, 60, 60, 60)
		// clear rectangular area (make it fully transparent)
		// everything behind clear becomes transparent
		cvs.ctx.clearRect(65, 65, 50, 50)
	},

	renderTriangleShapesAndPaths: function (cvs) {
		/**
		 * a path is a list of points
		 * connected by various line segments/shapes of various properties
		 *
		 * paths can be subpaths
		 *
		 * making shapes with paths
		 *
		 * 1. create path
		 * 2. render path
		 * 3. stroke/fill path to render it
		 *
		 * note: (almost) always specify starting position after resetting a path
		 *    - first path construction command is treated as moveTo(?)
		 */
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(150, 150)
		cvs.ctx.lineTo(125, 175)
		cvs.ctx.lineTo(175, 175)
		cvs.ctx.fillStyle = 'rgb(100 50 50)'
		cvs.ctx.fill()
	},

	renderMovingThePen: function (cvs) {
		/**
		 * moveTo(x, y) doesn't actually render anything
		 * 	- like lifting a pen from one spot to another
		 *
		 * can use moveTo to render unconnect paths
		 */
		// render smiley face
		cvs.ctx.beginPath()
		// outer circle
		cvs.ctx.arc(275, 275, 50, 0, Math.PI * 2, true)
		// move "pen"
		cvs.ctx.moveTo(310, 275)
		// mouth (moving clockwise)
		cvs.ctx.arc(275, 275, 35, 0, Math.PI, false)
		// move
		cvs.ctx.moveTo(265, 265)
		// left eye
		cvs.ctx.arc(260, 265, 5, 0, Math.PI * 2, true)
		// move
		cvs.ctx.moveTo(295, 265)
		// right eye
		cvs.ctx.arc(290, 265, 5, 0, Math.PI * 2, true)
		// set color
		cvs.ctx.strokeStyle = 'rgb(255 255 50)'
		// render
		cvs.ctx.stroke()
	},

	renderLines: function (cvs) {
		/**
		 * using lineTo(x, y) to render straight lines
		 * 	- render line from current position to x,y point
		 *
		 * end of the previous path is starting point, or
		 * you can use moveTo
		 */
		// render filled triangle
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(355, 389)
		cvs.ctx.lineTo(435, 389)
		cvs.ctx.lineTo(355, 469)
		cvs.ctx.fillStyle = 'rgb(255, 150, 255)'
		cvs.ctx.fill()
		// render stroked triangle
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(455, 489)
		cvs.ctx.lineTo(455, 409)
		cvs.ctx.lineTo(375, 489)
		/**
		 * closePath attempts to add straight line from the current point
		 * to the start of the current subpath.
		 *
		 * does nothing if shape is already closed or only has one point
		 */
		cvs.ctx.closePath()
		cvs.ctx.strokeStyle = 'rgb(255, 150, 255)'
		cvs.ctx.stroke()
	},

	renderArcs(cvs) {
		/**
		 * circles and arcs are rendered with arc(...) and arcTo(...)
		 *
		 * arc(x, y, radius, startAngle, endAngle, counterclockwise)
		 * 	- render an arc centered at (x, y), radius starts at startangle to endangle, direction
		 *
		 * arcTo(x1, y1, x2, y2, radius)
		 * 	- render an arc with the control points and radius connected to the previous point via straight line
		 *
		 * startangle and endangle are measured in radians along the curve of the circle
		 * 	- measured from x axis
		 *
		 * note: angles are measured in radians, not degress
		 * 	- convert to degrees to radians (Math.PI/180)*degrees
		 */
		// render 6 stroked circles/pieces
		// 6 filled circles/pieces
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 3; j++) {
				cvs.ctx.beginPath()
				// set x coordinate
				const x = 375 + j * 50
				// set y coordinate
				const y = 200 + i * 50
				// radius
				const radius = 20
				// starting point on circle
				const startAngle = 0
				// ending point on circle
				const endAngle = Math.PI + (Math.PI * j) / 2
				// use modulous operator, compare result to 0 for a boolean to determine direction
				const counterclockwise = i % 2 !== 0
				// render
				cvs.ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)
				// half the circles will be stroked, half will be filled
				if (i > 1) {
					// set fill style
					cvs.ctx.fillStyle = 'rgb(145, 55, 65)'
					// render
					cvs.ctx.fill()
				} else {
					// set stroke style
					cvs.ctx.strokeStyle = 'rgb(45, 155, 65)'
					// render
					cvs.ctx.stroke()
				}
			}
		}
	},

	renderBezierAndQuadraticCurves(cvs, textEffect) {
		/**
		 * bezier curves in cubic and quadratic forms. used to render complex organic shapes.
		 *
		 * quadraticCurveTo(cp1x, cp1y, x, y)
		 * 	- renders curve from current pen position to (x, y) endpoint
		 *  - using control point (pin/pivot/bend point), specified by (cp1x, cp1y)
		 *
		 * bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
		 * 	- same as quadratic curve to, but specifies a second pin/pivot/bend point
		 */

		cvs.ctx.save()

		// render a quote bubble using quadratic bezier curves
		let x = 575
		let y = 525
		cvs.ctx.save()
		cvs.ctx.translate(x, y)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(0, 0)
		cvs.ctx.quadraticCurveTo(-50, 0, -50, 37.5)
		cvs.ctx.quadraticCurveTo(-50, 75, -25, 75)
		cvs.ctx.quadraticCurveTo(-25, 95, -45, 100)
		cvs.ctx.quadraticCurveTo(-15, 95, -10, 75)
		cvs.ctx.quadraticCurveTo(50, 75, 50, 37.5)
		cvs.ctx.quadraticCurveTo(50, 0, 0, 0)
		cvs.ctx.strokeStyle = 'rgb(155, 155, 155)'
		cvs.ctx.stroke()
		if (settings.noClipDebug == false.toString()) {
			cvs.ctx.clip()
		}

		// animate quote bubble text
		const dx = .99
		const bubbleWidth = 100
		const text = 'TODAYS NEWS @7: the hell you\'ll be sent to here on earth for what you\'ve done to me will not be enough, you will get worse, for all of eternity.'
		const props = new ContextProperties()
		props.font = '36px tahoma'
		props.lineWidth = 1
		props.fillStyle = 'rgb(155, 155, 155)'
		textEffect.setState(cvs.ctx, props, text, bubbleWidth, -25, 50, dx)
		textEffect.render()

		cvs.ctx.restore()

		// render a heart using cubic bezier curves
		x = 475
		y = 600
		const date = new Date()
		// calculate scale using a pi & seconds function
		const scaleCalc = (Math.PI / 15) * (date.getSeconds() % 2)
		const scale = scaleCalc == 0 ? 1 : scaleCalc + 1
		cvs.ctx.translate(x, y)
		// animate heart by scaling
		cvs.ctx.scale(scale, scale)
		cvs.ctx.beginPath()
		cvs.ctx.bezierCurveTo(0, -3, -5, -15, -25, -15)
		cvs.ctx.bezierCurveTo(-55, -15, -55, 22.5, -55, 22.5)
		cvs.ctx.bezierCurveTo(-55, 40, -35, 62, 0, 80)
		cvs.ctx.bezierCurveTo(35, 62, 55, 40, 55, 22.5)
		cvs.ctx.bezierCurveTo(55, 22.5, 55, -15, 25, -15)
		cvs.ctx.bezierCurveTo(10, -15, 0, -3, 0, 0)
		cvs.ctx.fillStyle = 'rgb(255, 100, 100)'
		cvs.ctx.fill()

		cvs.ctx.restore()
	},

	// combining 2d canvas lessons
	renderCombinations: function (cvs) {
		// pacman scene
		let x = 15
		let y = 500

		// first render arcade level (walls)
		cvs.ctx.strokeStyle = 'rgb(100,155,155)'
		roundedRect(cvs.ctx, x + 12, y + 12, 184, 168, 15)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, x + 19, y + 19, 170, 154, 9)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, x + 53, y + 53, 49, 33, 10)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, x + 53, y + 119, 49, 16, 6)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, x + 135, y + 53, 49, 33, 10)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, x + 135, y + 119, 25, 49, 10)
		cvs.ctx.stroke()

		// render pacman
		cvs.ctx.beginPath()
		cvs.ctx.arc(x + 37, y + 37, 13, Math.PI / 7, -Math.PI / 7, false)
		cvs.ctx.lineTo(x + 31, y + 37)
		cvs.ctx.fillStyle = 'rgb(100, 155, 155)'
		cvs.ctx.fill()

		// render pacman's food
		for (let i = 0; i < 8; i++) {
			cvs.ctx.fillRect(x + 51 + i * 16, y + 35, 4, 4)
		}

		for (let i = 0; i < 6; i++) {
			cvs.ctx.fillRect(x + 115, y + 51 + i * 16, 4, 4)
		}

		for (let i = 0; i < 8; i++) {
			cvs.ctx.fillRect(x + 51 + i * 16, y + 99, 4, 4)
		}

		// render pacman enemy body
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(x + 83, y + 116)
		cvs.ctx.lineTo(x + 83, y + 102)
		cvs.ctx.bezierCurveTo(x + 83, y + 94, x + 89, y + 88, x + 97, y + 88)
		cvs.ctx.bezierCurveTo(x + 105, y + 88, x + 111, y + 94, x + 111, y + 102)
		cvs.ctx.lineTo(x + 111, y + 116)
		cvs.ctx.lineTo(x + 106.333, y + 111.333)
		cvs.ctx.lineTo(x + 101.666, y + 116)
		cvs.ctx.lineTo(x + 97, y + 111.333)
		cvs.ctx.lineTo(x + 92.333, y + 116)
		cvs.ctx.lineTo(x + 87.666, y + 111.333)
		cvs.ctx.lineTo(x + 83, y + 116)
		cvs.ctx.fill()

		// render pacman enemy eyes
		cvs.ctx.fillStyle = 'white'
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(x + 91, y + 96)
		cvs.ctx.bezierCurveTo(x + 88, y + 96, x + 87, y + 99, x + 87, y + 101)
		cvs.ctx.bezierCurveTo(x + 87, y + 103, x + 88, y + 106, x + 91, y + 106)
		cvs.ctx.bezierCurveTo(x + 94, y + 106, x + 95, y + 103, x + 95, y + 101)
		cvs.ctx.bezierCurveTo(x + 95, y + 99, x + 94, y + 96, x + 91, y + 96)
		cvs.ctx.moveTo(x + 103, y + 96)
		cvs.ctx.bezierCurveTo(x + 100, y + 96, x + 99, y + 99, x + 99, y + 101)
		cvs.ctx.bezierCurveTo(x + 99, y + 103, x + 100, y + 106, x + 103, y + 106)
		cvs.ctx.bezierCurveTo(x + 106, y + 106, x + 107, y + 103, x + 106, y + 101)
		cvs.ctx.bezierCurveTo(x + 107, y + 99, x + 106, y + 96, x + 103, y + 96)
		cvs.ctx.fill()

		// render pacman enemy eyeballs
		cvs.ctx.fillStyle = 'rgb(100, 155, 155)'
		cvs.ctx.beginPath()
		cvs.ctx.arc(x + 101, y + 102, 2, 0, Math.PI * 2, true)
		cvs.ctx.fill()
		cvs.ctx.beginPath()
		cvs.ctx.arc(x + 89, y + 102, 2, 0, Math.PI * 2, true)
		cvs.ctx.fill()
	},

	renderShapesWithHoles(cvs) {
		/**
		 * shapes and their holes need to be rendered anti clock direction to one another
		 * so render a shape moving clockwise, then render the hole movinc ounter clockwise, or in reverse
		 */
		// render rectangle behind the triforce
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(250, 25)
		cvs.ctx.fillStyle = 'rgb(245, 10, 100)'
		cvs.ctx.fillRect(250, 80, 250, 25)
		// render shape (moving clockwise)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(300, 50)
		cvs.ctx.lineTo(450, 50)
		cvs.ctx.lineTo(375, 179.9)
		// render shape hole (moving counter clockwise)
		cvs.ctx.moveTo(375, 70)
		cvs.ctx.lineTo(350, 110)
		cvs.ctx.lineTo(400, 110)
		// set style and render
		cvs.ctx.fillStyle = 'rgb(145, 145, 145)'
		cvs.ctx.fill()
	},

	renderPath2d(cvs) {
		/**
		 * shapes can be stored as path2d objects
		 */
		// create a rectangle object to render
		const rectangle = new Path2D()
		rectangle.rect(50, 400, 50, 50)
		// create a cricular object to render
		const circle = new Path2D()
		circle.arc(50, 400, 25, 0, 2 * Math.PI)
		// create svg path path2d object
		/**
		 * start at point (M60, 400) (x, y)
		 * move 'h 80' to the right
		 * move 'v 80' down
		 * move 'h -80' to the left
		 * move back to start 'Z'
		 */
		const svgPathObj = new Path2D('M60 400 h 80 v 80 h -80 Z')
		// set stroke/fill styles
		cvs.ctx.strokeStyle = 'rgb(20, 200, 20)'
		cvs.ctx.fillStyle = 'rgb(20, 200, 20)'
		// render the path2d objects
		cvs.ctx.stroke(rectangle)
		cvs.ctx.fill(circle)
		cvs.ctx.stroke(svgPathObj)
	},

	simpleExample: false,
	rectangularShape: false,
	triangleShapeAndPaths: false,
	movingThePen: false,
	lines: false,
	arcs: false,
	bezierAndQuadraticCurves: false,
	combinations: false,
	shapesWithHoles: false,
	path2d: false
}

export default basicDrawingAndShapes