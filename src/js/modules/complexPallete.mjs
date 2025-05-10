/**
 * complexPallete.mjs
 */

function getComplexePallete(drawFunc) {
	const complexPallete = {
		drawCallback: drawFunc,

		render: function (enabled, cvs, ...args) {
			if (enabled) {
				this.drawCallback(cvs, ...args)
			}
		}
	}
	return complexPallete
}

export default getComplexePallete