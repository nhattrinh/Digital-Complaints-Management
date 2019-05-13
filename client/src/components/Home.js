import React, { Component } from 'react';
import {MDBContainer, MDBRow, MDBCol } from "mdbreact";
import queryString from 'query-string';
import axios from 'axios';

import { connect } from 'react-redux';

import { userLoggedIn } from './redux/actions/auth';
import '../App.css';
import SignUp from './SignUp';


class Home extends Component{
  componentDidMount() {
    try {
      let claims = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims;

      if (claims && claims !== undefined) {
        axios.post(`http://ec2-18-188-90-66.us-east-2.compute.amazonaws.com:8000/auth/find-by-okta-id/`, {
          okta_id: claims.sub,
          name: claims.name,
          email: claims.email
        })
          .then(res => {
            let { token, user } = res.data;

            this.props.userLoggedIn(user, token);
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.props.history.push("/");
          });
      }

      this.parseLocation();
    }
    catch(err) {
      console.log(err);
    }
  }

  parseLocation = () => {
    var query = queryString.parse(this.props.location.search);

    if (query.id) {
      axios.get(`http://ec2-18-188-90-66.us-east-2.compute.amazonaws.com:8000/auth/find-by-google-id/${query.id}`)
        .then(res => {
          let { token, user } = res.data;
          this.props.userLoggedIn(user, token);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.props.history.push("/");
        });
    } else if (query.githubID) {
      axios.get(`http://ec2-18-188-90-66.us-east-2.compute.amazonaws.com:8000/auth/find-by-github-id/${query.githubID}`)
        .then(res => {
          let { token, user } = res.data;
          this.props.userLoggedIn(user, token);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.props.history.push("/");
        });
    }
  }

  handleViewMoreClick = () => {
  window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
      });
  }

  render(){
    this.parseLocation();

    return(
      <div className="background-image" style = {styles.homeStyle}>
            <div style = {styles.content}>
              <MDBContainer className="px-md-3 px-sm-0">
                <MDBRow>
                  <MDBCol md="12" className="mb-4 black-text text-center">
                    <h3 className="display-3 font-weight-bold mb-0 pt-md-5" style={{backgroundColor: 'rgba(255, 255, 255, .5)'}}>Digital Complaints Management      <i class="fas fa-user-tie"></i></h3>
                    <hr className="my-17 w-75" style={styles.hr}/>
                    <h4 className="subtext-header mt-2 mb-4" style={{backgroundColor: 'rgba(255, 255, 255, .5)'}}>
                      <br/>
                      Submit your concerns, inquiries and complaints.<br/>
                      We aim to reduce complaint resolution time<br/>
                      <br/>
                
                      Don't have an account? Click below to get started<br/>
                      <br/>
                    </h4>
                    <SignUp/>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
            <btn
                    onClick={this.handleViewMoreClick}
                    className="text-center" >
                    <i className="fas fa-chevron-down black-text"></i>
            </btn>
          </div>
    );
  }
}

const styles = {
  homeStyle: {
    textAlign: 'center'
  },
  content: {
      paddingTop:'20vh',
      paddingBottom: '20vh',
      position: 'inline-block',
  },
  hr:{
      backgroundColor: '#d3a13b',
      border: '3px solid #d3a13b',
      borderRadius: '2px'
  },
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

export default connect(mapStateToProps, { userLoggedIn })(Home);
