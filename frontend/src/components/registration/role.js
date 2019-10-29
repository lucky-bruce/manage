import React from "react";

export default function RoleInfo(props) {
	return (
		<span className="">
			<h1 className="h3 mb-3 font-weight-normal text-center">
				General info
			</h1>
			<div className="form-label-group d-flex flex-row align-items-center">
				I am a:
				<div className="d-flex  align-items-center">
					<button
						type="button"
						value="user"
						onClick={e => props.onRoleChange(e.target.value)}
						className={`btn btn-lg m-3 ${
							props.role === "user"
								? "btn-success"
								: "btn-outline-success"
						}`}
					>
						User
					</button>
					<button
						type="button"
						value="supplier"
						className={`btn m-3 btn-lg ${
							props.role === "supplier"
								? "btn-success"
								: "btn-outline-success"
						}`}
						onClick={e => props.onRoleChange(e.target.value)}
					>
						Supplier
					</button>
				</div>
			</div>

			<div className="d-flex justify-content-between align-items-center mt-3">
				<button
					className="btn btn-lg btn-success pr-3 pl-3"
					type="submit"
					onClick={() => props.switchTab()}
				>
					Next
				</button>
			</div>
		</span>
	);
}
