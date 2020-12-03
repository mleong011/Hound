import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
function Login() {
	return (
		<form className="loginForm">
			<h1 id="logo">Hound</h1>
			<div className="inputField">
				<input type="text" placeholder="Email" className="info" />
				<input type="text" placeholder="Password" className="info" />
			</div>
			<button type="submit" className="LoginButton">
				Login
			</button>
			<div className="links">
				<Link className="AccountLinks" to="/sign-up">
					Create Account /
				</Link>
				<Link className="AccountLinks" to="/get-password">
					<span> Forgot Password</span>
				</Link>
			</div>
		</form>
	);
}

export default Login;
