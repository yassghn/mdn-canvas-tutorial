/**
 * complexPallete.mjs
 */

export function renderComplexPallete(pallete, enabled, cvs, ...args) {
	if (enabled) {
		if (pallete.vars) {
			pallete.renderCallback(cvs, pallete.vars, ...args, ...pallete.args)
		} else {
			pallete.renderCallback(cvs, ...args, ...pallete.args)
		}
	}
}

function hewComplexePallete(renderFunc, ...args) {
	const complexPallete = {
		renderCallback: renderFunc,
		args: [...args],

		set varsObj(vars) {
			this.vars = { ...vars }
		}
	}
	return complexPallete
}

export default hewComplexePallete