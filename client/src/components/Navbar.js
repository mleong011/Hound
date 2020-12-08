import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Navbar.css";

const CLIENT_ID =
	"158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com";

class NavbarComp extends Component {
	render() {
		return (
			<Navbar bg="light" expand="lg">
				<Navbar.Brand href="#home">Welcome</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#home">{this.props.message}</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavbarComp;
