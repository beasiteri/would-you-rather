import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';

class Question extends Component {
    constuctor() {
        this.loadQuestionDetails = this.routeChange.bind(this);
    }

    loadQuestionDetails(e, questionId) {
        let path = `/questions/`+questionId;
        this.props.history.push(path);
    }

    render() {
        const {question, auth} = this.props;

        Question.propTypes = {
            question: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired
        };

        return (
            <div>
                <Card onClick={(e) => this.loadQuestionDetails(e, question.id)}>
                    <CardHeader>Username asks:</CardHeader>
                    <CardBody>
                        <img className="image col-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTam331V51EU5QsWoJNCRUFHmg5ILCirKGMYQ&usqp=CAU" />
                        <ul className="col-8">
                            <CardTitle>Would You Rather</CardTitle>
                            <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>...{question.optionOne.text}...</li>
                            <button className="btn w-100">View Pull</button>
                        </ul>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

function mapStateToProps (state, { id }) {
    return {
      question : state.questions[id],
      auth: state.authedUser
    }
  }

export default withRouter(connect(mapStateToProps, null)(Question));