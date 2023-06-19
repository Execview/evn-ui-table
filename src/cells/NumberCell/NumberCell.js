import React, { useState } from 'react'
import TextCell from "../TextCell/TextCell.js"
import classes from './NumberCell.module.css'

const NumberCell =  props => {
	const [errorText, setErrorText] = useState()
	const { onValidateSave, data, prefix, placeholder, errorText: inputErrorText, onChange: inputOnChange,...otherProps} = props
	const onSave = data => {
		if(data){
			onValidateSave && onValidateSave(parseFloat(data))
		} else {
			setErrorText('Invalid number')
		}
	}
	const onChange = e => {
		setErrorText(null)
		inputOnChange && inputOnChange(e)
	}
	return (
		<div className={classes['number-cell']}>
			<div>{(data || data===0) && prefix}</div>
			<TextCell {...{
				...otherProps,
				errorText: errorText || inputErrorText,
				data,
				onChange,
				placeholder: `Enter a number...`,
				onValidateSave: onSave,
				number: true
			}}/>
		</div>
		
	)
}

export default NumberCell