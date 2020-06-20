import React from "react";
import Navbar from "../partials/Navbar";
import OpenPostMain from "../partials/OpenPostMain";
import Comment from "../partials/Comment";

function OpenedPostPage() {
	return (
		<div>
			<Navbar />
			<div className="post-main">
				<OpenPostMain />

				<ul className="comments-container">
					<Comment />
					<Comment />
					<Comment />
					<Comment />
				</ul>
			</div>
		</div>
	);
}

export default OpenedPostPage;
