import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CardsForm from "./pages/CardsForm";
import GetPassword from "./pages/GetPassword";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SigninPage from './pages/SigninPage';



class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					{/* Home route must be put last  or other components wont render */}
					<Route path="/sign-up" component={SignUp} />
					<Route path="/get-password" component={GetPassword} />
					<Route path="/search" component={CardsForm} />
					<Route path="/sign-in" component={SigninPage}/>
					<Route path="/" component={Login} />
					
				</Switch>
			</Router>
		);
	}
}

export default App;
