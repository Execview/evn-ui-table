import React, { useState, useEffect } from 'react';
import { GenericDropdown, RightClickMenuWrapper, useDimensions } from '@execview/reusable';
import DefaultDropdownDisplay from './DefaultDropdownDisplay.js';
import classes from './DropdownCell.module.css';

const DropdownCell = (props) => {
	const [selfRef, getDimensions] = useDimensions()
	const selfDimensions = getDimensions()
	const isEditable = props.permission > 1;
	const [internalOpen, setInternalOpen] = useState(false)
	const [open, setOpen] = props.setOpen ? [props.open, props.setOpen] : [internalOpen, setInternalOpen]
	const input = props.options || {};
	const optionsIsArray = Array.isArray(input);
	const inputOptions = !optionsIsArray ? input : Object.fromEntries(input.map(o => [o, o]));

	const [searchString, setSearchString] = useState('');
	const [displayedRows, setDisplayedRows] = useState(Object.keys(inputOptions));
	useEffect(()=>onSearchChange(searchString),[props.options])

	const inlineMode = props.inline;

	const data = props.data;

	
	const getSearchField = (key) => {
		if (props.getSearchField) {
			return props.getSearchField(key);
		}
		return key;
	};

	const onSearchChange = (value) => {
		const newRows = Object.keys(inputOptions).filter(v => getSearchField(v).toLowerCase().includes(value.toLowerCase()));
		setSearchString(value);
		setDisplayedRows(newRows);
	};

	const onBlur = () => { if(isEditable){props.onValidateSave(props.data)}; setOpen(false) };

	const options = Object.fromEntries(Object.entries(inputOptions).filter(([o,op]) => displayedRows.includes(o)))

	const displayCell = props.display || <DefaultDropdownDisplay className={props.className} classes={props.classes} data={options[data]} looksEditable={isEditable} showCaret={!inlineMode} />;

	const display = (
		<div style={{ height: '100%' }}>
			{React.createElement(displayCell.type, {  data, ...displayCell.props, looksEditable: isEditable, style: props.style })}
		</div>
	);

	const {rcmStyle, genericDropdownClasses, autoscroll, ... rest} = props;

	const {rcmClassName,...otherRCMWProps} = (props.rightClickMenuWrapperProps || {})

	const defaultAutoScroll = {
		id: data
	}

	const width = Math.max(selfDimensions.width, isNaN(rcmStyle?.width) ? 0 : rcmStyle?.width, 137)

	return (
		<div ref={selfRef} style={{ height: '100%' }}>
			<div style={{ height: '100%' }}>
				{display}
			</div>
			<RightClickMenuWrapper onLeftClick inline={inlineMode} takeParentLocation open={open} setOpen={setOpen} rightClickMenuStyle={{...rcmStyle, width}} rightClickMenuClassName={`${classes['rcm']} ${rcmClassName||''}`} {...otherRCMWProps}>
				<GenericDropdown
					{...rest}
					autoscroll={{...defaultAutoScroll,...autoscroll}}
					onBlur={onBlur}
					submit={(key) => { if(isEditable){props.onValidateSave(key)}; if(!props.dontCloseOnClick){setOpen(false)} }}
					canSearch={props.canSearch}
					onSearchChange={onSearchChange}
					searchString={searchString}
					options={options}
					autoFocus={true}
					genericDropdownClasses={{dropdown: classes['dropdown'], dropdownMenu: classes['dropdown-menu'],...genericDropdownClasses}}
				/>
			</RightClickMenuWrapper>
		</div>
	);
};

export default DropdownCell;
