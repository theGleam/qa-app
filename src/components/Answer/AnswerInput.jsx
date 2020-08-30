import React, { Component } from 'react';

export class AnswerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAnswer: ""
    };
  }

  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 };

    return (
      <li id="qinput" className={listClass} style={style}>
        <div className="col col-3 input-area">
          <h5 className="field-name">New Answer</h5>
          <div className="input">
            <input
              type="text"
              value={this.state.newAnswer}
              onChange={ev => this.setState(
                {
                  newAnswer: ev.target.value
                })}
            />
          </div>
        </div>
        <button
          disabled={!this.state.newAnswer.trim()}
          onClick={(_) => {
            this.props.clickHandler(this.state.newAnswer);
            this.setState(
              {
                newAnswer: ""
              });
          }}
        >
          <i className="fa fa-add" />
        </button>
      </li>
    );
  }
}
