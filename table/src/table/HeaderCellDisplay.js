import React, { Component } from 'react';

export default class HeaderCellDisplay extends Component {
  render() {
    let spans = (
      <div className="span-container">
        <span className="arrow-up" />
        <span className="arrow-down" />
      </div>);
    if (this.props.data.spans !== 'both') {
      spans = (
        <div className="span-container">
          <span className={this.props.data.spans} />
        </div>
      );
    }
    const cellWidth = this.props.style.width > 30 ? this.props.style.width - 30 : this.props.style.width;
    return (
      <div className="header-cell no-select" onClick={this.props.data.sortData}>
        {spans}
        <div className="thead-container toggle-wrap" style={{ width: cellWidth }}>{this.props.data.title}</div>
      </div>
    );
  }
}
