import React, { useState } from 'react'
import TextCell from "../TextCell/TextCell.js"
import classes from './NumberCell.module.css'

const NumberCell =  ({
	onValidateSave,
	data,
	prefix: inputPrefix,
	placeholder,
	onChange: inputOnChange,
	...otherProps
}) => {

	const onSave = numString => {
		const num = parseFloat(numString||0)
		if(numString.includes('+') || numString.includes('-')){
			onValidateSave && onValidateSave(num)
		} else {
			onValidateSave && onValidateSave(num*(data<=0 ? -1 : 1))
		}	
	}

	const prefix = `${data >= 0 ? '' : '- '}${inputPrefix}`
	return (
		<div className={classes['number-cell']}>
			<div className={classes['prefix']}>{(data || data===0) && prefix}</div>
			<TextCell {...{
				...otherProps,
				data: Math.abs(data).toString().replace('+','').replace('-',''),
				placeholder: `Enter a number...`,
				onValidateSave: onSave,
				number: true,
				wrap: false
			}}/>
		</div>
		
	)
}

export default NumberCell