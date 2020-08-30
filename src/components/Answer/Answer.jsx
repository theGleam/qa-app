import moment from 'moment';
import React, { Component } from 'react';

export class Answer extends Component {
  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 - this.props.index };

    return (
      <li id={this.props.id} className={listClass} style={style}>
        <div>
          <h3>{this.props.title}</h3>
          <h5>{moment(this.props.timestamp).format('Do MMM, YYYY')}</h5>
          <h5>Popularity: {this.props.popularity}</h5>
        </div>
        {/* <h3>{this.props.popul}</h3> */}
        <div className="button-container">
          <button onClick={this.props.upVote}>
            <i className="fa fa-arrow-up" />
          </button>
          <button onClick={this.props.downVote}>
            <i className="fa fa-arrow-down" />
          </button>
          <button onClick={this.props.deleteAnswer}>
            <i className="fa fa-close" />
          </button>
        </div>
      </li>
    );
  }
}

