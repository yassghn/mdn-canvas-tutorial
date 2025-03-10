/**
 * lessons.mjs
 */

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

	simpleExample: false,
	rectangularShape: false,
	triangleShapeAndPaths: false,
	movingThePen: false,
	lines: false,
	arcs: false
}

export default lessons