import React, { Component } from "react";
import { 
  MDBContainer, MDBRow, MDBCol,
  MDBBtn, MDBInput, MDBModal,
  MDBModalHeader, MDBModalBody, MDBModalFooter 
} from 'mdbreact';
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import axios from 'axios';

import { connect } from 'react-redux';

import { login } from './redux/actions/auth';

import '../App.css';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      email: '',
      password: '',
      user: null
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user,
        modal: false
      };
    }

    return null;
  }

  render() {
    return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle}
              color='#A9A9A9'
              >
              Login
      </MDBBtn>

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle} className="grey-text">LOGIN</MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol>
                <form>
                  <div className="grey-text">
                    <MDBInput
                      label="Your email"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <MDBInput
                      label="Your password"
                      group
                      type="password"
                      validate
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
              <MDBCol sm="8" className="offset-sm-2">
                <a href="http://ec2-18-223-122-143.us-east-2.compute.amazonaws.com:8000/auth/google">
                  <GoogleLoginButton />
                </a>
                <a href="http://ec2-18-223-122-143.us-east-2.compute.amazonaws.com:8000/auth/github">
                  <GithubLoginButton />
                </a>
              </MDBCol>
          </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn onClick={() => {
            this.props.login({ email: this.state.email, password: this.state.password });
          }}
                    outline rounded
                    color='grey'
                    style={styles.button}>
              Login
          </MDBBtn>
          <MDBBtn onClick={this.toggle}
                  outline rounded
                  color='grey'
                  style={styles.button}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

}
const styles = {
  button:{
    font: ' bold 20px Economica',
    color: 'black'
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { login })(Login);