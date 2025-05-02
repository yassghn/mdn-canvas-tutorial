/**
 * spinningParticlesEffect.mjs
 */

import ContextProperties from './ContextProperties.mjs'
import ContextState from './ContextState.mjs'
import pointer from './pointer.mjs'
import { generateColor } from './math.mjs'

const _effectProps = {
	ctx: undefined,
	amount: undefined,
	coords: undefined,
	trailWidth: undefined,
	rotationSpeed: undefined
}

function _reduceRadius(radius) {
	let r = radius
	const dA1 = .2
	const dB1 = .1
	if ((radius > 1) && (radius - dA1) > 0) {
		r -= dA1
	} else if (((radius - 1) <= 0) && (radius - dB1) > 0) {
		r -= dB1
	}
	return r
}

function _renderParticleTrail(ctx, pCoords, lc, color, radius, theta, t, rotationSpeed) {
	let nTheta = theta
	const nextCoords = { ...lc }
	const ctxProps = new ContextProperties()
	ctxProps.fillStyle = color
	const ctxState = new ContextState(ctx, ctxProps)
	ctxState.apply((ctx, _coords, _pCoords, _lc, _radius, _nTheta, _rts) => {
		let r = _radius
		for (let i = 0; i < 20; i++) {
			r = _reduceRadius(r)
			// keep speed the same
			_nTheta += _rts
			// - or + ?
			_coords.x = lc.x + Math.sin(Math.abs(_nTheta)) * t
			_coords.y = lc.y + Math.cos(Math.abs(_nTheta)) * t
			ctx.beginPath()
			ctx.arc(_coords.x, _coords.y, r, 0, 2 * Math.PI)
			ctx.fill()
		}
	}, nextCoords, pCoords, lc, radius, nTheta, rotationSpeed)
}

/* function _renderParticleTrail(particle, lc) {
	const ctx = particle.ctx
	//const defaultCoords = { ...particle.coords }
	const coords = { ...particle.coords }
	const rts = particle.rotationSpeed
	const color = particle.color
	const theta = particle.theta
	const t = particle.t
	const radius = particle.radius

	// update rotation values
	//theta += rts
	// swap sin/cos reverses direction
	coords.x = lc.x + Math.sin(theta) * t
	coords.y = lc.y + Math.cos(theta) * t

	const ctxProps = new ContextProperties()
	ctxProps.fillStyle = color
	const ctxState = new ContextState(ctx, ctxProps)

	ctxState.apply((_ctx, _coords, _lc, _radius, _theta, _rts, _t) => {
		let r = _radius
		for (let i = 0; i < 20; i++) {
			r = _reduceRadius(r)
			//_theta += _rts
			// - or + ?
			_coords.x = _lc.x + Math.sin(_theta) * _t
			_coords.y = _lc.y + Math.cos(_theta) * _t
			ctx.beginPath()
			ctx.arc(_coords.x, _coords.y, r, 0, 2 * Math.PI)
			ctx.fill()
		}
	}, ctx, coords, lc, radius, theta, rts, t)
}

function _renderParticleTrails(particles, lcs) {
	particles.forEach((particle, index) => {
		_renderParticleTrail(particle, lcs[index])
	})
} */

function _renderParticle(ctx, coords, color, radius) {
	const ctxProps = new ContextProperties()
	ctxProps.fillStyle = color
	const ctxState = new ContextState(ctx, ctxProps)
	ctxState.apply((ctx, coords) => {
		ctx.beginPath()
		ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI)
		ctx.fill()
	}, coords)
}

function _Particle(props, color) {
	this.ctx = props.ctx
	this.defaultCoords = { ...props.coords }
	this.coords = { ...props.coords }
	this.trailWidth = props.trailWidth
	this.rotationSpeed = props.rotationSpeed
	this.color = color
	this.theta = Math.random() * Math.PI * 2
	this.st = this.theta
	this.t = Math.random() * 150
	this.radius = Math.floor(Math.random() * (5 - 2) + 2)

	// rotate particles
	const _rotate = () => {
		// get pointer state
		const pointerState = pointer()
		// keep track of last center used
		const lastCenter = {
			x: -1,
			y: -1
		}
		// if pointer is in window, grab coords
		if (pointerState.inWindow) {
			lastCenter.x = pointerState.coords.x
			lastCenter.y = pointerState.coords.y
		} else {
			// pointer out of window, snap back to default coords
			lastCenter.x = this.defaultCoords.x
			lastCenter.y = this.defaultCoords.y
		}
		// update rotation values
		this.theta += this.rotationSpeed
		// swap sin/cos reverses direction
		this.coords.x = lastCenter.x + Math.sin(this.theta) * this.t
		this.coords.y = lastCenter.y + Math.cos(this.theta) * this.t
		// return last center
		return lastCenter
	}

	this.render = () => {
		// track previous coords
		const prevCoords = { ...this.nextCoords }
		// rotate particles
		const lc = _rotate()
		// draw
		_renderParticleTrail(this.ctx, prevCoords, lc, this.color, this.radius, this.theta, this.t, this.rotationSpeed)
		_renderParticle(this.ctx, this.coords, this.color, this.radius)
		return lc
	}
}

function _ParticleGenerator(props) {
	const _particles = []

	const _init = (props) => {
		// generate x amount of particles
		for (let i = 0; i < props.amount; i++) {
			// get new color
			const color = generateColor()
			// create particle
			_particles.push(new _Particle(props, color))
		}
	}

	this.render = () => {
		let lcs = []
		//_renderParticleTrails(_particles, lcs)
		_particles.forEach((particle) => { lcs.push(particle.render()) })
	}

	_init(props)
}

function _isValidProps(props) {
	// check properties were correctly set
	for (const prop in _effectProps) {
		if (!props[prop]) {
			const str = `invalid effects property value: ${prop}:${props[prop]}`
			throw new ReferenceError(str)
		}
	}
	return true
}

function _render(effect) {
	// initialize particle generator
	if (!effect._particleGenerator) {
		effect._particleGenerator = new _ParticleGenerator(effect)
	}

	effect._particleGenerator.render()
}

function spinningParticlesEffect() {
	const effect = {
		..._effectProps,

		_particleGenerator: undefined,

		render: function () {
			// pass this as object self. this keyword is not an object.
			const self = this
			// check properties are valid
			if (_isValidProps(self)) {
				_render(self)
			}
		}
	}

	return effect
}

export default spinningParticlesEffect