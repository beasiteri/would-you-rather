import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Logout from "./Logout";
import QuestionDetails from "./QuestionDetails";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { notLoggedIn } = this.props;

    App.propTypes = {
      handleInitialData : PropTypes.func.isRequired,
      notLoggedIn: PropTypes.bool.isRequired
    };

    return(
      <Router>
          <NavBar />
          <Switch>
            {
                notLoggedIn ? <Route path='/' exact component={Login}/> :
                <Fragment>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/add' component={NewQuestion} />
                    <Route path="/questions/:id" component={QuestionDetails} />
                    <Route exact path='/leaderboard' component={LeaderBoard} />
                    <Route exact path='/logout' component={Logout} />
                </Fragment>
            }
            <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData())
    }
  }
}

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser === null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
