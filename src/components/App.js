import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return(
      <Router>
        <Fragment>
          <div className="main-container">
            test
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App);
