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
				cvs.ctx.fillRect((j * 25)+375, (i * 25)+400, 25, 25)
			}
		}

		// draw a 6x6 grid of circles
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 6; j++) {
				cvs.ctx.strokeStyle = `rgb(${Math.floor(255 - 40 * (i+j))} ${Math.floor(255 - 120 * j)} ${Math.floor(255 - 100 * (i+j)^2)})`
				cvs.ctx.beginPath()
				cvs.ctx.arc((j*25)+387.5, (i*25)+412.5, 10, 0, 2 * Math.PI, true)
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
		cvs.ctx.fillRect(500, 500, 75, 75)
		cvs.ctx.fillStyle = 'rgb(100, 200, 200)'
		cvs.ctx.fillRect(575, 500, 75, 75)
		cvs.ctx.fillStyle = 'rgb(200, 100, 200)'
		cvs.ctx.fillRect(500, 575, 75, 75)
		cvs.ctx.fillStyle = 'rgb(250, 150, 150)'
		cvs.ctx.fillRect(575, 575, 75, 75)

		// set gransparency property
		cvs.ctx.globalAlpha = 0.2

		// draw semi cricles
		for (let i = 0; i < 7; i++) {
			cvs.ctx.beginPath()
			cvs.ctx.arc(575, 575, 10 + 10 * i, 0, Math.PI * 2, true)
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
			cvs.ctx.moveTo(5 + i * 14, 200)
			cvs.ctx.lineTo(5 + i * 14, 335)
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

	},

	colors: false,
	transparency: false,
	lineStyles: false,
	gradients: false
}

export default stylesColorsAndText