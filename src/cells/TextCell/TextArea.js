import { useLayoutEffect, useRef, useState } from "react"

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
				console.log(height, ref.current.scrollHeight)
				setHeight(ref.current.scrollHeight)
			}
		}
	})

	return (
		<textarea ref={ref} onChange={e=>{setHasChanged(true);onChange(e)}} style={{height: `${height}px`,...style}} {...otherProps}/>
	)
}

export default TextArea