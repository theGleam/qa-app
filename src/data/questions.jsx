import React, { useReducer, Reducer } from "react";

import { createContainer } from "react-tracked";

// const { currencies, geolocalization, rates } = useContext(ShopContext);


const getNewId = (idArray) => {
  console.log(idArray);
  const currentIds = idArray.map(o => (o.id));
  return Math.max(...currentIds) + 1;
}

const initialState = {
  questions: [
    { id: 1, timestamp: 811396800000, title: 'How to be good?', popularity: 0, answers: [], },
    { id: 2, timestamp: 1108702800000, title: 'Is there life after death?', popularity: 0, answers: [], },
    { id: 3, timestamp: 1156564800000, title: 'Who is God?', popularity: 0, answers: [], },
    { id: 4, timestamp: 1256443200000, title: 'Why do I like Girls?', popularity: 0, answers: [], },
    { id: 5, timestamp: 1286942400000, title: 'How can I make a girl want to have sex with me?', popularity: 0, answers: [], },
    { id: 6, timestamp: 1331697600000, title: 'How to do in know she loves me?', popularity: 0, answers: [], },
    { id: 7, timestamp: 1369800000000, title: 'Why am I on earth?', popularity: 0, answers: [], }
  ],
};

type State = typeof initialState;

type Action =
  | { type: "addQuestion"; question: string }
  | { type: "addAnswer"; questionID: number, answer: string }
  | { type: "deleteQuestion"; questionID: number } // increase popularity
  | { type: "upVoteQuestion"; questionID: number } // increase popularity
  | { type: "downVoteQuestion"; questionID: number } // decrease popularity
  | { type: "deleteAnswer"; questionID: number, answerID: number } // increase popularity
  | { type: "upVoteAnswer"; questionID: number, answerID: number } // increase popularity
  | { type: "downVoteAnswer"; questionID: number, answerID: number } // decrease popularity
  | { type: "updateAnswers"; questionID: number; answers: [] }
  | { type: "updateQuestions"; questions: [] };

const reducer: Reducer<State, Action> = (state, action) => {
  let questions = []
  let question;
  let questionIndex;
  switch (action.type) {
    case "addQuestion":
      questions = state.questions;
      console.log(questions);
      console.log(typeof(questions));
      const id = Math.max(...(questions.map(o => (o.id)))) + 1;
      const timestamp = new Date().getTime();
      const title = action.question;
      const popularity = 0;
      const answers = [];

      const newQuestion = {
        id,
        timestamp,
        title,
        popularity,
        answers,
      }
      questions.push(newQuestion)

      return {
        questions
      };

    case "addAnswer":
      questions = state.questions;
      questions = questions.map((question) => {
        if (question.id.toString() === action.questionID.toString()) {
          console.log("wegor here!");
          const id = getNewId(question.answers);
          const timestamp = new Date().getTime();
          const title = action.answer;
          const popularity = 0;

          const newAnswer = {
            id,
            timestamp,
            title,
            popularity,
          }
          question.answers.push(newAnswer)
        }
        return question;
      })
      return {
        questions
      };

    case "deleteAnswer":
      questions = state.questions;
      questions = questions.map((question) => {
        if (question.id.toString() === action.questionID.toString()) {
          const answers = question.answers;
          const answer = answers.find((answer) => (answer.id === action.answerID));
          if (!!answer) {
            const answerIndex = answers.indexOf(answer);
            answers.splice(answerIndex, 1)
          }
          question.answers = answers;
        }
        return question;
      })
      return {
        questions
      };

    case "upVoteAnswer":
      questions = state.questions;
      questions = questions.map((question) => {
        if (question.id.toString() === action.questionID.toString()) {
          question.answers.map((answer) => {
            if (answer.id === action.answerID) {
              answer.popularity += 1;
            }
            return answer;
          })
        }
        return question;
      })
      return {
        questions
      };

    case "downVoteAnswer":
      questions = state.questions;
      questions = questions.map((question) => {
        if (question.id.toString() === action.questionID.toString()) {
          question.answers.map((answer) => {
            if (answer.id === action.answerID) {
              answer.popularity -= 1;
            }
            return answer;
          })
        }
        return question;
      })
      return {
        questions
      };

    case "deleteQuestion":
      questions = state.questions;
      question = questions.find((question) => (question.id === action.questionID));
      console.log(question);
      if (!!question) {
        questionIndex= questions.indexOf(question);
        console.log(questionIndex);
        questions.splice(questionIndex, 1)
      }
      return {
        questions
      };

    case "upVoteQuestion":
      questions = state.questions;
      question = questions.find((question) => (question.id === action.questionID));
      questionIndex= questions.indexOf(question);
      if (!!question) {
        questions[questionIndex].popularity += 1;
      }
      return {
        questions
      };

    case "downVoteQuestion":
      questions = state.questions;
      question = questions.find((question) => (question.id === action.questionID));
      questionIndex= questions.indexOf(question);
      if (!!question) {
        questions[questionIndex].popularity -= 1;
      }
      return {
        questions
      };
    case "updateAnswers":
      questions = state.questions;
      question = questions.find((question) => (question.id === action.questionID));
      questionIndex= questions.indexOf(question);
      if (!!question) {
        questions[questionIndex].answers = action.answers;
      }
      return {
        questions
      };

    case "updateQuestions":
      return {
        questions: action.questions
      };
    default:
      throw new Error("unknown action type");
  }
};

const useValue = () => useReducer(reducer, initialState);

export const { Provider, useTracked } = createContainer(useValue);

export const withTracked = Component => props => {
  const [state, dispatch] = useTracked();
  return <Component questionsState={state} dispatch={dispatch} {...props} />;
};

