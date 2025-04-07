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
		cvs.ctx.fillStyle = "blue"
		cvs.ctx.fillStyle = "#ff3399"
		cvs.ctx.fillStyle = "rgb(155 100 0)"
		// can make calculations within rgb string
		cvs.ctx.fillStyle = "rgb(255 165 230/23)"
		// using commas displays the color in vscode source
		cvs.ctx.fillStyle = "rgb(255, 165, 100)"

		// draw a 6x6 square color pallete
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 6; j++) {
				cvs.ctx.fillStyle = `rgb(${Math.floor(255 - 50 * i)} ${Math.floor(255 - 30 * j)} ${Math.floor(255 - 20 * (i+j)^2)})`
				cvs.ctx.fillRect((j * 25)+400, (i * 25)+400, 25, 25)
			}
		}

		// draw a 6x6 grid of circles
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 6; j++) {
				cvs.ctx.strokeStyle = `rgb(${Math.floor(255 - 40 * (i+j))} ${Math.floor(255 - 120 * j)} ${Math.floor(255 - 100 * (i+j)^2)})`
				cvs.ctx.beginPath()
				cvs.ctx.arc((j*25)+412.5, (i*25)+412.5, 10, 0, 2 * Math.PI, true)
				cvs.ctx.stroke()
			}
		}
	},

	colors: false
}

export default stylesColorsAndText