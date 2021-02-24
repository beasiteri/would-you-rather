import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader,CardBody, CardTitle, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import User from './User';
import { handleAnswer } from '../actions/shared';

class QuestionDetails extends Component {
    state = {
        selectedOption: ''
    }; 

    selectedAnswer = (e) => {
        this.setState({
          selectedOption: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveAnswer(this.state.selectedOption);
      };

    render () {
        const { question, questionAuthor, answer, total, percentageOne, percentageTwo, votePercentageOne, votePercentageTwo } = this.props;
        const { selectedOption } = this.state;

        QuestionDetails.propTypes = {
            question: PropTypes.object,
            questionAuthor: PropTypes.object,
            answer: PropTypes.string,
            percentageOne: PropTypes.string.isRequired,
            percentageTwo: PropTypes.string.isRequired
        };

        return(
            <Card className="question-details">
                <CardHeader>
                    <p>Asked by <User id={questionAuthor.id}/></p>
                    {console.log(questionAuthor.avatarURL)}
                </CardHeader>
                <CardBody>
                    {answer ?
                        <div className="answered-quest-container">
                            <img className="image col-xs-12 col-sm-4" src={`/${questionAuthor.avatarURL}`}alt="avatar" />
                            <FormGroup className="col-xs-12 col-sm-8">
                                <CardTitle>Results:</CardTitle>
                                <FormGroup check disabled className={answer==='optionOne' && 'isChecked'}>
                                <span className="your-vote-icon">Your<br/>vote</span>
                                <Label check>
                                    <Input type="radio" checked={answer==="optionOne"} readOnly/>{' '}
                                    Would you rather {question.optionOne.text}?
                                </Label>
                                <div className="progress">
                                    <div className={percentageOne === "0.00" ? "progress-one null-value" : "progress-one"} style={{ width: `${percentageOne}%` }}>{`${percentageOne}%`}</div>
                                </div>
                                <div className="total">
                                    <p>{votePercentageOne} out of {total} votes</p>
                                </div>
                                </FormGroup>
                                <FormGroup check disabled className={answer==='optionTwo' && 'isChecked'}>
                                <span className="your-vote-icon">Your<br/>vote</span>
                                <Label check>
                                    <Input type="radio" checked={answer==="optionTwo"} readOnly/>{' '}
                                    Would you rather {question.optionTwo.text}?
                                </Label>
                                <div className="progress">
                                    <div className={percentageTwo === "0.00" ? "progress-two null-value" : "progress-two"} style={{ width: `${percentageTwo}%` }}>{`${percentageTwo}%`}</div>
                                </div>
                                <div className="total">  
                                    <p>{votePercentageTwo} out of {total} votes</p>
                                </div>
                                </FormGroup>
                            </FormGroup>
                            </div>:
                            <div className="unanswered-quest-container">
                                <img className="image col-xs-12 col-sm-4" src={`/${questionAuthor.avatarURL}`} alt="avatar" />
                                <Form onSubmit={this.handleSubmit}          
                                    className="form-container col-xs-12 col-sm-8">
                                    <FormGroup tag="fieldset">
                                        <CardTitle>Would You Rather...</CardTitle>
                                        <FormGroup >
                                        <Label >
                                            <Input type="radio" name="radio1" value="optionOne" onChange={this.selectedAnswer} />{' '}
                                            {question.optionOne.text}
                                        </Label>
                                        </FormGroup>
                                        <FormGroup >
                                        <Label >
                                            <Input type="radio" name="radio1" value="optionTwo" onChange={this.selectedAnswer} />{' '}
                                            {question.optionTwo.text}
                                        </Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <Button className="btn btn-custom" disabled={selectedOption === ''}>Submit</Button>
                                </Form>
                            </div>
                            
                    }
                </CardBody>
            </Card>
        )
    }
}

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps ({ questions, users, authedUser }, { match }) {
    const answers = users[authedUser].answers;
    let answer, percentageOne, percentageTwo, total, votePercentageOne, votePercentageTwo;
    const { id } = match.params;
    const question = questions[id];
    const questionAuthor = users[question.author];

    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id]
    }

    total = question.optionOne.votes.length + question.optionTwo.votes.length;

    percentageOne = financial((question.optionOne.votes.length / total) * 100);
    percentageTwo = financial((question.optionTwo.votes.length / total) * 100);

    votePercentageOne = Math.round((percentageOne * total) / 100);
    votePercentageTwo = Math.round((percentageTwo * total) / 100);

    return {
      question,
      questionAuthor,
      answer,
      total,
      percentageOne,
      percentageTwo,
      votePercentageOne,
      votePercentageTwo
    }
  }
  
  function mapDispatchToProps(dispatch, props) {
    const { id } = props.match.params;
  
    return {
      saveAnswer: (answer) => {
        dispatch(handleAnswer(id, answer))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);