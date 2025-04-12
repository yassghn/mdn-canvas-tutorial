/**
 * imagesAndTransformationsSetup.mjs
 */

import imagesAndTransformations from './imagesAndTransformations.mjs'

async function addMenuItem(itemId, itemText, checkboxId, callback, menu) {
	await menu.addMenuItem(itemId, itemText, checkboxId, callback)
}

const imagesAndTransformationsSetup = {

}

export default imagesAndTransformationsSetup