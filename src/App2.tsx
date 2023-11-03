import React, { useEffect, useRef, useState } from "react";
import ProductList from "./ProductList";

const connect = () => console.log("Connecting");
const disconnect = () => console.log("Disconnecting");

const App2 = () => {
  const ref = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("");

  useEffect(() => {
    connect();
    return () => disconnect();
  });
  return (
    <div>
      {/* <h2>Understanding the effecthook</h2>
      <input ref={ref} type="text" className="form-control" /> */}
      <select
        name=""
        id=""
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="" key=""></option>
        <option value="Clothing">Clothing</option>
        <option value="HouseHold">HouseHold</option>
      </select>
      <ProductList category={category} />
    </div>
  );
};

export default App2;
