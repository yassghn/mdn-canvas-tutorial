/**
 * api.mjs
 */

import textApi from './api/text.mjs'


const _textApi = {
	label: {
		vertical: textApi.label.vertical
	}
}

const api = {

	init: function(ctx) {
		this.ctx = ctx
	},

	get verticalLabel() {
		return (text, x, y) => { return _textApi.label.vertical(this.ctx, text, x, y) }
	}
}

export default api