/**
 * complexPallete.mjs
 */

export function renderComplexPallete(pallete, enabled, cvs, ...args) {
	if (enabled) {
		if (pallete.vars) {
			pallete.drawCallback(cvs, pallete.vars, ...args, ...pallete.args)
		} else {
			pallete.drawCallback(cvs, ...args, ...pallete.args)
		}
	}
}

function hewComplexePallete(drawFunc, ...args) {
	const complexPallete = {
		drawCallback: drawFunc,
		args: [...args],

		set varsObj(vars) {
			this.vars = { ...vars }
		}
	}
	return complexPallete
}

export default hewComplexePallete