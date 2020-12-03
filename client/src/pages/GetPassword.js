import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function GetPassword() {
	return (
		<form className="loginForm">
			<h1 id="logo">Hound</h1>
			<div className="inputField">
				<input type="text" placeholder="First Name" className="info" />
				<input type="text" placeholder="Last Name" className="info" />
				<input type="text" placeholder="Email" className="info" />
			</div>
			<button type="submit" className="LoginButton">
				Change Password
			</button>
			<div className="links">
				{/* to picks how link to component will look like in url */}
				<Link className="AccountLinks" to="./login">
					Login /
				</Link>
				<Link className="AccountLinks" to="/sign-up">
					<span>Create Account </span>
				</Link>
			</div>
		</form>
	);
}

export default GetPassword;
