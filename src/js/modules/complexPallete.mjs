/**
 * complexPallete.mjs
 */

function getComplexePallete(xpos, ypos, drawFunc, clearFunc, clear = false) {
	const complexPallete = {
		x: xpos,
		y: ypos,
		cleared: true,
		clearEveryDraw: clear,
		drawCallback: drawFunc,
		clearCallback: clearFunc,

		render: function (enabled, cvs, ...args) {
			if (enabled) {
				this.cleared = false
				if (this.clearEveryDraw) {
					this.clearCallback(this.x, this.y, cvs)
				}
				this.drawCallback(cvs, ...args)
			} else {
				if (!this.cleared) {
					this.cleared = true
					this.clearCallback(this.x, this.y, cvs)
				}
			}
		}
	}
	return complexPallete
}

export default getComplexePallete