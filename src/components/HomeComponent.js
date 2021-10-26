import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item }) {
    return (
        <Card>
            <CardImg width="10%" src={'../'+ item.image} alt={item.name} />
            <CardBody>          
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderText({ item }) {
    return (
            <div className="container" className="helloworld">
                <div className="row">
                    <div className="col-4 col-sm-2 offset-1">
                        Hello World!!!
                    </div>
                    </div></div>
                    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard item={props.campsite} />
                    <RenderText ></RenderText>
                </div>

            </div>
        </div>
    );
}

//            <CardImg width="10%" src={'../'+ item.image} alt={item.name} />

/*                <div className="col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner} />
                </div>
                */

export default Home;  