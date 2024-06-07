import React, { useState } from 'react';

function ItemBar({ openSidebarToggle, OpenSidebar, openItemInfo,handleItemChange, handleItemClick, mode }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const highlight = {
    backgroundColor: '#3498db', /* Set the background color for the selected item */
    color: '#fff', /* Set the text color for the selected item */
  }

  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };
  // const handleChange =(e) => {
  //   setNewItem(e.target.value);
  //   handleItemChange(e.target.value);
  // }

  const handleItemSelection = (index) => {
    setSelectedItem(index);
    openItemInfo();
    // Call the handleItemClick function from props to notify the parent component

    handleItemClick(items[index]); // Pass the selected item's name
    handleItemChange(items[index]);
  };

  let mystyle = {
    backgroundColor: 'rgb(108 117 125)',
    color: 'white',
  }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""} style={mode === "dark" ? mystyle : null}>
      <div className='sidebar-title'>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <input
            type="text"
            className="form-control"
            placeholder='Add Item...'
            value={newItem}
            onChange={(e) =>setNewItem(e.target.value)} //}
          />
        </li>

        <li className='sidebar-list-item'>
          <button
            type="button"
            className="btn btn-success"
            style={{ width: '-webkit-fill-available' }}
            onClick={handleAddItem}
          >
            ADD NEW
          </button>
        </li>

        {items.map((item, index) => (
          <li
            className='sidebar-list-item'
            style={selectedItem === index ? highlight : null}
            onClick={() => handleItemSelection(index)} // Call handleItemSelection instead of handleItemClick
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ItemBar;
