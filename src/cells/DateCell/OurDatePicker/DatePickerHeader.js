import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import InPlaceCell from '../../InPlaceCell/InPlaceCell.js';
import DropdownCell from '../../DropdownCell/DropdownCell.js';
import classes from './DatePickerHeader.module.css'

const DatePickerHeader = ({
	date,
	decreaseYear,
	decreaseMonth,
	increaseYear,
	increaseMonth,
	changeYear,
	changeMonth
}) => {
	const yearRange = 40

	const getDropdownScroll = (d) => {
		return <div>{d}</div>
	}
	
	const selectedYear = moment(date).year()
	const months = moment.monthsShort()
	const selectedMonth = months[moment(date).month()]
	const years = [...Array(yearRange).keys()].map(i=>i+selectedYear-Math.floor(yearRange/2))

	const yearOptions = Object.fromEntries(years.map(y=>[y,getDropdownScroll(y)]))
	const monthOptions = Object.fromEntries(months.map(m=>[m,getDropdownScroll(m)]))

	return (
		<div className={classes['custom-header']}>
			<FontAwesomeIcon className={classes['arrow']} icon={faAngleDoubleLeft} onClick={decreaseYear} />
			<FontAwesomeIcon className={classes['arrow']} icon={faAngleLeft} onClick={decreaseMonth} />
			<div className={classes['date']}>
				<InPlaceCell
					onValidateSave={(m)=>changeMonth(months.indexOf(m))}
					data={selectedMonth}
					permission={4}
					type={(
						<DropdownCell
							options={monthOptions}
							rightClickMenuWrapperProps={{
								dontPortal: true,
								rcmClassName: classes['month-picker-rcm'],
								moveBox:[100,15],
								slideBox:75
							}}
						/>
					)} 
				/>
				<InPlaceCell
					onValidateSave={changeYear}
					data={selectedYear}
					permission={4}
					type={(
						<DropdownCell
							options={yearOptions}
							rightClickMenuWrapperProps={{
								dontPortal: true,
								rcmClassName: classes['year-picker-rcm'],
								moveBox:[135,15],
								slideBox:50
							}}
						/>
					)}
				/>
				
			</div>
			<FontAwesomeIcon className={classes['arrow']} icon={faAngleRight} onClick={increaseMonth} />
			<FontAwesomeIcon className={classes['arrow']} icon={faAngleDoubleRight} onClick={increaseYear} />
		</div>
	)
}

export default DatePickerHeader