import React, { Component } from 'react';
import { days, months } from './store/constants';

export default class DateCellDisplay extends Component {
  render() {
    if (this.props.text !== '') {
      const myDate = new Date(this.props.text);
      return (<div>{ days[myDate.getDay()] + ' ' + myDate.getDate() + '/' + months[myDate.getMonth()] + '/' + myDate.getFullYear()}</div>);
    }
    return (<div>Date Unknown</div>);
  }
}
