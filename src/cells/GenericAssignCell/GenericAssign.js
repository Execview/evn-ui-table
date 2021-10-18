import React, { useState } from 'react';
import { GenericDropdown } from '@execview/reusable';
import classes from './GenericAssignCell.module.css';

const GenericAssign = (props) => {
	const data = props.items || [];
	const allItems = props.allItems || {};
	const allKeys = !Array.isArray(allItems) ? Object.keys(allItems) : allItems
	const isEditable = props.permission > 1

	const [leftSearchString, setLeftSearchString] = useState('');
	const [rightSearchString, setRightSearchString] = useState('');

	const unassignGeneric = (itemId) => {
		props.onValidateSave && props.onValidateSave(data.filter(el => el !== itemId));
	};

	const assignGeneric = (newItem) => {
		props.onValidateSave && props.onValidateSave([...data, newItem]);
	};	

	
	const getSearchField = props.getSearchField || (() => { console.log('cant search'); return ''; });
	const getOption = props.getOption || (() => { console.log('cant generate options'); return {}; });

	const generateOptions = (ids) => {
		return ids.reduce((t, id) => {
			const option = getOption(id);
			return { ...t,
				[id]: option
			};
		}, {});
	};


	const leftOptions = generateOptions(data);
	const rightOptions = generateOptions(allKeys.filter(i => !data.includes(i)));
		

	const filteredLeftOptions = Object.keys(leftOptions).filter(k => getSearchField(k).toLowerCase().includes(leftSearchString)).reduce((t, k) => { return { ...t, [k]: leftOptions[k] }; }, {});

	const filteredRightOptions = Object.keys(rightOptions).filter(k => getSearchField(k).toLowerCase().includes(rightSearchString)).reduce((t, k) => { return { ...t, [k]: rightOptions[k] }; }, {});

	return (
		<div className={classes["generic-container"]}>
			<div className={`${classes['dropdown-with-title']} ${isEditable?'':classes['dropdown-with-title-small']}`}>
				<div className={classes['title']}>
					{props.leftTitle}
				</div>
				<GenericDropdown
					submit={(key) => { if (isEditable) { unassignGeneric(key); } }}
					canSearch={true}
					autoFocus={true}
					onSearchChange={v => setLeftSearchString(v)}
					searchString={leftSearchString}
					options={filteredLeftOptions}
					genericDropdownClasses={{dropdown:classes['dd'], dropdownMenu:classes['ddm']}}
				/>
			</div>
			{isEditable && (
				<div className={classes['dropdown-with-title']}>
					<div className={classes['title']}>
						{props.rightTitle}
					</div>
					<GenericDropdown
						submit={(key) => { if (isEditable) { assignGeneric(key); } }}
						canSearch={true}
						autoFocus={true}
						onSearchChange={v => setRightSearchString(v)}
						searchString={rightSearchString}
						options={filteredRightOptions}
						genericDropdownClasses={{dropdown:classes['dd'], dropdownMenu:classes['ddm']}}
					/>
				</div>
			)}
		</div>
	);
};

export default GenericAssign;
