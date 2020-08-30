import shuffle from 'lodash/shuffle';
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { withTracked } from '../../data/questions';
import Toggle from '../Toggle.jsx';
import { Question } from './Question';
import { QuestionInput } from './QuestionInput';
import './scss/index.scss';



class QuestionListClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'list',
      order: 'asc',
      sortingMethod: 'chronological',
      enterLeaveAnimation: 'accordionVertical',
      questions: this.props.questionsState.questions,
    };

    this.toggleList = this.toggleList.bind(this);
    this.toggleGrid = this.toggleGrid.bind(this);
    this.toggleSortByAnswers = this.toggleSortByAnswers.bind(this);
    this.toggleSortByTimestamp = this.toggleSortByTimestamp.bind(this);
    this.toggleSortByPopularity = this.toggleSortByPopularity.bind(this);
    this.sortRotate = this.sortRotate.bind(this);
    this.sortShuffle = this.sortShuffle.bind(this);
    this.newQuestion = this.newQuestion.bind(this);
    this.upVoteQuestion = this.upVoteQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.downVoteQuestion = this.downVoteQuestion.bind(this);
  }

  // componentDidMount() {
  //   const [questionsState, dispatch] = this.props;
  //   this.setState({
  //     questions: questionsState.questions
  //   })
  //   this.toggleSortByPopularity
  // }

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

  toggleSortByAnswers() {
    const sortAsc = (a, b) => a.answers.length - b.answers.length;
    const sortDesc = (a, b) => b.answers.length - a.answers.length;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'answers',
      questions: this.state.questions.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  toggleSortByPopularity() {
    const sortAsc = (a, b) => a.popularity - b.popularity;
    const sortDesc = (a, b) => b.popularity - a.popularity;

    this.setState({
      order: (this.state.order === 'asc' ? 'desc' : 'asc'),
      sortingMethod: 'popularity',
      questions: this.state.questions.sort(
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
      questions: this.state.questions.sort(
        this.state.order === 'asc' ? sortDesc : sortAsc
      )
    });
  }

  sortShuffle() {
    this.setState({
      sortingMethod: 'shuffle',
      questions: shuffle(this.state.questions)
    });
  }

  sortRotate() {
    const questions = this.state.questions.slice();
    questions.unshift(questions.pop())

    this.setState({
      sortingMethod: 'rotate',
      questions
    });
  }

  renderQuestions() {
    return this.state.questions.map((question, i) => {
      return (
        <Question
          key={question.id}
          view={this.state.view}
          index={i}
          upVote={() => this.upVoteQuestion(question.id)}
          downVote={() => this.downVoteQuestion(question.id)}
          deleteQuestion={() => this.deleteQuestion(question.id)}
          {...question}
        />
      );
    });
  }

  newQuestion(questionTitle) {
    const { dispatch } = this.props;
    dispatch({ question: questionTitle, type: "addQuestion" });
    const questions = this.state.questions;
    this.setState({ questions }); // force call the render function again
  }

  upVoteQuestion(questionID) {
    const { dispatch } = this.props;
    console.log(questionID)
    dispatch({ questionID: questionID, type: "upVoteQuestion" });
    const questions = this.state.questions;
    this.setState({ questions }); // force call the render function again
  }

  deleteQuestion(questionID) {

    const { dispatch } = this.props;
    console.log(questionID)

    dispatch({ questionID: questionID, type: "deleteQuestion" });
    const questions = this.state.questions;
    console.log(questions);
    console.log(questions.length);
    this.setState({ questions }); // force call the render function again
  }

  downVoteQuestion(questionID) {
    const { dispatch } = this.props;
    console.log(questionID)

    dispatch({ questionID: questionID, type: "downVoteQuestion" });
    const questions = this.state.questions;
    this.setState({ questions }); // force call the render function again
  }

  render() {
    const hide = this.props.location.pathname.includes("question");
    return (
      <div id="questions" className={`${this.state.view} ${hide ? "hide" : ""}`}>
        <header id="header">
          <h2>Questions ({this.state.questions.length})</h2>
        </header>
        <header>
          <div className="abs-left">
            <Toggle
              clickHandler={this.toggleList}
              text="List" icon="list"
              active={this.state.view === 'list'}
            />
            <Toggle
              clickHandler={this.toggleGrid}
              text="Grid" icon="th"
              active={this.state.view === 'grid'}
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
              clickHandler={this.toggleSortByAnswers}
              text={'Answers'}
              icon={this.state.order === 'asc' ? 'angle-up' : 'angle-down'}
              active={this.state.sortingMethod === 'answers'}
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
            {this.renderQuestions()}

            <QuestionInput
              key="qinput"
              view={this.state.view}
              index={this.state.questions.length}
              clickHandler={this.newQuestion}
            />
            {/* <footer key="foot">
              <div className="abs-right">
                <Toggle
                  clickHandler={() => (
                    this.moveQuestion('removedQuestions', 'questions')
                  )}
                  text="Add Item"
                  icon="plus"
                  active={this.state.removedQuestions.length > 0}
                />
                <Toggle
                  clickHandler={() => (
                    this.moveQuestion('questions', 'removedQuestions')
                  )}
                  text="Remove Item"
                  icon="close"
                  active={this.state.questions.length > 0}
                />
              </div>
            </footer> */}
          </FlipMove>
        </div>
      </div>
    );
  }
};

export const QuestionList = withTracked(QuestionListClass);

export default QuestionList;
