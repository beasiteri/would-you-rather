import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Logout from "./Logout";
import QuestionDetails from "./QuestionDetails";
import NotFound from './NotFound';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props;

    App.propTypes = {
      handleInitialData : PropTypes.func.isRequired,
    };

    return(
      <Router>
        <div className="app">
          {authedUser === null ? <Route path='/' component={Login} /> :
              <Fragment>
                  <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/add' component={NewQuestion} />
                    <Route path="/questions/:id" component={QuestionDetails} />
                    <Route exact path='/leaderboard' component={LeaderBoard} />
                    <Route exact path='/logout' component={Logout} />
                    <Route path='/not-found' component={NotFound} />
                  </Switch>
              </Fragment>
          }
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App);
