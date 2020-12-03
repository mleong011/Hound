import React from "react";
import "../App.css";
import Loading from "../components/Loading";

class CardListPage extends React.Component {
	state = {
		info: [],
		loading: true,
	};

	render() {
		if (this.state.loading) {
			return <Loading />;
		}

		return (
			<div className="container-fluid text-center">
				<div className="row justify-content-center">{this.state.info}</div>
			</div>
		);
	}
}

export default CardListPage;
