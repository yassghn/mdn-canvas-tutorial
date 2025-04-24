/**
 * effects.mjs
 */

import * as effectsModules from './effect.mjs'

const effects = function() {
	const textEffects = {
		neonGlitch: () => effectsModules.neonGlitchText(),
		leftScroll: () => new effectsModules.ScrollingText()
	}

	const effects = {
		get text() {
			return textEffects
		}
	}

	return effects
}

export default effects