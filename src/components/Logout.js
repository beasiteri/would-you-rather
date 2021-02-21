import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Logout extends Component {
    render() {
        return <Redirect to='/' />
    }
}

export default connect()(Logout);