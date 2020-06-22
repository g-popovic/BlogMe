import React, { useState } from "react";
import Axios from "axios";
import PostInteractions from "./PostInteractions";

function OpenPostMain(props) {
	const [commentText, setCommentText] = useState("");
	const [typingComment, setTypingComment] = useState(false);

	function postComment(e) {
		Axios.post(
			"http://localhost:5000/posts/new-comment/" + props.id,
			{ content: commentText },
			{ withCredentials: true }
		)
			.then(res => {
				console.log(res);
				props.refreshComments();
				setCommentText("");
				setTypingComment(false);
			})
			.catch(err => {
				console.log(err);
				if (err.response.status === 401) {
					window.location.assign(window.location.origin + "/register");
				}
			});

		e.preventDefault();
	}

	function handleChange(event) {
		setCommentText(event.target.value);
	}

	function startTyping() {
		setTypingComment(true);
	}

	function stopTyping() {
		setTypingComment(false);
		setCommentText("");
	}

	return (
		<div className="post-sub-main">
			<h2 className="open-post-title">{props.title}</h2>
			<p className="open-post-author">by {props.author}</p>

			<p className="open-post-content">{props.content}</p>

			<PostInteractions
				id={props.id}
				liked={props.liked}
				likes={props.likes}
				comments={props.comments}
				favorited={props.favorited}
				favorites={props.favorites}
				postTime={props.postTime}
			/>
			<p className="post-date hide-desktop">{props.postTime}</p>

			<div className="open-post-seperation">....</div>

			<form onSubmit={postComment} className="post-comment-form">
				<label className="comment-label">Add comment:</label>
				<div className="comment-input-container">
					<input
						onClick={startTyping}
						onChange={handleChange}
						autoComplete="off"
						type="text"
						placeholder="Your comment..."
						value={commentText}
					/>
				</div>
				{typingComment ? (
					<div className="comment-btn-container show-if-typing-comment">
						<button
							type="submit"
							className="post-comment push-effect btn-primary"
						>
							POST
						</button>
						<button
							onClick={stopTyping}
							className="cancel-comment push-effect btn-secondary-black"
						>
							CANCEL
						</button>
					</div>
				) : null}
			</form>
		</div>
	);
}

export default OpenPostMain;
