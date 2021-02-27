import React, { Component } from "react";
import {Card, CardBody, CardTitle, Button} from 'reactstrap';
import PropTypes from "prop-types";

class NotFound extends Component {
    constuctor() {
        this.loadHomePage = this.routeChange.bind(this);
    }

    loadSignInPage() {
        this.props.history.push("/logout");
    }

    render() {
        NotFound.propTypes = {
            history: PropTypes.shape({
              push: PropTypes.func.isRequired
            }).isRequired
        }; 

        return(
            <Card className="notFound">
                <CardBody>
                    <CardTitle>404 - Page Not Found</CardTitle>
                    <h1>Would You Rather</h1>
                    <p>To use this app please click the button below to return to the Home Page and Sign in!</p>      
                    <Button className="btn btn-custom w-50" onClick={() => this.loadSignInPage()}>
                        Home Page
                    </Button>
                    </CardBody>
            </Card>
        )
    }
}

export default NotFound;