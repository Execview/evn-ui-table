// import React from 'react';
import * as actionTypes from './actionTypes';
import { priority, rules } from './constants';
import validateInput from './validators';
import { dataConfig, newData } from './configs';

const initialState = {
  data: [],
  column: '',
  order: 'desc',
  dataConfig,
  rules,
  activeCell: [null, null],
  warning: false,
  cellText: '',
  activeRule: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA:
      return {
        ...state,
        data: newData
      };

    case actionTypes.SAVE_CELL:
      return { ...state,
        data: state.data.map((el, index) => {
          if (index === state.activeCell[0]) {
            return { ...state.data[state.activeCell[0]],
              [state.activeCell[1]]: action.text };
          }
          return el;
        }),
        activeCell: [null, null],
        warning: false,
        activeRule: null
      };

    case actionTypes.SORT_DATA: {
      let ordering = state.order;
      let columnOrder = state.column;
      if (columnOrder === action.col) {
        ordering = state.order === 'asc' ? 'desc' : 'asc';
      } else {
        columnOrder = action.col;
        ordering = 'desc';
      }
      const orderData = JSON.parse(JSON.stringify(state.data));
      if (action.cellType === 'text' || action.cellType === 'dropdown' || action.cellType === 'date') {
        orderData.sort((a, b) => {
          const x = a[action.col] ? a[action.col].toLowerCase() : '';
          const y = b[action.col] ? b[action.col].toLowerCase() : '';
          return (x > y) ? -1 : ((x < y) ? 1 : 0);
        });
      } else if (action.cellType === 'number') {
        orderData.sort((a, b) => {
          const x = a[action.col] ? a[action.col] : 0;
          const y = b[action.col] ? b[action.col] : 0;
          return (parseFloat(x) > parseFloat(y)) ? -1 : ((parseFloat(x) < parseFloat(y)) ? 1 : 0);
        });
      } else if (action.cellType === 'color') {
        orderData.sort((a, b) => {
          const x = priority[a[action.col]] ? priority[a[action.col]] : 0;
          const y = priority[b[action.col]] ? priority[b[action.col]] : 0;
          return (x > y) ? -1 : ((x < y) ? 1 : 0);
        });
      }

      if (ordering === 'asc') {
        orderData.reverse();
      }
      return {
        ...state,
        data: orderData,
        order: ordering,
        column: columnOrder,
        activeCell: [null, null],
        warning: false,
        activeRule: null
      };
    }

    case actionTypes.SET_ACTIVE: {
      return {
        ...state,
        activeCell: [action.row, action.col],
        warning: false,
        activeRule: action.rule,
        cellText: action.text
      };
    }

    case actionTypes.VALIDATE: {
      let finalstate = { ...state };
      if (state.activeRule !== undefined) {
        if (validateInput(state.activeRule, action.cellText)) {
          finalstate = reducer(finalstate, { type: actionTypes.SAVE_CELL, row: state.activeCell[0], col: state.activeCell[1], text: action.cellText });
          return finalstate;
        }
        return {
          ...state,
          cellText: action.cellText,
          warning: true,
        };
      }
      finalstate = reducer(finalstate, { type: actionTypes.SAVE_CELL, row: state.activeCell[0], col: state.activeCell[1], text: action.cellText });
      return finalstate;
    }
    default:
      return state;
  }
};


export default reducer;
