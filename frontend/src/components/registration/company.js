import React, { useState } from "react";

export default function CompanyInfo(props) {
	const [error, setError] = useState({});

	function valid() {
		let newError = {};
		let valid = true;

		if (props.cnpj.length === 0) {
			newError.cnpj = true;
			valid = false;
		}

		if (props.companyname.length === 0) {
			newError.companyname = true;
			valid = false;
		}

		if (props.category.length === 0) {
			newError.category = true;
			valid = false;
		}

		if (props.zip.length === 0) {
			newError.zip = true;
			valid = false;
		}

		setError(newError);
		return valid;
	}

	function submit() {
		if (valid()) {
			props.switchTab();
		}
	}

	return (
		<span className="">
			<h1 className="h3 mb-3 font-weight-normal text-center">
				Company info
			</h1>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					placeholder="CNPJ"
					value={props.cnpj}
					required
					onChange={e => props.onCNPJChange(e.target.value)}
					autoFocus
				/>
				<p className={`invalid ${error.cnpj === true ? "" : "d-none"}`}>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					value={props.companyname}
					placeholder="Company Name"
					required
					onChange={e => props.onCompanyNameChange(e.target.value)}
				/>
				<p
					className={`invalid ${
						error.companyname === true ? "" : "d-none"
					}`}
				>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					placeholder="Category"
					value={props.category}
					required
					onChange={e => props.onCategoryChange(e.target.value)}
					autoFocus
				/>
				<p
					className={`invalid ${
						error.category === true ? "" : "d-none"
					}`}
				>
					Enter valid value
				</p>
			</div>
			<div className="form-label-group mb-2rem">
				<input
					type="text"
					className="form-control"
					value={props.zip}
					placeholder="Zip code"
					required
					onChange={e => props.onZipChange(e.target.value)}
				/>
				<p className={`invalid ${error.zip === true ? "" : "d-none"}`}>
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
