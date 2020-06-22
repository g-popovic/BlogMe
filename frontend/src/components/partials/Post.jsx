import React, { useState } from "react";
import PostInteractions from "./PostInteractions";

function Post(props) {
	function openPost() {
		window.location.assign(window.location.origin + "/post/" + props.id);
	}

	return (
		<li className="post">
			<h3 onClick={openPost} className="post-title">
				{props.title}
			</h3>
			<p onClick={openPost} className="post-author">
				by: {props.author}
			</p>
			<PostInteractions
				id={props.id}
				liked={props.liked}
				likes={props.likes}
				comments={props.comments}
				favorites={props.favorites}
				favorited={props.favorited}
				postTime={props.postTime}
			/>
			<p className="post-date hide-desktop">{props.postTime}</p>
		</li>
	);
}

export default Post;
