import React, { useState } from "react";
import Post from "./Post";
import Axios from "axios";

function PostsContainer(props) {
	const [posts, setPosts] = useState(() => getPosts());

	function getPosts() {
		if (!props.favorites) {
			Axios.get("http://localhost:5000/posts/all", { withCredentials: true })
				.then(res => {
					setPosts(res.data.reverse());
				})
				.catch(err => console.log(err));
		} else {
			Axios.get("http://localhost:5000/posts/favorites", { withCredentials: true })
				.then(res => {
					setPosts(res.data.reverse());
				})
				.catch(err => {
					console.log(err);
					if (err.response.status === 401) {
						window.location.assign(window.location.origin + "/register");
					}
				});
		}
	}

	return (
		<div className="posts-main">
			<ul className="posts-container">
				{posts !== undefined ? (
					posts.length === 0 ? (
						<p className="loading-posts">No posts found</p>
					) : (
						posts.map(post => {
							return (
								<Post
									key={post._id}
									id={post._id}
									author={post.author}
									title={post.title}
									date={post.date.toString()}
									likes={post.likes}
									favorites={post.favorites}
									comments={post.comments.length}
									liked={post.liked}
									favorited={post.favorited}
									postTime={post.postTime}
								/>
							);
						})
					)
				) : (
					<p className="loading-posts">Loading posts...</p>
				)}
			</ul>
		</div>
	);
}

export default PostsContainer;
