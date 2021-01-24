import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboatd extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                Dashboard
            </div>
        )
    }
}

function mapStateToProps ({questions}) {
    return {
        questions: Object.keys(questions)
        .sort((a,b) => question[b].timestamp - question[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);