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
	globalAlpha: undefined,
	trailWidth: undefined,
	rotationSpeed: undefined
}

function _Particle(props, color) {
	this.ctx = props.ctx
	this.defaultCoords = { ...props.coords }
	this.nextCoords = { ...props.coords }
	this.globalAlpha = props.globalAlpha
	this.trailWidth = props.trailWidth
	this.rotationSpeed = props.rotationSpeed
	this.color = color
	this.theta = Math.random() * Math.PI * 2
	this.t = Math.random() * 150

	// rotate particles
	const _rotate = () => {
		// get pointer state
		const pointerState = pointer()
		// if pointer is in window, grab coords
		let x = -1
		let y = -1
		if (pointerState.inWindow) {
			x = pointerState.coords.x
			y = pointerState.coords.y
		} else {
			// pointer out of window, snap back to default coords
			x = this.defaultCoords.x
			y = this.defaultCoords.y
		}
		// update rotation values
		this.theta += this.rotationSpeed
		this.nextCoords.x = x + Math.cos(this.theta) * this.t
		this.nextCoords.y = y + Math.sin(this.theta) * this.t
	}

	this.render = () => {
		// track previous coords
		const prevCoords =  { ...this.nextCoords }
		// rotate particles
		_rotate()
		// draw
		const ctxProps = new ContextProperties()
		ctxProps.globalAlpha = this.globalAlpha
		ctxProps.lineWidth = this.trailWidth
		ctxProps.strokeStyle = this.color
		const ctxState = new ContextState(this.ctx, ctxProps)
		ctxState.apply((ctx, prevCoords, nextCoords) => {
			ctx.beginPath()
			ctx.moveTo(prevCoords.x, prevCoords.y)
			ctx.lineTo(nextCoords.x, nextCoords.y)
			ctx.stroke()
		}, prevCoords, this.nextCoords)
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

		render: function() {
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