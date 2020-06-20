import React from "react";
import Navbar from "../partials/Navbar";
import PostsContainer from "../partials/PostsContainer";

function ExplorePage() {
	return (
		<div>
			<Navbar authenticated={false} />
			<h2 className="posts-page-label">Explore</h2>
			<PostsContainer />
		</div>
	);
}

export default ExplorePage;
