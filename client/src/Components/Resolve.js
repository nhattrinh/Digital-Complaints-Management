import React, {Component} from "react";
import { MDBRow, MDBCol, MDBCard, MDBMedia, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import { MDBContainer } from "mdbreact";
import Complaint from './Complaint'


export default class Resolve extends Component {
  render(){
    return (
    <MDBContainer>
        <MDBRow>
        <MDBCol md="12">
          <h1 className="h1-responsive font-weight-bold text-center my-5">Profile</h1>
          <MDBRow>
            <MDBCol md="6">                  
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
                      <MDBIcon icon="quote-left" className="pr-2" />
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit. Quod eos id officiis hic tenetur.
                    </p>
            </MDBCol>
            <MDBCol md="6"><Complaint/></MDBCol>
          </MDBRow>
        </MDBCol>
        </MDBRow>

        <MDBRow>
        <MDBCol md="12">
            <h2 className="h1-responsive font-weight-bold text-center my-5">
            Recent complaint posts
            </h2>
            <MDBMedia>
                <MDBMedia left href="#" className="mr-3">
                <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder4.jpg" alt="Generic placeholder image" />
                </MDBMedia>
            
                <MDBMedia body>
                    <MDBMedia heading>
                        <strong>Description</strong>
                    </MDBMedia>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    <p>by <a href="#!" className="font-weight-bold">Truc Vo</a>, 19/04/2018</p>
                    <MDBBtn color="primary" size="md">
                    Read More
                    </MDBBtn>
                
                    <MDBMedia className="mt-3">
                        <MDBMedia left href="#" className="pr-3">
                            <MDBMedia object src="https://mdbootstrap.com/img/Photos/Others/placeholder4.jpg" alt="Generic placeholder image" />
                        </MDBMedia>
                        <MDBMedia body>
                            <MDBMedia heading>
                                Response
                            </MDBMedia>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. C<p>by <a href="#!" className="font-weight-bold">Truc Vo</a>, 19/04/2018</p>
                            <MDBBtn color="primary" size="md">
                            Read More
                            </MDBBtn>
                        </MDBMedia>
                    </MDBMedia>
                </MDBMedia>
            </MDBMedia>
        </MDBCol>
        </MDBRow>
    </MDBContainer>
);
}
}

