import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { addComment, loginUser, logoutUser} from '../redux/ActionCreators';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { IMAGES } from '../shared/images';
//const sqlConnect = require('../routes/sqlConnect');

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    //postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    //postFeedback: feedback => (postFeedback(feedback)),
    //fetchCampsites: () => (fetchCampsites()),
    loginUser: creds => (loginUser(creds)),
    logoutUser: () => (logoutUser())
};

//Returned data from state/redux
const mapStateToProps = state => {
    return {
        //campsites: state.campsites,
        //comments: state.comments,
        //cc: state.ccData,
        auth: state.auth
    };
};

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsitesLocal: CAMPSITES,
            commentsLocal: COMMENTS,
            imagesLocal: IMAGES,
            authenticated:
            {
                auth: false,
                isAuthenticated: true,
                isFetching: true,
                user: {
                    username: 'Hello World'
                }

            }
        };
    }

    componentDidMount() {
        //this.props.fetchCampsites();
        //this.props.fetchComments();
        //this.props.fetchSafetyData();
        //this.props.fetchFoqaData();
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    homePageImage={this.state.imagesLocal[0]}
                campsite={this.state.campsitesLocal.filter(campsite => campsite)[0]}
                //fData={this.props.fd.foqaData}
                />
            );
        };

        const CampsiteWithId = ({ match }) => {
            return (
                <CampsiteInfo
                    campsite={this.state.campsitesLocal.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.state.commentsLocal.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                    postComment={this.props.postComment}
                />
            );
        };

        return (
            <div>
                <Header auth={this.state.authenticated}
                    loginUser={this.props.loginUser}
                    logoutUser={this.props.logoutUser}
                />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/contactus' render={() => <Contact resetCCSurveyForm={this.props.resetCCSurveyForm} />} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsitesLocal} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Redirect to='/home' component={HomePage} />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

//<Route exact path='/otherform' render={() => <Other postCCForm={this.props.postCCForm} resetForm={this.props.resetCCSurveyForm}/>} />
//<Route exact path='/otherform' render={() => <Other postCC={this.props.postCC} resetForm={this.props.resetCCSurveyForm}/>} />