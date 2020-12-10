import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Navbar.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";
import "../App.css";
const CLIENT_ID =
	"158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com";

class NavbarComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
			failed: false,
			isLogined: true,
			
		};
		//this.handleLoginFailure = this.handleLoginFailure.bind(this);
		//this.logout = this.logout.bind(this);
		this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
	}
	handleLogoutFailure(response) {
		alert("Failed to log out");
	};
	

	
	render() {
		const logout = (response) => {
			
				this.setState((state) => ({
					isLogined: false,
					
					redirectToReferrer: true 
				}));
			
		
		}
		
		if (this.state.redirectToReferrer) {
			return <Redirect to={"/"} />;
		}
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#home">Welcome</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#home">{this.props.message}</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<GoogleLogout
									clientId={CLIENT_ID}
									className="LoginButton"
									buttonText="Logout"
									onLogoutSuccess={logout}
									onFailure={this.handleLogoutFailure}
								></GoogleLogout>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavbarComp;
