import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBMedia, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import { MDBContainer } from "mdbreact";
import Complaint from './Complaint'
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import ResolvePost from './ResolvePost';

class HRPanelPage extends Component {
  state = {
    complaints: []
  };

  componentDidMount() {
    this.populateComplaints();
  }

  populateComplaints = () => {
    axios.get(`http://${process.env.API_URL}/complain/get/all`)
      .then(res => {
        console.log(res.data)
        this.setState({ complaints: res.data.complaints });
      })
      .catch(err => {
        console.log(err);
      });
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
    if (this.state.complaints.length) {
      return this.state.complaints.map((v,i) => {
        return (
          <MDBMedia key={i} style={{border:" 2px groove", padding: "25px", marginBottom: "20px"}}>
            <MDBMedia body >
              <MDBMedia heading>
              </MDBMedia>
                <p style={{ fontSize: 20 }}>{ v.description }</p>
              <p>
                by <a href="#!" className="font-weight-bold">{ v.creator_name }</a>, { new Date(v.time_created).toLocaleDateString() }, { v.resolved ? 'Marked as Resolved': 'Unresolved' }
              </p>
              { this.renderResponses(v) }
              { v.resolved ? <b style={{ color: 'green' }}>Marked as Resolved</b> : 
                    <ResolvePost
                      _id={v._id}
                      creator_name={v.creator_name}
                      user_id={this.state.user._id}
                      populateComplaints={this.populateComplaints}
                      resolved={v.resolved}
                      user_name={this.state.user.name}
                      user_type={this.state.user.type}
                    />
                }
          </MDBMedia>
        </MDBMedia>
        );
      })
    }
  }

  renderResponses(complaint) {
    return complaint.responses.map((v,i) => {
      return (
        <MDBMedia className="mt-3" style={{border:" 2px groove", padding: "15px", marginLeft: '1em', marginBottom: "20px", backgroundColor: "#fefcf8"}}>
          <MDBMedia left href="#" className="pr-3">
          </MDBMedia>
          <MDBMedia body>
            { v.description }
            <p>by <a href="#!" className="font-weight-bold">{ v.creator_name }</a>, { new Date(v.time_created).toLocaleDateString() }</p>
          </MDBMedia>
        </MDBMedia>
      );
    });
  }


  render(){
    if (!this.state.user) return <Redirect to="/" />

    return (
    <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <h1 className="h1-responsive font-weight-bold text-center my-5">HR Panel</h1>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <h2 className="h2-responsive font-weight-bold">
            May 2019
            </h2>
            { this.renderComplaints() }
          </MDBCol>
        </MDBRow>
    </MDBContainer>
);
}
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, null)(HRPanelPage);
