import React, { useState, useContext, useReducer, useEffect } from "react";
import { Product, Image } from "../../../proto/products/products_pb";
import Context from "../../context/context";
import {
	GetProfile,
	GetGRPCProduct,
	GetGRPCService
} from "../../../utils/utils";
import Img from "../../img";
import { navigate } from "hookrouter";
import {
	TopBar,
	Autocomplete,
	Switch,
	CheckboxSwitch,
	Radio
} from "../../ui/index";
import Dropzone from "react-dropzone";

export default function ProductForm() {
	const context = useContext(Context);

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			type: "product",
			name: "",
			category: "",
			subcategory: "",
			sector: "",
			buyingprice: 0,
			desiredprofit: 0,
			sizew: 0,
			sizeh: 0,
			sizel: 0,
			sized: 0,
			description: "",
			qtyinstock: 0,
			images: [],
			barcode: "",
			soldby: "unit",
			measurement: false,
			measurementunit: "cm",
			measurementvalue: 0,
			discount: 0,
			brand: "",
			brandmodel: "",
			portion: "volume",
			portionunit: "ml",
			portionvalue: "0",
			userid: GetProfile().id
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	function readFileAsync(file) {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader.onload = e => {
				resolve(e.target.result);
			};

			reader.onerror = reject;

			reader.readAsDataURL(file);
		});
	}

	async function processFiles(files) {
		for (let file of files) {
			try {
				let image = new Image();
				let exts = file.name.split(".");

				image.setExt(`.${exts[exts.length - 1]}`);
				let content = await readFileAsync(file);
				image.setImage(content);

				context.products.uploadImage(image, {}, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						handleChange("images", [
							...userInput.images,
							res.toObject().url
						]);
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
	}

	function submit() {
		switch (userInput.type) {
			case "product":
				console.log(userInput);

				let prod = GetGRPCProduct(userInput);

				context.products.newProduct(prod, {}, (err, res) => {
					if (err) {
						console.log(err);
					}

					if (res) {
						navigate(`/product/${res.toObject().id}`);
					}
				});
				break;
			case "service":
				let service = GetGRPCService(userInput);
				context.services.newService(service, {}, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						navigate("/dashboard", true);
					}
				});
				break;
		}
	}

	return (
		<div>
			<TopBar
				title={"New Product"}
				funcGroup={
					<button
						className="btn-success btn"
						onClick={() => submit()}
					>
						Create
					</button>
				}
			/>

			<div className="p-4">
				<div className="d-flex justify-content-between">
					<h3>Product and Service Quotation</h3>
					<span className="flex-column d-flex justify-content-end">
						New Quotation
						<span className="font-weight-bold">ID: A0001</span>
					</span>
				</div>
				<div className="mt-4">
					<div>
						<div className="row">
							<div className="col-md-6">
								<div className="custom-control custom-radio custom-control-inline">
									<input
										type="radio"
										id="product"
										onChange={e =>
											handleChange("type", e.target.value)
										}
										value="product"
										checked={userInput.type === "product"}
										name="customRadioInline1"
										className="custom-control-input"
									/>
									<label
										className="custom-control-label"
										htmlFor="product"
									>
										Product
									</label>
								</div>
								<div className="custom-control custom-radio custom-control-inline">
									<input
										type="radio"
										onChange={e =>
											handleChange("type", e.target.value)
										}
										value="service"
										checked={userInput.type === "service"}
										id="service"
										name="customRadioInline1"
										className="custom-control-input"
									/>
									<label
										className="custom-control-label"
										htmlFor="service"
									>
										Service
									</label>
								</div>

								<Dropzone onDrop={processFiles}>
									{({ getRootProps, getInputProps }) => (
										<div className="container mt-5 ml-0 image-drop pt-4 pb-4">
											<div
												{...getRootProps({
													className: "dropzone",
													onDrop: event =>
														event.stopPropagation()
												})}
											>
												<input
													name="file"
													{...getInputProps()}
												/>
												<p className="m-0">
													Click to select and upload
													product images
												</p>
											</div>
										</div>
									)}
								</Dropzone>
							</div>
							<div className="col-md-6">
								{userInput.images.map((image, i) => (
									<Img
										src={image}
										className="product-form-image img-fluid"
									/>
								))}
							</div>
						</div>
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
									required
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
									required
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
									required
									type="number"
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
									required
									type="number"
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
									disabled={userInput.portion !== "volume"}
									className="col-md-8 form-control mr-5 "
									type="number"
									min="0"
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
							<Autocomplete
								inputClass=""
								id="category"
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.category}
								onChange={v => handleChange("category", v)}
								placeholder="Select a Category"
							/>
							<Autocomplete
								inputClass=""
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.subcategory}
								onChange={v => handleChange("subcategory", v)}
								placeholder="Select a Sub Category"
							/>
							<Autocomplete
								inputClass=""
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.brand}
								onChange={v => handleChange("brand", v)}
								placeholder="Select a Brand"
							/>
							<Autocomplete
								inputClass=""
								className="col-md-6 p-0 mb-4"
								inputClass="bg-primary text-white product"
								results={["test"]}
								value={userInput.brandmodel}
								onChange={v => handleChange("brandmodel", v)}
								placeholder="Select a Brand Model"
							/>
						</div>
						<div className="m-3 mt-0 w-100">
							<textarea
								placeholder="Description"
								className="form-control "
								rows="5"
								onChange={e =>
									handleChange("description", e.target.value)
								}
							></textarea>
						</div>
					</div>
				</div>
				{/* <div className="mt-4 inputs">
					<div className="row product ">
						<div className="col-md-4 ">
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Name"
									required
									autoFocus
									type="text"
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Category"
									required
									type="text"
									onChange={e => setCategory(e.target.value)}
								/>
							</div>

							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Subcategory"
									required
									type="text"
									onChange={e =>
										setSubCategory(e.target.value)
									}
								/>
							</div>
							<div className="quote-input">
								<input
									className="form-control mb"
									placeholder="Qty in stock"
									required
									autoFocus
									type="number"
									onChange={e =>
										setQtyinstock(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="col-md-4">
							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Sector"
									required
									autoFocus
									type="text"
									onChange={e => setSector(e.target.value)}
								/>
							</div>

							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Buying price"
									required
									type="number"
									onChange={e =>
										setBuyingPrice(e.target.value)
									}
								/>
							</div>

							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Desired profit (in %)"
									required
									type="number"
									onChange={e => setProfit(e.target.value)}
								/>
							</div>
						</div>
						<div className="col-md-4">
							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Width"
									required
									autoFocus
									type="number"
									onChange={e => setWidth(e.target.value)}
								/>
							</div>

							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Length"
									required
									type="number"
									onChange={e => setLength(e.target.value)}
								/>
							</div>

							<div className="quote-input">
								<input
									className="form-control"
									placeholder="Height"
									required
									type="number"
									onChange={e => setHeight(e.target.value)}
								/>
							</div>
						</div>
						<div className="ml-3 d-flex flex-row">
							<div>
								<input
									required
									autoFocus
									type="file"
									accept="image/*"
									multiple
									style={{ width: "auto" }}
									onChange={e => processFile(e.target.files)}
								/>
								<p
									style={{
										color: "#9fa6ad",
										fontSize: "12px"
									}}
								>
									(Max 4Mb){" "}
								</p>
							</div>

							<div className="ml-3 d-flex flex-row">
								{images.map((image, i) => (
									<Img className="img-thumb" src={image} />
								))}
							</div>
						</div>
						<div className="m-3 mt-0 w-100">
							<textarea
								placeholder="Description"
								className="form-control "
								rows="5"
								onChange={e => setDescription(e.target.value)}
							></textarea>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
