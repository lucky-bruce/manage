import React, { useState, useContext } from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Bank } from "../../../proto/financial/financial_pb";
import Context from "../../context/context";

export default function Modal(props) {
	const context = useContext(Context);
	const client = context.finances;

	const [name, setName] = useState("");

	function RandomColor() {
		let r, g, b;
		r = Math.floor(Math.random() * 255);
		g = Math.floor(Math.random() * 255);
		b = Math.floor(Math.random() * 255);

		const string = `rgb(${r},${g},${b})`;
		return string;
	}

	function NewBank() {
		let bank = new Bank();

		bank.setName(name);
		bank.setColor(RandomColor());
		client.newBank(bank, {}, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				console.log(res.toObject());
			}
			$("#exampleModal").modal("toggle");
			props.onAdd();
		});
	}

	return (
		<div>
			<button
				data-toggle="modal"
				data-target="#exampleModal"
				className="btn-success btn "
			>
				New <FontAwesomeIcon icon={faPlus} />
			</button>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div
					className="modal-dialog modal-dialog-centered"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								New bank
							</h5>
							<button
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<h6>Enter bank name</h6>
							<input
								value={name}
								onChange={e => setName(e.target.value)}
								type="text"
								className="form-control w-50"
							/>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => NewBank()}
								className="btn-success btn"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
