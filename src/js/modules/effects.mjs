/**
 * effects.mjs
 */

import * as effectsModules from './effect.mjs'

const effects = function() {
	const textEffects = {
		neonGlitch: () => effectsModules.neonGlitchText(),
		leftScroll: () => new effectsModules.ScrollingText()
	}

	const particleEffects = {
		spinningParticles: () => effectsModules.spinningParticles()
	}

	const effects = {
		get text() {
			return textEffects
		},

		get particles() {
			return particleEffects
		}
	}

	return effects
}

export default effects