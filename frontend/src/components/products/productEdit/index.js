import React, { useContext, useEffect, useReducer } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../context/context";
import { ProductParams } from "../../../proto/products/products_pb";
import { GetGRPCProduct } from "../../../utils/utils";

export default function EditForm(props) {
	const context = useContext(Context);
	const client = context.products;

	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			id: "",
			name: "",
			category: "",
			subcategory: "",
			sector: "",
			buyingprice: 0,
			desiredprofit: 0,
			sizew: 0,
			sizeh: 0,
			sizel: 0,
			sellingprice: 0,
			description: "",
			userid: "",
			barcode: "",
			shipping: 0
		}
	);

	const handleChange = (name, value) => {
		setUserInput({ [name]: value });
	};

	function GetProduct(id) {
		let params = new ProductParams();
		params.setId(id);

		client.getProductByID(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				const original = res.toObject();

				handleChange("id", original.id);
				handleChange("name", original.name);
				handleChange("category", original.category);
				handleChange("subcategory", original.subcategory);
				handleChange("sector", original.sector);
				handleChange("buyingprice", original.buyingprice);
				handleChange("desiredprofit", original.desiredprofit);
				handleChange("sizew", original.sizew.toFixed(1));
				handleChange("sizeh", original.sizeh.toFixed(1));
				handleChange("sizel", original.sizel.toFixed(1));
				handleChange("description", original.description);
				handleChange("userid", original.userid);
				handleChange("shipping", original.shipping);
				handleChange("barcode", original.barcode);
			}
		});
	}
	function submit() {
		let prod = GetGRPCProduct(userInput);

		client.editProduct(prod, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res.toObject());
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
					<div className="row product inputs">
						<div className="col-md-4">
							<input
								className="form-control"
								placeholder="Name"
								required
								autoFocus
								value={userInput.name}
								type="text"
								onChange={e =>
									handleChange("name", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Category"
								required
								value={userInput.category}
								type="text"
								onChange={e =>
									handleChange("category", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Subcategory"
								required
								type="text"
								value={userInput.subcategory}
								onChange={e =>
									handleChange("subcategory", e.target.value)
								}
							/>
						</div>
						<div className="col-md-4">
							<input
								className="form-control"
								placeholder="Sector"
								required
								value={userInput.sector}
								type="text"
								onChange={e =>
									handleChange("sector", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Buying price"
								required
								value={userInput.buyingprice}
								type="number"
								onChange={e =>
									handleChange("buyingprice", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Desired profit (in %)"
								required
								type="number"
								value={userInput.desiredprofit}
								onChange={e =>
									handleChange(
										"desiredprofit",
										e.target.value
									)
								}
							/>
						</div>
						<div className="col-md-4">
							<input
								className="form-control"
								placeholder="Width"
								required
								autoFocus
								value={userInput.sizew}
								type="number"
								onChange={e =>
									handleChange("sizew", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Length"
								required
								type="number"
								value={userInput.sizel}
								onChange={e =>
									handleChange("sizel", e.target.value)
								}
							/>
							<input
								className="form-control"
								placeholder="Height"
								required
								value={userInput.sizeh}
								type="number"
								onChange={e =>
									handleChange("sizeh", e.target.value)
								}
							/>
						</div>
						<div className="m-3 mt-0 w-100">
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
