import React, { useState, useEffect } from "react";

export default function ProductTable(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  return (
    <div>
      <h4>Quatation</h4>
      {props.errored ? (
        <div className="invalid">You must select a product</div>
      ) : (
        ""
      )}
      <div className="table-responsive">
        <table className="table mt-5 border-bottom  w-100">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price by m2</th>
              <th scope="col">Optional prices</th>
              <th scope="col">Finishing</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {products
              ? products.map((prod, i) => (
                  <tr key={i}>
                    <th scope="row">{prod.product.name}</th>
                    <td>R$ 000.000,000</td>
                    <td>R$ 000.000,000</td>
                    <td>Finishing ID</td>
                    <td width="25%">
                      <input
                        min="1"
                        onChange={e => props.onQtyChange(i, e.target.value)}
                        type="number"
                        className="custom-input"
                        value={prod.qty}
                      />
                    </td>
                    <td>R$ 000.000,000</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}
