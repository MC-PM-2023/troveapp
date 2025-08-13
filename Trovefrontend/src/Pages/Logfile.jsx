

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import NavbarHeader from '../Components/NavbarHeader';
import analyticslogo from '../assets/datasolve.png';
import avataricon from '../assets/avataricon.png';
import trovelogo from '../assets/Trovelogo.gif';
import appsicon from '../assets/appsicon.png';
import { useNavigate } from 'react-router-dom';

const Logfile = () => {
  const [fetchresponses, setFetchedResponses] = useState([]);
  const [user, setUser] = useState(null);
  const [searchkeyword, setSearchkeyword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const[filteredSearchTerm,setFilteredSearchTerm]=useState([])



  const appsIconRef = useRef();

  const apiurl = import.meta.env.VITE_BACKENDAPIURL;
  const navigate=useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
 
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Invalid user JSON in localStorage');
      }
    }
  }, []);

const handlesearchchange=(e)=>{
  const value=e.target.value.toLowerCase();
  setSearchkeyword(value)


const filteringSearchTerm=fetchresponses.filter((row)=>{
  return(
  row.username?.toLowerCase().includes(value)||
  row.action_type?.toLowerCase().includes(value)||
  row.keyword_name?.toLowerCase().includes(value)||
  row.downloaded_table_name?.toLowerCase().includes(value)||
  String(row.row_count).includes(value)||
  new Date(row.timestamp).toLocaleDateString('en-IN',{
    timeZone:"Asia/Kolkata",
    hour12:true,
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
    second:"numeric"
  }).toLowerCase().includes(value)

)})
setFilteredSearchTerm(filteringSearchTerm)
}

  useEffect(() => {
    const fetchLogResponses = async () => {
      const response = await axios.get(`${apiurl}log/showuserlogs`);
      setFetchedResponses(response.data.data);
      setFilteredSearchTerm(response.data.data)
    };
    fetchLogResponses();
  }, []);

  const handleimageclick = () => {
    setShowDropdown((prev) => !prev);
  };

  // const handleselectchange = (type) => {
  //   setShowDropdown(false);
  //   if (type === 'Logfile') return; // Already in Logfile
  //   window.location.href = `/${type}`;
  // };
   const handleselectchange=(value)=>{

if(value==="excel"){
  navigate('/searchwithexcel');
}
else if(value==="chatwithsql"){
   window.open("http://34.47.149.98:5050/", "_blank");
}
else if(value==="Logfile"){
  navigate('/logfile')
}
else if(value==="textinputsearch"){
  navigate('/textinputsearch')
}

  }

const dropdownItemStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  fontSize: '14px'
};

// Add hover effect via inline styles
dropdownItemStyle[':hover'] = {
  backgroundColor: '#f2f2f2'
};

 
  return (
    <div>
      <NavbarHeader
        user={user}
        appsIconRef={appsIconRef}
        handleimageclick={handleimageclick}
        handleselectchange={handleselectchange}
        showdropdown={showDropdown}
        dropdownItemStyle={dropdownItemStyle}
        searchkeyword={searchkeyword}
        setSearchkeyword={setSearchkeyword}
        analyticslogo={analyticslogo}
        avataricon={avataricon}
        trovelogo={trovelogo}
        appsicon={appsicon}
      />

      <div className="container-fluid mt-4">
        <div className="row align-items-center mb-3 border-bottom pb-2">
          <div className='col-md-6'>
          <h3 className="mb-0 fw-bold">User Activity Logs</h3>
          </div>
          <div className='col-md-6 p-2'>
           <input type='text' className='form-control' onChange={handlesearchchange} value={searchkeyword} placeholder='Search here'  style={{ maxWidth: '300px', marginLeft: 'auto' ,marginRight:"10px"}}/>
        </div>
        </div>
      

        <div className="table-responsive px-5">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Action Type</th>
                <th>Keyword</th>
                <th>Database Name</th>
                {/* <th>Message</th> */}
                <th>Row Count</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSearchTerm && filteredSearchTerm.length >0 ? (

              filteredSearchTerm.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.username}</td>
                  <td>{row.action_type}</td>
                  <td>{row.keyword_name}</td>
                  <td>{row.downloaded_table_name}</td>
                  {/* <td>{row.message}</td> */}
                  <td>{row.row_count}</td>
                   <td>
  {new Date(row.timestamp).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })}
</td>

                </tr>
              ))):(
              <tr>
                <td colSpan="7" className='text-center text-secondary'>No Results Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Logfile;
