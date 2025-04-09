/**
 * renderInputComponent.mjs
 */

export function miterLimitInput(xpos, ypos) {
	// create label and input element
	const labelElement = document.createElement('label')
	const inputElement = document.createElement('input')
	// set attribute
	labelElement.setAttribute('id', 'miterLimitLabel')
	labelElement.setAttribute('for', 'miterLimit')
	labelElement.hidden = true
	labelElement.textContent = 'miter limit: '
	inputElement.setAttribute('id', 'miterLimit')
	inputElement.setAttribute('type', 'number')
	inputElement.setAttribute('size', '3')
	inputElement.setAttribute('min', '1')
	inputElement.value = 10
	inputElement.hidden = true
	// set styles
	const textColor = 'rgb(0, 175, 175)'
	const labelStyle = `position: absolute; left: ${xpos}px; top: ${ypos + 15}px; color: ${textColor};`
	const inputStyle = `position: absolute; left: ${xpos + 75}px; top: ${ypos + 10}px;`
	labelElement.style = labelStyle
	inputElement.style = inputStyle
	// append to body
	document.body.appendChild(labelElement)
	document.body.appendChild(inputElement)
}
