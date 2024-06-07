import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


function CreateInvoice(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    clname: '',
    claddr: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Navigate to the next page and pass the form data as URL parameters
    navigate(`/add?title=${formData.title}&clname=${formData.clname}&claddr=${formData.claddr}&date=${formData.date}`);
  
  };


  let mystyle={width:'30%',backgroundColor: 'cadetblue'}
  let mystyle2={width:'30%',backgroundColor: 'rgb(108 117 125)', color:"white"}
  return (
    <main className="main-container" style={props.mode==="light" ? mystyle : mystyle2}>
  
      <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" >INVOICE TITLE</label>
    <input type="text" className="form-control" id="exampleInputPassword1"  onChange={handleChange} ></input>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">CLIENT NAME</label>
    <input type="text" name='clname' className="form-control" id="exampleInputPassword1" onChange={handleChange} ></input>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">CLIENT ADDRESS</label>
    <input type="text" name='claddr' className="form-control" id="exampleInputPassword1" onChange={handleChange} ></input>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">DATE</label>
    <input type="date" name='date' className="form-control" id="exampleInputPassword1" onChange={handleChange} ></input>
  </div>
  <div className="SuccessButton"><button type="button" className="btn btn-success" onClick={handleClick}>Next</button></div>

        
    </main>
  )
}

export default CreateInvoice