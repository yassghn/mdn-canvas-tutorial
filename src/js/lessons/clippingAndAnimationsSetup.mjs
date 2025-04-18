/**
 * clippingAndAnimationsSetup.mjs
 */

import clippingAndAnimations from './clippingAndAnimations.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

function clippingPathsCallback(enabled) {
	clippingAndAnimations.clippingPaths = enabled
}

function inverseClippingPathsCallback(enabled) {
	clippingAndAnimations.inverseClippingPaths = enabled
}

function solarSystemCallback(enabled) {
	clippingAndAnimations.solarSystem = enabled
}

const clippingAndAnimationsSetup = {
	// clipping paths
	clippingPathsInit: async function (menu) {
		await addMenuItem('clipping-paths', 'clipping paths', 'clipping-paths-check', clippingPathsCallback, menu)
	},

	// inverse clipping paths
	inverseClippingPathsInit: async function (menu) {
		await addMenuItem('inverse-clipping-paths', 'inverse clipping paths', 'inverse-clipping-paths-check', inverseClippingPathsCallback, menu)
	},

	// solar system
	solarSystemInit: async function (menu) {
		await addMenuItem('solar-system', 'solar system', 'solar-system-check', solarSystemCallback, menu)
	}
}

export default clippingAndAnimationsSetup