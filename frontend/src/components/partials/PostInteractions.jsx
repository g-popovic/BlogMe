import React, { useState } from "react";
import Axios from "axios";

function PostInteractions(props) {
	const [liked, setLiked] = useState(props.liked);
	const [favorited, setFavorited] = useState(props.favorited);

	const [likes, setLikes] = useState(props.likes);
	const [favorites, setFavorites] = useState(props.favorites);

	const [likeReady, setLikeReady] = useState(() => true);
	const [favoriteReady, setFavoriteReady] = useState(() => true);

	function like() {
		if (likeReady) {
			setLikeReady(false);
			setLikes(prevVal => (liked ? prevVal - 1 : prevVal + 1));
			setLiked(prevVal => !prevVal);

			Axios.patch(
				"http://localhost:5000/posts/like/" + props.id,
				{},
				{ withCredentials: true }
			)
				.then(res => {
					console.log(res);
					setLikeReady(true);
				})
				.catch(err => {
					if (err.response.status === 401) {
						window.location.assign(window.location.origin + "/register");
					}
				});
		}
	}

	function favorite() {
		if (favoriteReady) {
			setFavoriteReady(false);
			setFavorites(prevVal => (favorited ? prevVal - 1 : prevVal + 1));
			setFavorited(prevVal => !prevVal);

			Axios.patch(
				"http://localhost:5000/posts/favorite/" + props.id,
				{},
				{ withCredentials: true }
			)
				.then(res => {
					setFavoriteReady(true);
				})
				.catch(err => {
					if (err.response.status === 401) {
						window.location.assign(window.location.origin + "/register");
					} else {
						console.log(err);
					}
				});
		}
	}

	return (
		<div className="post-interactions">
			<button onClick={like} className="likes">
				<img
					src={require("../../images/like-" + (liked ? "icon" : "border") + ".svg")}
					alt="like icon"
				/>
				<p className="interaction-label hide-desktop">{likes}</p>
				<p className="interaction-label hide-mobile">{likes} Likes</p>
			</button>
			<button
				onClick={() =>
					window.location.assign(window.location.origin + "/post/" + props.id)
				}
				className="comments"
			>
				<img src={require("../../images/comment-border.svg")} alt="comment icon" />
				<p className="interaction-label hide-desktop">{props.comments}</p>
				<p className="interaction-label hide-mobile">{props.comments} Comments</p>
			</button>
			<button onClick={favorite} className="favorites">
				<img
					src={require("../../images/favorite-" +
						(favorited ? "icon" : "border") +
						".svg")}
					alt="favorite icon"
				/>
				<p className="interaction-label hide-desktop">{favorites}</p>
				<p className="interaction-label hide-mobile">{favorites} Favorites</p>
			</button>
			<p className="post-date hide-mobile">{props.postTime}</p>
		</div>
	);
}

export default PostInteractions;
