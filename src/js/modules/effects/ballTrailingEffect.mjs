/**
 * ballTrailingEffect.mjs
 */

import ContextProperties from '../ContextProperties.mjs'
import ContextState from '../ContextState.mjs'
import { invertVelocity } from '../math.mjs'

const _effectProps = {
	ctx: null,
	ball: null,
	fillStyle: null
}

const _renderProps = {
	globalAlphaStart: .2,
	repeat: 10,
	globalAlpha: null
}

function _updateRenderProps(effect) {
	_renderProps.globalAlpha = _renderProps.globalAlphaStart
}

function _render(effect) {
	_updateRenderProps(effect)
	const props = new ContextProperties()
	props.globalAlpha = _renderProps.globalAlpha
	props.fillStyle = effect.fillStyle
	const state = new ContextState(effect.ctx, props)
	state.apply((_ctx, _ball) => {
		const alphaDelta = _renderProps.globalAlphaStart / _renderProps.repeat
		const coords = { ..._ball.coords }
		const velocity = invertVelocity(_ball.velocity)
		for (let i = 0; i < _renderProps.repeat; i++) {
			// calculate radius
			const radius = _ball.radius - (i + 1)/2
			// calculate "behind" ball position given velocity trajectory
			coords.x += velocity.x
			coords.y += velocity.y
			// render trail opposite of the velocity trajectory
			_ctx.beginPath()
			_ctx.arc(coords.x, coords.y, radius, 0, Math.PI * 2)
			_ctx.closePath()
			_ctx.fill()
			// update global alpha
			_ctx.globalAlpha -= alphaDelta
		}
	}, effect.ball)
}

function ballTrailingEffect() {
	const effect = {
		..._effectProps,

		render: function() {
			const self = this
			_render(self)
		}
	}

	return effect
}

export default ballTrailingEffect