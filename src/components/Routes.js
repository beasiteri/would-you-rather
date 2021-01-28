import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Logout from "./Logout";

class Routes extends Component {
    render() {
        const { notLoggedIn } = this.props;

        Routes.propTypes = {notLoggedIn: PropTypes.any};

        return(
            <div className="container">
                <Switch>
                {
                    notLoggedIn ? <Route path='/' exact component={Login}/> :
                    <Fragment>
                        <Route exact path='/' component={Dashboard} />
                        <Route exact path='/add' component={NewQuestion} />
                        <Route exact path='/leaderboard' component={LeaderBoard} />
                        <Route exact path='/logout' component={Logout} />
                    </Fragment>
                }
            </Switch>
            </div>
        )
    }
}

export default Routes;