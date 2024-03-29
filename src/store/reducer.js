import * as actionTypes from './actionTypes.js';
import { data } from './configSwitch.js';

const initialState = {
	data: data
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SAVE: {
			return {
				...state,
				data: {
					...state.data,
					[action.row]: {
						...state.data[action.row],
						[action.col]: action.data
					}
				}
			}
		}
		case actionTypes.ADD_ROW: {
			return {
				...state,
				data: {
					...state.data,
					[action.id]: {
						...action.data,
						meta: {
							permission:4
						}
					}
				}
			}
		}
		default:
			return state;
	}
};



export default reducer;
