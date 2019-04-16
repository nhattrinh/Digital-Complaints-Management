import React, {Component} from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
 } from 'reactstrap';

  export default class NavBar extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar style ={styles.background} expand="md">
          <NavbarBrand>
              <NavLink style={{font: '40px', color: 'white'}} href="/">DCM</NavLink>
          </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>


                <NavItem>
                  <NavLink style={styles.item} href="/contact/">COMPLAINTS</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={styles.item} href="/help/">RESOLVED ISSUES</NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml">
              <NavItem>
                  <NavLink style={styles.item} href="/login/">LOG IN</NavLink>
              </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

  const styles = {
    background:{
      backgroundColor: '#A9A9A9',
      height: '80px',
    },
    item:{
        color: 'white',
        font: ' bold 20px',
        marginLeft: '50px',

    }
  }
