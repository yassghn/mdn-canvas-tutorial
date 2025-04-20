/**
 * lessonsMenus.mjs
 */

import menuMgmt from './menuMgmt.mjs'

export async function addBasicDrawingAndShapesMenu(cvs) {
	return await menuMgmt.createMenu('basic-drawing-and-shapes', cvs)
}

export async function addStylesColorsAndTextMenu(cvs) {
	return await menuMgmt.createMenu('colors-and-text', cvs)
}

export async function addImagesAndTransformationsMenu(cvs) {
	return await menuMgmt.createMenu('images-and-transformations', cvs)
}

export async function addClippingAndAnimationsMenu(cvs) {
	return await menuMgmt.createMenu('clipping-and-animations', cvs)
}