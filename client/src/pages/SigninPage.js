import axios from "axios";
import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";
import "../App.css";

const CLIENT_ID =
	"158674415075-1r58o2988bebvq9vjitmgbqtj4udralh.apps.googleusercontent.com";

export class SigninPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
			failed: false,
			email: "",
			name: "",
			userId: "",

			isLogined: false,
			accessToken: "",
			image: "",
		};
		this.handleLoginFailure = this.handleLoginFailure.bind(this);
		this.logout = this.logout.bind(this);
		this.handleLogoutFailure = this.handleLogoutFailure.bind(this);


	}

	logout(response) {
		this.setState((state) => ({
			isLogined: false,
			accessToken: "",
		}));
	}

	handleLoginFailure(response) {
		alert("Failed to log in");
	}

	handleLogoutFailure(response) {
		alert("Failed to log out");
	}

	render() {
		const responseGoogle = (response) => {
			console.log("responsegoogleB response: ", response);

			if (response.accessToken) {
				this.setState((state) => ({
					isLogined: true,
					accessToken: response.accessToken,
					name: response.profileObj.name,
					email: response.profileObj.email,
					image: response.profileObj.imageUrl,
					userId: response.profileObj.googleId,
				}));
			}

			//axios takes in an object where in backend will be creating a google login POST api callcall at api url
			//(localhost 8000) and send the token id data to the backend
			axios({
				method: "POST",
				url: "http://localhost:8000/api/googlelogin",
				//data: {tokenId: response} //UNCOMMENT
				data: { code: response.code }, //send tokencode to
			})
				.then((response) => {
					//if login success will return here a message from our rest api
					console.log("google login success", response);
					console.log(JSON.stringify(response));
					//userdata called from postdata.js to reoute to home
					sessionStorage.setItem("userData", JSON.stringify(response));
					this.setState({ redirectToReferrer: true }); //redirect to
				})
				.catch((err) => {
					console.log("ERROR OCCURED : ", err);
				});


		};

		//redirect
		if (this.state.redirectToReferrer) {
			return <Redirect to={"/home"} />;
		}

		return (
			<div className="App centered">
				<div className="row"> </div>
				<div className="row">
					<div style={{ paddingTop: "20px" }} className="loginForm col-sm-12">
						<div>
							{" "}
							<h1 className="logo">Hound</h1>
							<p>Online Shipment Tracker</p>
							<div className="txt col-sm-12">
								Login With Google to Begin
							</div>{" "}
							{this.state.isLogined ? (
								<GoogleLogout
									clientId={CLIENT_ID}
									className="LoginButton"
									buttonText="Logout"
									onLogoutSuccess={this.logout}
									onFailure={this.handleLogoutFailure}
								></GoogleLogout>
							) : (
								<GoogleLogin
									clientId={CLIENT_ID}
									buttonText="Login with Google"
									className="LoginButton"
									onSuccess={responseGoogle}
									onFailure={this.handleLoginFailure}
									cookiePolicy={"single_host_origin"}
									//responseType="code,token"
									to="/home"
									responseType="code"
									scope = "https://www.googleapis.com/auth/gmail.readonly"
								/>
							)}

						</div>
						<br />
						{this.state.isLogined ? (
							<h5>
								Welcome {this.state.name}!
								<br />
								<img src={this.state.image} alt="profile picture" />
								<br />
								Email: {this.state.email}
							</h5>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}
export default SigninPage;
