import {useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import axios from "axios";
import CreateInvoice from './components/CreateInvoice'
import AddItem from './components/AddItem'
import CheckInvoice from './components/CheckInvoice'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [mode, setMode] = useState('light');
  const [clientData, setClientData] = useState([]);

  const toggleMode=()=>{
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = "#1d2634";
      document.body.style.color = "#9e9ea4";
      
    } else {
      setMode('light');
      document.body.style.backgroundColor = "#e3eeff"
      document.body.style.color = "#1b1b21";
    }
  }
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8800/invoice');
      setClientData(response.data);
      console.log('Client data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
  return (
    <div className='grid-container' >
      <Router>
      <Header OpenSidebar={OpenSidebar} toggleMode={toggleMode}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Routes>
      <Route exact path="/dashboard" element={<Home />} ></Route>
      <Route exact path="/createInvoice" element={<CreateInvoice mode={mode} />}  ></Route>
      <Route exact path="/add" element={<AddItem openSidebarToggle={openSidebarToggle} mode={mode} OpenSidebar={OpenSidebar} fetchData={fetchData}/>} ></Route>
      <Route exact path="/invoice" element={<CheckInvoice clientData={clientData}/>} ></Route>
      </Routes>
      </Router>
    </div>
  )
}

export default App
