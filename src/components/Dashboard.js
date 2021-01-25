import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Dashboard extends Component {
    state = {
        activeTab: '1'
    };

    toggleTab = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        } 
    };

    render() {
        return (
            <div>
                <Nav>
                    <NavItem>
                        <NavLink onClick={() => {this.toggleTab('1')}}
                            className={classnames({ active: this.state.activeTab === '1' })}>
                            Unanswered
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => {this.toggleTab('2')}}
                        className={classnames({ active: this.state.activeTab === '2' })}>
                            Answered
                        </NavLink>
                    </NavItem>
                    
                </Nav>
            </div>
        )
    }
}

function mapStateToProps ({questions}) {
    return {
        questions: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);