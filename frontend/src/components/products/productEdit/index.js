import React, { useEffect, useReducer } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	GetGRPCProduct,
	GetProductObjFromGRPCProduct,
	productInput
} from "../../../utils/grpc";
import { Switch, CheckboxSwitch, Radio, Autocomplete } from "../../ui/index";
import { editProduct, GetProductByID } from "../../../utils/backend";
import { navigate } from "hookrouter";

export default function EditForm(props) {
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		productInput
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	function GetProduct(id) {
		GetProductByID(id, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				const obj = res.toObject();
				GetProductObjFromGRPCProduct(handleChange, obj);
			}
		});
	}

	function submit() {
		let prod = GetGRPCProduct(userInput);

		editProduct(prod, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res.toObject());
				navigate("/dashboard", true);
			}
		});
	}

	useEffect(() => {
		GetProduct(props.id);
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className="sticky-top">
				<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
					<span>
						<FontAwesomeIcon icon={faTimes} /> Edit product
					</span>
					<button
						className="btn-success btn"
						onClick={() => submit()}
					>
						Save changes
					</button>
				</div>
			</div>
			<div className="p-4">
				<div className="d-flex justify-content-between">
					<h3>Product and Service Quotation</h3>
					<span className="flex-column d-flex justify-content-end">
						Product
						<span className="font-weight-bold">
							ID: {userInput.id}
						</span>
					</span>
				</div>
				<div className="mt-4">
					<div>
						<div className="mt-5">
							<h5>Product sold by</h5>
							<div className="custom-control custom-radio custom-control-inline">
								<input
									type="radio"
									onChange={e =>
										handleChange("soldby", e.target.value)
									}
									value="unit"
									checked={userInput.soldby === "unit"}
									id="unit"
									name="customRadioInline2"
									className="custom-control-input"
								/>
								<label
									className="custom-control-label"
									htmlFor="unit"
								>
									Unit
								</label>
							</div>
							<div className="custom-control custom-radio custom-control-inline">
								<input
									type="radio"
									id="portion"
									onChange={e =>
										handleChange("soldby", e.target.value)
									}
									value="portion"
									checked={userInput.soldby === "portion"}
									name="customRadioInline2"
									className="custom-control-input"
								/>
								<label
									className="custom-control-label"
									htmlFor="portion"
								>
									Portion
								</label>
							</div>

							<div className="custom-control custom-radio custom-control-inline">
								<input
									type="radio"
									onChange={e => {
										handleChange(
											"measurement",
											e.target.checked
										);
										handleChange("soldby", "m2");
									}}
									checked={userInput.measurement}
									id="measurement"
									name="customRadioInline2"
									className="custom-control-input"
								/>
								<label
									className="custom-control-label"
									htmlFor="measurement"
								>
									Measurement
								</label>
								<Switch
									left={
										<span>
											m<sup>2</sup>
										</span>
									}
									leftValue="m2"
									onChange={v => handleChange("soldby", v)}
									right={"normal"}
									className={"ml-3"}
									id="measure-units"
								/>
							</div>
						</div>

						<div className="inputs mt-4 col-md-6">
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Product Barcode"
									value={userInput.barcode}
									type="text"
									onChange={e =>
										handleChange("barcode", e.target.value)
									}
								/>
							</div>
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Name"
									value={userInput.name}
									type="text"
									onChange={e =>
										handleChange("name", e.target.value)
									}
								/>
							</div>
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Product Buying price"
									type="number"
									value={userInput.buyingprice}
									onChange={e =>
										handleChange(
											"buyingprice",
											parseInt(e.target.value)
										)
									}
								/>
							</div>
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Product Desired Profit in %"
									type="number"
									value={userInput.desiredprofit}
									onChange={e =>
										handleChange(
											"desiredprofit",
											parseInt(e.target.value)
										)
									}
								/>
							</div>
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Product Discount in %"
									required
									value={userInput.discount}
									type="number"
									onChange={e =>
										handleChange(
											"discount",
											parseInt(e.target.value)
										)
									}
								/>
							</div>
						</div>

						<div className="mt-4">
							<h5>Product Portion</h5>

							<div className="mt-3 ml-3 d-flex flex-wrap">
								<CheckboxSwitch
									onCheckboxChange={e => {
										if (e.target.checked) {
											handleChange("portion", "volume");
											handleChange("portionunit", "ml");
										}
									}}
									onSwitchChange={v =>
										handleChange("portionunit", v)
									}
									switchProps={{
										left: "ml",
										right: "Litres",
										className: "ml-3",
										id: "volume-units"
									}}
									checkboxProps={{
										id: "volume",
										name: "customRadioInline3",
										value: "Volume"
									}}
									active={userInput.portion === "volume"}
								/>
								<CheckboxSwitch
									onCheckboxChange={e => {
										if (e.target.checked) {
											handleChange("portion", "weight");
											handleChange(
												"portionunit",
												"Grams"
											);
										}
									}}
									onSwitchChange={v =>
										handleChange("portionunit", v)
									}
									switchProps={{
										left: "Grams",
										right: "Kilograms",
										className: "ml-3",
										id: "weight-units"
									}}
									checkboxProps={{
										id: "weight",
										name: "customRadioInline3",
										value: "Weight"
									}}
									active={userInput.portion === "weight"}
								/>
							</div>
							<div className="w-50 mt-3 row ml-3">
								<input
									className="col-md-8 form-control mr-5 "
									type="number"
									min="0"
									value={userInput.portionvalue}
									onChange={e =>
										handleChange(
											"portionvalue",
											parseInt(e.target.value)
										)
									}
								/>
							</div>
						</div>

						<div className="mt-4">
							<h5>Product Measurement</h5>
							<div className="mt-3">
								<Radio
									props={{
										id: "cm",
										name: "customRadioInline4",
										value: "cm",
										checked:
											userInput.measurementunit === "cm",
										onChange: e =>
											handleChange(
												"measurementunit",
												e.target.value
											)
									}}
								/>
								<Radio
									props={{
										id: "meters",
										name: "customRadioInline4",
										value: "meters",
										checked:
											userInput.measurementunit ===
											"meters",
										onChange: e =>
											handleChange(
												"measurementunit",
												e.target.value
											)
									}}
								/>
							</div>

							<div className="mt-3 row">
								<div className="quote-input col-md-3 col-6">
									<input
										className="form-control mb"
										placeholder="Length"
										required
										type="number"
										value={userInput.sizel}
										onChange={e =>
											handleChange(
												"sizel",
												parseInt(e.target.value)
											)
										}
									/>
								</div>
								<div className="quote-input col-md-3 col-6">
									<input
										className="form-control mb"
										placeholder="Width"
										required
										value={userInput.sizew}
										type="number"
										onChange={e =>
											handleChange(
												"sizew",
												parseInt(e.target.value)
											)
										}
									/>
								</div>
								<div className="quote-input col-md-3 col-6">
									<input
										className="form-control mb"
										placeholder="Height"
										required
										value={userInput.sizeh}
										type="number"
										onChange={e =>
											handleChange(
												"sizeh",
												parseInt(e.target.value)
											)
										}
									/>
								</div>
								<div className="quote-input col-md-3 col-6">
									<input
										className="form-control mb"
										placeholder="Diameter"
										required
										type="number"
										value={userInput.sized}
										onChange={e =>
											handleChange(
												"sized",
												parseInt(e.target.value)
											)
										}
									/>
								</div>
							</div>
						</div>
						<div className="mt-3">
							<h5>Stock</h5>
							<div className="quote-input mt-3 col-md-3 col-6">
								<input
									className="form-control mb"
									placeholder="Qty in stock"
									required
									type="number"
									value={userInput.qtyinstock}
									onChange={e =>
										handleChange(
											"qtyinstock",
											parseInt(e.target.value)
										)
									}
								/>
							</div>
							<div className="quote-input col-md-3 col-6">
								<input
									className="form-control mb"
									placeholder="Min qty"
									required
									type="number"
									value={userInput.minqtyinstock}
									onChange={e =>
										handleChange(
											"minqtyinstock",
											parseInt(e.target.value)
										)
									}
								/>
							</div>
						</div>

						<div className="mt-3">
							<Autocomplete
								id="category"
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.category}
								onChange={v => handleChange("category", v)}
								placeholder="Select a Category"
							/>
							<Autocomplete
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.subcategory}
								onChange={v => handleChange("subcategory", v)}
								placeholder="Select a Sub Category"
							/>
							<Autocomplete
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.brand}
								onChange={v => handleChange("brand", v)}
								placeholder="Select a Brand"
							/>
							<Autocomplete
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.brandmodel}
								onChange={v => handleChange("brandmodel", v)}
								placeholder="Select a Brand Model"
							/>
						</div>
						<div className="mt-0 w-100">
							<textarea
								placeholder="Description"
								className="form-control "
								rows="5"
								value={userInput.description}
								onChange={e =>
									handleChange("description", e.target.value)
								}
							></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
