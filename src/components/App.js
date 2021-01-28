import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  mapDispatchToProps(dispatch) {
    return {
      handleInitialData: () => {
        dispatch(handleInitialData())
      }
    }
  }

  render() {
    const { notLoggedIn } = this.props;

    App.propTypes = {
      handleInitialData : PropTypes.func.isRequired,
      notLoggedIn: PropTypes.bool.isRequired
    };

    return(
      <Router>
        <Fragment>
          <div className="main-container">
            <NavBar />
            <Routes notLoggedIn={notLoggedIn}/>
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App);
