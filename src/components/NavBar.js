import React, { Component, Fragment } from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import {connect} from "react-redux";
import classnames from 'classnames';
import User from "./User";

class NavBar extends Component {
    state = {
        isOpen: false,
        activeTab: window.location.pathname
    };

    toggleNavbar = () =>  {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    toggleTab() {
        if (this.state.activeTab !== window.location.pathname) {
            this.setState({
                activeTab: window.location.pathname
            });
        }
    }

    render() {
        const { authedUser } = this.props;

        NavBar.propTypes = {
            authedUser: PropTypes.string,
        };

        return(
            <Fragment>
                {authedUser &&
                <Navbar bg="primary" variant="dark" light expand="md">
                    <Fragment>
                        <NavbarBrand className="d-sm-block d-md-none" tag={Link} to="/">Would You Rather</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === '/' })}
                                        onClick={() => { this.toggleTab(); }} 
                                        tag={Link} 
                                        to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === '/add' })}
                                        onClick={() => { this.toggleTab(); }} 
                                        tag={Link} 
                                        to="/add">New Question</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        className={classnames({ active: this.state.activeTab === '/leaderboard' })}
                                        onClick={() => { this.toggleTab(); }}
                                        tag={Link} 
                                        to="/leaderboard">Leader Board</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav navbar>
                                <NavItem>
                                    <User id={authedUser}/>
                                </NavItem>
                                <NavItem>
                                    <NavLink 
                                        tag={Link} 
                                        to="/logout">Logout</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Fragment>
                </Navbar>
                }
            </Fragment>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
      authedUser
    }
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
