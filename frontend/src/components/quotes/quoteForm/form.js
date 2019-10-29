import React, { useState, useContext, useReducer, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../context/context";
import {
	Quote,
	QuoteProduct,
	Suppliers
} from "../../../proto/quotes/quotes_pb";
import { Product } from "../../../proto/products/products_pb";
import { validate } from "email-validator";
import { navigate } from "hookrouter";
import { getToken, GetProfile } from "../../../utils/utils";
import ProductSelect from "./product/productSelect";
import ProductTable from "./product/producttable";
import { ToGRPCObject } from "../../../utils/utils";
import ServiceSelect from "./serviceSelect";

export default function Form() {
	const context = useContext(Context);
	const client = context.quotes;

	const user = GetProfile();

	const [mode, setMode] = useState(0);
	const [error, setError] = useState({
		name: false,
		email: false,
		phoneNumber: false,
		city: false,
		address: false,
		zip: false,
		product: false,
		productsList: false,
		size: false
	});

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			fullName: user.firstName + " " + user.lastName || "",
			email: user.email || "",
			phoneNumber: user.phonenumber || "+",
			city: user.city || "",
			address: user.address || "",
			zip: "",
			size: "",
			sector: "",
			suppliersIDs: [],
			product: {},
			productsList: [],
			totalPrice: 0
		}
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
			component: <ServiceSelect />
		}
	];

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
		if (userInput.product) {
			handleChange("productsList", [
				...userInput.productsList,
				userInput.product
			]);

			handleChange();
			var isIn = false;
			for (var i in userInput.suppliersIDs) {
				if (
					userInput.suppliersIDs[i] ===
					userInput.product.product.userid
				) {
					isIn = true;
					return;
				}
			}

			if (!isIn) {
				handleChange("suppliersIDs", [
					...userInput.suppliersIDs,
					{
						id: userInput.product.product.userid
					}
				]);
			}

			handleChange("product", null);
		}
	};

	const onQtyChange = (i, value) => {
		var p = userInput.productsList;
		p[i].qty = value;

		handleChange("productsList", p);
		totalPrice();
	};

	function checkValidity() {
		var err = {};
		var errored = false;

		if (userInput.fullName.length === 0) {
			err.name = true;

			errored = true;
		}

		if (!validate(userInput.email)) {
			err.email = true;
			errored = true;
		}

		if (userInput.phoneNumber.length < 4) {
			err.phoneNumber = true;
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

	function totalPrice() {
		var total = 0;
		for (var i in userInput.productsList) {
			const unit = userInput.productsList[i];
			console.log(unit);

			total += unit.product.sellingprice * unit.qty;
		}
		console.log(total);

		handleChange("totalPrice", total);
	}

	useEffect(() => {
		totalPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInput.productsList]);

	function submit() {
		const [errored, err] = checkValidity();

		if (errored) {
			console.log(errored, err);

			setError(err);
			return;
		}

		var quote = new Quote();

		quote.setProductsList(undefined);

		for (var i in userInput.productsList) {
			const product = userInput.productsList[i].product;
			const qty = userInput.productsList[i].qty;
			var qp = new QuoteProduct();

			var p = new Product(ToGRPCObject(product));

			qp.setProduct(p);
			qp.setQty(qty);

			quote.addProducts(qp);
		}
		quote.setName(userInput.fullName);
		quote.setEmail(userInput.email);
		quote.setPhonenumber(userInput.phoneNumber);
		quote.setCity(userInput.city);
		quote.setAddress(userInput.address);
		quote.setZip(userInput.zip);
		quote.setSize(userInput.size);
		quote.setJwt(getToken());
		quote.setSumprice(userInput.totalPrice);

		quote.setSupplieridsList(undefined);
		for (var rec of userInput.suppliersIDs) {
			var sup = new Suppliers();
			sup.setId(rec.id);

			quote.addSupplierids(sup);
		}

		client.newQuote(quote, {}, (err, res) => {
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
								value={userInput.fullName}
								onChange={e => {
									handleChange("fullName", e.target.value);
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
								value={userInput.phoneNumber}
								placeholder="Phone number"
								required
								onChange={e =>
									handleChange("phoneNumber", e.target.value)
								}
							/>
							<div
								className={`invalid-feedback ${
									error.phoneNumber ? "d-block" : ""
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
								onChange={e =>
									handleChange("city", e.target.value)
								}
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
								onChange={e =>
									handleChange("address", e.target.value)
								}
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
							onQtyChange={(id, value) => onQtyChange(id, value)}
							products={userInput.productsList}
						/>
						<div className="float-right font-weight-bold">
							Total: R$ {userInput.totalPrice.toFixed(2)}
						</div>

						<table className="table mt-5 border-bottom table-responsive">
							<thead className="bg-primary text-white">
								<tr>
									<th scope="col">Service type</th>
									<th scope="col">Labor</th>
									<th scope="col">Charges K/PM</th>
									<th scope="col">Charges P/Day</th>

									<th scope="col">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">Service ID</th>
									<td>R$ 000.000,000</td>
									<td>R$ 000.000,000</td>
									<td>R$ 000.000,000</td>
									<td>R$ 000.000,000</td>
								</tr>
							</tbody>
						</table>
						<div className="float-right font-weight-bold">
							Total: R$ 000.000,000
						</div>
						<div className="row">
							<div className="col-md-7"></div>
							<div className="col-md-5">
								<div className="font-weight-bold">
									Subtotal: R$ 000.000,000
								</div>
								<div className="text-danger">
									<div>Tax A % : 00 R$ 000.000,000</div>
									<div>Tax B % : 00 R$ 000.000,000</div>
									<div>Tax C % : 00 R$ 000.000,000</div>
								</div>
								<div className="text-success">
									Discount in % : 00 R$ 000.000,000
								</div>
								<div className="mt-3 bg-primary w-75 p-3 rounded text-white">
									Grand total: R$ 000.000,000
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
