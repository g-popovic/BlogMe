import React from "react";

function OpenPostMain() {
	return (
		<div className="post-sub-main">
			<h2 className="open-post-title">This is the title of my very first blog</h2>
			<p className="open-post-date hide-mobile">2 hours ago</p>
			<p className="open-post-author">djoka123</p>

			<p className="open-post-content">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
				eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
				kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
				ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
				tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
				vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem
			</p>

			<div className="post-interactions open-p-i">
				<button className="likes open-p-i-item push-effect">
					<img src={require("../../images/like-icon.svg")} alt="like icon" />
					<p className="interaction-label hide-desktop">392</p>
					<p className="interaction-label hide-mobile">274k Likes</p>
				</button>
				<button className="comments open-p-i-item push-effect">
					<img
						src={require("../../images/comment-border.svg")}
						alt="comment icon"
					/>
					<p className="interaction-label hide-desktop ">2</p>
					<p className="interaction-label hide-mobile">1.6k Comments</p>
				</button>
				<button className="favorites open-p-i-item push-effect">
					<img
						src={require("../../images/favorite-border.svg")}
						alt="favorite icon"
					/>
					<p className="interaction-label hide-desktop">2.6k</p>
					<p className="interaction-label hide-mobile">532 Favorites</p>
				</button>
			</div>
			<p className="open-post-date hide-desktop">2 hours ago</p>

			<div className="open-post-seperation">....</div>

			<form
				className="post-comment-form"
				action="http://localhost:5000/posts/new-comment"
				method="post"
			>
				<label className="comment-label">Add comment:</label>
				<div className="comment-input-container">
					<input
						autoComplete="off"
						type="text"
						name="comment-input"
						placeholder="Your comment..."
					/>
				</div>
				<div className="comment-btn-container show-if-typing-comment">
					<button className="post-comment push-effect btn-primary">POST</button>
					<button className="cancel-comment push-effect btn-secondary-black">
						CANCEL
					</button>
				</div>
			</form>
		</div>
	);
}

export default OpenPostMain;
