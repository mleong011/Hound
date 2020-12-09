import React from "react";
import "../App.css";
import Loading from "../components/Loading";

function OrderCards(props) {
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="card col-6 pl-0 pr-0 mb-3">
					<div className="card-header">
						<h1>Vendor: {props.data.vendor}</h1>
						<h1>Order Date: {props.data.orderdate}</h1>
					</div>

					<div className="card-body">
						<h2>Provider {props.data.provider}</h2>
						<h2>Tracking Number: {props.data.trackingNum}</h2>
						<h2>Status: {props.data.status}</h2>
						<h2>ETA: {props.data.eta}</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
class CardListPage extends React.Component {
	state = {
		orderResults: [
			{
				trackingNum: "AMZ123",
				provider: "UPS",
				vendor: "Amazon",
				status: "In Transit",
				eta: "12/09/2020",
				orderdate: "11/25/2020",
			},

			{
				trackingNum: "EBY456",
				provider: "FedEx",
				vendor: ["Ebay"],
				status: "In Transit",
				eta: "12/09/2020",
				orderdate: "11/25/2020",
			},

			{
				trackingNum: "EBY123",
				provider: "UPS",
				vendor: "Walmart",
				status: "In Transit",
				eta: "12/09/2020",
				orderdate: "11/25/2020",
			},
		],
	};
	render() {
		if (this.state.loading) {
			return <Loading />;
		}

		return (
			<div>
				{this.state.orderResults.map((item, index) => {
					return <OrderCards data={item} key={index} />;
				})}
			</div>
		);
	}
}

export default CardListPage;
