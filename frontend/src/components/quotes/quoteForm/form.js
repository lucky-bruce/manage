import React, { useState, useReducer, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validate } from "email-validator";
import { navigate } from "hookrouter";
import { isEmpty } from "../../../utils/utils";
import ProductSelect from "./product/productSelect";
import ProductTable from "./product/producttable";
import { quoteInput, GetGRPCQuote } from "../../../utils/grpc";
import ServiceSelect from "./service/serviceSelect";
import ServiceTable from "./service/serviceTable";
import { newQuote, getDistance, getUser } from "../../../utils/backend";
import Total from "./total";

export default function Form() {
	const [timeout, settimeout] = useState(0);
	const [mode, setMode] = useState(0);
	const [error, setError] = useState({
		name: false,
		email: false,
		phonenumber: false,
		city: false,
		address: false,
		zip: false,
		product: false,
		productsList: false,
		size: false
	});

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		quoteInput
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	const modes = [
		{
			title: "Product",
			component: (
				<ProductSelect
					onSectorChange={v => handleChange("sector", v)}
					sector={userInput.sector}
					onSizeChange={v => handleChange("size", v)}
					size={userInput.size}
					onProductSelect={product => onProductSelect(product)}
					add={() => add()}
				/>
			)
		},
		{
			title: "Service",
			component: (
				<ServiceSelect
					service={userInput.service}
					onServiceSelect={service =>
						handleChange("service", service)
					}
					add={() => add()}
				/>
			)
		}
	];

	useEffect(() => {
		subtotalPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInput.productsList, userInput.servicesList]);

	const onProductSelect = product => {
		var errored = false;
		for (var i in userInput.productsList) {
			if (userInput.productsList[i].product.id === product.id) {
				setError({ product: true });
				errored = true;
			}
		}

		console.log(errored);

		if (!errored) {
			handleChange("product", { product, qty: 1 });
		}
	};

	const add = () => {
		if (!isEmpty(userInput.product)) {
			handleChange("productsList", [
				...userInput.productsList,
				userInput.product
			]);

			var isIn = false;
			for (var i in userInput.supplieridsList) {
				if (
					userInput.supplieridsList[i] ===
					userInput.product.product.userid
				) {
					isIn = true;
					return;
				}
			}

			if (!isIn) {
				handleChange("supplieridsList", [
					...userInput.supplieridsList,
					{
						id: userInput.product.product.userid
					}
				]);
			}

			handleChange("product", null);
		}
		if (!isEmpty(userInput.service)) {
			handleChange("servicesList", [
				...userInput.servicesList,
				{ service: userInput.service, qty: 1 }
			]);

			var isIn = false;
			for (var supplier of userInput.supplieridsList) {
				if (supplier === userInput.service.userid) {
					isIn = true;
					return;
				}
			}

			if (!isIn) {
				handleChange("supplieridsList", [
					...userInput.supplieridsList,
					{
						id: userInput.service.userid
					}
				]);
			}

			handleChange("service", null);
		}
	};

	const onProductQtyChange = (i, value) => {
		var p = userInput.productsList;
		p[i].qty = value;

		handleChange("productsList", p);
		subtotalPrice();
	};

	const onServiceQtyChange = (i, value) => {
		var s = userInput.servicesList;
		s[i].qty = value;

		handleChange("servicesList", s);
		subtotalPrice();
	};

	function checkValidity() {
		var err = {};
		var errored = false;

		if (userInput.name.length === 0) {
			err.name = true;

			errored = true;
		}

		if (!validate(userInput.email)) {
			err.email = true;
			errored = true;
		}

		if (userInput.phonenumber.length < 4) {
			err.phonenumber = true;
			errored = true;
		}

		if (userInput.city.length === 0) {
			err.city = true;
			errored = true;
		}

		if (userInput.address.length === 0) {
			err.address = true;
			errored = true;
		}

		if (userInput.zip.length === 0) {
			err.zip = true;
			errored = true;
		}

		if (userInput.city.length === 0) {
			err.city = true;
			errored = true;
		}

		if (userInput.productsList.length === 0) {
			err.productsList = true;
			errored = true;
		}

		// if (product < 1) {
		// 	err.qty = true;
		// 	errored = true;
		// }

		if (userInput.size.length === 0) {
			err.size = true;
			errored = true;
		}

		setError(err);
		return [errored, err];
	}

	function subtotalPrice() {
		var total = 0;
		for (const unit of userInput.productsList) {
			total += unit.product.sellingprice * unit.qty;
		}
		for (const unit of userInput.servicesList) {
			total += unit.service.chargevalue * unit.qty;
		}

		handleChange("subtotal", total);
	}

	const handleAddressChange = (field, e) => {
		handleChange(field, e.target.value);
		handleChange("delivery", 0);
		if (timeout) clearTimeout(timeout);
		settimeout(
			setTimeout(() => {
				DistanceCalculator(userInput.suppliersLoc);
			}, 1500)
		);
	};

	const GetSupplier = id => {
		getUser(id, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				let u = res.toObject();
				handleChange("suppliersLoc", [
					...userInput.suppliersLoc,
					`${u.address}, ${u.city}, ${u.state}`
				]);
			}
		});
	};

	useEffect(() => {
		for (let id of userInput.supplieridsList) {
			GetSupplier(id.id);
		}
	}, [userInput.supplieridsList]);

	useEffect(() => {
		setTimeout(() => {
			DistanceCalculator(userInput.suppliersLoc);
		}, 1500);
	}, [userInput.suppliersLoc]);

	async function DistanceCalculator(locs) {
		let from = `${userInput.address}, ${userInput.city}, ${userInput.state}`;

		await handleChange("delivery", 0);
		for (let loc of locs) {
			getDistance(from, loc, (err, res) => {
				if (err) {
					console.log(err);
				}
				if (res) {
					const dis = res.toObject();
					handleChange("delivery", userInput.delivery + dis.distance);
				}
			});
		}
	}

	useEffect(() => {
		handleChange("sumprice", userInput.subtotal + userInput.delivery);
	}, [userInput.delivery, userInput.subtotal]);

	function submit() {
		const [errored, err] = checkValidity();

		if (errored) {
			setError(err);
			return;
		}

		var quote = GetGRPCQuote(userInput);

		newQuote(quote, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				res = res.toObject();

				navigate(`/quote/${res.id}`, true);
			}
		});
	}

	return (
		<div>
			<div className="sticky-top">
				<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
					<span>
						<FontAwesomeIcon icon={faTimes} /> New Quote Request
					</span>
					<button
						className="btn-success btn"
						onClick={() => submit()}
					>
						Save Quote
					</button>
				</div>
			</div>
			<div className="p-4">
				<div className="d-flex justify-content-between">
					<h3>Product and Service Quotation</h3>
					<span className="flex-column d-flex justify-content-end">
						New Quotation
						<span className="font-weight-bold">ID: A0001</span>
					</span>
				</div>
				<div className="mt-3 row inputs">
					<div className="col-md-4">
						<div className="quote-input ">
							<input
								type="text"
								id="fullname"
								className="form-control"
								placeholder="Full name"
								required
								autoFocus
								value={userInput.name}
								onChange={e => {
									handleChange("name", e.target.value);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.name ? "d-block" : " "
								} `}
							>
								Please enter a valid name
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="email"
								id="email"
								className="form-control"
								placeholder="Email"
								required
								value={userInput.email}
								onChange={e =>
									handleChange("email", e.target.value)
								}
							/>
							<div
								className={`invalid-feedback ${
									error.email ? "d-block" : ""
								}`}
							>
								Please enter a valid email
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="text"
								id="phnumber"
								className="form-control"
								value={userInput.phonenumber}
								placeholder="Phone number"
								required
								onChange={e =>
									handleChange("phonenumber", e.target.value)
								}
							/>
							<div
								className={`invalid-feedback ${
									error.phonenumber ? "d-block" : ""
								}`}
							>
								Please enter a valid phone number
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<div className="quote-input ">
							<input
								type="text"
								id="city"
								className="form-control"
								placeholder="City"
								required
								value={userInput.city}
								onChange={e => handleAddressChange("city", e)}
							/>
							<div
								className={`invalid-feedback ${
									error.city ? "d-block" : ""
								}`}
							>
								Please enter a valid city
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="text"
								id="address"
								className="form-control"
								placeholder="Address"
								value={userInput.address}
								required
								onChange={e => {
									handleAddressChange("address", e);
								}}
							/>
							<div
								className={`invalid-feedback ${
									error.address ? "d-block" : ""
								}`}
							>
								Please enter a valid adress
							</div>
						</div>
						<div className="quote-input ">
							<input
								type="text"
								id="zip"
								value={userInput.zip}
								className="form-control"
								placeholder="Zip "
								required
								onChange={e =>
									handleChange("zip", e.target.value)
								}
							/>
							<div
								className={`invalid-feedback ${
									error.zip ? "d-block" : ""
								}`}
							>
								Please enter a valid Zip code
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-md-3 d-flex flex-column">
						<h4>Details </h4>
						<div>
							{modes.map((m, i) => (
								<span
									key={i}
									onClick={() => setMode(i)}
									className={`mr-3 ${
										mode === i ? "active" : ""
									}`}
									style={{ cursor: "pointer" }}
								>
									{m.title}
								</span>
							))}
						</div>
						{modes[mode].component}
					</div>
					<div className="col-md-9 d-flex flex-column">
						<ProductTable
							errored={error.productsList}
							onQtyChange={(id, value) =>
								onProductQtyChange(id, value)
							}
							products={userInput.productsList}
						/>

						<ServiceTable
							onQtyChange={(id, value) =>
								onServiceQtyChange(id, value)
							}
							services={userInput.servicesList}
						/>

						<div className="row">
							<div className="col-md-7"></div>
							<Total
								subtotal={userInput.subtotal}
								total={userInput.sumprice}
								delivery={userInput.delivery}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
