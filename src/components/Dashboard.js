import React, { Component, Fragment } from 'react';
import { Nav, NavItem, NavLink, TabContent,TabPane, Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Question from './Question';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

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
        const { unansweredQuestions, answeredQuestions } = this.props;

        Dashboard.propTypes = {
            answeredPolls : PropTypes.array,
            unansweredPolls : PropTypes.array
        };

        return (
            <Fragment>
                <NavBar />
                <div className="dashboard">
                <Nav className="d-flex flex-nowrap">    
                    <NavItem className="navItem w-100 text-center">
                        <NavLink onClick={() => {this.toggleTab('1')}}
                            className={classnames({ active: this.state.activeTab === '1' })}>
                            Unanswered
                        </NavLink>
                    </NavItem>
                    <NavItem className="navItem w-100 text-center">
                        <NavLink onClick={() => {this.toggleTab('2')}}
                        className={classnames({ active: this.state.activeTab === '2' })}>
                            Answered
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent className="tab-content" activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                        {unansweredQuestions.map(qid =>
                            <Col key={qid}>
                                <Question id={qid}/>
                            </Col>
                        )}
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                        {answeredQuestions.map(qid =>
                            <Col key={qid}>
                                <Question id={qid}/>
                            </Col>
                        )}
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
            </Fragment>
        )
    }
}

function mapStateToProps ({ questions, users, authedUser }) {
    const user = users[authedUser];
    const answeredQuestions = Object.keys(user.answers)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    return {
      unansweredQuestions : Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
      answeredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard);