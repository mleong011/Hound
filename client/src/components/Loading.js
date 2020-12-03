import React from "react";

function Loading() {
	return (
		<div className="d-flex justify-content-center">
			<div className="spinnerBorder" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default Loading;
