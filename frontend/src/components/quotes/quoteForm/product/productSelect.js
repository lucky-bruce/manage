import React, { useContext, useState, useEffect } from "react";
import Context from "../../../context/context";
import { ProductParams, Query } from "../../../../proto/products/products_pb";
import SectorSelect from "./SectorSelect";
import SizeSelect from "./sizeSelect";
import { Select } from "../../../ui/index";
import { isEmpty } from "../../../../utils/utils";

export default function ProductSelect(props) {
  const context = useContext(Context);
  const client = context.products;

  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  function GetProducts() {
    let params = new ProductParams();
    let q = new Query();
    if (query === "" && props.sector !== "") {
      const obj = `{"sector":"${props.sector}"}`;
      q.setQuerystring(obj);
    } else if (query !== "") {
      q.setQuerystring(
        `{"sector":"${props.sector}", "$text":{"$search":"${query}"}}`
      );
    }

    params.setQuery(q);
    client.getProducts(params, {}, (err, res) => {
      if (err) {
        console.log(err);
      }

      if (res) {
        setProducts(res.toObject().productsList);
      }
    });
  }

  useEffect(() => {
    GetProducts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sector, query]);

  return (
    <div>
      <SectorSelect
        sector={props.sector}
        onSectorChange={v => props.onSectorChange(v)}
      />
      <Select
        selectClass={"bg-success"}
        className="mt-4"
        name="Select a product"
        setQuery={q => setQuery(q)}
        elements={products.map(product => ({
          name: product.name,
          value: product
        }))}
        value={isEmpty(props.product) ? {} : props.product.product}
        onSelect={product => props.onProductSelect(product)}
      />

      <SizeSelect
        value={props.size}
        name={"Select size"}
        className={"mt-4"}
        product={props.product}
        onSizeChange={(name, e) => props.onSizeChange(name, e.target.value)}
      />

      <select className="custom-select  mt-4">
        <option>Select a Optionals</option>
        <option>Approve</option>
        <option>Not Approved</option>
      </select>

      <select className="custom-select  mt-4">
        <option>Finishing type</option>
        <option>Approve</option>
        <option>Not Approved</option>
      </select>
      <div className="mt-4 d-flex justify-content-center">
        <button onClick={() => props.add()} className="btn-success btn">
          Add
        </button>
      </div>
    </div>
  );
}
