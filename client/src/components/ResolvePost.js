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
import axios from 'axios';

export default class ResolvePost extends Component {
  state = {
    modal: false,
    description: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  uploadReply = () => {
    let { user_id, _id, user_name } = this.props;

    axios.post(`http://${process.env.API_URL}/complain/reply`, {
      user_id, _id, creator_name: user_name,
      description: this.state.description
    })
      .then(() => {
        this.props.populateComplaints();
        this.setState({ description: '', modal: !this.state.modal });
      })
      .catch(err => {
        console.log(err);
      });
  }

  markResolved = () => {
    axios.post(`http://${process.env.API_URL}/complain/mark-resolved`, { _id: this.props._id })
      .then(() => {
        this.props.populateComplaints();
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
    <MDBContainer>
      <MDBBtn onClick={this.toggle} class="btn btn-primary">
        { this.props.user_type === 'HR' ? 'Resolve' : 'Respond' }
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Resolve Complaint</MDBModalHeader>
        <MDBModalBody>
        {/*Add Complaints*/}
        <div className="form-area">
            <form role="form">
            <br styles="clear:both" />
              <div className="form-group">
              <textarea onChange={e => this.setState({ description: e.target.value })} className="form-control" type="textarea" id="subject" placeholder="Write your response here..." maxlength="140" rows="7"></textarea>
              </div>
              <button onClick={this.uploadReply} type="button" className="btn btn-primary pull-right">Respond</button>
              { this.props.user_type === 'HR' && <button onClick={this.markResolved} type="button" className="btn btn-green pull-right">Mark as Resolved</button> }
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
