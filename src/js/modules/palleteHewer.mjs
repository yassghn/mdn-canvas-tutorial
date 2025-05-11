/**
 * palleteHewer.mjs
 */

import basicDrawingAndShapes from '../lessons/basicDrawingAndShapes.mjs'
import stylesColorsAndText from '../lessons/stylesColorsAndText.mjs'
import clippingAndAnimations from '../lessons/clippingAndAnimations.mjs'
import hewComplexePallete from './complexPallete.mjs'
import { getBall, getSword } from './render.mjs'
import effects from './effects.mjs'
import imageDataAndOptimization from '../lessons/imageDataAndOptimization.mjs'

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
	accelerationPallete: null,
	colorPickerPallete: null
}

/**
 * @typedef _palleteStruct
 * @type {object} pallete structure
 * @property {function} render render function
 * @property {boolean} complex complex pallete flag
 * @property {object} vars object containing pallete specific variables
 * @property {object[]} args rest/spread args for render
 */
const _palleteStruct = {
	render: null,
	complex: false,
	vars: null,
	args: []
}

/**
 * 
 * @param {_palleteStruct} palleteStruct
 * @returns initialized pallete object
 */
function buildPallete(palleteStruct) {
	// init return
	let pallete = null
	// init struct: set default values, then overwrite with param
	const struct = { ..._palleteStruct, ...palleteStruct }

	// complex pallete
	if (palleteStruct.complex) {
		// build complex pallete
		pallete = hewComplexePallete(struct.render, ...struct.args)
		// check if we're setting vars
		if (struct.vars) {
			pallete.varsObj = { ...struct.vars }
		}
	} else {
		// non complex pallete
	}

	return pallete
}

function _initPalletes() {
	// init return
	const palletes = { ..._palletes }

	// init effects
	const efx = effects()
	const neonGlitch = efx.text.neonGlitch()
	const scrollLeft = efx.text.leftScroll()
	const mouseFollowParticles = efx.particles.spinningParticles()

	// bezier and quadratic curves
	palletes.bezierAndQuadraticCurvesPallete = buildPallete({
		render: basicDrawingAndShapes.drawBezierAndQuadraticCurves,
		complex: true,
		args: [scrollLeft]
	})

	// line styles
	palletes.lineStylesPallete = buildPallete({
		render: stylesColorsAndText.drawLineStyles,
		complex: true,
		vars: {
			delay: 15,
			lineDashOffset: 0,
			lineStylesLastDraw: 0
		}
	})

	// shadows
	palletes.shadowsPallete = buildPallete({
		render: stylesColorsAndText.drawShadows,
		complex: true,
		vars: {
			shadowDelay: 122,
			shadowsLastDraw: 0
		},
		args: [neonGlitch]
	})

	// clipping paths
	palletes.clippingPathsPallete = buildPallete({
		render: clippingAndAnimations.drawClippingPaths,
		complex: true
	})

	// inverse clipping paths
	palletes.inverseClippingPathsPallete = buildPallete({
		render: clippingAndAnimations.drawInverseClippingPaths,
		complex: true
	})

	// looping panorama
	palletes.loopingPanoramaPallete = buildPallete({
		render: clippingAndAnimations.drawLoopingPanorama,
		complex: true,
		vars: {
			loopingPanoramaTimestamp: 0,
			loopingPanoramaImageX: 0
		}
	})

	// clock
	palletes.clockPallete = buildPallete({
		render: clippingAndAnimations.drawClock,
		complex: true
	})

	// mouse follow
	palletes.mouseFollowingPallete = buildPallete({
		render: clippingAndAnimations.drawMouseFollowing,
		complex: true,
		args: [mouseFollowParticles]
	})

	// boundaries
	palletes.boundariesPallete = buildPallete({
		render: clippingAndAnimations.drawBoundaries,
		complex: true,
		vars: {
			sword: getSword()
		}
	})

	// acceleration
	palletes.accelerationPallete = buildPallete({
		render: clippingAndAnimations.drawAcceleration,
		complex: true,
		vars: {
			ball: getBall(),
			ballTrail: effects().shapes.ballTrail(),
		}
	})

	// color picker
	palletes.colorPickerPallete = buildPallete({
		render: imageDataAndOptimization.drawColorPicker,
		complex: true,
		vars: {
			lastDraw: null,
			delay: 400,
			hoverColor: 'rgb(0, 0, 0 / 1%)',
			selectedColor: null
		}
	})

	return palletes
}

function palleteHewer() {
	const palletes = _initPalletes()
	return palletes
}

export default palleteHewer