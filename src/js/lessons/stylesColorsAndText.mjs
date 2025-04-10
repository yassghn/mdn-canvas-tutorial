/**
 * stylesColorsAndText.mjs
 */

const stylesColorsAndText = {
	drawColors: function (cvs) {
		/**
		 * fillStyle and strokeStyle can be used to apply colors to shapes
		 *
		 * fillStyle is used to fill a shape with color
		 * strokeStyle is used to color a shapes outline
		 *
		 * default color is set to black
		 *
		 * these properties are not reset when drawing new shapes
		 *
		 * color is a string representing a css color, gradient object, or a pattern object
		 */

		// valid styles
		cvs.ctx.fillStyle = 'blue'
		cvs.ctx.fillStyle = '#ff3399'
		cvs.ctx.fillStyle = 'rgb(155 100 0)'
		// can add transparency percentage to rgb string
		cvs.ctx.fillStyle = 'rgb(255 165 230 / 100%)'
		// using commas displays the color in vscode source
		cvs.ctx.fillStyle = 'rgb(255, 165, 100)'

		// draw a 6x6 square color pallete
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 6; j++) {
				cvs.ctx.fillStyle = `rgb(${Math.floor(255 - 50 * i)} ${Math.floor(255 - 30 * j)} ${Math.floor(255 - 20 * (i+j)^2)})`
				cvs.ctx.fillRect((j * 25)+175, (i * 25)+350, 25, 25)
			}
		}

		// draw a 6x6 grid of circles
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 6; j++) {
				cvs.ctx.strokeStyle = `rgb(${Math.floor(255 - 40 * (i+j))} ${Math.floor(255 - 120 * j)} ${Math.floor(255 - 100 * (i+j)^2)})`
				cvs.ctx.beginPath()
				cvs.ctx.arc((j*25)+187.5, (i*25)+362.5, 10, 0, 2 * Math.PI, true)
				cvs.ctx.stroke()
			}
		}
	},

	drawTransparency: function (cvs) {
		/**
		 * transparency is done through globalAlpha property, or assigning semi-transparant colors to stroke/fill style
		 *
		 * globalAlpha = transparencyValue
		 * 	- 0.0 (fully transparent) to 1.0 (fully opaque)
		 *
		 * globalAlpha is more useful when drawing a lot of transparent shapes
		 * otherwise set transparent colors for individual shape
		 */

		// assigning transparent colors
		// can use 0.0-1.0 or 0%-100%
		cvs.ctx.strokeStyle = 'rgb(255 0 0 / 50%)'
		cvs.ctx.fillStyle = 'rgb(255 0 0 / 50%)'

		// draw four opaque squares with a set of semi transparent circles over them
		cvs.ctx.fillStyle = 'rgb(200, 100, 100)'
		cvs.ctx.fillRect(310, 510, 75, 75)
		cvs.ctx.fillStyle = 'rgb(100, 200, 200)'
		cvs.ctx.fillRect(385, 510, 75, 75)
		cvs.ctx.fillStyle = 'rgb(200, 100, 200)'
		cvs.ctx.fillRect(310, 585, 75, 75)
		cvs.ctx.fillStyle = 'rgb(250, 150, 150)'
		cvs.ctx.fillRect(385, 585, 75, 75)

		// set gransparency property
		cvs.ctx.globalAlpha = 0.2

		// draw semi cricles
		for (let i = 0; i < 7; i++) {
			cvs.ctx.beginPath()
			cvs.ctx.arc(385, 585, 10 + 10 * i, 0, Math.PI * 2, true)
			cvs.ctx.fill()
		}

		// reset global alpha
		cvs.ctx.globalAlpha = 1.0

		// draw four rectangles with increasing opacity
		cvs.ctx.fillStyle = 'rgb(200, 100, 100)'
		cvs.ctx.fillRect(569, 14, 150, 37.5)
		cvs.ctx.fillStyle = 'rgb(100, 200, 200)'
		cvs.ctx.fillRect(569, 51.5, 150, 37.5)
		cvs.ctx.fillStyle = 'rgb(200, 100, 200)'
		cvs.ctx.fillRect(569, 89, 150, 37.5)
		cvs.ctx.fillStyle = 'rgb(250, 150, 150)'
		cvs.ctx.fillRect(569, 126.5, 150, 37.5)

		for (let i = 0; i < 10; i++) {
			// semi transparent to fully opaque white
			// using rgb for opacity
			cvs.ctx.fillStyle = `rgb(255 255 255 / ${(i + 1) / 10})`
			for (let j = 0; j < 4; j++) {
				cvs.ctx.fillRect((5 + i * 14) + 569, (5 + j * 37.5) + 14, 14, 27.5)
			}
		}
	},

	drawLineStyles: function (cvs, lineDashOffset) {
		/**
		 * lines have several properties which style them
		 *
		 * lineWidth
		 * 	- width of lines
		 * lineCap
		 * 	- appearnace of ends of lines
		 * lineJoin
		 * 	- appearance of corners where lines connect
		 * miterLimit
		 * 	- set limit on miter when two lines join at a sharp angle
		 * 	  allows to set how thick the junction gets
		 * getLineDash()
		 * 	- return line dash pattern array, contains an even number of non-negative numbers
		 * setLineDash()
		 * 	- sets a line dash pattern
		 * lineDashOffset
		 * 	- specifies where to start a dash array on a line
		 */

		/**
		 * lineWidth
		 *	- defaults to 1.0, must be positive number
		 *
		 * NOTES:
		 * obtaining crisp lines
		 * 	- odd-integer-width thickness lines get drawn between two unit grid sections.
		 * 	  half way between. resulting in unclear lines. can adjust lines with decimals.
		 *  - even-width lines, so don't draw them with decimals.
		 *  * helps to ensure scalable 2d graphics look correct regardless of scaling or other
		 *    transforms
		 */
		for (let i = 0; i < 10; i++) {
			cvs.ctx.lineWidth = 1 + i
			cvs.ctx.strokeStyle = 'rgb(0, 175, 175)'
			cvs.ctx.beginPath()
			cvs.ctx.moveTo(550 + i * 14, 200)
			cvs.ctx.lineTo(550 + i * 14, 335)
			cvs.ctx.stroke()
		}

		// reset lineWidth
		cvs.ctx.lineWidth = 1.0

		/**
		 * lineCap
		 * 	- butt, round, square
		 * 	- default is butt
		 *
		 * butt
		 * 	- ends of lines are squared off at endpoints
		 * round
		 * 	- ends of lines are rounded (passed end point)
		 * square
		 * 	- ends of lines are squared off passed end point
		 */

		// draw horizontal guides (shows passed or at end point)
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(700, 200)
		cvs.ctx.lineTo(830, 200)
		cvs.ctx.moveTo(700, 330)
		cvs.ctx.lineTo(830, 330)
		cvs.ctx.stroke()

		// draw verticle lines
		const lineCaps = ['butt', 'round', 'square']
		lineCaps.forEach((lineCap, i) => {
			cvs.ctx.lineWidth = 15
			cvs.ctx.lineCap = lineCap
			cvs.ctx.beginPath()
			cvs.ctx.moveTo(715 + i * 50, 200)
			cvs.ctx.lineTo(715 + i * 50, 330)
			cvs.ctx.stroke()
		})

		// reset lineWidth and lineCap
		cvs.ctx.lineWidth = 1.0
		cvs.ctx.lineCap = 'butt'

		/**
		 * lineJoin
		 * 	- round, bevel, miter
		 *  - default is miter
		 * 	- sets whether the tips of peaks and valleys of angled joins
		 *    should be rounded, falattened, or pointed
		 *
		 * round
		 * 	- rounds off "corners"
		 * bevel
		 * 	- flattens "corners"
		 * miter
		 * 	- pointed "corners"
		 *
		 */

		const lineJoins = ['round', 'bevel', 'miter']
		lineJoins.forEach((lineJoin, i) => {
			cvs.ctx.lineWidth = 10
			cvs.ctx.lineJoin = lineJoin
			cvs.ctx.beginPath()
			cvs.ctx.moveTo(840, 200 + i * 40)
			cvs.ctx.lineTo(880, 240 + i * 40)
			cvs.ctx.lineTo(920, 200 + i * 40)
			cvs.ctx.lineTo(960, 240 + i * 40)
			cvs.ctx.lineTo(1000, 200 + i * 40)
			cvs.ctx.stroke()
		})

		// reset lineWidth and lineJoin
		cvs.ctx.lineWidth = 1.0
		cvs.ctx.lineJoin = 'miter'

		/**
		 * miterLimit
		 * 	- increases and decrases the size of peaks and valleys from
		 * 	  sharply angled connecting lines. "maximum allowed ratio of the extension length"
		 *  - max miterLength / lineWidth = 1 / sin ( min θ / 2 )
		 * 	- default miter limit = 10.0, strip all miters of shar angles below ~11 degrees
		 * 	- miter limit ~1.4... strips miters for all acute angles, keeping miter joins only for obtuse or right angles
		 *  - 1.0 miter limit disables all miters
		 * 	- values below 1.0 are invalid
		 *
		 */

		// draw guides
		cvs.ctx.lineWidth = 2
		cvs.ctx.strokeRect(1040, 200, 160, 50)

		// get miterlimit value from web component
		const miterInput = document.getElementById('miterLimit')
		if (miterInput.checkValidity()) {
			cvs.ctx.miterLimit = parseFloat(miterInput.value)
		} else {
			cvs.ctx.miterLimit = 10
		}

		// draw lines
		cvs.ctx.lineWidth = 10
		cvs.ctx.beginPath()
		cvs.ctx.moveTo(1045, 200)
		for (let i = 0; i < 24; i++) {
			const dy = i % 2 === 0 ? 25 : -25
			cvs.ctx.lineTo(1040 + Math.pow(i, 1.5) * 2, 225 + dy)
		}
		cvs.ctx.stroke()

		// reset lineWidth and miterLimit
		cvs.ctx.lineWidth = 1.0
		cvs.ctx.miterLimit = 10.0

		/**
		 * setLineDash/lineDashOffset
		 * 	- specify dash patterns for lines
		 *
		 * setLineDash(...)
		 * 	- function arguments are a list of numbers that specify distances
		 * 	  to alternately draw lines
		 * lineDashOffset
		 * 	- this property determines where to begin the pattern
		 */

		// create "marching ants" effect
		cvs.ctx.clearRect(750, 15, 100, 100)
		cvs.ctx.setLineDash([4, 2])
		cvs.ctx.lineDashOffset = -lineDashOffset
		cvs.ctx.strokeRect(750, 15, 100, 100)

		// reset linedash and offset
		cvs.ctx.setLineDash([])
		cvs.ctx.lineDashOffset = 0
	},

	drawGradients: function (cvs) {
		/**
		 * shapes can be filled/stroked with linear, radial, and conic gradients using canvas gradient objects.
		 *
		 * createLinearGradient(x1, y1, x2, y2)
		 * 	- create linear gradient starting at point (x1, y1) ending at (x2, y2)
		 * createRadialGradient(x1, y1, r1, x2, y2, r2)
		 * 	- create radial gradient. parameters represent two circles.
		 * 	  one circle with a center at (x1, y1) with radius of r1
		 *    second circle with center at (x2, y2) with radius of r2
		 * createConicGradient(angle, x, y)
		 * 	- creates a conic gradient object with a starting angle (in radians) at position (x, y)
		 *  - conic gradient circles around a single point
		 *
		 * these methods create a CanvasGradient object which can be assigned colors using addColorStop(...)
		 * gradient.addColorStop(position, color)
		 * 	- creates a new color stop on gradient object. position is a number between 0.0 and 1.0
		 *    and defines the relative position of the color in the gradient.
		 *    color argument is a regular css string color.
		 *  - can add as many color stops to a gradient object as you need
		 */

		// linear gradient
		const linearGradient = cvs.ctx.createLinearGradient(150, 700, 150, 840)
		linearGradient.addColorStop(0, 'rgb(25, 125, 225)')
		// two colors at the same position make very sharp color transitions
		linearGradient.addColorStop(0.5, 'rgb(175, 50, 175)')
		linearGradient.addColorStop(0.5, 'rgb(25, 225, 25)')
		linearGradient.addColorStop(1, 'rgb(230, 230, 35)')

		const linearGradient2 = cvs.ctx.createLinearGradient(190, 740, 190, 790)
		linearGradient2.addColorStop(0.5, 'rgb(1, 1, 1)')
		linearGradient2.addColorStop(1, 'rgb(0 0 0 / 0%)')

		// assign gradients to fill/stroke styles
		cvs.ctx.fillStyle = linearGradient
		cvs.ctx.strokeStyle = linearGradient2

		// draw shapes
		cvs.ctx.fillRect(150, 700, 130, 130)
		cvs.ctx.strokeRect(190, 740, 50, 50)

		// radial gradients
		// set x y coords
		let x = 300
		let y = 700

		// create radial gradients
		const radialGradient = cvs.ctx.createRadialGradient(x + 45, y + 45, 10, x + 52, y + 50, 30)
		radialGradient.addColorStop(0, 'rgb(25, 172, 152)')
		radialGradient.addColorStop(0.9, 'rgb(138, 64, 207)')
		radialGradient.addColorStop(1, 'rgb(161 83 142 / 0%)')

		const radialGradient2 = cvs.ctx.createRadialGradient(x + 105, y + 105, 20, x + 112, y + 120, 50)
		radialGradient2.addColorStop(0, 'rgb(25, 172, 152)')
		radialGradient2.addColorStop(0.75, 'rgb(138, 64, 207)')
		radialGradient2.addColorStop(1, 'rgb(161 83 142 / 0%)')

		const radialGradient3 = cvs.ctx.createRadialGradient(x + 95, y + 15, 15, x + 102, y + 20, 40)
		radialGradient3.addColorStop(0, 'rgb(25, 172, 152)')
		radialGradient3.addColorStop(0.8, 'rgb(138, 64, 207)')
		radialGradient3.addColorStop(1, 'rgb(161 83 142 / 0%)')

		const radialGradient4 = cvs.ctx.createRadialGradient(x, y + 150, 50, x, y + 140, 90)
		radialGradient4.addColorStop(0, 'rgb(25, 172, 152)')
		radialGradient4.addColorStop(0.8, 'rgb(138, 64, 207)')
		radialGradient4.addColorStop(1, 'rgb(161 83 142 / 0%)')

		// draw shapes
		cvs.ctx.fillStyle = radialGradient4
		cvs.ctx.fillRect(x, y, 150, 150)
		cvs.ctx.fillStyle = radialGradient3
		cvs.ctx.fillRect(x, y, 150, 150)
		cvs.ctx.fillStyle = radialGradient2
		cvs.ctx.fillRect(x, y, 150, 150)
		cvs.ctx.fillStyle = radialGradient
		cvs.ctx.fillRect(x, y, 150, 150)

		// conic gradient
		// set base x y coords
		x = 460
		y = 700

		// create conic gradients
		const conicGradient = cvs.ctx.createConicGradient(2, x + 62, y + 75)
		conicGradient.addColorStop(0, 'rgb(243, 148, 38)')
		conicGradient.addColorStop(1, 'rgb(243, 240, 54)')

		const conicGradient2 = cvs.ctx.createConicGradient(0, x + 187, y + 75)
		conicGradient2.addColorStop(0, 'rgb(243, 148, 38)')
		conicGradient2.addColorStop(0.25, 'rgb(243, 240, 54)')
		conicGradient2.addColorStop(0.25, 'rgb(243, 148, 38)')
		conicGradient2.addColorStop(0.5, 'rgb(243, 240, 54)')
		conicGradient2.addColorStop(0.5, 'rgb(243, 148, 38)')
		conicGradient2.addColorStop(0.75, 'rgb(243, 240, 54)')
		conicGradient2.addColorStop(0.75, 'rgb(243, 148, 38)')
		conicGradient2.addColorStop(1, 'rgb(243, 240, 54)')

		// draw shapes
		cvs.ctx.fillStyle = conicGradient
		cvs.ctx.fillRect(x + 12, y + 25, 100, 100)
		cvs.ctx.fillStyle = conicGradient2
		cvs.ctx.fillRect(x + 137, y + 25, 100, 100)
	},

	drawPatterns: function (cvs) {

	},

	colors: false,
	transparency: false,
	lineStyles: false,
	gradients: false,
	patterns: false
}

export default stylesColorsAndText