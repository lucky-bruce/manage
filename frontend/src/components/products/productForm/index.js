import React, { useState, useContext } from "react";
import { Product, Image } from "../../../proto/products/products_pb";
import Context from "../../context/context";
import { GetProfile } from "../../../utils/utils";
import Img from "../../img";
import { navigate } from "hookrouter";
import { TopBar } from "../../ui/index";

export default function ProductForm() {
	const context = useContext(Context);
	const client = context.products;

	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [subcategory, setSubCategory] = useState("");
	const [sector, setSector] = useState("");
	const [buyingprice, setBuyingPrice] = useState(0);
	const [profit, setProfit] = useState(0);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [length, setLength] = useState(0);
	const [qtyinstock, setQtyinstock] = useState(0);
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);

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

	async function processFile(files) {
		for (let file of files) {
			try {
				let image = new Image();
				let exts = file.name.split(".");

				image.setExt(`.${exts[exts.length - 1]}`);
				let content = await readFileAsync(file);
				image.setImage(content);

				client.uploadImage(image, {}, (err, res) => {
					if (err) {
						console.log(err);
					} else {
						setImages(images => [...images, res.toObject().url]);
					}
				});

				console.log(image.toObject());
			} catch (err) {
				console.log(err);
			}
		}
	}

	function submit() {
		let prod = new Product();
		prod.setName(name);
		prod.setDescription(description);
		prod.setCategory(category);
		prod.setSubcategory(subcategory);
		prod.setBuyingprice(buyingprice);
		prod.setDesiredprofit(profit);
		prod.setSector(sector);
		prod.setSizew(width);
		prod.setSizel(length);
		prod.setSizeh(height);
		prod.setUserid(GetProfile().id);
		prod.setQtyinstock(qtyinstock);

		client.newProduct(prod, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				navigate(`/product/${res.toObject().id}`);
			}
		});
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
				<div className="mt-4 inputs">
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
				</div>
			</div>
		</div>
	);
}
