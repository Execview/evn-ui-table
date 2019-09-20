import React, {useState} from 'react';
import './App.css';
import Button from './Components/Button/Button'
import CircleUser from './Components/CircleUser/CircleUser'
import GenericDropdown from './Components/GenericDropdown/GenericDropdown'
import TripleFill from './Components/TripleFill/TripleFill'


import injectObjectInObject from './Functions/injectObjectInObject'
import objectCopierWithStringToDate from './Functions/objectCopierWithStringToDate'
import orderedObjectAssign from './Functions/orderedObjectAssign'
import recursiveDeepAssign from './Functions/recursiveDeepAssign'
import recursiveDeepCopy from './Functions/recursiveDeepCopy'
import recursiveDeepDiffs from './Functions/recursiveDeepDiffs'
import recursiveDeepDiffsREACT from './Functions/recursiveDeepDiffsREACT'
import fetchy from './Functions/fetchy'

const App = (props) => {
	const ButtonProps = {onClick:(() => console.log('xd'))}
	const CircleUserProps = {size: 50, url: 'https://i.imgur.com/OYBnpPT.jpg'}

	const [genericDropdownPropsSearchString, setGenericDropdownPropsSearchString] = useState('')
	const GenericDropdownPropsAllOptions = {
		a: {name: 'apple', comp: <div>apple</div>},
		b: {name: 'banana', comp: <div>banana</div>},
		c: {name: 'cat', comp: <img style={{width: '200px'}} src='https://i.imgur.com/VqZOPIw.jpg' alt='cat'/>}
	}
	const GenericDropdownPropsOptions = Object.keys(GenericDropdownPropsAllOptions).filter(id=>GenericDropdownPropsAllOptions[id].name.includes(genericDropdownPropsSearchString)).reduce((t,i)=>{ return {...t,[i]:GenericDropdownPropsAllOptions[i].comp}},{})
	const GenericDropdownProps = {
		submit: ((optionid)=>console.log(optionid)),
		options: GenericDropdownPropsOptions,
		canSearch: true,
		searchString: genericDropdownPropsSearchString,
		onSearchChange: (v=>setGenericDropdownPropsSearchString(v))
	}

	return (
		<div className="App color-scheme">
			<Button {...ButtonProps}>test button</Button>
			<TripleFill left={<div>left</div>} center={<div>middle</div>} right={<div>right</div>}/>
			<CircleUser {...CircleUserProps}/>
			<GenericDropdown {...GenericDropdownProps}/>
		</div>
	);
}

export default App;

	//FUNCTIONS
	//injectObjectInObject
		// const ioioa = {a:3,b:4,c:[5,4,7],d:{test:1}}
		// const ioiob = {z:4}
		// console.log(injectObjectInObject(ioioa,ioiob,0))
		// console.log(injectObjectInObject(ioioa,ioiob,1))
		// console.log(injectObjectInObject(ioioa,ioiob,4))
		// console.log(injectObjectInObject(ioioa,ioiob,5))
		// console.log(injectObjectInObject(ioioa,ioiob,8))
		// console.log(injectObjectInObject(ioioa,ioiob,-1))
		// console.log(injectObjectInObject(ioioa,ioiob,-2))
		// console.log(injectObjectInObject(ioioa,ioiob,-4))
		// console.log(injectObjectInObject(ioioa,ioiob,-5))
		// console.log(injectObjectInObject(ioioa,ioiob,-6))
		// console.log(injectObjectInObject(ioioa,ioiob,'start'))
		// console.log(injectObjectInObject(ioioa,ioiob,'end'))
	
	//objectCopierWithStringToDate
		// const ocwstda = {a: 'oompa loompa', b: [1,2,'three'], c: null, d: (new Date()).toISOString()}
		// console.log(objectCopierWithStringToDate(ocwstda))

	//orderedObjectAssign
		// const ooaa = {a: 'oompa loompa', b: [1,2,'three'], c: null, d: (new Date()).toISOString()}
		// console.log(orderedObjectAssign(ooaa,'b','ok'))

	//recursiveDeepAssign
		// const rdaa = {a: 'oompa loompa', b: [1,2,{thr:'thr'}], c: null, d: (new Date()).toISOString()}
		// const rdab = {b: [1,2,{ee:'ee'}], c: 'altered', d: (new Date()).toISOString()}
		// console.log(recursiveDeepAssign(rdaa,rdab))

		// const rdac = {}
		// const rdad = {}
		// console.log(recursiveDeepAssign(rdac,rdad))

	//recursiveDeepCopy
		// const rdc = {a: 'oompa loompa', b: [1,2,'three'], c: null, d: (new Date()).toISOString()}
		// console.log(recursiveDeepCopy(rdc))

	//recursiveDeepDiffs
		// const rdda = {a: 'oompa loompa', b: [1,2,{thr:'thr'}], c: null, d: (new Date()).toISOString()}
		// const rddb = {a: 'oompa loompa', b: [1,4,{thr:'thr'}], c: 'test', d: (new Date()).toISOString()}
		// console.log(recursiveDeepDiffs(rdda,rddb))

	//recursiveDeepDiffsREACT
		// const rdda = {a: 'oompa loompa', b: [1,2,{thr:'thr'}], c: null, d: (new Date()).toISOString(), e: <Button/>}
		// const rddb = {a: 'oompa loompa', b: [1,4,{thr:'thr'}], c: 'test', d: (new Date()).toISOString()}
		// console.log(recursiveDeepDiffsREACT(rdda,rddb))
	
	//fetchy
		// fetchy('https://evnext-api.evlem.net/api/login',{debug:true, timeout: 100, body:{username: 'namyts', password: 'password'}})
		// .then(res=>res.json())
		// .catch(r=>{console.log(r);return {token: 'mytoken'}})
		// .then(data=>console.log(data))


// BENCHMARK TEST
// const size = 50000
// const find = 'test'
// let arr = []
// let obj = {}
// let start = null;

// const getCurrentTime = () => (new Date()).getTime()
// start = getCurrentTime()
// for(let i=0; i<size; i++){
//   arr.push({row:i, col:'test', content:'hello'+i})

// }
// console.log(getCurrentTime()-start)
// start = getCurrentTime()
// for(let i=0; i<size; i++){

//   obj[i] = {['test']:{content: 'hello'+i}}
// }
// console.log(getCurrentTime()-start)
// start = getCurrentTime()
// const arranswer = arr.filter(el=>el.col===find).map(cell=>cell.content)
// console.log(getCurrentTime()-start)
// start = getCurrentTime()
// const objanswer = Object.keys(obj).map(rowId=>obj[rowId]['test'].content)
// console.log(getCurrentTime()-start)

