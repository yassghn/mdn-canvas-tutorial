/**
 * effect.mjs
 */

import neonGlitchTextEffectProps from "./neonGlitchTextEffect.mjs"

const effect = {
	neonGlitchText: function () {
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
}

export default effect