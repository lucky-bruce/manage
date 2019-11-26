import React, { useState, useEffect } from "react";
import { getProducts } from "../../../utils/backend";
import { ProductParams, Query } from "../../../proto/products/products_pb";
import { A } from "hookrouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { GetProfile } from "../../../utils/utils";

export default function ShortageTable() {
  const [products, setProducts] = useState([]);

  const GetProducts = () => {
    let p = new ProductParams();
    let q = new Query();
    q.setQuerystring(
      `{"$where": "this.qtyinstock<this.minqtyinstock","userid":"${
        GetProfile().id
      }"}`
    );

    p.setQuery(q);

    getProducts(p, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setProducts(res.toObject().productsList);
      }
    });
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div className="mt-4">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Sector</th>
              <th scope="col">Category</th>
              <th scope="col">Selling price</th>
              <th scope="col">Qty in stock</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.sector}</td>
                <td>{product.category}</td>
                <td>{product.sellingprice.toFixed(2)}</td>
                <td>{product.qtyinstock}</td>
                <td>
                  <A href={`/product/${product.id}`}>
                    <FontAwesomeIcon icon={faEye} /> View
                  </A>
                </td>
                <td>
                  <A href={`/edit/product/${product.id}`}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </A>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
