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

	const containerClassName = props?.className || props.classes?.container || ''
	const textClassName = props?.classes?.text || ''
	const editableClassName = props?.classes?.editable || classes['editable-text']

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
		let text = (e.target.value).toString()

		if(props.number){
			const allowedChars = ['1','2','3','4','5','6','7','8','9','0','.','+','-','e','']
			const lastChar = text.slice(-1)
			if(!allowedChars.includes(lastChar)){return}
			if(text.includes('..')){
				text = text==='..' ? '-' : (parseFloat(text.replace('..','')||0)*-1).toString()
			}
		}
		setText(text)
		props.onChange && props.onChange(text)
	}

	const onKeyPress = e => {
		const childNode = e.target
		if (e.key === 'Enter' && !(e.shiftKey)) {
			childNode && childNode.blur()
		}
	}

	let type = 'text'
	if(props.password){type = 'password'}

	const bothProps = {
		className: `${classes['corrections']} ${classes['text']} ${textClassName} ${looksEditable ? editableClassName : ''}`,
		value: text,
		disabled: !isEditable,
		autoFocus: props.autoFocus || false,
		onChange,
		onBlur,
		onKeyPress,
		placeholder: (!text && looksEditable ? placeholderText : ''),
		type,
		inputMode: props.number ? 'decimal' : 'text'
	}

	const inputType = props.wrap ? <TextArea {...bothProps}/> : <input {...bothProps}/>

	return (
		<div
			className={`${classes['container']} ${containerClassName}`}
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
