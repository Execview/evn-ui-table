import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import classes from './DefaultDropdownDisplay.module.css';

const defaultDropdownDisplay = (props) => {
	const data = props.data || '';
	const looksEditable = props.looksEditable;
	const showCaret = props.showCaret;
	const style = props.style || {};

	const containerClass = props.className || props?.classes?.container || classes['container'];
	const looksEditableClass = props?.classes?.editable || classes['looks-editable'];

	const caret = <FontAwesomeIcon icon={faCaretDown} className={classes['caret']} />;

	return (
		<div className={`${containerClass} ${looksEditable ? looksEditableClass : ''}`} style={{ ...style, width: style.width }}>
			<div className={classes['content']}>{data}</div>
			{showCaret && caret}
		</div>
	);
};

export default defaultDropdownDisplay;
