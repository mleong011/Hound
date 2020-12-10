import React, { createFactory } from "react";
import { Card, Tabs, Tab } from "react-bootstrap";
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
				<h4><strong>Notification Date: </strong> {props.data.date}</h4>
			</Card.Header>
			<Card.Body className="cardBody">
				<h4><strong>Snippet: </strong>{props.data.snippet}</h4>
				
			</Card.Body>
			<Card.Footer ><a className="footer" target="_blank" href={props.data.link}>Go to Order Email</a></Card.Footer>
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
			<Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="tabscss">
			<Tab eventKey="home" title="All Orders" >
				{this.state.orderResults.map((item, index) => {
					return <OrderCards data={item} key={index} />;
				})}
			</Tab>
			<Tab eventKey="Amazon" title="Amazon">
				{this.state.orderResults.filter(order =>
				order.from === '"Amazon.com" <shipment-tracking@amazon.com>')
				.map((item, index) => {
					return <OrderCards data={item} key={index} />;
				})}
			</Tab>
			<Tab eventKey="RockAuto" title="RockAuto" >
				{this.state.orderResults.filter(order =>
					order.from === 'RockAuto Customer Service <service@rockauto.com>')
					.map((item, index) => {
						return <OrderCards data={item} key={index} />;
					})}
			</Tab>
			</Tabs>
				
				
			</div>
		);
	}
}

export default CardListPage;
