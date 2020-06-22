import React, { useState } from "react";
import Axios from "axios";

function RegisterForms() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [error, setError] = useState("");

	Axios.get("http://localhost:5000/user/user-id", { withCredentials: true })
		.then(res => {
			if (res.data) {
				window.location.assign(window.location.origin + "/explore");
			}
		})
		.catch(err => console.log(err));

	function handleChange(event) {
		if (event.target.name === "username") {
			setUsername(event.target.value);
		} else if (event.target.name === "password") {
			setPassword(event.target.value);
		} else {
			setConfirm(event.target.value);
			if (password !== event.target.value) {
				setError(true);
			} else {
				setError(false);
			}
		}
	}

	React.memo(function MyComponent(props) {
		return <div>{"My Component " + props.value}</div>;
	});

	function register(event) {
		if (username !== "" && password !== "") {
			if (password === confirm) {
				const data = {
					username: username,
					password: password
				};

				Axios.post("http://localhost:5000/user/register", data, {
					withCredentials: true
				})
					.then(res => {
						console.log(res);
						window.location.assign(window.location.origin + "/explore");
					})
					.catch(err => console.log(err));
			} else {
				setPassword("");
				setConfirm("");
			}
			event.preventDefault();
		}
	}

	return (
		<div className="login-container">
			<h1>WELCOME TO BLOGME</h1>

			<form onSubmit={register} className="login-forms">
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
						onChange={handleChange}
						value={username}
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
						name="password"
						onChange={handleChange}
						value={password}
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
						placeholder="Confirm Password"
						name="confirm"
						onChange={handleChange}
						value={confirm}
					/>
				</div>
				<p className={"passwords-not-matching" + (error ? "" : " hide")}>
					The passwords do not match.
				</p>

				<button className="login-button btn-primary push-effect" type="submit">
					SIGN UP
				</button>

				<div className="login-second-option">
					<p>Already have an account?</p>
					<a href="/login">Sign in now!</a>
				</div>
			</form>
		</div>
	);
}

export default RegisterForms;
