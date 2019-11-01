import React, { useEffect, useContext, useState, useReducer } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	QuoteParams,
	Status,
	QuoteProduct,
	Suppliers
} from "../../../proto/quotes/quotes_pb";
import Context from "../../context/context";
import {
	GetProfile,
	getToken,
	GetStatus,
	GetGRPCProduct
} from "../../../utils/utils";
import { navigate } from "hookrouter";
import ProductTable from "./productTable";
import Img from "../../img";

export default function View(props) {
	const context = useContext(Context);
	const client = context.quotes;

	const user = GetProfile();

	const [error] = useState({
		name: false,
		email: false,
		phoneNumber: false,
		city: false,
		address: false,
		zip: false,
		qty: false,
		size: false
	});

	const [changed, setchanged] = useState(false);

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			name: "",
			email: "",
			quoteobj: {},
			phonenumber: "+",
			city: "",
			address: "",
			zip: "",
			size: "",
			sector: "",
			status: 0,
			supplieridsList: [],
			id: "",
			productsList: [],
			quote: {},
			dis: true
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	function Validate(st) {
		var q = userInput.quote;
		let sups = userInput.supplieridsList;
		q.setSupplieridsList(undefined);

		for (let sup of sups) {
			let s = new Suppliers();
			s.setId(sup.id);
			console.log(sup.id, user.id);

			if (sup.id === user.id) {
				s.setValid(true);
			} else {
				s.setValid(sup.valid);
			}

			q.addSupplierids(s);
		}

		if (user.role === "user") q.setStatus(Status.CLIENT_APPLIED);

		client.editQuote(q, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res.toObject());
				GetQuote(props.id);
			}
		});
	}

	function GetQuote(id) {
		let params = new QuoteParams();

		params.setId(id);

		client.getQuoteByID(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				const original = res.toObject();

				handleChange("quote", res);
				handleChange("quoteobj", res.toObject());
				handleChange("name", original.name);
				handleChange("phonenumber", original.phonenumber);
				handleChange("zip", original.zip);
				handleChange("id", original.id);
				handleChange("email", original.email);
				handleChange("city", original.city);
				handleChange("address", original.address);
				handleChange("status", original.status);
				handleChange("productsList", original.productsList);
				handleChange("supplieridsList", original.supplieridsList);
			}
		});
	}

	function DeleteQuote() {
		let params = new QuoteParams();

		params.setId(userInput.id);
		params.setJwt(getToken());

		client.deleteQuote(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				navigate("/profile", true);
			}
		});
	}

	const Edit = () => {
		var q = userInput.quote;

		q.setProductsList(undefined);
		for (let rec of userInput.productsList) {
			let r = new QuoteProduct();

			r.setProduct(GetGRPCProduct(rec.product));
			r.setQty(rec.qty);

			q.addProducts(r);
		}

		client.editQuote(q, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res.toObject());
				setchanged(false);
				GetQuote(userInput.id);
			}
		});
	};

	useEffect(() => {
		GetQuote(props.id);

		if (user.role === "user") {
			handleChange("dis", false);
		} else {
			handleChange("dis", true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className="sticky-top">
				<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
					<span>
						<FontAwesomeIcon icon={faTimes} /> Service Order
					</span>
					<span>
						<button
							onClick={() => Validate()}
							className={`btn-success btn ${
								(userInput.status === Status.SUPPLIER_APPLIED &&
									user.role === "user") ||
								(userInput.status === Status.NEW &&
									user.role === "supplier")
									? ""
									: "disabled"
							}`}
						>
							Validate
						</button>
						{userInput.status === Status.SUPPLIER_APPLIED &&
						user.role === "user" ? (
							<button
								onClick={() => Validate(Status.CLIENT_REJECTED)}
								className="ml-3 btn-warning btn"
							>
								Reject
							</button>
						) : (
							""
						)}
						{userInput.status !== Status.CLIENT_APPLIED &&
						user.role === "user" ? (
							<button
								onClick={() => DeleteQuote()}
								className="ml-3 btn-danger btn"
							>
								Delete
							</button>
						) : (
							""
						)}
					</span>
				</div>
			</div>
			<div className="p-4">
				<div className="d-flex justify-content-between">
					<h3>Product and Service Quotation</h3>
					<span className="flex-column d-flex justify-content-end">
						Quotation
						<span className="font-weight-bold">
							ID: {userInput.id}
						</span>
					</span>
				</div>
				<div className="mt-3 row inputs">
					<div className="col-md-4">
						<div className="quote-input ">
							<input
								type="text"
								className={`form-control ${userInput.dis}`}
								placeholder="Full name"
								required
								value={userInput.name}
								readOnly={userInput.dis}
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
								className={`form-control`}
								placeholder="Email"
								required
								readOnly={userInput.dis}
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
							{/* <label htmlFor="city">Email</label> */}
						</div>
						<div className="quote-input ">
							<input
								type="text"
								className={`form-control`}
								placeholder="Phone number"
								required
								readOnly={userInput.dis}
								value={userInput.phonenumber}
								onChange={e =>
									handleChange("phonenumber", e.target.value)
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
								className={`form-control`}
								placeholder="City"
								required
								readOnly={userInput.dis}
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
							{/* <label htmlFor="city">City</label> */}
						</div>
						<div className="quote-input ">
							<input
								type="text"
								className={`form-control`}
								placeholder="Address"
								required
								readOnly={userInput.dis}
								value={userInput.address}
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
								className={`form-control`}
								placeholder="Zip "
								required
								readOnly={userInput.dis}
								value={userInput.zip}
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

							{/* <label htmlFor="zip">Zip code</label> */}
						</div>
					</div>
					<div className="col-md-2 d-flex flex-column">
						<span className="">
							Status: {GetStatus(userInput.status)}
						</span>
						{(user.role === "staff" || user.role === "supplier") &&
						userInput.status >= Status.CLIENT_APPLIED ? (
							<Img
								className="w-100"
								src={userInput.quoteobj.qrcodeurl}
							/>
						) : (
							""
						)}
					</div>
				</div>
				<div className="float-right m-3">
					<button
						onClick={() => Edit()}
						className="btn-info btn"
						disabled={changed ? false : true}
					>
						Save
					</button>
				</div>
				<ProductTable
					onProductChange={products => {
						handleChange("productsList", products);
						setchanged(true);
					}}
					user={user}
					products={userInput.productsList}
				/>
			</div>
		</div>
	);
}
