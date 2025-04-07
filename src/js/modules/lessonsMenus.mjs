/**
 * lessonsMenus.mjs
 */

import menuMgmt from './menuMgmt.mjs'

export async function addBasicDrawingAndShapesMenu() {
	return await menuMgmt.createMenu('basic-drawing-and-shapes')
}
