import React, { useState } from "react";

function ChooseInfo(props) {
  // Initialize state variables
  const [selectedOption, setSelectedOption] = useState(props.title);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");

  // Function to handle the "Save" button click
  const handleSaveClick = () => {
    // Access the selected option, state, and quantity values

    const data = { selectedOption, size, quantity };
    props.onSave(data);
    // You can further process or send these values to the parent component as needed.
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <div className="row g-3">
          <div className="col-sm-7">
            <select
              className="form-select"
              aria-label="Default select example"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option  value={props.title}>{props.title}</option>
              <option name="info1" value={props.item1}>{props.item1}</option>
              <option name="info2" value={props.item2}>{props.item2}</option>
              <option name="info3" value={props.item3}>{props.item3}</option>
            </select>
          </div>
          <div className="col-sm">
            <input
              type="number"
              className="form-control"
              placeholder="Size"
              name="size"
              aria-label="State"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="col-sm">
            <input
              type="number"
              className="form-control"
              placeholder="Qty"
              name="Quantity"
              aria-label="Qty"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="col-sm">
            <button
              type="button"
              className="btn btn-success"
              style={{ width: "-webkit-fill-available" }}
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ChooseInfo;
