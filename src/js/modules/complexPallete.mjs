/**
 * complexPallete.mjs
 */

function hewComplexePallete(drawFunc, ...args) {
	const complexPallete = {
		drawCallback: drawFunc,
		args: [...args],

		render: function (enabled, cvs, ...args) {
			if (enabled) {
				this.drawCallback(cvs, ...args, ...this.args)
			}
		}
	}
	return complexPallete
}

export default hewComplexePallete