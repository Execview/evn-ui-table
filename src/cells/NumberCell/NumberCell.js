import React, { useState } from 'react'
import TextCell from "../TextCell/TextCell.js"
import classes from './NumberCell.module.css'

const NumberCell =  props => {
	const [errorText, setErrorText] = useState()
	const { onValidateSave, data, prefix: inputPrefix, placeholder, errorText: inputErrorText, onChange: inputOnChange,...otherProps} = props
	const onSave = numString => {
		if(numString){
			const num = parseFloat(numString)
			if(data<=0 && data*-1===num){
				setErrorText('This number has been set from -ve to +ve')
			}
			onValidateSave && onValidateSave(num)
		} else {
			setErrorText('Invalid number')
		}
	}
	const onChange = e => {
		console.log(e)
		setErrorText(null)
		inputOnChange && inputOnChange(e)
	}
	const prefix = `${data >= 0 ? '' : '- '}${inputPrefix}`
	return (
		<div className={classes['number-cell']}>
			<div className={classes['prefix']}>{(data || data===0) && prefix}</div>
			<TextCell {...{
				...otherProps,
				errorText: errorText || inputErrorText,
				data: Math.abs(data).toString(),
				onChange,
				placeholder: `Enter a number...`,
				onValidateSave: onSave,
				number: true
			}}/>
		</div>
		
	)
}

export default NumberCell