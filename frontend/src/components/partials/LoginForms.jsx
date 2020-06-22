import React, { useState } from "react";
import Axios from "axios";

function LoginForms() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	Axios.get("http://localhost:5000/user/user-id", { withCredentials: true })
		.then(res => {
			if (res.data) {
				window.location.assign(window.location.origin + "/explore");
			}
		})
		.catch(err => console.log(err));

	function handleChange(event) {
		if (event.target.type === "password") {
			setPassword(event.target.value);
		} else {
			setUsername(event.target.value);
		}
	}

	function login(event) {
		if (username !== "" && password !== "") {
			const data = {
				username: username,
				password: password
			};

			Axios.post("http://localhost:5000/user/login", data, { withCredentials: true })
				.then(response => {
					console.log(response);
					window.location.assign(window.location.origin + "/explore");
				})
				.catch(err => {
					console.log(err);
					setPassword("");
					setError(err.response.data);
				});

			event.preventDefault();
		}
	}

	return (
		<div className="login-container">
			<h1>SIGN IN TO BLOGME</h1>

			<form onSubmit={login} className="login-forms">
				<div className="login-input-container">
					<img
						className="login-icon-label login-icon-username"
						src={require("../../images/Icon@3x.png")}
						alt="input icon"
					/>
					<input
						required={true}
						className="login-input"
						autoComplete="off"
						type="text"
						placeholder="Username"
						name="username"
						value={username}
						onChange={handleChange}
					/>
				</div>
				<div className="login-input-container">
					<img
						className="login-icon-label login-icon-password"
						src={require("../../images/key-icon.svg")}
						alt="input icon"
					/>
					<input
						required={true}
						className="login-input"
						autoComplete="off"
						type="password"
						placeholder="Password"
						name="login-icon-password"
						value={password}
						onChange={handleChange}
					/>
				</div>
				<p className={"passwords-not-matching" + (error ? "" : " hide")}>{error}</p>

				<button onClick={login} className="login-button btn-primary push-effect">
					SIGN IN
				</button>

				<div className="login-second-option">
					<p>Don't have an account?</p>
					<a href="/register">Create one now!</a>
				</div>
			</form>
		</div>
	);
}

export default LoginForms;
