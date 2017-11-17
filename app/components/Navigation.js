import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Redirect } from 'react-router';
import { navigation } from '../styles/navigation.scss';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.goHome = this.goHome.bind(this);
        this.manageUsers = this.manageUsers.bind(this);
        this.state = {
            collapsed: true,
            shouldRedirect: false,
            route: window.location.pathname,
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    goHome() {
        this.setState({
            route: '/',
            shouldRedirect: true
        });
    }

    manageUsers() {
        this.setState({
            route: '/user_list',
            shouldRedirect: true,
        });
    }

    render() {
        return (
        	this.state.shouldRedirect  && window.location.pathname !== this.state.route ?
        	<Redirect to={ this.state.route } /> :
	      <div>
	        <Navbar color="info" light className={navigation}>
	          <NavbarBrand onClick={this.goHome} className="mr-auto">User List App</NavbarBrand>
	          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
	          <Collapse isOpen={!this.state.collapsed} navbar>
	            <Nav navbar>
	              <NavItem>
	                <NavLink onClick={this.goHome}>Home</NavLink>
	              </NavItem>
	              <NavItem>
	                <NavLink onClick={this.manageUsers}>User Management</NavLink>
	              </NavItem>
	            </Nav>
	          </Collapse>
	        </Navbar>
	      </div>
        );
    }
}

