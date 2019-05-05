import React, { Component } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    MDBContainer, MDBRow, MDBCol, MDBBtn
} from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

class HRPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            redirect: false,
            username: '',
            password: '',
            admin: null,
            reservations: [],
            users: [],
            user: {}
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
        if (props.user !== state.user) {
            return {
                user: props.user,
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

    render() {
        if (this.state.user.type === "employee") {
            return <Redirect to="/" />
        }

        return (
            <div style={styles.rootContainer}>
                { this.renderAdminPanel() }
            </div>
        )
    }
}

const styles = {
    rootContainer: {
        minHeight: '100vh',
        backgroundColor: 'white'
    }
};

const mapStateToProps = state => {
    return ({
        user: state.auth.user
    });
};

export default connect(mapStateToProps, null)(HRPanel);
