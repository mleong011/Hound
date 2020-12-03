import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function CardInfo({ trackNum }) {
	return (
		<div className="col-10 col-md-8 col-lg-7">
			<div className="card mb-4 shadow">
				<div className="card-body card-text">
					b<Link to={"/info/" + trackNum}></Link>
				</div>
				<div className="card-footer small text-muted text-right">Amazon</div>
			</div>
		</div>
	);
}

export default CardInfo;
