import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import NavBar from './NavBar';

class LeaderBoard extends Component {
    render() {
        const { users } = this.props;

        LeaderBoard.propTypes = {
            users: PropTypes.array.isRequired
          };
        return(
            <Fragment>
                <NavBar />
                <div className="leaderboard">
                {users.map((user, index) => (
                    <div key={index} className="user-leaderboard">
                        <div className="user-avatar">
                            <img src={user.avatarURL} className="avatar" alt={user.name}/>
                        </div>
                        <div className="container">
                            <div className="user-question-score-container">
                                <p>{user.name}</p>
                                <div className="user-question-score">
                                    <div>
                                        <p>Answered questions</p>
                                        <p>{user.questions.length}</p>
                                    </div>
                                    <div>
                                        <p>Created questions</p>
                                        <p>{user.questions.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="total-score">
                                <p>Score</p>
                                <span>{Number(user.questions.length) + Number(user.questions.length)}</span>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </Fragment>
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