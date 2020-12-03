import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CardsForm from "./pages/CardsForm";
import GetPassword from "./pages/GetPassword";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					{/* Home route must be put last  or other components wont render */}
					<Route path="/sign-up" component={SignUp} />
					<Route path="/get-password" component={GetPassword} />
					<Route path="/search" component={CardsForm} />
					<Route path="/" component={Login} />
				</Switch>
			</Router>
		);
	}
}

export default App;
