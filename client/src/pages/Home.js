import React from "react";
import "../App.css";
import Loading from "../components/Loading";
import {Redirect} from 'react-router-dom';

class Home extends React.Component {
	constructor(props){
        super(props);
        this.state={
            redirectToReferrer: false,
            name: '',
            email: ''
        }
    }

    componentDidMount(){
        let data = JSON.parse(sessionStorage.getItem('userData'));
        console.log("DATAAAA", data);
        this.setState({name: data.data.name});
        this.setState({email: data.data.email});
    }

	render() {
		if (this.state.loading) {
			return <Loading />;
        }
        
        if(!sessionStorage.getItem('userData')){
            return(<Redirect to={'/'}/>)
        }

		return (
			<div className="container-fluid text-center">
				<div className="row justify-content-center">Welcome to home page</div>
                <h2>wellcome {this.state.name}</h2>
                <h3>{this.state.email}</h3>
			</div>
		);
	}
}

export default Home;
