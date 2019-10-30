import React, {useState, useLayoutEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import Panel from './Panel/Panel'
import OCO from '../OCO/OCO'
import useFunctionalRef from '../../Functions/useFunctionalRef'
import classes from './RightClickMenu.module.css'

const RightClickMenu = (props) => {
	const rightClickDOMNode = document.getElementById('root')
	const [selfRef, current] = useFunctionalRef()
	const [selfDimensions, setSelfDimensions] = useState({ width: 0, height: 0 })
	useLayoutEffect(()=>{
		if(!current){return}
		const newSelfRect = current.getBoundingClientRect()
		const newSelfDimensions = { width: newSelfRect.width, height: newSelfRect.height }
		if(JSON.stringify(newSelfDimensions)!==JSON.stringify(selfDimensions)){
			setSelfDimensions(newSelfDimensions)
		}
	})

	const page = {width: Math.min(window.innerWidth,rightClickDOMNode.clientWidth), height: Math.min(window.innerHeight,rightClickDOMNode.clientHeight)}
	const menu = {width: selfDimensions.width, height: selfDimensions.height}

	const takeParentLocation = props.takeParentLocation	

	const position = props.position
	if(!position){return null}

	const inlineMode = props.inline	
	const caretDimensions = !inlineMode ? (props.caretDimensions || [18,9]) : [0,0]
	const moveBox = !inlineMode ? (props.moveBox || [0,0]) : [0,0]
	const slideBox = !inlineMode ? (props.slideBox || 50) : 0


	let TOP = takeParentLocation ? position.y + moveBox[1] : position.y
	let LEFT = takeParentLocation ? position.x + moveBox[0] : position.x
	let CARET_SLIDE = slideBox
	let caretPosition = 'top'


	//modal thing
	let menuChildren = null
	const showModal = page.width<menu.width || page.height<menu.height
	if((showModal && props.enableModal) || props.forceModal){ //for Mobile
		menuChildren = (
			<div className={`${classes['modal']}`}>
				<OCO OCO={props.closeMenu}>
					<Panel hideCaret className={`${classes['modal-panel']} ${props.modalClassName}`}>
						{props.children}
					</Panel>
				</OCO>
			</div>
		)
	} else {
		let positionScreenY = position.screenY
		if(takeParentLocation && !inlineMode){
			positionScreenY = positionScreenY+position.height
			TOP += position.height
		}
	console.log(positionScreenY,menu.height,caretDimensions[1],page.height)
		if(positionScreenY+menu.height+caretDimensions[1]>page.height){
			TOP = TOP-menu.height-caretDimensions[1] 
			caretPosition = 'bottom'
			if(takeParentLocation){
				if(!inlineMode){
					TOP -= position.height + 2*moveBox[1]
				} else {
					TOP += position.height
				}
			}
		} else {
			TOP += caretDimensions[1]
		}

		TOP = Math.max(TOP, 0)
		
		if(position.screenX+menu.width - page.width>0){CARET_SLIDE = Math.max(LEFT+menu.width - page.width,CARET_SLIDE)}
		LEFT -= CARET_SLIDE
		if(LEFT<0){CARET_SLIDE = Math.min(LEFT+CARET_SLIDE,CARET_SLIDE)}
		CARET_SLIDE = CARET_SLIDE-caretDimensions[0]/2
		
		LEFT = Math.min(LEFT,page.width-menu.width)
		LEFT = Math.max(LEFT,0)
		CARET_SLIDE = Math.min(CARET_SLIDE, menu.width-caretDimensions[0]-1)
		CARET_SLIDE = Math.max(0,CARET_SLIDE)

		menuChildren = (
			<OCO OCO={props.closeMenu}>
				<Panel ref={selfRef} style={{top:TOP,left:LEFT}} hideCaret={inlineMode} caretDimensions={caretDimensions} caretPosition={[caretPosition,'left']} caretAdjustment={[CARET_SLIDE,0]} className={`${classes['rcm-panel']} ${props.rightClickMenuClassName}`}>
					{props.children}
				</Panel>
			</OCO>
		)
	}
	
	return (
		ReactDOM.createPortal(menuChildren,rightClickDOMNode)
	)
}

export default RightClickMenu
