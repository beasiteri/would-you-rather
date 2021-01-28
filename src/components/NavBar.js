import React, { Component, Fragment } from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from "prop-types";

class NavBar extends Component {
    render() {
        const { authedUser } = this.props;
        
        NavBar.propTypes = {
            authedUser: PropTypes.string,
        };

        return(
            <div>
                <Navbar>
                {authedUser && 
                    <Fragment>
                        <NavbarToggler>
                            <Collapse>
                                <Nav>
                                    <NavItem>
                                        <NavLink>Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>New Question</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>Leader Board</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>UserName</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </NavbarToggler>
                    </Fragment>
                
                }
                </Navbar>
            </div>
        )
    }
}

export default NavBar;
