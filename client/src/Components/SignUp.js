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


export default class SignUp extends Component {
  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <MDBContainer>
        <MDBBtn onClick={this.toggle}
                outline rounded
                color='grey'
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
                  />
                  <MDBInput
                    label="Your email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Confirm your email"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                  />
                </div>
                <h5>
                By creating this account, you agree to our
                <a href = "/termandcondition" > Terms & Condintions</a></h5>
                <div className="text-center">
                </div>
              </form>
            </MDBCol>
          </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn onClick={this.toggle}
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
