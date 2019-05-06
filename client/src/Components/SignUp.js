import React, {Component} from "react";
import { MDBContainer,
         MDBRow,
         MDBCol,
         MDBBtn,
         MDBInput,
         MDBModal,
         MDBModalHeader,
         MDBModalBody,
         MDBModalFooter } from 'mdbreact';

import { register } from './redux/actions/auth';

import { connect } from 'react-redux';


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      check: false,
      clearance_code: ''
    }
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
                rounded
                color='white'
                style={styles.button}
                >
                SIGN UP HERE !
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>SIGN UP FOR DCM</MDBModalHeader>
          <MDBModalBody>
          <MDBRow>
            <MDBCol>
              <form>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
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
                    label="Confirm your email"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.confirmEmail}
                    onChange={e => this.setState({ confirmEmail: e.target.value })}
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


                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="hrcheck" value={this.state.check} onClick={()=> this.setState({check: !this.state.check})}/>
                    <label class="custom-control-label" for="hrcheck">Signing Up as Human Resources?</label>
                </div>
                {this.state.check?   <MDBInput
                    label="Clearance Code"
                    value={this.state.clearance_code}
                    onChange={e => this.setState({ clearance_code: e.target.value })}
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    maxLength={5}
                  />: <div></div>
                }
                <br/>
              
                <h5>
                By creating this account, you agree to our
                <a href = "/termandcondition" > Terms & Conditions</a></h5>
                <div className="text-center">
                </div>

              </form>
            </MDBCol>
          </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={() => {
              this.props.register({ email: this.state.email, password: this.state.password, clearance_code: this.state.clearance_code, name: this.state.name });
            }}
                      outline rounded
                      color='grey'
                      style={styles.button}>
                Register
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

export default connect(mapStateToProps, { register })(SignUp);