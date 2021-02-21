import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from 'prop-types';
import { setAuthedUser } from '../actions/authedUser';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {userId : ''};
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({userId: event.target.value});
  }

  handleSubmit(event) {
    const { userId } = this.state;
    const { authenticate } = this.props;
    if (userId) {
      authenticate(userId);
    } else {
      alert('Please select a user');
    }
    event.preventDefault();
  }

  render() {
      const { userId } = this.state; 
      const { users } = this.props;

      Login.propTypes = {
          users: PropTypes.object.isRequired,
          authenticate: PropTypes.func.isRequired
      };

      return(
          <Row className="login-container">
              <Col>
                  <div className="nav-welcome">
                    <h1>Welcome to the Would You Rather App!</h1>
                    <p>Please sign in to continue</p>
                  </div>
                  <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                          <Input type="select"    
                            name="select" value={userId}
                            onChange={this.handleChangeUser}>
                            <option value="" disabled>Select User</option>
                            {
                            Object.keys(users).map(user =>
                            <option key={user} value={user}>
                              {users[user].name}
                            </option>)
                            }
                          </Input>
                      </FormGroup>
                      <input disabled={userId === ''} type="submit" value="Sign In" />
                  </Form>
              </Col>
          </Row>
      )
  }
}

function mapStateToProps ({ users }) {
    return {
      users
    }
  }

function mapDispatchToProps(dispatch) {
    return {
      authenticate: (id) => {
        dispatch(setAuthedUser(id))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);