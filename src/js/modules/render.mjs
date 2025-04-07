/**
 * mdn-canvas-tutorial
 *
 * render.mjs
 */

// utility function to draw a rectangle with rounded corners
export function roundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath()
	ctx.moveTo(x, y + radius)
	ctx.arcTo(x, y + height, x + radius, y + height, radius)
	ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius)
	ctx.arcTo(x + width, y, x + width - radius, y, radius)
	ctx.arcTo(x, y, x, y + radius, radius)
}