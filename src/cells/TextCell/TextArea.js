import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
// React has to be imported here. Not sure why. Only affects when this component is used in other projects

// This is a standard textarea with automatic height
const TextArea = ({style, onChange, ...otherProps}) => {
	const ref = useRef()
	const [hasChanged, setHasChanged] = useState(false) // Need to setHeight to 1 before using scrollHeight to find the real height of the text inside
	const [height, setHeight] = useState(1)

	useLayoutEffect(()=>{
		if(hasChanged){
			setHeight(1)
			setHasChanged(false)
		} else {
			if(ref?.current && height!==ref.current.scrollHeight && ref.current.scrollHeight > ref.current.clientHeight){
				setHeight(ref.current.scrollHeight)
			}
		}
	})
	// needed to set the height correctly on first render
	useEffect(()=>{setHasChanged(true)},[])

	return (
		<textarea ref={ref} onChange={e=>{setHasChanged(true);onChange(e)}} style={{height: `${height}px`,...style}} {...otherProps}/>
	)
}

export default TextArea