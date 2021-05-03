import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Col
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
//require("../sqlFiles/axios2");
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isModalOpen2: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModal2 = this.toggleModal2.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleModal2() {
        this.setState({
            isModalOpen2: !this.state.isModalOpen2
        });
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleLogin(event) {
        //alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value, grant_type: 'password'});
        event.preventDefault();
    }

    handleNewUser(event) {
        alert(`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`);
        this.toggleModal2();
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {

        return (
            <React.Fragment>
                <Jumbotron fluid>
                    <div className="container">
                        <div className="row">
                            <img src="images/Mushrooms.jpg" height="150" width="200" alt="Logo" />
                            <div className="col">
                                <br /><br />
                                <h1><b>Hello World</b></h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Navbar dark sticky="top" expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/"><img src="images/blueplane.png" height="30" width="30" alt="Logo" /></NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <i className="fa fa-home fa-lg" /> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/directory">
                                        <i className="fa fa-list fa-lg" /> Directory
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <i className="fa fa-info fa-lg" /> About
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <i className="fa fa-address-card fa-lg" /> Contact Us
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown setActiveFromChild>
                                    <DropdownToggle tag="a" className="nav-link" caret>
                                        <i className="fa fa-address-card fa-lg" /> Forms
                                </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem disabled>Stakehold Request</DropdownItem>
                                        <DropdownItem tag="a" href="/contactus" active>Survey</DropdownItem>
                                        <DropdownItem disabled>Info Request</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem tag="a" href="/contactus" active>Contact Us</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem className="user buttons">
                                    {!this.props.auth.isAuthenticated
                                        ?
                                        <Button outline onClick={this.toggleModal} className="userbtn" >
                                            <i className="fa fa-sign-in fa-lg" /> Login
                                            {this.props.auth.isFetching
                                                ? <span className="fa fa-spinner fa-pulse fa-fw" />
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout} className="userbtn">
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching
                                                    ? <span className="fa fa-spinner fa-pulse fa-fw" />
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                                <NavItem className="ml-2">
                                    {this.props.auth.newUser
                                        ?
                                        <Button onClick={this.toggleModal2} className="newUserBtn">
                                            <i className="fa fa-user-plus fa-lg" /> New User
                                            {this.props.auth.isFetching
                                                ? <span className="fa fa-spinner fa-pulse fa-fw" />
                                                : null
                                            }
                                        </Button>
                                        : null
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={input => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={input => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isModalOpen2} toggle={this.toggleModal2}>
                    <ModalHeader toggle={this.toggleModal2}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleNewUser}>
                            <FormGroup>
                                <Label htmlFor="username">Name</Label>
                                <Col md={8}>
                                <Input type="text" id="firstName" name="firstName" placeholder="First"
                                    innerRef={input => this.firstName = input} />
                                    </Col>
                                    <Col md={8}>
                                <Input type="text" id="lastName" name="lastName" placeholder="Last"
                                    innerRef={input => this.lastName = input} />
                                    </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email"
                                    innerRef={input => this.email = input} placeholder="xxx@gmail.com"/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={input => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={input => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;