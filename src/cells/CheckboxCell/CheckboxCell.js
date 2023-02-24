import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './CheckboxCell.module.css';

const CheckboxCell = ({data, onValidateSave, permission}) => {
	const checked = data
	const disabled = !(permission>1)
	return (
		<div onClick={()=>!disabled && onValidateSave(!checked)} className={`${classes['container']} ${disabled ? classes['container-disabled'] : ''}`}>
			<div className={`${classes['switch']} ${checked ? classes['switch-checked'] : ''} ${disabled ? classes['switch-disabled'] : ''}`}>
				<FontAwesomeIcon className={`${classes['icon']} ${checked ? classes['icon-checked'] : ''} `} icon={checked ? faCircleCheck : faCircleXmark}/>
			</div>
		</div>
	)
};

export default CheckboxCell;

