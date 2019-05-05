import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    MDBContainer, MDBRow, MDBCol, MDBBtn
} from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
import { adminLogin, adminLogout } from '../../actions';

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            redirect: false,
            username: '',
            password: '',
            admin: null,
            reservations: [],
            users: []
        };
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleLogin = () => {
        this.props.adminLogin({ username: this.state.username, password: this.state.password });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.admin !== state.admin) {
            return {
                admin: props.admin,
                modal: props.admin ? true : false
            };
        }
        return null;
    }

    renderLoginForm = () => {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="10" className="offset-md-1">
                    <div>
                        <div className="h4 text-center">Sign in</div>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        Admin Username
                        </label>
                        <input
                            type="text"
                            id="defaultFormLoginEmailEx"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                            value={this.state.username}
                        />
                        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                        Password
                        </label>
                        <input
                            type="password"
                            id="defaultFormLoginPasswordEx"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        <br/><br/>
                    </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

    getAllData = () => {
        this.state.admin
            ? axios.get('/admins/data')
                .then(res => {
                    let { reservations, users } = res.data;
                    this.setState({
                        reservations,
                        users
                    });
                })
                .catch(err => {
                    console.log(err);
                })
            : this.setState({ redirect: true });
    }

    renderAdminPanel = () => {

    }

    render() {
        if (this.state.redirect) {
            this.props.adminLogout();
            return <Redirect to="/" />
        }

        return (
            <div style={styles.rootContainer}>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>Admin Login</ModalHeader>
                    <ModalBody>
                        {this.renderLoginForm()}
                    </ModalBody>
                    <ModalFooter>
                        <MDBBtn color="info" onClick={() => this.setState({ redirect: true })}>Back to Homepage</MDBBtn>
                        <MDBBtn color="indigo" onClick={this.handleLogin}>Login</MDBBtn>
                    </ModalFooter>
                </Modal>
                { this.state.admin
                    ? this.renderAdminPanel()
                    : null}
            </div>
        )
    }
}

const styles = {
    rootContainer: {
        minHeight: '100vh',
        backgroundColor: 'black'
    }
};

const mapStateToProps = state => {
    return ({
        admin: state.auth.admin
    });
};

export default connect(mapStateToProps,{ adminLogin, adminLogout })(AdminPanel);
