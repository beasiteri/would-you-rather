import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

class Routes extends Component {
    render() {
        const { notLoggedIn } = this.props;

        Routes.propTypes = {notLoggedIn: PropTypes.any};

        return(
            <div className="container">
                <Switch>
                {
                    notLoggedIn ? 
                    <Route path="/" exact component={Login}/> :
                    <Fragment>
                        <Route path='/' exact component={Dashboard} />
                    </Fragment>
                }
            </Switch>
            </div>
        )
    }
}

export default Routes;