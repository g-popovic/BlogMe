import React, { useState } from "react";
import Navbar from "../partials/Navbar";
import OpenPostMain from "../partials/OpenPostMain";
import Comment from "../partials/Comment";
import { useParams } from "react-router-dom";
import Axios from "axios";

function OpenedPostPage() {
	let { id } = useParams();

	const [post, setPost] = useState(() => getPost());
	const [comments, setComments] = useState([]);

	function getPost() {
		Axios.get("http://localhost:5000/posts/post-id/" + id, { withCredentials: true })
			.then(res => {
				setPost(res.data);
				console.log(res.data);

				setComments(res.data.comments.reverse());
			})
			.catch(err => console.log(err));
	}

	function refreshComments() {
		Axios.get("http://localhost:5000/posts/post-id/" + id, { withCredentials: true })
			.then(res => {
				setComments(res.data.comments.reverse());
			})
			.catch(err => console.log(err));
	}

	return (
		<div>
			<Navbar />
			<div className="post-main">
				{post ? (
					<OpenPostMain
						key={id}
						id={id}
						title={post.title}
						author={post.author}
						content={post.content}
						postTime={post.postTime}
						liked={post.liked}
						likes={post.likes}
						comments={post.comments.length}
						favorited={post.favorited}
						favorites={post.favorites}
						refreshComments={() => refreshComments()}
					/>
				) : (
					<p className="loading-post loading-posts">Loading post...</p>
				)}

				{post ? (
					<ul className="comments-container">
						{comments.map(comment => {
							return (
								<Comment
									key={comment._id}
									content={comment.content}
									author={comment.author}
								/>
							);
						})}
					</ul>
				) : null}
			</div>
		</div>
	);
}

export default OpenedPostPage;
