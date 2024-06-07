import React,{useState, useRef} from "react";
import ReactToPrint, { useReactToPrint } from "react-to-print";


export default function CheckInvoice({clientData}) {
  const componentPdf = useRef();

  const order = clientData && clientData.length > 0 ? clientData[0] : null;

  const [customPrices, setCustomPrices] = useState({});

  const handlePriceChange = (itemName, descriptionIndex, event) => {
    const newCustomPrices = { ...customPrices };
    newCustomPrices[`${itemName}-${descriptionIndex}`] = event.target.value;
    setCustomPrices(newCustomPrices);
  };

  function formatDate(databaseDateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(databaseDateString).toLocaleDateString('en-US', options);
  }


  
  const calculateSubtotal = () => {
    let subtotal = 0;

    if (order) {
      order.item.forEach((item) => {
        item.work.forEach((work, workIndex) => {
          const customPrice = customPrices[`${item.ItemName}-${workIndex}`];
          const price = customPrice ? parseFloat(customPrice) : 100;
          subtotal += price;
        });
      });
    }

    return subtotal.toFixed(2);
  };

  const generatePdf = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: "UserData",
    onAfterPrint: () => alert("Data Saved!"),
  });

  
  return (
    <div>
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }} ref={componentPdf} >
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
      <div style={{ maxWidth: '300px' }}>
        <strong>BillBoard</strong><br />
        123 Company St, City<br />
        State, ZIP
      </div>
      <div style={{ textAlign: 'right' }}>
        <div><strong>Invoice Number:</strong>{' '}{order ? order._id : 'N/A'}</div>
        <div><strong>Date:</strong>{' '}{order ? formatDate(order.client.date) : 'N/A'}</div>
      </div>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <strong>Invoice To:</strong><br />
      {' '}{order ? order.client.name : 'N/A'}<br />
      {' '}{order ? order.client.address : 'N/A'}
    </div>

    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', width: '220px',textAlign: 'center', padding: '8px', backgroundColor: '#f2f2f2' }}>Item Name</th>
          <th style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px', backgroundColor: '#f2f2f2' }}>Description</th>
          <th style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px', backgroundColor: '#f2f2f2' }}>Size</th>
          <th style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px', backgroundColor: '#f2f2f2' }}>Quantity</th>
          <th style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px', backgroundColor: '#f2f2f2' }}>Price</th>
        </tr>
      </thead>
      <tbody>
            {order &&
              order.item.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {item.work.map((work, workIndex) => (
                    <tr key={`${item.ItemName}-${workIndex}`}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{workIndex === 0 ? item.ItemName : null}</td>
                      <td style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px' }}>{work.SelectedOption}</td>
                      <td style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px' }}>{work.Size}</td>
                      <td style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px' }}>{work.Quantity}</td>
                      <td style={{ border: '1px solid #ddd',width: '220px',textAlign: 'center', padding: '8px' }}>
                        <input
                          type="number"
                          value={customPrices[`${item.ItemName}-${workIndex}`] || '100'}
                          onChange={(e) => handlePriceChange(item.ItemName, workIndex, e)}
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
    </table>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ marginRight: '20px' }}>
        <strong>Subtotal:</strong> {calculateSubtotal()}<br />
        <strong>Tax:</strong> 25.50
      </div>
      <div>
        <strong>Total:</strong>{(parseFloat(calculateSubtotal()) + 25.50).toFixed(2)}
      </div>
    </div>
    
  </div>
  <div className="d-grid gap-2 col-6 mx-auto">
    <button
          className="btn btn-success"
          onClick={generatePdf}
        >
          Export as pdf
        </button>
  </div>
  
    </div>
  );
}
