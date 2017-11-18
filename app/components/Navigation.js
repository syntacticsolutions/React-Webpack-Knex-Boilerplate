import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Redirect } from 'react-router';
import { navigation } from '../styles/navigation.scss';
// import dependencies

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.goHome = this.goHome.bind(this);
        this.manageUsers = this.manageUsers.bind(this);
        // bind functions to react component

        this.state = {
            collapsed: true,
            shouldRedirect: false,
            route: window.location.pathname,
        };

        // initialize state
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    goHome() {
        this.setState({
            route: '/',
            shouldRedirect: true,
            collapsed: true
        });
    }

    manageUsers() {
        this.setState({
            route: '/user_list',
            shouldRedirect: true,
            collapsed: true
        });
    }

    render() {
        return (
        	this.state.shouldRedirect && window.location.pathname !== this.state.route ?
        	// for some reason react-router v4 navigates twice when using the Redirect module
        	<Redirect to={ this.state.route } /> :
        	// Redirect if state implies it or show navbar components if not
	      <div>
	        <Navbar color="info" light className={navigation}>
	          <NavbarBrand className="mr-auto">User List App</NavbarBrand>
	          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
	          <Collapse isOpen={!this.state.collapsed} navbar>
	            <Nav navbar>
	              <NavItem>
	                <NavLink onClick={this.goHome} style={{color: 'white'}}>Home</NavLink>
	              </NavItem>
	              <NavItem>
	                <NavLink onClick={this.manageUsers} style={{color: 'white'}}>User Management</NavLink>
	              </NavItem>
	            </Nav>
	          </Collapse>
	        </Navbar>
	      </div>
        );
    }
}

