import React, { Component, Fragment } from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";

class NavBar extends Component {
    state = {
        isOpen: false
    };

    toggleNavbar = () =>  {
        this.setState({
          isOpen: !this.state.isOpen
        });
    };

    render() {
        const { authedUser } = this.props;

        NavBar.propTypes = {
            authedUser: PropTypes.string,
        };

        return(
            <div>
                <Navbar bg="primary" variant="dark" light expand="md">
                {authedUser && 
                <Fragment>
                    <NavbarToggler onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.isOpen} navbar className="d-flex justify-content-between">
                        <Nav navbar>
                            <NavItem>
                                <NavLink>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>New Question</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Leader Board</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink>UserName</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Fragment>
                }
                </Navbar>
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
