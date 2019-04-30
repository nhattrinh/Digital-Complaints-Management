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
              color='#A9A9A9'
              >
              Login
      </MDBBtn>

      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle} className="grey-text">LOGIN</MDBModalHeader>
        <MDBModalBody>
        <MDBRow>
          <MDBCol >
            <form>
              <div className="grey-text">
                <MDBInput
                  label="Your email"
                  group
                  type="email"
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
            </form>
          </MDBCol>
        </MDBRow>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn onClick={this.toggle}
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
