import React from "react";

function LandingPageContent() {
	return (
		<div className="landing-page-main">
			<div className="landing-page-background">
				<div className="landing-page-background-tint"></div>
				<img src={require("../../images/background-nature.jpg")} alt="nature" />
			</div>

			<div className="content">
				<h1 className="main-header">SHARE YOUR STORIES</h1>
				<h2 className="header-description">
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
					eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
					voluptua. At vero eos et accusam.
				</h2>

				<a className="landing-btn-container" href="/register">
					<button className="landing-page-button-main push-effect">
						SIGN UP NOW
					</button>
				</a>
				<a className="landing-btn-container" href="/explore">
					<button className="landing-page-button-secondary push-effect">
						EXPLORE
					</button>
				</a>
			</div>
		</div>
	);
}

export default LandingPageContent;
