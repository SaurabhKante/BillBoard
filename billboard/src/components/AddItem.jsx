import React, {  useState } from "react";
import "../App.css";
import ItemBar from "./ItemBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChooseInfo from "./ChooseInfo";
import axios from "axios";

function AddItem(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve the data from URL parameters
  const client = {
    name: queryParams.get("clname") || "",
    address: queryParams.get("claddr") || "",
    date: queryParams.get("date") || "",
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected items
  const [showTableItemInfo, setShowTableItemInfo] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemData, setItemData] = useState([]);
  

  const openItemInfo = () => {
    setShowTableItemInfo(true);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Function to handle item click
  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    openItemInfo();
  };

  

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/invoice');
    props.fetchData();
    // Your component rendering logic using clientData

  }


  
  const handleItemChange = (name) => {
    setItemName(name);
  };

  const onSave = (data) => {
    // Process the data received from ChooseInfo here

    setItemData((prevItemData) => [...prevItemData, data]);
    console.log("itemName:", itemName);
    console.log("data:", data);
    axios.post("http://localhost:8800/add", {
        clname: client.name,
        claddr: client.address,
        date: client.date,
        iName: itemName,
        option: data.selectedOption,
        size: data.size,
        qty: data.quantity,
      })
      .then((response) => {
        console.log("Data saved to the database:", response.data);
        // You can perform additional actions on successful save
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle errors
      });
    // You can perform any additional logic or state updates here.
  };

  return (
    <main className="main-container">
      <div
        className={`card bg-${
          props.mode === "light" ? "light" : "secondary text-white"
        }`}
      >
        <div className="card-header">Customer Details</div>
        <div className="d-flex justify-content-between">
          <div>
            <h5 style={{ marginTop: "15px" }}>
              <strong>Name: </strong>
              {client.name}
            </h5>
          </div>
          <div className="text-center">
            <h5 style={{ marginTop: "15px" }}>
              <strong>Address: </strong>
              {client.address}
            </h5>
          </div>
          <div className="text-right">
            <h5 style={{ marginTop: "15px" }}>
              <strong>Date: </strong>
              {client.date}
            </h5>
          </div>
        </div>
        {showTableItemInfo && (
          <div style={{ marginTop: "15px" }}>
            <h5>{itemName}</h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item Info</th>
                  <th scope="col">Size</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {itemData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.selectedOption}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid-container">
        <ItemBar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          mode={props.mode}
          openItemInfo={openItemInfo}
          handleItemClick={handleItemClick}
          handleItemChange={handleItemChange}
        />

        {/* Render ChooseInfo for each selected item */}
        {selectedItems.map((item, index) => (
          <ChooseInfo
            key={index}
            title={`Item Info `}
            item1={`Info 1 `}
            item2={`Info 2 `}
            item3={`Info 3 `}
            onSave={onSave}
          />
        ))}
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <button className="btn btn-success" type="button" onClick={handleClick}>
          Create Invoice
        </button>
      </div>
    </main>
  );
}

export default AddItem;
