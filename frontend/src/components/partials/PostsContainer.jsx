import React from "react";
import Post from "./Post";

function PostsContainer(props) {
	return (
		<div className="posts-main">
			<ul className="posts-container">
				<Post />
				<Post />
				<Post />
				<Post />
			</ul>
		</div>
	);
}

export default PostsContainer;
