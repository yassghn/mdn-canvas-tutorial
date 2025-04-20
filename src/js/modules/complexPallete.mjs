/**
 * complexPallete.mjs
 */

function getComplexePallete(xpos, ypos, drawFunc, clearFunc) {
	const complexPallete = {
		x: xpos,
		y: ypos,
		cleared: true,
		drawCallback: drawFunc,
		clearCallback: clearFunc,

		draw: function (enabled, cvs, previousTimestamp, timestamp) {
			if (enabled) {
				this.cleared = false
				this.drawCallback(cvs, previousTimestamp, timestamp)
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