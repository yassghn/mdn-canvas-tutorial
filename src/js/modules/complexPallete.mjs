/**
 * complexPallete.mjs
 */

function getComplexePallete(drawFunc, ...args) {
	const complexPallete = {
		drawCallback: drawFunc,
		args: [...args],

		render: function (enabled, cvs, ...args) {
			if (enabled) {
				this.drawCallback(cvs, ...this.args, ...args)
			}
		}
	}
	return complexPallete
}

export default getComplexePallete