import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class NewQuestion extends Component {
    render() {
        return(
            <div className="newQuestion">
                <Row>
                <Col className="p-0">
                    <Card>
                        <CardHeader className="text-center py-2">Create New Question</CardHeader>
                        <CardBody>
                            <CardTitle>Would you rather...</CardTitle>
                            <Form>
                                <Input type="text" name="optionOne" placeholder="Enter Option One Text Here" />
                                <p className="my-2 text-center">OR</p>
                                <Input type="text" name="optionTwo" placeholder="Enter Option Two Text Here" />
                                <Button className="btn btn-custom">Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            </div>
        )
    }
}

export default NewQuestion;