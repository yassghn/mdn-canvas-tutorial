/**
 * effects.mjs
 */

import * as effectsModules from './effects/effect.mjs'

const effects = function() {
	const textEffects = {
		neonGlitch: () => effectsModules.neonGlitchText(),
		leftScroll: () => new effectsModules.ScrollingText()
	}

	const particleEffects = {
		spinningParticles: () => effectsModules.spinningParticles()
	}

	const shapeEffects = {
		ballTrail: () => effectsModules.ballTrail()
	}

	const effects = {
		get text() {
			return textEffects
		},

		get particles() {
			return particleEffects
		},

		get shapes() {
			return shapeEffects
		}
	}

	return effects
}

export default effects