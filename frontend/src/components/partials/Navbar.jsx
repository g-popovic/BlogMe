import React from "react";

function Navbar(props) {
	const adress = window.location.href
		.toString()
		.replace(window.location.pathname.toString(), "");

	return (
		<div>
			<nav>
				<a className="logo-anchor" href={adress}>
					<img
						className="logo"
						src={require("../../images/Logo@3x.png")}
						alt="logo"
					/>
				</a>
				<img
					className="burger hide-desktop"
					src={require("../../images/Burger.svg")}
					alt="navigation"
				/>
				<ul className="nav-items hide-mobile">
					<li className="nav-item">
						<a href={adress + "/explore"}>
							<button>Explore</button>
						</a>
					</li>
					<li className="nav-item">
						<a href={adress + "/favorites"}>
							<button>Favorites</button>
						</a>
					</li>
					{props.authenticated ? (
						<li className="nav-item">
							<a href={adress + "/new-post"}>
								<button>New Post</button>
							</a>
						</li>
					) : (
						<li className="nav-item">
							<a href={adress + "/login"}>
								<button>Login</button>
							</a>
						</li>
					)}

					{props.authenticated ? null : (
						<li className="nav-item">
							<a href={adress + "/register"}>
								<button>Register</button>
							</a>
						</li>
					)}
				</ul>
			</nav>

			<div className="green-strip"></div>
		</div>
	);
}

export default Navbar;
