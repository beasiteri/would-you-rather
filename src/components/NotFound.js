import React, { Component } from "react";
import {Card, CardHeader, CardBody, Button} from 'reactstrap';
import PropTypes from "prop-types";

class NotFound extends Component {
    constuctor() {
        this.loadHomePage = this.routeChange.bind(this);
    }

    loadHomePage() {
        this.props.history.push("/");
    }

    render() {
        NotFound.propTypes = {
            history: PropTypes.shape({
              push: PropTypes.func.isRequired
            }).isRequired
        }; 

        return(
            <Card className="notFound">
                <CardHeader>404 - Page Not Found</CardHeader>
                <CardBody>
                <p>To use this app please click the button below to return to the Home Page and Sign in!</p>      
                <Button className="btn btn-custom w-50" onClick={() => this.loadHomePage()}>
                    Home Page
                </Button>
                </CardBody>
            </Card>
        )
    }
}

export default NotFound;