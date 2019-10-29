import React, { useState } from "react";

export default function ContactInfo(props) {
	const [error, setError] = useState({});

	function valid() {
		let newError = {};
		let valid = true;
		if (props.email.length === 0) {
			newError.email = true;
			valid = false;
		}

		if (props.phonenumber.length === 0) {
			newError.phonenumber = true;
			valid = false;
		}

		if (props.state.length === 0) {
			newError.state = true;
			valid = false;
		}

		if (props.city.length === 0) {
			newError.city = true;
			valid = false;
		}

		if (props.address.length === 0) {
			newError.address = true;
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
				Contact info
			</h1>
			<div className="form-label-group mb-2rem">
				<input
					type="email"
					id="inputEmail"
					className="form-control"
					placeholder="Email*"
					value={props.email}
					required
					onChange={e => props.onEmailChange(e.target.value)}
					autoFocus
				/>
				<p
					className={`invalid ${
						error.email === true ? "" : "d-none"
					}`}
				>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					value={props.phonenumber}
					placeholder="Phone number*"
					required
					onClick={e => {
						e.target.value = "+";
					}}
					onChange={e => props.onPhoneNumberChange(e.target.value)}
				/>
				<p
					className={`invalid ${
						error.phonenumber === true ? "" : "d-none"
					}`}
				>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					placeholder="State*"
					value={props.state}
					required
					onChange={e => props.onStateChange(e.target.value)}
				/>
				<p
					className={`invalid ${
						error.state === true ? "" : "d-none"
					}`}
				>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					value={props.city}
					placeholder="City*"
					required
					onChange={e => props.onCityChange(e.target.value)}
				/>
				<p className={`invalid ${error.city === true ? "" : "d-none"}`}>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					value={props.address}
					placeholder="Address*"
					required
					onChange={e => props.onAddressChange(e.target.value)}
				/>
				<p
					className={`invalid ${
						error.address === true ? "" : "d-none"
					}`}
				>
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
