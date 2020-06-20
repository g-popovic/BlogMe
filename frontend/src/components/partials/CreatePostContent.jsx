import React from "react";

function CreatePostContent() {
	return (
		<div className="create-post-container">
			<h1>Create New Post</h1>

			<form action="http://localhost:5000/posts/new-post">
				<label for="post-title">Title:</label>
				<input
					className="new-post-title"
					type="text"
					autoComplete="false"
					name="post-title"
					placeholder="Post title"
				/>
				<label for="post-content">Content:</label>
				<textarea
					className="new-post-content"
					type="text"
					autoComplete="false"
					name="post-content"
					placeholder="What do you want to write about?"
				></textarea>

				<div className="new-post-buttons">
					<button className="new-post-button push-effect btn-primary" type="submit">
						POST
					</button>
					<button className="discard-post-button push-effect btn-secondary-black">
						DISCARD
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreatePostContent;
