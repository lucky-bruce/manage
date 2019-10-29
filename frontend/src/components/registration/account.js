import React, { useState } from "react";

export default function AccountInfo(props) {
	const [error, setError] = useState({});
	const [repeat, setRepeat] = useState("");

	function valid() {
		let newError = {};
		let valid = true;

		if (props.username.length === 0) {
			newError.username = true;
			valid = false;
		}

		if (props.password.length === 0) {
			newError.password = true;
			valid = false;
		}

		if (repeat.length === 0) {
			newError.repeat = true;
			valid = false;
		}

		if (repeat !== props.password) {
			newError.repeat = true;
			newError.password = true;
			valid = false;
		}

		setError(newError);
		return valid;
	}

	function submit() {
		if (valid()) {
			props.Register();
		}
	}

	return (
		<span className="">
			<div className="text-center mb-4">
				<h1 className="h3 mb-3 font-weight-normal">Account settings</h1>
			</div>
			<form>
				<div className="form-label-group mb-2rem">
					<input
						type="text"
						className="form-control"
						placeholder="Username*"
						required
						value={props.username}
						autoFocus
						autoComplete="username"
						onChange={e => props.onUsernameChange(e.target.value)}
					/>
					<p
						className={`invalid ${
							error.username === true ? "" : "d-none"
						}`}
					>
						Enter valid value
					</p>
				</div>
				<div className="form-label-group mb-2rem">
					<input
						type="password"
						className="form-control"
						placeholder="Password*"
						value={props.password}
						required
						autoComplete="password"
						onChange={e => props.onPasswordChange(e.target.value)}
					/>
					<p
						className={`invalid ${
							error.password === true ? "" : "d-none"
						}`}
					>
						Enter valid value
					</p>
				</div>
				<div className="form-label-group mb-2rem">
					<input
						type="password"
						className="form-control"
						placeholder="Repeat Password*"
						value={repeat}
						required
						onChange={e => setRepeat(e.target.value)}
					/>
					<p
						className={`invalid ${
							error.repeat === true ? "" : "d-none"
						}`}
					>
						Enter valid value
					</p>
				</div>
			</form>

			<div className="d-flex justify-content-between align-items-center mt-3">
				<button
					className="btn btn-lg btn-success pr-3 pl-3"
					type="submit"
					onClick={() => submit()}
				>
					Register
				</button>
			</div>
		</span>
	);
}
