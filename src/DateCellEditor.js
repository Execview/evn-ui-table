import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class DateCellEditor extends Component {
  render() {
    if (this.props.text === '') {
      return (<div><DatePicker autoFocus selected={new Date()} onSelect={date => this.props.onSaveCell(this.props.activeCell[0], this.props.activeCell[1], date.toISOString())} /></div>);
    }
    return (<div><DatePicker autoFocus selected={new Date(this.props.text)} onSelect={date => this.props.onSaveCell(this.props.activeCell[0], this.props.activeCell[1], date.toISOString())} /></div>);
  }
}
