import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './CheckboxCell.module.css';

const CheckboxCell = ({data, onValidateSave}) => {
	const checked = data
	return (
		<div onClick={()=>onValidateSave(!checked)} className={classes['container']}>
			<div className={`${classes['switch']} ${checked ? classes['switch-checked'] : ''}`}>
				<FontAwesomeIcon className={`${classes['icon']} ${checked ? classes['icon-checked'] : ''} `} icon={checked ? faCircleCheck : faCircleXmark}/>
			</div>
		</div>
	)
};

export default CheckboxCell;

