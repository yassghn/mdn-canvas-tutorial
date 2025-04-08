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

	drawLineStyles: function (cvs) {

	},

	colors: false,
	transparency: false,
	lineStyles: false
}

export default stylesColorsAndText