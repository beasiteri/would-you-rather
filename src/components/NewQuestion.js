import React, { Component, Fragment } from 'react';
import { Card, CardHeader, CardBody, CardTitle, Form, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { handleAddQuestion } from '../actions/shared';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        redirect: false
    };

    handleChangeOptionOne = (event) => {
        event.preventDefault();
        this.setState({
            optionOne: event.target.value
        })
    };

    handleChangeOptionTwo = (event) => {
        event.preventDefault();
        this.setState({
            optionTwo: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { optionOne, optionTwo } = this.state;
        this.props.addQuestion(optionOne, optionTwo);
        this.setState({ redirect: true })
    };

    render() {
        const { optionOne, optionTwo } = this.state;

        NewQuestion.propTypes = {
            authedUser: PropTypes.string,
            addQuestion: PropTypes.func.isRequired,
        };

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return(
            <Fragment>
                <NavBar />
                <Card className="newQuestion">
                <CardHeader className="text-center py-2">Create New Question</CardHeader>
                <CardBody>
                    <CardTitle>Would you rather...</CardTitle>
                    <Form onSubmit={this.handleSubmit}>
                        <Input type="text" name="optionOne" value={optionOne} onChange={this.handleChangeOptionOne} placeholder="Enter Option One Text Here" />
                        <p className="my-2 text-center">OR</p>
                        <Input type="text" name="optionTwo" value={optionTwo} onChange={this.handleChangeOptionTwo} placeholder="Enter Option Two Text Here" />
                        <Button disabled={optionOne === '' || optionTwo === ''} className="btn btn-custom">Submit</Button>
                    </Form>
                </CardBody>
                </Card>
            </Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      addQuestion: (optionOne, optionTwo) => {
        dispatch(handleAddQuestion(optionOne, optionTwo))
      }
    }
}

export default connect(null, mapDispatchToProps)(NewQuestion);