/**
 * spinningParticlesEffect.mjs
 */

import ContextProperties from '../ContextProperties.mjs'
import ContextState from '../ContextState.mjs'
import pointer from '../pointer.mjs'
import { generateColor } from '../math.mjs'

const _effectProps = {
	ctx: undefined,
	amount: undefined,
	coords: undefined,
	rotationSpeed: undefined
}

function _reduceRadius(pRadius, radius) {
	const delta = (Math.PI * (pRadius / 180))
	const r = radius - delta
	return r
}

function _renderParticleTrail(particle, lc) {
	const ctx = particle.ctx
	//const defaultCoords = { ...particle.coords }
	const coords = { ...particle.coords }
	const rts = particle.rotationSpeed
	const color = particle.color
	const theta = particle.theta
	const t = particle.t
	const radius = particle.radius

	// swap sin/cos spins counter clockwise
	coords.x = lc.x + Math.sin(theta) * t
	coords.y = lc.y + Math.cos(theta) * t

	const ctxProps = new ContextProperties()
	ctxProps.fillStyle = color
	ctxProps.globalAlpha = .13
	const ctxState = new ContextState(ctx, ctxProps)

	ctxState.apply((_ctx, _coords, _lc, _radius, _theta, _rts, _t) => {
		let r = _radius
		// get max trail
		const repeat = Math.floor((_radius * (Math.PI * 2))) - 1
		// calculate global alpha delta
		const dGlobalAlpha = Number(_ctx.globalAlpha / repeat).toFixed(4)
		// generate x amount of extra particles "trailing" behind
		for (let i = 0; i < repeat; i++) {
			// reduce radius of each "extra particle" i.e. trail
			r = _reduceRadius(_radius, r)
			// - or + ?
			// need theta update here to properly trail
			// subtracting rotation speed inverts the trail
			_theta -= _rts
			_coords.x = _lc.x + Math.cos(_theta) * _t
			_coords.y = _lc.y + Math.sin(_theta) * _t
			// render
			_ctx.beginPath()
			_ctx.arc(_coords.x, _coords.y, r, 0, 2 * Math.PI)
			_ctx.fill()
			// update global alpha
			_ctx.globalAlpha -= dGlobalAlpha
		}
	}, coords, lc, radius, theta, rts, t)
}

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
	this.rotationSpeed = props.rotationSpeed
	this.color = color
	this.theta = Math.random() * Math.PI * 2
	this.st = this.theta
	this.radius = Math.floor(Math.random() * (7 - 4) + 4)
	this.t = (Math.random() * (150 - (this.radius + 7)) + (this.radius + 7))

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
		this.coords.x = lastCenter.x + Math.cos(this.theta) * this.t
		this.coords.y = lastCenter.y + Math.sin(this.theta) * this.t
		// return last center
		return lastCenter
	}

	this.render = () => {
		// track previous coords
		const prevCoords = { ...this.nextCoords }
		// rotate particles
		const lc = _rotate()
		// render
		const self = this
		_renderParticleTrail(self, lc)
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
		_particles.forEach((particle) => { particle.render() })
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