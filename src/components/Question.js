import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';

class Question extends Component {
    constuctor() {
        this.loadQuestionDetails = this.routeChange.bind(this);
    }

    loadQuestionDetails(e, questionId) {
        let path = `/questions/`+questionId;
        this.props.history.push(path);
    }

    render() {
        const {question, auth, author } = this.props;

        Question.propTypes = {
            question: PropTypes.object.isRequired,
            history: PropTypes.object.isRequired
        };

        return (
            <Card onClick={(e) => this.loadQuestionDetails(e, question.id)}>
                <CardHeader>{author.name} asks:</CardHeader>
                <CardBody>
                    <img className="image col-xs-12 col-sm-5" src={author.avatarURL} alt="avatar" />
                    <ul className="col-xs-12 col-sm-7">
                        <CardTitle>Would You Rather</CardTitle>
                        <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>...{question.optionOne.text}...</li>
                        <Button className="btn btn-custom">View Pull</Button>
                    </ul>
                </CardBody>
            </Card>
        )
    }
}

function mapStateToProps (state, { id }) {
    return {
      question : state.questions[id],
      auth: state.authedUser,
      author: state.users[state.questions[id].author]
    }
  }

export default withRouter(connect(mapStateToProps, null)(Question));