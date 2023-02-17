import React from 'react';
import TextCell from '../TextCell/TextCell.js';

const Cell = ({errorText: inputErrorText, type=<TextCell/>, onValidateSave: inputOnValidateSave, permission=1,...otherProps}) => {
	const errorText = inputErrorText || inputErrorText === '' ? inputErrorText : null;
	const onValidateSave = inputOnValidateSave || ((v) => { console.log('cell returned ' + v); });
	return (
		React.createElement(type.type, { onValidateSave, permission, errorText, ...otherProps, ...type.props })
	);
};

export default Cell

