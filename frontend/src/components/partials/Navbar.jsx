import React from "react";

function Navbar(props) {
	return (
		<div>
			<nav>
				<a className="logo-anchor" href="http://localhost:3000">
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
						<a href="http://localhost:3000/explore">
							<button>Explore</button>
						</a>
					</li>
					<li className="nav-item">
						<a href="http://localhost:3000/favorites">
							<button>Favorites</button>
						</a>
					</li>
					{props.authenticated ? (
						<li className="nav-item">
							<a href="http://localhost:3000/new-post">
								<button>New Post</button>
							</a>
						</li>
					) : (
						<li className="nav-item">
							<a href="http://localhost:3000/login">
								<button>Login</button>
							</a>
						</li>
					)}

					{props.authenticated ? null : (
						<li className="nav-item">
							<a href="http://localhost:3000/register">
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
