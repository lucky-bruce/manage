import React, { useState, useContext, useReducer } from "react";
import { Image } from "../../../proto/products/products_pb";
import Context from "../../context/context";
import {
	GetProfile,
	GetGRPCProduct,
	GetGRPCService
} from "../../../utils/utils";
import Img from "../../img";
import { navigate } from "hookrouter";
import { TopBar } from "../../ui/index";
import Dropzone from "react-dropzone";
import Product from "./product";
import Service from "./service";

export default function ProductForm() {
	const context = useContext(Context);

	const [tab, settab] = useState(0);

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
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
			chargetype: "Per day",
			chargevalue: 0,
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
		switch (tab) {
			case 0:
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
			case 1:
				let service = GetGRPCService(userInput);
				context.services.newService(service, {}, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						navigate("/dashboard", true);
					}
				});
				break;
			default:
				throw new Error("New error");
		}
	}

	const tabs = [
		<Product handleChange={handleChange} userInput={userInput} />,
		<Service handleChange={handleChange} userInput={userInput} />
	];

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
				</div>
				<div className="mt-4">
					<div>
						<div className="row">
							<div className="col-md-6">
								<div className="custom-control custom-radio custom-control-inline">
									<input
										type="radio"
										id="product"
										onChange={() => settab(0)}
										value="product"
										checked={tab === 0}
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
										onChange={() => settab(1)}
										value="service"
										checked={tab === 1}
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
						{tabs[tab]}
					</div>
				</div>
			</div>
		</div>
	);
}
