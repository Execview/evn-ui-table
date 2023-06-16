import React from 'react'
import TextCell from "../TextCell/TextCell.js"
import classes from './NumberCell.module.css'

const NumberCell =  props => {
	const prefix = props.prefix || ""
	const {onValidateSave, data, ...otherProps} = props
	const onSave = data => {
		const cleanData = data.replaceAll(prefix,'')
		onValidateSave(parseFloat(cleanData))
	} 
	return (
		// <div className={classes['number-cell']}>
		// 	<div>$</div>
			<TextCell {...{
				...otherProps,
				data: data ? `${prefix}${data}` : null,
				onValidateSave: onSave
			}}/>
		// </div>
		
	)
}

export default NumberCell