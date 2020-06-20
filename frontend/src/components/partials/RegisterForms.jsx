import React from "react";

function RegisterForms() {
	return (
		<div className="login-container">
			<h1>WELCOME TO BLOGME</h1>

			<form className="login-forms">
				<div className="login-input-container">
					<img
						className="login-icon-label login-icon-username"
						src={require("../../images/Icon@3x.png")}
						alt="input icon"
					/>
					<input
						className="login-input"
						autoComplete="off"
						type="text"
						placeholder="Username"
						name="username"
					/>
				</div>
				<div className="login-input-container">
					<img
						className="login-icon-label login-icon-password"
						src={require("../../images/key-icon.svg")}
						alt="input icon"
					/>
					<input
						className="login-input"
						autoComplete="off"
						type="text"
						placeholder="Password"
						name="login-icon-password"
					/>
				</div>
				<div className="login-input-container">
					<img
						className="login-icon-label login-icon-password"
						src={require("../../images/key-icon.svg")}
						alt="input icon"
					/>
					<input
						className="login-input"
						autoComplete="off"
						type="text"
						placeholder="Confirm Password"
					/>
				</div>

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
