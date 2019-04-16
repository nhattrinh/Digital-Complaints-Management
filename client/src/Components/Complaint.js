import React, {Component} from "react";
import {  MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput, MDBContainer } from "mdbreact";
export default class Complain extends Component {
  render() {
    return (
      <MDBContainer> 
      <section className="contact-section my-5">
        <MDBRow>
          <MDBCol>
            <div className="md-form mb-0">
              <MDBInput
                type="textarea"
                id="form-contact-message"
                label="Your message"
              />
              
              <MDBBtn rounded color="blue">
                <MDBIcon icon="paper-plane" />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}

  }
