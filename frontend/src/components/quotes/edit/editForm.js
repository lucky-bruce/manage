import React, { useState, useContext, useEffect, useReducer } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../context/context";
import {
	Quote,
	QuoteParams,
	QuoteProduct
} from "../../../proto/quotes/quotes_pb";
import { Product } from "../../../proto/products/products_pb";
import { validate } from "email-validator";
import { ToGRPCObject } from "../../../utils/utils";
import { getToken, GetProfile } from "../../../utils/utils";
import QuoteTable from "../quoteForm/product/producttable";

export default function EditForm(props) {
	const context = useContext(Context);
	const client = context.quotes;

	const [error, setError] = useState({
		name: false,
		email: false,
		phoneNumber: false,
		city: false,
		address: false,
		zip: false,
		productQuantity: false,
		size: false
	});

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			id: "",
			fullName: "",
			email: "",
			phoneNumber: "",
			city: "",
			address: "",
			zip: "",
			size: "",
			sector: "",
			suppliersIDs: [],
			product: {},
			productsList: [],
			sumprice: 0,
			status: 0,
			paidprice: 0,
			totalPrice: 0
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
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

		if (userInput.size.length === 0) {
			err.size = true;
			errored = true;
		}

		setError(err);
		return [errored, err];
	}

	function submit() {
		const [errored, err] = checkValidity();
		if (errored) {
			console.log(errored, err);

			setError(err);
			return;
		}

		var quote = new Quote();
		quote.setId(userInput.id);
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

		quote.setId(userInput.id);
		quote.setName(userInput.fullName);
		quote.setEmail(userInput.email);
		quote.setPhonenumber(userInput.phoneNumber);
		quote.setCity(userInput.city);
		quote.setAddress(userInput.address);
		quote.setZip(userInput.zip);
		quote.setSize(userInput.size);
		quote.setJwt(getToken());
		quote.setUserid(GetProfile().id);
		quote.setSupplieridsList(userInput.suppliersIDs);
		quote.setStatus(userInput.status);
		client.editQuote(quote, {}, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				console.log(res.toObject());
				// navigate("/", true);
			}
		});
	}

	function getOriginal(id) {
		let params = new QuoteParams();

		params.setId(id);

		client.getQuoteByID(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				const original = res.toObject();
				console.log(original);

				handleChange("fullName", original.name);
				handleChange("phoneNumber", original.phonenumber);
				handleChange("size", original.size);
				handleChange("zip", original.zip);
				handleChange("id", original.id);
				handleChange("email", original.email);
				handleChange("city", original.city);
				handleChange("address", original.address);
				handleChange("userId", original.userid);
				handleChange("productsList", original.productsList);
				handleChange("status", original.status);
				handleChange("supplierIDs", original.supplierids);
			}
		});
	}

	function onQtyChange(i, qty) {
		var p = userInput.productsList;
		p[i].qty = qty;
		handleChange("productsList", p);
		totalPrice();
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
		getOriginal(props.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.id]);

	useEffect(() => {
		totalPrice();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInput.productsList]);
	return (
		<div className="mt-4">
			<div className="sticky-top">
				<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
					<span>
						<FontAwesomeIcon icon={faTimes} /> Edit Quote Request
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
								defaultValue={userInput.fullName}
								autoFocus
								onChange={e =>
									handleChange("fullName", e.target.value)
								}
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
								value={userInput.email}
								required
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
								placeholder="Phone number"
								required
								value={userInput.phoneNumber}
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
							{/* <label htmlFor="phnumber">Phone number</label> */}
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
								defaultValue={userInput.city}
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
								defaultValue={userInput.address}
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
							{/* <label htmlFor="address">Address</label> */}
						</div>
						<div className="quote-input ">
							<input
								type="text"
								id="zip"
								className="form-control"
								placeholder="Zip "
								defaultValue={userInput.zip}
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
				<div className="row mt-4 p-4">
					<div className=" d-flex flex-column">
						<QuoteTable
							onQtyChange={(i, qty) => onQtyChange(i, qty)}
							products={userInput.productsList}
							user={GetProfile()}
						/>
						<div className="float-right font-weight-bold">
							Total: R$ {userInput.totalPrice.toFixed(3)}
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
						<div className="row mt-3">
							<div className="">
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
