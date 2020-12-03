import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
class CardsForm extends React.Component {
	state = {
		error: false,
		success: false,
		content: "",
	};


	//will change save post into pull info from database
	pullInfo = (event) => {
		fetch("/api/posts/", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ content: this.state.content }),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}

				throw new Error("Content validation");
			})
			.then((post) => {
				this.setState({
					success: true,
				});
			})
			.catch((err) => {
				this.setState({
					error: true,
				});
			});
	};

	render() {
		if (this.state.success) return <Redirect to="/" />;

		let errorMessage = null;
		if (this.state.error) {
			errorMessage = (
				<div className="alert alert-danger">
					"There was an error saving this post."
				</div>
			);
		}

		return (
			<div className="search col-10 col-md-8 col-lg-7">
				<h1 class="header"> Hounds </h1>
				{errorMessage}

				<input
					type="text"
					placeholder="Search your tracking number here..."
					value={this.state.trackingNum}
					size="80"
					className="form-control mr-3 rounded"
					onChange={this.contentChanged}
				/>
				<button className="saveBtn btn btn-primary" onClick={this.pullInfo}>
					Find Package
				</button>
			</div>
		);
	}
}

export default CardsForm;
