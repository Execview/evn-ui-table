import React from 'react'
import TextCell from "../TextCell/TextCell.js"
import classes from './NumberCell.module.css'

const NumberCell =  props => {
	const {onValidateSave, data, prefix, placeholder, ...otherProps} = props
	const onSave = data => {
		onValidateSave(parseFloat(data))
	}
	return (
		<div className={classes['number-cell']}>
			<div>{data && prefix}</div>
			<TextCell {...{
				...otherProps,
				data,
				placeholder: `Enter a number...`,
				onValidateSave: onSave
			}}/>
		</div>
		
	)
}

export default NumberCell