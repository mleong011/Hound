import React from "react";
import { Card } from "react-bootstrap";
import "../App.css";
import Loading from "../components/Loading";

function OrderCards(props) {
	return (
		<Card
			bg="light"
			border="dark"
			// key={idx}
			// text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
			style={{ width: "40rem" }}
			className=" centered mb-2 CardBorder"
		>
			<Card.Header className="headerColor">
				<h4>Vendor: {props.data.vendor}</h4>
				<h4>Order Date: {props.data.orderdate}</h4>
			</Card.Header>
			<Card.Body>
				{/* <div className="card-body"> */}
				<h4>Provider: {props.data.provider}</h4>
				<h4>Tracking Number: {props.data.trackingNum}</h4>
				<h4>Status: {props.data.status}</h4>
				<h4>ETA: {props.data.eta}</h4>
			</Card.Body>
		</Card>
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
