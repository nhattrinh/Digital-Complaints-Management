import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBMedia, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import { MDBContainer } from "mdbreact";
import Complaint from './Complaint'
import axios from 'axios';
import { connect } from "react-redux";
import ResolvePost from './ResolvePost';

class HRPanelPage extends Component {
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
          <h1 className="h1-responsive font-weight-bold text-center my-5">Admin Panel</h1>

        </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol md="12">
              <h2 className="h2-responsive font-weight-bold">
              May 2019
              </h2>

              <MDBMedia  className="mt-3" style={{border:" 2px groove", padding: "15px", marginBottom: "20px"}}>

              <MDBRow>
              <MDBCol size='12'>
              <MDBMedia body >
                <MDBMedia heading>
                </MDBMedia>
                  <p style={{ fontSize: 20 }}><strong>Description:</strong> <br/> I hate the food here</p>
                <p>
                  by <a href="#!" className="font-weight-bold">Jennifer Nguyen</a>, 05/9/2019, Unresolved
                </p>

            </MDBMedia>
              </MDBCol>
              <MDBCol size='2'>
              <ResolvePost/>
              </MDBCol>
              </MDBRow>

              </MDBMedia>




              <MDBMedia  className="mt-3" style={{border:" 2px groove", padding: "15px", marginBottom: "0px"}}>

              <MDBRow>
              <MDBCol size='12'>
              <MDBMedia body >
                <MDBMedia heading>
                </MDBMedia>
                  <p style={{ fontSize: 20 }}><strong>Description:</strong> <br/> I hate the food here</p>
                <p>
                  by <a href="#!" className="font-weight-bold">Jennifer Nguyen</a>, 05/9/2019, Resolved <i class="fas fa-check-circle" style={{color: "#228B22"}}></i>
                </p>

            </MDBMedia>
              </MDBCol>
              <MDBCol size='2'>

              </MDBCol>
              </MDBRow>

              </MDBMedia>


              <MDBMedia  className="mt-3" style={{border:" 2px solid #d3a13b", padding: "15px", marginBottom: "20px", marginLeft: "5%", backgroundColor: "#fefcf8"}}>
                  <MDBMedia left href="#" className="pr-3">

                  </MDBMedia>
                  <MDBMedia body>
                    <p style={{ fontSize: 20 }}><strong>Resolution:</strong> <br/> Sorry, but there is nothing HR can do about that</p>
                    <p>by <a href="#!" className="font-weight-bold">Truc Vo</a>, 05/10/2019</p>
                  </MDBMedia>
              </MDBMedia>



              <MDBMedia  className="mt-3" style={{border:" 2px groove", padding: "15px", marginBottom: "20px"}}>

              <MDBRow>
              <MDBCol size='12'>
              <MDBMedia body >
                <MDBMedia heading>
                </MDBMedia>
                  <p style={{ fontSize: 20 }}><strong>Description:</strong> <br/> I hate the food here</p>
                <p>
                  by <a href="#!" className="font-weight-bold">Jennifer Nguyen</a>, 05/9/2019, Unresolved
                </p>

            </MDBMedia>
              </MDBCol>
              <MDBCol size='2'>
              <ResolvePost/>
              </MDBCol>
              </MDBRow>

              </MDBMedia>



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

export default connect(mapStateToProps, null)(HRPanelPage);
