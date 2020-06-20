import React from "react";
import Navbar from "../partials/Navbar";
import PostsContainer from "../partials/PostsContainer";

function FavoritesPage() {
	return (
		<div>
			<Navbar />
			<h2 className="posts-page-label">Favorites</h2>
			<PostsContainer favorites={true} />
		</div>
	);
}

export default FavoritesPage;
