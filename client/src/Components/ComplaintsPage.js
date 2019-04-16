import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import AddPost from './AddPost';



export default class ComplaintsPage extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
          <h3 className="display-4 font-weight-bold mb-0 pt-md-5">Unresolved Complaints</h3>
          <br/>
        <AddPost/>
        <br/>


        {/*List of Complaints*/}
        <div style={{paddingLeft: '100px', paddingRight: '100px', paddingBottom: '100px'}}>
          <div className="list-group">
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Title Of Complaints</h4>
              <p className="list-group-item-text">Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Title Here</h4>
              <p className="list-group-item-text">Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>
            </a>
            <a href="#" className="list-group-item">
              <h4 className="list-group-item-heading">Title Here</h4>
              <p className="list-group-item-text">Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>
            </a>
          </div>
          </div>



          </div>
      )
    }
}
