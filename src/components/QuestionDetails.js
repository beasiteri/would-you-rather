import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader,CardBody, CardTitle, FormGroup, Form, Label, Input, Button } from 'reactstrap';
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
        const { question, questionAuthor, answer, total, percentageOne, percentageTwo} = this.props;
        const { selectedOption } = this.state;

        QuestionDetails.propTypes = {
            question: PropTypes.object,
            questionAuthor: PropTypes.object,
            answer: PropTypes.string,
            percentageOne: PropTypes.string.isRequired,
            percentageTwo: PropTypes.string.isRequired
        };

        return(
           <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            <p>Asked by <User id={questionAuthor.id}/></p>
                        </CardHeader>
                        <CardBody>
                            {answer ?
                                <div className="answered-quest-container">
                                    <img className="image col-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTam331V51EU5QsWoJNCRUFHmg5ILCirKGMYQ&usqp=CAU" alt="placeholder" />
                                    <FormGroup>
                                        <CardTitle>Results:</CardTitle>
                                        <FormGroup check disabled>
                                        <Label check>
                                            <Input type="radio" checked={answer==="optionOne"} readOnly/>{' '}
                                            Would you rather {question.optionOne.text}?
                                        </Label>
                                        <div className="progress">
                                            <div className={percentageOne === "0.00" ? "progress-one null-value" : "progress-one"} style={{ width: `${percentageOne}%` }}>{`${percentageOne}%`}</div>
                                        </div>
                                        <div className="total">
                                            Total number of votes: {total}
                                        </div>
                                        </FormGroup>
                                        <FormGroup check disabled>
                                        <Label check>
                                            <Input type="radio" checked={answer==="optionTwo"} readOnly/>{' '}
                                            Would you rather {question.optionTwo.text}?
                                        </Label>
                                        <div className="progress">
                                            <div className={percentageTwo === "0.00" ? "progress-two null-value" : "progress-two"} style={{ width: `${percentageTwo}%` }}>{`${percentageTwo}%`}</div>
                                        </div>
                                        <div className="total">
                                            Total number of votes: {total}
                                        </div>
                                        </FormGroup>
                                    </FormGroup>
                                    </div>:
                                    <div className="unanswered-quest-container">
                                        <img className="image col-4" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTam331V51EU5QsWoJNCRUFHmg5ILCirKGMYQ&usqp=CAU" alt="placeholder" />
                                        <Form onSubmit={this.handleSubmit}          
                                            className="form-container col-8">
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
                </Col>
           </Row>
        )
    }
}

function financial(x) {
    return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps ({ questions, users, authedUser }, { match }) {
    const answers = users[authedUser].answers;
    let answer, percentageOne, percentageTwo, total;
    const { id } = match.params;
    const question = questions[id];
    const questionAuthor = users[question.author];

    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id]
    }

    total = question.optionOne.votes.length + question.optionTwo.votes.length;

    percentageOne = financial((question.optionOne.votes.length / total) * 100);
    percentageTwo = financial((question.optionTwo.votes.length / total) * 100);

    return {
      question,
      questionAuthor,
      answer,
      total,
      percentageOne,
      percentageTwo
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