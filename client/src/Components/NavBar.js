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

import { connect } from 'react-redux';

import { logout } from './redux/actions'

import Login from './Login'

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      user: null
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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

  render() {
    if (!this.state.user) {
      return (
        <div>
          <Navbar style ={styles.background} expand="md">
          <NavbarBrand>
              <NavLink style={{fontSize: '20px', color: 'white'}} href="/">Digital Complaints Management</NavLink>
          </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto">
                <NavItem>
                    <NavLink style={styles.item}><Login/></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar style ={styles.background} expand="md">
          <NavbarBrand>
              <NavLink style={{fontSize: '20px', color: 'white'}} href="/">Digital Complaints Management</NavLink>
          </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                { 
                  this.state.user.type === 'HR' ? 
                    <NavItem>
                      <NavLink style={styles.item} href="/resolve/">Your Complaints</NavLink>
                    </NavItem> : 
                    <NavItem>
                      <NavLink style={styles.item} href="/hrpage/">View Submitted Complaints</NavLink>
                    </NavItem>

                }
                <NavItem>
                  <NavLink style={styles.item} onClick={() => this.props.logout()} href="#">Logout</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
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

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { logout })(NavBar);
