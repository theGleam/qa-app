import React, { Component } from 'react';

export class QuestionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestion: ""
    };
  }

  render() {
    const listClass = `list-item card ${this.props.view}`;
    const style = { zIndex: 100 };

    return (
      <li id="qinput" className={listClass} style={style}>
        <div className="col col-3 input-area">
          <h5 className="field-name">New Question</h5>
          <div className="input">
            <input
              type="text"
              value={this.state.newQuestion}
              onChange={ev => this.setState(
                {
                  newQuestion: ev.target.value
                })}
            />
          </div>
        </div>
        <button
          disabled={!this.state.newQuestion.trim()}
          onClick={(_) => {
            this.props.clickHandler(this.state.newQuestion);
            this.setState(
              {
                newQuestion: ""
              });
          }}
        >
          <i className="fa fa-add" />
        </button>
      </li>
    );
  }
}
