/**
 * lessonsMenus.mjs
 */

import menuMgmt from './menuMgmt.mjs'

export async function addBasicDrawingAndShapesMenu() {
	return await menuMgmt.createMenu('basic-drawing-and-shapes')
}

export async function addStylesColorsAndTextMenu() {
	return await menuMgmt.createMenu('colors-and-text')
}

export async function addImagesAndTransformationsMenu() {
	return await menuMgmt.createMenu('images-and-transformations')
}