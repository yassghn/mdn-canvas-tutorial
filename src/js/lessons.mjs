/**
 * lessons.mjs
 */

import { roundedRect } from './render.mjs'

const lessons = {
	drawSimpleExample: function (cvs) {
		// notes:
		// the grid: normally(?) 1 unit = 1px in canvas grid
		// top-left corner of canvas is coordinate (0, 0)
		// drawing moves as x units from left, y units from top
		cvs.ctx.fillStyle = 'rgb(200 0 0)'
		// fillRect(x, y, width, height)
		cvs.ctx.fillRect(10, 10, 50, 50)
		cvs.ctx.fillStyle = 'rgb(0 0 200 / 50%)'
		cvs.ctx.fillRect(30, 30, 50, 50)
	},

	drawRectangularShape: function (cvs) {
		cvs.ctx.fillStyle = 'rgb(0 100 100)'
		cvs.ctx.strokeStyle = 'rgb(355 100 100)'
		// draw filled rectangle
		cvs.ctx.fillRect(40, 40, 100, 100)
		// draw rectangular outline
		cvs.ctx.strokeRect(60, 60, 60, 60)
		// clear rectangular area (make it fully transparent)
		// everything behind clear becomes transparent
		cvs.ctx.clearRect(65, 65, 50, 50)
	},

	drawTriangleShapesAndPaths: function (cvs) {
		/**
		 * a path is a list of points
		 * connected by various line segments/shapes of various properties
		 *
		 * paths can be subpaths
		 *
		 * making shapes with paths
		 *
		 * 1. create path
		 * 2. draw path
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

	drawMovingThePen: function (cvs) {
		/**
		 * moveTo(x, y) doesn't actually draw anything
		 * 	- like lifting a pen from one spot to another
		 *
		 * can use moveTo to draw unconnect paths
		 */
		// draw smiley face
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

	drawLines: function (cvs) {
		/**
		 * using lineTo(x, y) to draw straight lines
		 * 	- draw line from current position to x,y point
		 *
		 * end of the previous path is starting point, or
		 * you can use moveTo
		 */
		// draw filled triangle
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(400, 400)
		cvs.ctx.lineTo(480, 400)
		cvs.ctx.lineTo(400, 480)
		cvs.ctx.fillStyle = 'rgb(255, 150, 255)'
		cvs.ctx.fill()
		// draw stroked triangle
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(500, 500)
		cvs.ctx.lineTo(500, 420)
		cvs.ctx.lineTo(420, 500)
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

	drawArcs(cvs) {
		/**
		 * circles and arcs are drawn with arc(...) and arcTo(...)
		 *
		 * arc(x, y, radius, startAngle, endAngle, counterclockwise)
		 * 	- draw an arc centered at (x, y), radius starts at startangle to endangle, direction
		 *
		 * arcTo(x1, y1, x2, y2, radius)
		 * 	- draw an arc with the control points and radius connected to the previous point via straight line
		 *
		 * startangle and endangle are measured in radians along the curve of the circle
		 * 	- measured from x axis
		 *
		 * note: angles are measured in radians, not degress
		 * 	- convert to degrees to radians (Math.PI/180)*degrees
		 */
		// draw 6 stroked circles/pieces
		// 6 filled circles/pieces
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 3; j++) {
				cvs.ctx.beginPath()
				// set x coordinate
				const x = 525 + j * 50
				// set y coordinate
				const y = 225 + i * 50
				// radius
				const radius = 20
				// starting point on circle
				const startAngle = 0
				// ending point on circle
				const endAngle = Math.PI + (Math.PI * j) / 2
				// use modulous operator, compare result to 0 for a boolean to determine direction
				const counterclockwise = i % 2 !== 0
				// draw
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

	drawBezierAndQuadraticCurves(cvs) {
		/**
		 * bezier curves in cubic and quadratic forms. used to draw complex organic shapes.
		 *
		 * quadraticCurveTo(cp1x, cp1y, x, y)
		 * 	- draws curve from current pen position to (x, y) endpoint
		 *  - using control point (pin/pivot/bend point), specified by (cp1x, cp1y)
		 *
		 * bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
		 * 	- same as quadratic curve to, but specifies a second pin/pivot/bend point
		 */
		// draw a quote bubble using quadratic bezier curves
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(575, 525)
		cvs.ctx.quadraticCurveTo(525, 525, 525, 562.5)
		cvs.ctx.quadraticCurveTo(525, 600, 550, 600)
		cvs.ctx.quadraticCurveTo(550, 620, 530, 625)
		cvs.ctx.quadraticCurveTo(560, 620, 565, 600)
		cvs.ctx.quadraticCurveTo(625, 600, 625, 562.5)
		cvs.ctx.quadraticCurveTo(625, 525, 575, 525)
		cvs.ctx.strokeStyle = 'rgb(155, 155, 155)'
		cvs.ctx.stroke()
		// add text to quote bubble
		cvs.ctx.font = '36px tahoma'
		cvs.ctx.lineWidth = 1
		cvs.ctx.fillStyle = 'rgb(155,155,155)'
		cvs.ctx.fillText('hi!', 550, 575)
		// draw a heart using cubic bezier curves
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(675, 640)
		cvs.ctx.bezierCurveTo(675, 637, 670, 625, 650, 625)
		cvs.ctx.bezierCurveTo(620, 625, 620, 662.5, 620, 662.5)
		cvs.ctx.bezierCurveTo(620, 680, 640, 702, 675, 720)
		cvs.ctx.bezierCurveTo(710, 702, 730, 680, 730, 662.5)
		cvs.ctx.bezierCurveTo(730, 662.5, 730, 625, 700, 625)
		cvs.ctx.bezierCurveTo(685, 625, 675, 637, 675, 640)
		cvs.ctx.fillStyle = 'rgb(255, 100, 100)'
		cvs.ctx.fill()
	},

	// combining 2d canvas lessons
	drawCombinations: function (cvs) {
		// pacman scene

		// first draw arcade level (walls)
		cvs.ctx.strokeStyle = 'rgb(100,155,155)'
		roundedRect(cvs.ctx, 112, 512, 184, 168, 15)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, 119, 519, 170, 154, 9)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, 153, 553, 49, 33, 10)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, 153, 619, 49, 16, 6)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, 235, 553, 49, 33, 10)
		cvs.ctx.stroke()
		roundedRect(cvs.ctx, 235, 619, 25, 49, 10)
		cvs.ctx.stroke()

		// draw pacman
		cvs.ctx.beginPath()
		cvs.ctx.arc(137, 537, 13, Math.PI / 7, -Math.PI / 7, false)
		cvs.ctx.lineTo(131, 537)
		cvs.ctx.fillStyle = 'rgb(100, 155, 155)'
		cvs.ctx.fill()

		// draw pacman's food
		for (let i = 0; i < 8; i++) {
			cvs.ctx.fillRect(151 + i * 16, 535, 4, 4)
		}

		for (let i = 0; i < 6; i++) {
			cvs.ctx.fillRect(215, 551 + i * 16, 4, 4)
		}

		for (let i = 0; i < 8; i++) {
			cvs.ctx.fillRect(151 + i * 16, 599, 4, 4)
		}

		// draw pacman enemy body
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(183, 616)
		cvs.ctx.lineTo(183, 602)
		cvs.ctx.bezierCurveTo(183, 594, 189, 588, 197, 588)
		cvs.ctx.bezierCurveTo(205, 588, 211, 594, 211, 602)
		cvs.ctx.lineTo(211, 616)
		cvs.ctx.lineTo(206.333, 611.333)
		cvs.ctx.lineTo(201.666, 616)
		cvs.ctx.lineTo(197, 611.333)
		cvs.ctx.lineTo(192.333, 616)
		cvs.ctx.lineTo(187.666, 611.333)
		cvs.ctx.lineTo(183, 616)
		cvs.ctx.fill()

		// draw pacman enemy eyes
		cvs.ctx.fillStyle = 'white'
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(191, 596)
		cvs.ctx.bezierCurveTo(188, 596, 187, 599, 187, 601)
		cvs.ctx.bezierCurveTo(187, 603, 188, 606, 191, 606)
		cvs.ctx.bezierCurveTo(194, 606, 195, 603, 195, 601)
		cvs.ctx.bezierCurveTo(195, 599, 194, 596, 191, 596)
		cvs.ctx.moveTo(203, 596)
		cvs.ctx.bezierCurveTo(200, 596, 199, 599, 199, 601)
		cvs.ctx.bezierCurveTo(199, 603, 200, 606, 203, 606)
		cvs.ctx.bezierCurveTo(206, 606, 207, 603, 206, 601)
		cvs.ctx.bezierCurveTo(207, 599, 206, 596, 203, 596)
		cvs.ctx.fill()

		// draw pacman enemy eyeballs
		cvs.ctx.fillStyle = 'rgb(100, 155, 155)'
		cvs.ctx.beginPath()
		cvs.ctx.arc(201, 602, 2, 0, Math.PI * 2, true)
		cvs.ctx.fill()
		cvs.ctx.beginPath()
		cvs.ctx.arc(189, 602, 2, 0, Math.PI * 2, true)
		cvs.ctx.fill()
	},

	drawShapesWithHoles(cvs) {
		/**
		 * shapes and their holes need to be drawn anti clock direction to one another
		 * so draw a shape moving clockwise, then draw the hole movinc ounter clockwise, or in reverse
		 */
		// draw rectangle behind the triforce
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(250, 25)
		cvs.ctx.fillStyle = 'rgb(245, 10, 100)'
		cvs.ctx.fillRect(250, 80, 250, 25)
		// draw shape (moving clockwise)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(300, 50)
		cvs.ctx.lineTo(450, 50)
		cvs.ctx.lineTo(375, 179.9)
		// draw shape hole (moving counter clockwise)
		cvs.ctx.moveTo(375, 70)
		cvs.ctx.lineTo(350, 110)
		cvs.ctx.lineTo(400, 110)
		// set style and render
		cvs.ctx.fillStyle = 'rgb(145, 145, 145)'
		cvs.ctx.fill()
	},

	drawPath2d(cvs) {
		/**
		 * shapes can be stored as path2d objects
		 */
		// create a rectangle object to render
		const rectangle = new Path2D()
		rectangle.rect(50, 400, 50, 50)
		// create a cricular object to render
		const circle = new Path2D()
		circle.arc(50, 400, 25, 0, 2 * Math.PI)
		// set stroke/fill styles
		cvs.ctx.strokeStyle = 'rgb(20, 200, 20)'
		cvs.ctx.fillStyle = 'rgb(20, 200, 20)'
		// render the path2d objects
		cvs.ctx.stroke(rectangle)
		cvs.ctx.fill(circle)
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

export default lessons