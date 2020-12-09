import React from "react";
import { Redirect } from "react-router-dom";
import Loading from "../components/Loading";
import NavbarComp from "../components/Navbar";
import CardListPage from "./ListOfCards";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
			name: "",
			email: "",
		};
	}

	componentDidMount() {
		let data = JSON.parse(sessionStorage.getItem("userData"));
		console.log("DATAAAA", data);
		this.setState({ name: data.data.name });
		this.setState({ email: data.data.email });
	}

	render() {
		if (this.state.loading) {
			return <Loading />;
		}

		if (!sessionStorage.getItem("userData")) {
			return <Redirect to={"/"} />;
		}

		return (
			<div>
				<NavbarComp message={this.state.name} />
				<CardListPage />
			</div>
		);
	}
}

export default Home;
