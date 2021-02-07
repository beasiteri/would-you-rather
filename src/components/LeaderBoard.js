import React, { Component } from 'react';
import { connect } from "react-redux";

class LeaderBoard extends Component {
    render() {
        return(
            <div>
                test LeaderBoard
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    const userScore = user =>
      Object.keys(user.answers).length + user.questions.length;
    return {
      users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
    }
};

export default connect(mapStateToProps)(LeaderBoard);