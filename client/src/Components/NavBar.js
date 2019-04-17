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
 import Login from './Login'

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
              <NavLink style={{fontSize: '20px', color: 'white'}} href="/">Digital Complaints Management</NavLink>
          </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink style={styles.item} href="/resolve/">Your Complaints</NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml">
                <NavItem>
                    <NavLink style={styles.item}><Login/></NavLink>
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
