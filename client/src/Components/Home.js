import React, { Component } from 'react';
import {MDBContainer,
        MDBRow,
        MDBCol } from "mdbreact";
import SignUp from './SignUp';


export default class Home extends Component{
  handleViewMoreClick = () => {
  window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
      });
  }

  render(){
    return(
      <div style = {styles.homeStyle}>
            <div style = {styles.content}>
              <MDBContainer className="px-md-3 px-sm-0">
                <MDBRow>
                  <MDBCol md="12" className="mb-4 black-text text-center">
                    <h3 className="display-3 font-weight-bold mb-0 pt-md-5">Digital Complaints Management      <i class="fas fa-user-tie"></i></h3>
                    <hr className="my-17 w-75" style={styles.hr}/>
                    <h4 className="subtext-header mt-2 mb-4">
                      Submit your concerns, inquiries and complaints.<br/>
                      We aim to reduce complaint resolution time<br/>
                      <br/>
                      <br/>
                      Don't have an account? Click below to get started

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
