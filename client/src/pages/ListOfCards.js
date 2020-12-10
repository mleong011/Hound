import React, { createFactory } from "react";
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
			style={{ width: "70rem" }}
			className=" centered mb-2 CardBorder"
		>
			<Card.Header className="headerColor">
				<h4><strong>Vendor E-Mail: </strong> {props.data.from}</h4>
				<h4><strong>Order Date: </strong> {props.data.date}</h4>
			</Card.Header>
			<Card.Body>
				<h4><strong>Snippet: </strong>{props.data.snippet}</h4>
				
			</Card.Body>
			<Card.Footer className="footer"><a target="_blank" href={props.data.link}>Go to Order Email</a></Card.Footer>
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
