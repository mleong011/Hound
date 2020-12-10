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
				<h4>Vendor E-Mail: {props.data.from}</h4>
				<h4>Order Date: {props.data.date}</h4>
			</Card.Header>
			<Card.Body>
				<h4>Snippet: {props.data.snippet}</h4>
				<h4>Link: {props.data.link}</h4>
			</Card.Body>
		</Card>
	);
}
class CardListPage extends React.Component {
	state = {
		orderResults: []
	};

	componentDidMount(){
			fetch("http://localhost:8000/api/orders/")
			.then(res => res.json())
			.then(jsonData => {
				this.setState({
					orderResults: jsonData, 
				})
			})
			.catch(err => {
				this.setState({orderResults: [] })
			})
	}
	
	render() {
		if (this.state.loading) {
			return <Loading />;
		}
		console.log(this.state.orderResults);

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
