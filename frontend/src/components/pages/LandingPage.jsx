import React from "react";
import Navbar from "../partials/Navbar";
import LandingPageContent from "../partials/LandingPageContent";

function LandingPage() {
	return (
		<div>
			<Navbar authenticated={true} />
			<LandingPageContent />
		</div>
	);
}

export default LandingPage;
