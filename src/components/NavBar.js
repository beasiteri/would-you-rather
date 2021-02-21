import React, { Component, Fragment } from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import classnames from 'classnames';

class NavBar extends Component {
    state = {
        isOpen: false,
        activeTab: 'home'
    };

    toggleNavbar = () =>  {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const { authedUser } = this.props;

        NavBar.propTypes = {
            authedUser: PropTypes.string,
        };

        return(
            <div>
                {authedUser &&
                <Navbar expand="md">
                    <Fragment>
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.isOpen} navbar className="d-flex justify-content-between">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === 'home' })}
                                        onClick={() => { this.toggleTab('home'); }} 
                                        tag={Link} 
                                        to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === 'newquestion' })}
                                        onClick={() => { this.toggleTab('newquestion'); }} 
                                        tag={Link} 
                                        to="/add">New Question</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === 'leaderboard' })}
                                        onClick={() => { this.toggleTab('leaderboard'); }}
                                        tag={Link} 
                                        to="/leaderboard">Leader Board</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink>UserName</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === 'logout' })}
                                        onClick={() => { this.toggleTab('logout'); }}
                                        tag={Link} 
                                        to="/logout">Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Fragment>
                </Navbar>
                }
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
      authedUser
    }
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
