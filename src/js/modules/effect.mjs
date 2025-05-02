/**
 * effect.mjs
 */

import ContextState from './ContextState.mjs'
import neonGlitchTextEffectProps from './neonGlitchTextEffect.mjs'
import scrollingTextEffect from './scrollingTextEffect.mjs'
import spinningParticlesEffect from './spinningParticlesEffect.mjs'

export function neonGlitchText() {
	const neonGlitchTextEffect = {
		text: undefined,
		textColor: undefined,
		font: undefined,
		shadowColor: undefined,
		effect: neonGlitchTextEffectProps(),

		setProps: function () {
			this.effect.setProps()
		},

		render: function (ctx) {
			ctx.save()
			ctx.shadowOffsetX = this.effect.props.shadowOffset
			ctx.shadowOffsetY = this.effect.props.shadowOffset
			ctx.shadowBlur = this.effect.props.shadowBlur
			ctx.globalAlpha = this.effect.props.shadowTransparency / 100
			ctx.shadowColor = this.shadowColor
			ctx.font = this.font
			ctx.fillStyle = this.textColor
			ctx.fillText(this.text, 0, 0)
			ctx.restore()
		}
	}
	return neonGlitchTextEffect
}

// scrolling text effect
export function ScrollingText() {
	this.ctxState = undefined
	this.effect = undefined

	const _init = (ctx, props, text, maxWidth, startX, ypos, scrollWidth) => {
		// set context properties
		this.ctxState = new ContextState(ctx, props)
		// create effect
		this.effect = scrollingTextEffect(this.ctxState, text, maxWidth, startX, ypos, scrollWidth)
	}

	const _nextDraw = () => {
		this.effect.update()
	}

	const _draw = (ctx) => {
		ctx.fillText(this.effect.props.text, this.effect.props.x, this.effect.props.y)
	}

	this.render = () => {
		// draw
		this.ctxState.apply(_draw)
		// update effect properties for next draw
		_nextDraw()
	}

	this.setState = (ctx, scrollingTextProps, text, maxWidth, startXpos, ypos, scrollWidth) => {
		// init singleton properties
		if (!this.ctxState) {
			_init(ctx, scrollingTextProps, text, maxWidth, startXpos, ypos, scrollWidth)
		}
	}

}

// spinning particles
export function spinningParticles() {
	return spinningParticlesEffect()
}