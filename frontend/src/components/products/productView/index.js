import React, { useState, useContext, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../context/context";
import { ProductParams } from "../../../proto/products/products_pb";
import ImgCarousel from "./imgCarousel";
import Chart from "./chart";
import Suppliers from "./table";

export default function View(props) {
	const [product, setProduct] = useState({});

	const context = useContext(Context);
	const client = context.products;

	function GetProductByID() {
		let params = new ProductParams();
		params.setId(props.id);

		client.getProductByID(params, {}, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				setProduct(res.toObject());
				console.log(res.toObject());
			}
		});
	}

	useEffect(() => {
		GetProductByID();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className="sticky-top">
				<div className="bg-primary p-3 text-white d-flex justify-content-between align-items-center ">
					<span>
						<FontAwesomeIcon icon={faTimes} /> Product View
					</span>
				</div>
			</div>
			<div className="p-4">
				<div className="row">
					<div className="col-md-4">
						<h4>{product.name}</h4>

						<p>{product.sector}</p>
						<ImgCarousel imgs={product.imagesList || []} />
					</div>
					<div className="col-md-4 p-0">
						<h5>Total in stock: {product.qtyinstock}</h5>
						<p>
							<span className="font-weight-bold">
								Product Net Worth:
							</span>{" "}
							<span className="text-primary">R$ 000.000,000</span>
						</p>
						<div className="font-weight-bold">
							Product description:
						</div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Possimus nostrum sint necessitatibus soluta
							repudiandae ipsum modi itaque laborum. Velit sed eum
							dolorem. Odit, aperiam! Dignissimos mollitia aperiam
							ipsam accusantium sunt.Odit hic amet laborum
							consequuntur laudantium aperiam corporis nulla vitae
							libero, reiciendis ab. Necessitatibus nam eaque,
							voluptatem dolorem cumque adipisci, vel culpa
							obcaecati quae earum, eligendi molestiae nostrum
							sint excepturi.
						</p>
						<div>
							Product unit price: R${" "}
							{product.sellingprice
								? product.sellingprice.toFixed(2)
								: "0.0"}
						</div>
					</div>
					<div className="col-md-4 p-0">
						<Chart />
					</div>
				</div>
				<Suppliers />
			</div>
		</div>
	);
}
