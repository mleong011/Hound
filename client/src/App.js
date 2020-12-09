import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CardsForm from "./pages/CardsForm";
import Home from "./pages/Home";
import SigninPage from "./pages/SigninPage";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					{/* Home route must be put last  or other components wont render */}
					<Route path="/search" component={CardsForm} />
					<Route path="/home" component={Home} />
					<Route path="/" component={SigninPage} />
				</Switch>
			</Router>
		);
	}
}

export default App;
