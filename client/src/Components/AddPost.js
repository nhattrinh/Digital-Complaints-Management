import React, { Component } from "react";
import { MDBContainer,
         MDBRow,
         MDBCol,
         MDBBtn,
         MDBInput,
         MDBModal,
         MDBModalHeader,
         MDBModalBody,
         MDBModalFooter } from 'mdbreact';

export default class AddPost extends Component {
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

      <MDBBtn onClick={this.toggle} class="btn btn-primary">
              Post New Complaint
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Create a New Complaint</MDBModalHeader>




        <MDBModalBody>
        {/*Add Complaints*/}

      <div className="form-area">
          <form role="form">
          <br styles="clear:both" />
            <div className="form-group">
              <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
            </div>

            <div className="form-group">
            <textarea className="form-control" type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
            </div>

          <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Post Complaints</button>
          </form>
      </div>

    <br/>
    <br/>
    <br/>


        </MDBModalBody>

        <MDBModalFooter>
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
    font: ' bold 15px',
    color: 'black'
  }
}
