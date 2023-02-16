import React, { useState, useEffect } from 'react'
import TextArea from './TextArea.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import classes from './TextCell.module.css'

const TextCell = (props) => {
	const [text, setText] = useState('')
	useEffect(() => setText(props.data || ''), [props.data])
	const [showErrorText, setShowErrorText] = useState(false)
	
	const isEditable = props.permission > 1
	const looksEditable = isEditable || props.looksEditable

	const placeholderText = (props.placeholder || 'Type something here...')
	const errorText = props.errorText

	const showError = e => {
		e.stopPropagation()
		if (errorText) {
			setShowErrorText(true)
			setTimeout(() => {
				setShowErrorText(false)
			}, 3000)
		}
	}

	const onBlur = e => {
		const val = e.target.value
		setText(val)
		props.onValidateSave && props.onValidateSave(val)
	}

	const onChange = e => {
		setText(e.target.value)
		props.onChange && props.onChange(e.target.value)
	}

	const onKeyPress = e => {
		const childNode = e.target
		if (e.key === 'Enter' && !(e.shiftKey)) {
			childNode && childNode.blur()
		}
	}

	const bothProps = {
		className: `${classes['corrections']} ${looksEditable ? classes['text'] : ''}`,
		value: text,
		disabled: !isEditable,
		autoFocus: props.autoFocus || false,
		onChange,
		onBlur,
		onKeyPress,
		placeholder: (!text && looksEditable ? placeholderText : ''),
		type: props.password ? 'password' : 'text'
	}

	const inputType = props.wrap ? <TextArea {...bothProps}/> : <input {...bothProps}/>

	return (
		<div
			className={`${classes['container']} ${looksEditable ? classes['editable'] : ''}`}
			onClick={(e) => { if (props.onClick) { props.onClick(e) } }}
		>
			{inputType}
			{errorText && (
				<div className={classes['error']}>
					<FontAwesomeIcon icon={faExclamation} className={classes['error-icon']} onClick={e => showError(e)}/>
					<div className={classes['error-info'] + ' ' + (showErrorText ? classes['error-shown'] : '')}>
						<p className={classes['error-text']}>{errorText}</p>
					</div>
				</div>
			)}
		</div>
	)
}

export default TextCell
