import React from "react";
export default function Total(props) {
	return (
		<div className="col-md-5">
			<div className="font-weight-bold">
				Subtotal: R$ {props.subtotal.toFixed(2)}
			</div>
			<div className="text-danger">
				<div>Delivery Tax : R$ {props.delivery.toFixed(2)}</div>
			</div>
			<div className="text-success">Discount : R$ 0.00</div>
			<div className="mt-3 bg-primary w-75 p-3 rounded text-white">
				Grand total: R$ {props.total.toFixed(2)}
			</div>
		</div>
	);
}
