import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.jsx';
import QuestionList from './components/Question/QuestionList.jsx';
import { Provider } from "./data/questions.jsx";
import './scss/main.scss';
import AnswerList from './components/Answer/AnswerList.jsx';



class App extends Component {
  availablePaths() { return this.props.route.childRoutes.map(route => route.path) }
  currentPath() { return this.props.location.pathname.replace(/^\//, '') }

  render() {
    return (
      <div className="app">
        <Header paths={this.availablePaths()} path={this.currentPath()} />
        <section id="main-content">
          {this.props.children}
        </section>
      </div>
    );
  }
};



ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <Route path="/" component={App}>
        <Route component={QuestionList} />
        <Route path="/question/:id" component={AnswerList} />
      </Route>
    </Provider>
  </BrowserRouter>, document.getElementById('root')
);

// render((
//   <Router>
//     <Route path="/" component={App}>
//       <Route component={QuestionList} />
//       {/* <Route path="question:id" component={QuestionDetails} /> */}

//     </Route>
//   </Router>
// ), document.getElementById('root'))
