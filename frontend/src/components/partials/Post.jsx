import React from "react";

function Post(props) {
	return (
		<li className="post">
			<h3 className="post-title">This is the title of my very first</h3>
			<p className="post-author">by: djoka123</p>
			<div className="post-interactions">
				<button className="likes  push-effect">
					<img src={require("../../images/like-border.svg")} alt="like icon" />
					<p className="interaction-label hide-desktop">392</p>
					<p className="interaction-label hide-mobile">2.5k Likes</p>
				</button>
				<button className="comments  push-effect">
					<img
						src={require("../../images/comment-border.svg")}
						alt="comment icon"
					/>
					<p className="interaction-label hide-desktop">452</p>
					<p className="interaction-label hide-mobile">124k Comments</p>
				</button>
				<button className="favorites  push-effect">
					<img
						src={require("../../images/favorite-border.svg")}
						alt="favorite icon"
					/>
					<p className="interaction-label hide-desktop">2.6k</p>
					<p className="interaction-label hide-mobile">561k Favorites</p>
				</button>
				<p className="post-date hide-mobile">14 minutes ago</p>
			</div>
			<p className="post-date hide-desktop">14 minutes ago</p>
		</li>
	);
}

export default Post;
