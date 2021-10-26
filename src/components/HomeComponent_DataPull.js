import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import {CAMPSITES} from '../shared/campsites';
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

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.fData[0].Human_Factor} />
                    {props.fData[0].Cause}
                </div>

            </div>
        </div>
    );
}

/*                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
                */

export default Home;  