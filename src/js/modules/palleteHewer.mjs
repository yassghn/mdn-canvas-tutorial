/**
 * palleteHewer.mjs
 */

import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'
import clippingAndAnimations from '../lessons/clippingAndAnimations.mjs'
import hewComplexePallete from './complexPallete.mjs'
import { getBall, getSword } from './render.mjs'
import effects from './effects.mjs'

const _palletes = {
	bezierAndQuadraticCurvesPallete: null,
	clippingPathsPallete: null,
	inverseClippingPathsPallete: null,
	loopingPanoramaPallete: null,
	lineStylesPallete: null,
	shadowsPallete: null,
	clockPallete: null,
	mouseFollowingPallete: null,
	boundariesPallete: null,
	accelerationPallete: null
}

function _initPalletes() {
	const palletes = { ..._palletes }
	// init effects
	const efx = effects()
	const neonGlitch = efx.text.neonGlitch()
	const scrollLeft = efx.text.leftScroll()
	const mouseFollowParticles = efx.particles.spinningParticles()
	// bezier and quadratic curves
	palletes.bezierAndQuadraticCurvesPallete = hewComplexePallete(basicDrawingAndShapes.drawBezierAndQuadraticCurves, scrollLeft)
	// line styles
	palletes.lineStylesPallete = hewComplexePallete(stylesColorsAndText.drawLineStyles)
	palletes.lineStylesPallete.varsObj = {
		delay: 15,
		lineDashOffset: 0,
		lineStylesLastDraw: 0
	}
	// shadows
	palletes.shadowsPallete = hewComplexePallete(stylesColorsAndText.drawShadows, neonGlitch)
	palletes.shadowsPallete.varsObj = {
		shadowDelay: 122,
		shadowsLastDraw: 0
	}
	// clipping paths
	palletes.clippingPathsPallete = hewComplexePallete(clippingAndAnimations.drawClippingPaths)
	// inverse clipping paths
	palletes.inverseClippingPathsPallete = hewComplexePallete(clippingAndAnimations.drawInverseClippingPaths)
	// looping panorama
	palletes.loopingPanoramaPallete = hewComplexePallete(clippingAndAnimations.drawLoopingPanorama)
	palletes.loopingPanoramaPallete.varsObj = {
		loopingPanoramaTimestamp: 0,
		loopingPanoramaImageX: 0
	}
	// clock
	palletes.clockPallete = hewComplexePallete(clippingAndAnimations.drawClock)
	// mouse follow
	palletes.mouseFollowingPallete = hewComplexePallete(clippingAndAnimations.drawMouseFollowing, mouseFollowParticles)
	// boundaries
	palletes.boundariesPallete = hewComplexePallete(clippingAndAnimations.drawBoundaries)
	palletes.boundariesPallete.varsObj = {
		sword: getSword()
	}
	// acceleration
	palletes.accelerationPallete = hewComplexePallete(clippingAndAnimations.drawAcceleration)
	palletes.accelerationPallete.varsObj = {
		ball: getBall(),
		ballTrail: effects().shapes.ballTrail(),
	}
	return palletes
}

function palleteHewer() {
	const palletes = _initPalletes()
	return palletes
}

export default palleteHewer