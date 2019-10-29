import React, { useState } from "react";

export default function GeneralInfo(props) {
	const [error, setError] = useState({ fn: false, mn: false, ln: false });

	function valid() {
		let newError = {};
		let valid = true;
		if (props.firstname.length === 0) {
			newError.fn = true;
			valid = false;
		}

		if (props.lastname.length === 0) {
			newError.ln = true;
			valid = false;
		}

		setError(newError);
		return valid;
	}

	function submit() {
		const v = valid();

		if (v) {
			props.switchTab();
		}
	}

	return (
		<span className="">
			<h1 className="h3 mb-3 font-weight-normal text-center">
				General info
			</h1>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					placeholder="First name*"
					required
					value={props.firstname}
					autoFocus
					onChange={e => props.onFirstNameChange(e.target.value)}
				/>
				<p className={`invalid ${error.fn === true ? "" : "d-none"}`}>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					placeholder="Mid name"
					required
					value={props.midname}
					onChange={e => props.onMidNameChange(e.target.value)}
				/>
				<p className={`invalid ${error.mn ? "" : "d-none"}`}>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					placeholder="Last name*"
					required
					value={props.lastname}
					onChange={e => props.onLastNameChange(e.target.value)}
				/>
				<p className={`invalid ${error.ln ? "" : "d-none"}`}>
					Enter valid value
				</p>
			</div>
			<div className="d-flex justify-content-between align-items-center mt-3">
				<button
					className="btn btn-lg btn-success pr-3 pl-3"
					type="submit"
					onClick={() => submit()}
				>
					Next
				</button>
			</div>
		</span>
	);
}
