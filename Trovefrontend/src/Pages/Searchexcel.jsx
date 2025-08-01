
import analyticslogo from '../assets/datasolve.png';

import { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import trovelogo from '../assets/Trovelogo.gif'
import avataricon from '../assets/avataricon.png'
import appsicon from '../assets/appsicon.png'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';



export default function Searchexcel() {
  const [tables, setTables] = useState([]);
  const [selectedtable, setSelectedtable] = useState(null);
  const [isTableselected, setIstableselected] = useState(false);
  const [inputFields, setInputFields] = useState([{ dropdownValue: "", textBoxValue: '' }]);
  const [columns, setColumns] = useState([]);
  const [searchkeyword, setSearchkeyword] = useState("");
  const [searchresults, setSearchResults] = useState([]);
  const [selectedcolumn, setselectedcolumn] = useState("");
  const [inputvalue, setInputvalue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const[count,setCount]=useState(0)
  const[search,setSearch]=useState("")
  const[sortorder,setSortOrder]=useState("asc")
  const [sortColumn, setSortColumn] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
    const[showDropdown,setShowDropdown]=useState(false)
const [showList, setShowList] = useState(false);


  // const apiURL =import.meta.env.VITE_BACKENDAPIURL;
  const apiURL="http://localhost:5000/"
  // console.log(apiURL)

  const user = JSON.parse(localStorage.getItem('user'));

  const navigate=useNavigate();

  
  
  
const dropdownItemStyle = {
  padding: '8px 12px',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  fontSize: '14px'
};

  const tableNameMap = {
mcdb_dr_db: "Desk Research",
mcdb_st_db: "String",
mcdb_nc_db: "Name Collection",
mcdb_org_db: "Organization",
mcdb_ol_db: "Overview",
mcdb_kt_db: "KeyTerm",
  // Add all your custom mappings here
};

// Add hover effect via inline styles
dropdownItemStyle[':hover'] = {
  backgroundColor: '#f2f2f2'
};


 const handleimageclick=()=>{
    setShowDropdown(prev=>!prev)
  }
  useEffect(() => {
    // Disable copy, cut, and paste actions
    const disableActions = (e) => {
      e.preventDefault();
      
    };

    // Disable right-click context menu
    const disableRightClick = (e) => {
      e.preventDefault();
      
    };

    // Disable text selection
    const disableTextSelection = () => {
      document.body.style.userSelect = "none"; // Disable text selection globally
    };

    // Add event listeners to disable actions
    document.addEventListener("copy", disableActions);
    document.addEventListener("cut", disableActions);
    document.addEventListener("paste", disableActions);
    document.addEventListener("contextmenu", disableRightClick);

    // Disable text selection on body
    disableTextSelection();

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener("copy", disableActions);
      document.removeEventListener("cut", disableActions);
      document.removeEventListener("paste", disableActions);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);


  useEffect(() => {
    axios.get(`${apiURL}gettables/gettablesbutton`)
      .then((response) => {
        setTables(response.data.tables);
      }).catch((error) => {
        console.error("There was an error fetching tables", error);
      });
  }, []);

  const fetchtablecolumns = async (table) => {
    try {
      const response = await axios.post(`${apiURL}gettables/getcolumns`, { table });
      setColumns(response.data.tablecolumns);
    } catch (error) {
      console.error("Error fetching columns:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (index, field, value, event = null) => {
    const updatedFields = [...inputFields];
    // console.log("Field being updated:", field);

    if (field === "textBoxValue" && event) {
      const file = event.target.files[0]; // Get the file object
      // console.log("File selected:", file);
      updatedFields[index][field] = file; // Store the file object
    } else {
      // console.log("Value entered:", value);
      updatedFields[index][field] = value;
    }

    setInputFields(updatedFields);

    if (field === "dropdownValue") {
      setselectedcolumn(value);
      // console.log("Selected column updated to:", value);
    }
  };



  const fetchkeyworddetails = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('table', selectedtable);

      let fileUploaded = false;

      inputFields.forEach((field, index) => {
        // console.log("Processing field:", field);
        if (field.textBoxValue instanceof File) {
          formData.append('file', field.textBoxValue); // Add the file to FormData
          fileUploaded = true;

        }
      });

      if (!fileUploaded) {
        throw new Error('Please upload a valid Excel file.');
      }

      const response = await axios.post(`${apiURL}searchexcel/searchwithexcel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSearchResults(response.data.results || []);
      setCount(response.data.results.length||count)
      //  console.log("Response is:",response.data.results)
      setResults(response.data.results); // Enable download button

      const user=JSON.parse(localStorage.getItem('user'))
      

      if(user?.id && user?.username){
        await axios.post(`http://localhost:5000/log/useractivity`,{
          user_id:user.id,
          username:user.username,
          action:"process",
          action_type:"process",
          searchText:inputFields.map(f=>f.value).join(','),
          tableName:selectedtable,
          message:`user searched using excel in ${selectedtable}`
          
        })
   

       
        
      }
      else{
        console.warn("user not found in localstorage for logging ")
      }

    } catch (error) {
      console.error('Error in fetching details:', error.response?.data || error.message);
    }
    finally {
      setLoading(false);
    }
  };







  useEffect(() => {
    if (searchkeyword) {
      fetchkeyworddetails(searchkeyword);
    } else {
      setSearchResults([]);
    }
  }, [searchkeyword]);

  useEffect(() => {
    if (selectedcolumn && inputvalue) {
      setSearchkeyword(`${selectedcolumn}: ${inputvalue}`);
    }
  }, [selectedcolumn, inputvalue]);



  const handleselectedtable = (tablename) => {
    if (selectedtable === tablename) {
      setSelectedtable(null);
      setIstableselected(false);
      setColumns([]);
      setSearchResults([]);
      setResults("")
      setSearch("")
      setCount("0")
    } else {
      setSelectedtable(tablename);
      setIstableselected(true);
      fetchtablecolumns(tablename);
      setResults(null);
    }
  };

  // const downloadexcel = () => {
  //   console.log("Results to be exported:", results);
  //   if (!results || !Array.isArray(results) || results.length === 0) {
  //     console.error("Invalid results format or no results available.");
  //     return; // Prevent download if results are invalid
  //   }
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.json_to_sheet(results);
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
  //   XLSX.writeFile(workbook, 'Results.xlsx');
  // };

  //correct select columns to export code
  const downloadexcel =async () => {
  
    const filteredData = results.map(row => {
      const filteredRow = {};
      selectedColumns.forEach(col => {
        filteredRow[col] = row[col];
      });
      return filteredRow;
    });
  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Results');
    XLSX.writeFile(workbook, 'Results.xlsx');
  
    setShowModal(false); // Close the modal after download

    
try{
const user=JSON.parse(localStorage.getItem('user'))
if(user?.id && user?.username){
  await axios.post(`http://localhost:5000/log/useractivity`,{
    user_id:user.id,
    username:user.username,
    action:download,
    searchText:selectedColumns.join(','),
    tableName:selectedtable
  })
}
else{
  console.warn("user not found in localstorage for download logging")
}
} 
catch(error){

}
    
  };
  


    //     try{
    //   const user=JSON.parse(localStorage.getItem('user'))
    //   if(user?.id && user?.username){
    //     await axios.post('http://localhost:5000/log/useractivity',{
    //       user_id:user.id,
    //       username:user.username,
    //       action:"download", //error part
    //       searchText:selectedColumns.join(','),
    //       tableName:selectedtable
    //     })
    //   }
    //   else{
    //     console.warn("User not found in localstorage for download logging")
    //   }
    // }
   
  const handleSort = (column) => {
    // Toggle sorting order
    const newOrder = sortColumn === column && sortorder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
  
    // Sort the results array
    const sortedResults = [...results].sort((a, b) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });
  
    setResults(sortedResults); // Update the state with sorted data
  };
  
  const formatDateIfValid = (value) => {
    if (typeof value === "string" && !isNaN(Date.parse(value))) {
      const dateObj = new Date(value);
      return dateObj.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    }
    return value;
  };

  const highlightSearch = (text) => {
    if (!search || typeof text !== "string") return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, (match) => `<span style="background-color: yellow; font-weight: bold;">${match}</span>`);
  };
  
  const handleselectchange=(value)=>{

if(value==="textinput"){
  navigate('/textinputsearch');
}
else if(value==="workflow"){
   window.open("http://34.47.164.153:6060/", "_blank");
}
else{
 window.open("http://34.47.164.153:5050/", "_blank");
}
  }


  

  const toggleList = () => setShowList(prev => !prev);

const appsIconRef = useRef(null);

  useEffect(() => {
    if (appsIconRef.current) {
      // Initialize Bootstrap Tooltip on the icon
      const tooltip = new bootstrap.Tooltip(appsIconRef.current, {
        title: 'Associated Apps',
        placement:"bottom",
        trigger: 'hover ',
      });

      // Cleanup on unmount
      return () => {
        tooltip.dispose();
      };
    }
  }, []);

  return (
    <div className='box'>
{/* <header className="header bg-white shadow-sm">
  <div className="container-fluid">
    <div className="row align-items-center w-100">
      <div className="col-auto">
        <img src={analyticslogo} alt="Logo" style={{ height: 50 }} className="logo" />
      </div>
      <div className="col-auto">
                    <img src={trovelogo} alt="Logo" style={{ height: 50 }} className="logo" />
                  </div>
      <div className="col-auto ms-auto">
  <select
    className="form-select"
    style={{ width: '200px' }}
    onChange={(e) => {
      const value = e.target.value;
      if (value === "textinput") {
        navigate('/');
      } else if (value === "workflow") {
        window.open("http://34.47.164.153:6060/", "_blank");
      } else if (value === "chatsql") {
        window.open("http://34.100.216.188:5050/", "_blank");
      }
    }}
    defaultValue=""
  >
    <option value="" disabled>Select Project</option>
    <option value="textinput">Text Input Search</option>
    <option value="workflow">Workflows</option>
    <option value="chatsql">Chat With SQL</option>
  </select>
</div>
    </div>
  </div>
  
</header> */}

 <header className="header bg-white shadow-sm">
  <div className="container-fluid">
    <div className="d-flex justify-content-between align-items-center">

      {/* Left: Analytics Logo */}
      <div>
        <img src={analyticslogo} alt="Analytics Logo" style={{ height: 40 }} className="logo" />
      </div>

      {/* Right: Apps Icon + Trove Logo */}
      <div className="d-flex align-items-center gap-3 position-relative">

      

        {/* Dropdown */}
        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '50px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '220px',
            zIndex: 1000
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
              <li style={dropdownItemStyle} onClick={() => handleselectchange('textinput')}>Text Input Search</li>
              <li style={dropdownItemStyle} onClick={() => handleselectchange('workflow')}>Workflows</li>
              <li style={dropdownItemStyle} onClick={() => handleselectchange('chatsql')}>Chat With SQL</li>
            </ul>
          </div>
        )}

 
        {/* Trove Logo */}
        {/* <img src={trovelogo} alt="Trove Logo" style={{ height: 40 }} className="logo" /> */}

            <div className="col-auto d-flex align-items-center">
              
             
              <img src={avataricon} alt="avataticon" style={{ height: 30 }} className="logo" />
               <p className="mb-0 fw-medium me-2">{user.username}</p>
                    <img src={trovelogo} alt="Trove Logo" style={{ height: 40 }} className="logo" />
            </div>

         {/* Apps Icon */}
        <img
          src={appsicon}
          alt="Apps Icon"
          ref={appsIconRef}
          className='appsicon'
          style={{ height: 30, width: 30, cursor: 'pointer' }}
          onClick={handleimageclick}
        />
      </div>


    </div>
  </div>
</header>



      <aside>
        {/* <div className='databasetables '>
          <h6>Select the Database Table</h6>
        </div>
        <div className="d-flex flex-wrap gap-2">
        {
          tables.length > 0 ? (
            tables.map((table, index) => (
              // <button key={index} className={selectedtable === table ? 'btn btn-dark  ' : "btn btn-primary  "} type='button' onClick={() => handleselectedtable(table)} disabled={isTableselected && selectedtable !== table}>
              //   {table}
              // </button>
              <button key={index} className={selectedtable === table ? 'btn btn-dark  btn-sm' : "btn btn-primary btn-sm "} type='button' onClick={() => handleselectedtable(table)} >
              {table}
            </button>
            ))
          ) : (
            <p>Loading Tables ...</p>
          )
        }
        </div> */}

        <div className="databasetables">
      <div className="card shadow">
        <div
          className="card-header bg-secondary text-white text-center"
          style={{ cursor: "pointer" }}
          onClick={toggleList}
        >
         <h6 className="mb-0">Trove<span><i className="bi bi-database"></i></span></h6>
        </div>

  {showList && (
  <div className="card-body">
    {tables.length > 0 ? (
      <select
        className="form-select"
        value={selectedtable??""}
        onChange={e => handleselectedtable(e.target.value)}
      >
        <option value="" disabled >Select a Database</option>
        {tables.map((table, index) => (
          <option key={index} value={table}>
            {tableNameMap[table] || table}
          </option>
        ))}
      </select>
    ) : (
      <p className="text-center">Loading Tables...</p>
    )}
  </div>
)}


      </div>
    </div>


        <div className="keywordsearch mt-3 p-2">
          {/* <h5>Selected Database Columns</h5> */}
          {columns && columns.length > 0 ? (
            inputFields.map((input, index) => (
              <div className="col mb-2 align-items-center" key={index}>
               
   <div className="d-flex align-items-center mt-4 gap-3 flex-wrap">
  <div className="flex-grow-1">
    <input
      type="file"
      className={`form-control ${input.fileError ? "border-danger" : ""}`}
      name="file"
      accept=".xls, .xlsx"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const fileType = file.name.split('.').pop();
          if (fileType !== 'xls' && fileType !== 'xlsx') {
            handleInputChange(index, 'fileError', true);
          } else {
            handleInputChange(index, 'textBoxValue', file, e);
            handleInputChange(index, 'fileError', false);
          }
        }
      }}
    />
    {input.fileError && (
      <small className="text-danger">Please upload a valid Excel file (.xls or .xlsx)</small>
    )}
  </div>

  <div>
    <button 
      type="button" 
      className="btn btn-dark" 
      onClick={fetchkeyworddetails} 
      disabled={loading}
    >
      Search
    </button>
  </div>
</div>

              </div>
            ))
          ) : (
            <p className='text-center'>.....</p>
          )}
        </div>
      
   

      </aside>

      <main>
        <div className="d-flex mb-4">
          {/* <h4 id="icons" className="mb-0">{selectedtable ? `${selectedtable} Table Connected Successfully !` : "Database Table Not Connected"}</h4> */}
          {/* <h5 className='mt-1'>Results: {count} Rows</h5> */}
          {Array.isArray(results) && results.length === 0 ? (
      <h6 className="mb-0">Welcome to Search With Excel</h6>
    ) : (
      <h6 className="mt-1">Results: {count} Rows</h6>
    )}
          <form className="subnav-search d-flex flex-nowrap ms-auto">
          <input className="form me-2 border" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} style={{outline:"none",border:"none"}}/>
            <button type="button" className="btn btn-dark btn-outline bg-gradient downloadbutton" onClick={()=>setShowModal(true)} disabled={!results || results.length === 0}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 20 20">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.5 16 9.318c0-1.813-1.078-3.286-2.436-4.005a5.443 5.443 0 0 0-1.465-2.384A5.53 5.53 0 0 0 8 2zM5 9h2v5h3V9h2l-4 4-4-4z"></path>
              </svg> Export
            </button>
          </form>
        </div>

        <div className="mt-4" id="tableContainer">
  {loading ? (
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (

<div className="container" style={{ maxHeight: "500px", overflowY: "auto" }}>
{/* <div className="tableWrapper" style={{ overflow: "auto", maxHeight: "500px" }}> */}
<div className="tableWrapper" >
 {Array.isArray(results) && results.length === 0 ? (
  <div className="text-center my-5">
   
   
  </div>
) : (
  Array.isArray(results) && results.length > 0 && (
    <table className="flTable">
      <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <tr>
          {Object.keys(results[0]).map((columnName, index) => (
            <th key={index} style={{ width: `${100 / Object.keys(results[0]).length}%`, position: "relative" }}>
              <span className="">
                {columnName}
                <span className="tooltip-text">{columnName}</span>
              </span>
              <button
                className="btn btn-sm btn-link ms-1"
                onClick={() => handleSort(columnName)}
              >
                {sortColumn === columnName && sortorder === "asc" ? "🔼" : "🔽"}
              </button>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
  {results
    .filter((row) =>
      Object.values(row).some(
        (cellValue) =>
          cellValue &&
          cellValue.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
    .slice(0, 100)
    .map((row, rowIndex) => (
      <tr key={rowIndex}>
        {Object.values(row).map((cellValue, cellIndex) => {
          const formattedValue = formatDateIfValid(cellValue);
          const highlighted = highlightSearch(formattedValue ? formattedValue.toString() : "");


          return (
            <td key={cellIndex} dangerouslySetInnerHTML={{ __html: highlighted }} />
          );
        })}
      </tr>
    ))}
</tbody>

    </table>
  )
)}

</div>
</div>

  )}
</div>

{showModal && (
  <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Select Columns to Export</h5>
          <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
  <div className="d-flex justify-content-end mb-2">
   
  </div>

  {columns.map((column, index) => (
    <div className="form-check" key={index}>
      <input
        className="form-check-input"
        type="checkbox"
        value={column}
        id={`column-${index}`}
        checked={selectedColumns.includes(column)}
        onChange={(e) => {
          const col = e.target.value;
          setSelectedColumns(prev =>
            e.target.checked ? [...prev, col] : prev.filter(c => c !== col)
          );
        }}
      />
      <label className="form-check-label" htmlFor={`column-${index}`}>
        {column}
      </label>
    </div>
  ))}
</div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
          <button
      className="btn btn-outline-primary"
      onClick={() => {
        if (selectedColumns.length === columns.length) {
          setSelectedColumns([]); // Unselect all
        } else {
          setSelectedColumns(columns); // Select all
        }
      }}
    >
      {selectedColumns.length === columns.length ? "Unselect All" : "Select All"}
    </button>
          <button type="button" className="btn btn-outline-success" onClick={() => downloadexcel()}  disabled={selectedColumns.length===0}>Download</button>
        
        </div>
      </div>
    </div>
  </div>
)} 

      </main>

    
    </div>
  );
}
