import React from "react";

function Comment(props) {
	return (
		<li>
			<p className="comment-author">{props.author}</p>
			<p className="comment-content">{props.content}</p>
		</li>
	);
}

export default Comment;
