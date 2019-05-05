import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBMedia, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import { MDBContainer } from "mdbreact";
import Complaint from './Complaint'
import axios from 'axios';
import { connect } from "react-redux";

class Resolve extends Component {
  state = {
    complaint: ''
  };

  componentDidMount() {
    this.populateComplaints();
  }

  populateComplaints() {
    if (this.state.user) {
      axios.get(`http://localhost:3001/complain/get/${this.state.user._id}`)
        .then(res => {
          console.log(res.data.complaints);
          this.setState({ complaints: res.data.complaints });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user
      };
    }

    return null;
  }

  renderComplaints() {
    if (this.state.complaints) {
      return this.state.complaints.map((v,i) => {
        return (
          <MDBMedia key={i} style={{border:" 2px groove", padding: "25px", marginBottom: "20px"}}>
            <MDBMedia body >
              <MDBMedia heading>
              </MDBMedia>
                <p style={{ fontSize: 20 }}>{ v.description }</p>
              <p>
                by <a href="#!" className="font-weight-bold">{ v.creator_name }</a>, { new Date(v.time_created).toUTCString() }, { v.resolved ? 'Marked as Resolved': 'Unresolved' }
              </p>
              { this.renderResponses(v) }
          </MDBMedia>
        </MDBMedia>
        );
      })
    }
  }

  renderResponses(complaint) {
    return complaint.responses.map((v,i) => {
      return (
        <MDBMedia key={i} className="mt-3" style={{border:" 2px groove", padding: "25px", marginBottom: "20px"}}>
            <MDBMedia left href="#" className="pr-3">
                <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder4.jpg" alt="Generic placeholder image" />
            </MDBMedia>
            <MDBMedia body>
              { v.description }
              <p>by <a href="#!" className="font-weight-bold">{ v.creator_name }</a>, { new Date(v.time_created).toUTCString() }</p>
            </MDBMedia>
        </MDBMedia>
      );
    });
  }

  uploadComplaint = () => {
    console.log(this);
    console.log('aaaaa')
    let { user, complaint } = this.state;
    axios.post('http://localhost:3001/complain/create', {
      creator_name: user.name,
      description: complaint,
      _id: user._id
    })
      .then(res => {
        if (res.data.success)
          this.populateComplaints();
          this.setState({ complaint: '' });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    return (
    <MDBContainer>
        <MDBRow>
        <MDBCol md="12">
          <h1 className="h1-responsive font-weight-bold text-center my-5">Profile</h1>
          <MDBRow>
            {/* <MDBCol md="6">
                    <MDBView className="mx-auto">
                      <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg"
                        alt=""
                        className="rounded-circle img-fluid"
                      />
                    </MDBView>
                    <h4 className="font-weight-bold mt-4">Truc Vo</h4>
                    <h6 className="blue-text font-weight-bold my-3">
                      Web Designer
                    </h6>
                    <p className="font-weight-normal">
                      "About me Section Here"

                    </p>
            </MDBCol> */}
            <MDBCol>
              <Complaint
                onChange={e => this.setState({ complaint: e.target.value })}
                value={ this.state.complaint }
                onClick={() => {
                  console.log('clicked')
                  this.uploadComplaint();
                }}
              />
            </MDBCol>
          </MDBRow>
        </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="12">
              <h2 className="h1-responsive font-weight-bold text-center my-5">
              Recent Complaints
              </h2>
              { this.renderComplaints() }
          </MDBCol>
        </MDBRow>
    </MDBContainer>
);
}
}

const mapStateToProps = state => {
  return {
    user: state.auth.user.user
  };
};

export default connect(mapStateToProps, null)(Resolve);
