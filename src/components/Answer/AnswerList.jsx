import shuffle from 'lodash/shuffle';
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { Link } from "react-router-dom";
import { withTracked } from '../../data/questions';
import Toggle from '../Toggle.jsx';
import { Answer } from './Answer';
import { AnswerInput } from './AnswerInput';
import './scss/index.scss';


// type ViewProps = RouteComponentProps<{ id: number }>;

class AnswerListClass extends Component {
  constructor(props) {
    super(props);
    let questionId = props.match.params.id
    this.state = {
      questionId,
      view: 'list',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordionVertical',
      questions: this.props.questionsState.questions,
      answers: []
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSortByTimestamp = this.toggleSortByTimestamp.bind(this);
    this.toggleSortByPopularity = this.toggleSortByPopularity.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
    this.newAnswer = this.newAnswer.bind(this);
    this.upVoteAnswer = this.upVoteAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.downVoteAnswer = this.downVoteAnswer.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  componentDidMount() {
    this.setState({ answers: this.getAnswers })
  }

  getAnswers() {
    return this.state.questions.find((question) =>
      question.id.toString() === this.state.questionId.toString()).answers;
  }

  toggleList() {
    this.setState({
      view: 'list',
      enterLeaveAnimation: 'accordionVertical'
    });
  }

  toggleGrid() {
    this.setState({
      view: 'grid',
      enterLeaveAnimation: 'accordionHorizontal'
    });
  }

  toggleSortByPopularity() {
    const sortAsc = (a, b) => a.popularity - b.popularity;
    const sortDesc = (a, b) => b.popularity - a.popularity;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'popularity',
      answers: this.state.answers.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  toggleSortByTimestamp() {
    const sortAsc = (a, b) => a.timestamp - b.timestamp;
    const sortDesc = (a, b) => b.timestamp - a.timestamp;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'chronological',
      answers: this.state.answers.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      answers: shuffle(this.state.answers)
    });
  }

  sortRotate() {
    const answers = this.state.answers.slice();
    answers.unshift(answers.pop())

    this.setState({
      sortingMethod: 'rotate',
      answers
    });
  }

  renderAnswers() {
    const answers = this.getAnswers();
    return answers.map((answer, i) => {
      return (
        <Answer
          key={answer.id}
          view={this.state.view}
          index={i}
          upVote={() => this.upVoteAnswer(answer.id)}
          downVote={() => this.downVoteAnswer(answer.id)}
          deleteAnswer={() => this.deleteAnswer(answer.id)}
          {...answer}
        />
      );
    });
  }

  newAnswer(answerTitle) {
    const { dispatch } = this.props;
    dispatch({
      questionID: this.state.questionId,
      answer: answerTitle, type: "addAnswer"
    });
    const answers = this.getAnswers();
    this.setState({ answers }); // force call the render function again
  }

  upVoteAnswer(answerID) {
    const { dispatch } = this.props;
    dispatch({
      questionID: this.state.questionId,
      answerID: answerID, type: "upVoteAnswer"
    });
    const answers = this.getAnswers();
    this.setState({ answers }); // force call the render function again
  }

  deleteAnswer(answerID) {
    const { dispatch } = this.props;
    dispatch({ questionID: this.state.questionId, answerID: answerID, type: "deleteAnswer" });
    const answers = this.getAnswers();
    this.setState({ answers }); // force call the render function again
  }

  downVoteAnswer(answerID) {
    const { dispatch } = this.props;

    dispatch({
      questionID: this.state.questionId,
      answerID: answerID, type: "downVoteAnswer"
    });
    const answers = this.getAnswers();
    this.setState({ answers }); // force call the render function again
  }

  render() {
    let question = this.state.questions.find(q=>q.id.toString()===this.state.questionId);
    return (
      <div id="answers" className={this.state.view}>
        <header id="header">
          <h2>{`Anwsers for "${question.title}" (${question.answers.length})`}</h2>
        </header>
        <header>
          <div className="abs-left">
            <Link to="/">
              <Toggle
                clickHandler={this.toggleGrid}
                text="Back" icon="th"
                active={this.state.view === 'grid'}
              />
            </Link>
            <Toggle
              clickHandler={this.toggleList}
              text="List" icon="list"
              active={this.state.view === 'list'}
            />
          </div>
          <div className="abs-right">
            <Toggle
              clickHandler={this.toggleSortByPopularity}
              text={'Popularity'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'popularity'}
            />
            <Toggle
              clickHandler={this.toggleSortByTimestamp}
              text={"Date"}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'chronological'}
            />
            <Toggle
              clickHandler={this.sortShuffle}
              text="Shuffle" icon="random"
              active={this.state.sortingMethod === 'shuffle'}
            />
            <Toggle
              clickHandler={this.sortRotate}
              text="Rotate" icon="refresh"
              active={this.state.sortingMethod === 'rotate'}
            />
          </div>
        </header>
        <div>
          <FlipMove
            staggerDurationBy="30"
            duration={500}
            enterAnimation={this.state.enterLeaveAnimation}
            leaveAnimation={this.state.enterLeaveAnimation}
            typeName="ul"
          >
            {this.renderAnswers()}

            <AnswerInput
              key="ainput"
              view={this.state.view}
              index={this.state.answers.length}
              clickHandler={this.newAnswer}
            />
          </FlipMove>
        </div>
      </div>
    );
  }
};

export const AnswerList = withTracked(AnswerListClass);

export default AnswerList;
