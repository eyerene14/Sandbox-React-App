import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Text } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item }) {
    return (
        <Card>
            <CardBody>
                <CardTitle>{item}</CardTitle>
                <CardText>{item}</CardText>
            </CardBody>
        </Card>
    );
}

function About(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.sData[0]} />
                    {props.sData[0]}
                </div>

            </div>
        </div>
    );
}

export default About;  