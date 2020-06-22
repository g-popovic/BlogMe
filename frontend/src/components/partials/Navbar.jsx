import React, { useState } from "react";
import Axios from "axios";

function Navbar() {
	const [showSideBar, setShowSideBar] = useState(false);

	const [authenticated, setAuthenticated] = useState(() => {
		Axios.get("http://localhost:5000/user/user-id", { withCredentials: true })
			.then(id => {
				setAuthenticated(id.data);
			})
			.catch(err => console.log(err));
	});

	function logout() {
		Axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true })
			.then(res => {
				console.log(res);
				window.location.reload();
			})
			.catch(err => console.log(err));
	}

	function toggleSideBar() {
		setShowSideBar(pv => !pv);
	}

	return (
		<div>
			<nav>
				<a className="logo-anchor" href="/">
					<img
						className="logo"
						src={require("../../images/Logo@3x.png")}
						alt="logo"
					/>
				</a>

				<img
					onClick={toggleSideBar}
					className="burger cancel hide-desktop"
					src={require(showSideBar
						? "../../images/cancel.svg"
						: "../../images/Burger.svg")}
					alt="navigation"
				/>

				<ul className={"nav-items" + (showSideBar ? "" : " hide-mobile")}>
					<li className="nav-item">
						<a href="/explore">
							<button>Explore</button>
						</a>
					</li>

					{authenticated ? (
						<li className="nav-item">
							<a href="/favorites">
								<button>Favorites</button>
							</a>
						</li>
					) : (
						<li className="nav-item">
							<a href="/login">
								<button>Login</button>
							</a>
						</li>
					)}

					{authenticated ? (
						<li className="nav-item">
							<a href="/new-post">
								<button>New Post</button>
							</a>
						</li>
					) : (
						<li className="nav-item">
							<a href="/register">
								<button>Register</button>
							</a>
						</li>
					)}

					{authenticated ? (
						<li className="nav-item">
							<a onClick={logout}>
								<button>Logout</button>
							</a>
						</li>
					) : null}
				</ul>
			</nav>

			<div className="green-strip"></div>
		</div>
	);
}

export default Navbar;
