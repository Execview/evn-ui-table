import React, { useState } from 'react';
import classes from './InPlaceCell.module.css';
import Cell from '../Cell/Cell.js';


const InPlaceCell = (props) => {
	const [internalData, setInternalData] = useState(props.data)
	const [selfData, setSelfData] = props.onValidateSave ? [props.data, props.onValidateSave] : [internalData, setInternalData]

	const { className, style, data, onValidateSave, permission, ...OtherCellProps } = props //OtherCellProps contains permission, errorText and other miscellaneous props.

	return (
		<div className={`${permission>1 ? classes['default-style'] : ''} ${(props.className || '')}`} style={props.style}>
			<Cell data={selfData} onValidateSave={setSelfData} {...{permission, ...OtherCellProps}} />
		</div>
	)
}

export default InPlaceCell;
