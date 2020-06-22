import React, { useState } from "react";
import Axios from "axios";

function CreatePostContent() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	console.log("Page Refreshed");

	Axios.get("http://localhost:5000/user/user-id", { withCredentials: true }).then(res => {
		if (!res.data) window.location.assign(window.location.origin + "/register");
	});

	function handleChange(e) {
		if (e.target.name === "post-title") {
			setTitle(e.target.value);
		} else {
			setContent(e.target.value);
		}
	}

	function submitPost(e) {
		const data = {
			title: title,
			content: content
		};

		Axios.post("http://localhost:5000/posts/new-post", data, {
			withCredentials: true
		})
			.then(res => {
				console.log(res);
				window.location.assign(window.location.origin + "/explore");
			})
			.catch(err => console.log(err));

		e.preventDefault();
	}

	function dismissPost() {
		window.location.assign(window.location.origin + "/explore");
	}

	return (
		<div className="create-post-container">
			<h1>Create New Post</h1>

			<form onSubmit={submitPost}>
				<label>Title:</label>
				<input
					onChange={handleChange}
					className="new-post-title"
					type="text"
					autoComplete="off"
					name="post-title"
					required={true}
					placeholder="Post title"
					value={title}
				/>
				<label>Content:</label>
				<textarea
					onChange={handleChange}
					className="new-post-content"
					type="text"
					autoComplete="off"
					name="post-content"
					required={true}
					placeholder="What do you want to write about?"
					value={content}
				></textarea>

				<div className="new-post-buttons">
					<button className="new-post-button push-effect btn-primary" type="submit">
						POST
					</button>
					<button
						type="button"
						onClick={dismissPost}
						className="discard-post-button push-effect btn-secondary-black"
					>
						DISCARD
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreatePostContent;
