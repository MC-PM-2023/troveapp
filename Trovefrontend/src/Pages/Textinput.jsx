import '../css/textinput.css'
import analyticslogo from '../assets/datasolve.png'
// import Footer from '../Components/Footer'
import { useEffect, useState ,useRef} from 'react'
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import trovelogo from '../assets/Trovelogo.gif'
import appsicon from '../assets/appsicon.png'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
const apiURL = import.meta.env.VITE_BACKENDAPIURL;


// console.log("Api:",apiURL)

export default function Textinput() {

  const navigate = useNavigate();

  const [tables, setTables] = useState([])
  const [selectedtable, setSelectedtable] = useState(null);
  const [isTableselected, setIstableselected] = useState(false)
  const [inputFields, setInputFields] = useState([{ dropdownValue: "", textBoxValue: '' }]);
  const [columns, setColumns] = useState([]);
  const [searchkeyword, setSearchkeyword] = useState("");
  const [searchresults, setSearchResults] = useState([])
  const [selectedcolumn, setselectedcolumn] = useState("");
  const [inputvalue, setInputvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sortorder, setSortOrder] = useState("asc")
  const [sortColumn, setSortColumn] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const[showDropdown,setShowDropdown]=useState(false)
const [showList, setShowList] = useState(false);

  const toggleList = () => setShowList(prev => !prev);
useEffect(() => {
  // Step 1: If token is passed via URL, save it to localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromURL = urlParams.get("token");
console.log(tokenFromURL)
  if (tokenFromURL) {
    localStorage.setItem("token", tokenFromURL);
  }
}, []);

useEffect(() => {
  // Step 2: Validate token
  const token = localStorage.getItem("token");

  if (token) {
    axios
      .get("http://35.207.199.234:3000/api/auth/validatetoken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log("User validated:", res.data.user);
        // Optional: Set user info in state if needed
      })
      .catch((err) => {
        console.error("Invalid or expired token", err);
        localStorage.removeItem("token"); // Clear the invalid token
        window.location.href = "http://35.207.199.234:8080/"; // Redirect to login/landing
      });
  } else {
    // If no token is present at all
    window.location.href = "http://35.207.199.234:8080/";
  }
}, []);



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
        // console.log("response is:",response)
        setTables(response.data.tables)
        // console.log("Settables is:",response.data.tables)
      }).catch((error) => {
        console.error("There was an error to fetching tables", error)
      })

  }, [])



  const fetchtablecolumns = async (table) => {
    try {
      const response = await axios.post(`${apiURL}gettables/getcolumns`, {
        table: table,
      });
      // console.log("response is:",response)
      setColumns(response.data.tablecolumns); // Update state with fetched columns
      // console.log('Fetched columns:', response.data.tablecolumns);
    } catch (error) {
      console.error("Error fetching columns:", error.response?.data || error.message);
    }
  };


  const fetchkeyworddetails = async () => {
    setLoading(true);
    try {
      // Normalize input fields by converting to lowercase
      const fields = inputFields.map((field) => ({
        key: field.dropdownValue.toLowerCase(), // Convert key to lowercase
        value: field.textBoxValue.toLowerCase() // Convert value to lowercase
      }));

      const response = await axios.post(`${apiURL}searchinput/searchfields`, {
        tablename: selectedtable,
        fields
      });

      setSearchResults(response.data.keywordsearch || []);
      setCount(response.data.keywordsearch?.length || count);

      // console.log(response.data.keywordsearch); // Debug response data
    } catch (error) {
      console.error('Error in fetching the necessary details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (selectedcolumn && inputvalue) {
      setSearchkeyword(`${selectedcolumn}: ${inputvalue}`);
    }
  }, [selectedcolumn, inputvalue]);


  const handleAddRow = () => {
    setInputFields([...inputFields, { dropdownValue: '', textBoxValue: '' }]);
    updateSearchKeyword();

  };

  const handleRemoveRow = (index) => {
    const updatedFields = inputFields.filter((_, i) => i !== index);
    setInputFields(updatedFields);
    updateSearchKeyword();
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index][field] = value;
    setInputFields(updatedFields);
    updateSearchKeyword();
  };

  const updateSearchKeyword = () => {
    // Update the search keyword based on all input fields
    const keyword = inputFields
      .map((field) => {
        if (field.dropdownValue && field.textBoxValue) {
          return `${field.dropdownValue}: ${field.textBoxValue}`;
        }
        return '';
      })
      .filter(Boolean) // Remove any empty strings
      .join(' | '); // Join all the fields with " | "

    setSearchkeyword(keyword);
  };



  const handleselectedtable = (tablename) => {
    if (selectedtable === tablename) {
      setSelectedtable(null)
      setIstableselected(false)
      setColumns([])
      setCount(0)
      setSearchkeyword("")
      setSearchResults([])
      setInputFields([{ dropdownValue: "", textBoxValue: "" }]);

    }
    else {
      setSelectedtable(tablename);
      setIstableselected(true)
      setColumns([]);
      setSearchResults([]);
      setCount(0);
      setSearchkeyword("");
      setInputFields([{ dropdownValue: "", textBoxValue: "" }]); // Reset input fields
      fetchtablecolumns(tablename)
    }

  }

  // const downloadexcel = () => {
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.json_to_sheet(searchresults);
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet')
  //   XLSX.writeFile(workbook, 'Results.xlsx')
  // }

  //correct select columns to export code
  const downloadexcel = () => {
    const filteredData = searchresults.map((row) => {
      const filteredRow = {};
      selectedColumns.forEach((col) => {
        filteredRow[col] = row[col];
      });
      return filteredRow;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredResults');
    XLSX.writeFile(workbook, 'Results.xlsx');
    setShowModal(false); // Close modal
  };


  const filteredResults = search
    ? searchresults.filter((row) =>
      Object.values(row).some((value) =>
        value ? value.toString().toLowerCase().includes(search.toLowerCase()) : false
      )
    )

    : searchresults;

  const handleSort = (column) => {
    // Toggle sorting order
    const newOrder = sortColumn === column && sortorder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);

    // Sort the filtered results
    const sortedData = [...filteredResults].sort((a, b) => {
      if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setSearchResults(sortedData); // Update search results with sorted data
  };

  const highlightSearch = (text) => {
    if (!search.trim() || typeof text !== "string") return text;

    // Create a case-insensitive regex pattern for the search term
    const regex = new RegExp(`(${search})`, "gi");

    // Replace matched text with a highlighted span
    return text.replace(regex, '<span style="background-color: yellow; font-weight: bold;">$1</span>');
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


  const handleimageclick=()=>{
    setShowDropdown(prev=>!prev)
  }

  const handleselectchange=(value)=>{

if(value==="excel"){
  navigate('/searchwithexcel');
}
else if(value==="chatwithsql"){
   window.open("http://34.47.149.98:5050/", "_blank");
}
else{
 window.open("http://34.47.164.153:6060/", "_blank");
}
  }


  const tableNameMap = {
mcdb_dr_db: "Desk Research",
mcdb_st_db: "String",
mcdb_nc_db: "Name Collection",
mcdb_org_db: "Organization",
mcdb_ol_db: "Overview",
mcdb_kt_db: "KeyTerm",
  // Add all your custom mappings here
};



const appsIconRef = useRef(null);

  useEffect(() => {
    if (appsIconRef.current) {
      // Initialize Bootstrap Tooltip on the icon
      const tooltip = new bootstrap.Tooltip(appsIconRef.current, {
        title: 'Associated Apps',
        placement: 'bottom',
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
          <div className="row align-items-center">

            {/* Logo on the Left 
            <div className="col-auto">
              <img src={analyticslogo} alt="Logo" style={{ height: 50 }} className="logo" />
            </div>
   {/* <div className="col-auto">
              <img src={trovelogo} alt="Logo" style={{ height: 50 }} className="logo" />
            </div> */}
            {/* Search Box in the Center 
            <div className="col d-flex justify-content-center">
              <input
                className="form-control search w-50"
                id="search"
                type="search"
                placeholder="Search the field"
                autoComplete="off"
                disabled
                value={searchkeyword ? `Search: ${searchkeyword}` : "Search the field"}
                onChange={(e) => setSearchkeyword(e.target.value)}
              />
            </div>

            {/* Button on the Right 
            <div className="col-auto" style={{ position: 'relative' }}>
              {/* <select
                className="form-select"
                style={{ width: '200px' }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "excel") {
                    navigate('/searchwithexcel');
                  } else if (value === "workflow") {
                  window.open("http://34.47.164.153:6060/", "_blank");
                  } else if (value === "chatsql") {
                    window.open("http://34.100.216.188:5050/", "_blank");
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>Select Project</option>
                <option value="excel">Search With Excel</option>
                <option value="workflow">Workflows</option>
                <option value="chatsql">Chat With SQL</option>
              </select> 
<img src={appsicon} alt="appsicon"   style={{ height: 50, width: 50, cursor: 'pointer' }} onClick={handleimageclick}/>
{showDropdown &&
 <select
                className="form-select"
                style={{
            width: '200px',
            position: 'absolute',
            top: '60px', // position dropdown below image
            left: '0',
            zIndex: 1000
          }}
                
                onChange={handleselectchange}
                defaultValue=""
              >
                <option value="" disabled>Select Project</option>
                <option value="excel">Search With Excel</option>
                <option value="workflow">Workflows</option>
                <option value="chatsql">Chat With SQL</option>
              </select> 
  }
            </div>
            <div className="col-auto">
              <img src={trovelogo} alt="Logo" style={{ height: 50 }} className="logo" />
            </div>
          </div>
        </div>
      </header> */}

     
    <header className="header bg-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center">

          {/* Left: Analytics Logo */}
          <div className="col-auto">
            <img src={analyticslogo} alt="Analytics Logo" style={{ height: 50 }} className="logo" />
          </div>

          {/* Center: Search Box */}
          <div className="col d-flex justify-content-center">
            <input
              className="form-control search w-50"
              id="search"
              type="search"
              placeholder="Search the field"
              autoComplete="off"
              disabled
              value={searchkeyword ? `Search: ${searchkeyword}` : "Search the field"}
              onChange={(e) => setSearchkeyword(e.target.value)}
            />
          </div>


          {/* Right: Trove Logo */}
          <div className="col-auto">
            <img src={trovelogo} alt="Trove Logo" style={{ height: 50 }} className="logo" />
          </div>

  {/* Right: Apps Icon and Dropdown */}
          <div className="col-auto" style={{ position: 'relative' }}>
            <img
              src={appsicon}
              ref={appsIconRef}
              alt="Apps Icon"
              className='appsicon'
              style={{ height: 30, width: 30, cursor: 'pointer' }}
              onClick={handleimageclick}
            />

            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '60px',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '220px',
                zIndex: 1000
              }}>
                <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
                  <li style={dropdownItemStyle} onClick={() => handleselectchange('excel')}>Search With Excel</li>
                  <li style={dropdownItemStyle} onClick={() => handleselectchange('workflow')}>Workflows</li>
                  <li style={dropdownItemStyle} onClick={() => handleselectchange('chatwithsql')}>Chat With SQL</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
      <aside >
        {/* <div className='databasetables'>
          <h6>Select the Database Table</h6>
          <div className="d-flex flex-wrap gap-2">
            {
              tables.length > 0 ? (
                tables.map((table, index) => (
                  <button
                    key={index}
                    className={selectedtable === table ? 'btn btn-dark btn-sm' : "btn btn-primary btn-sm"}
                    type='button'
                    onClick={() => handleselectedtable(table)}
                  >
                    {table}
                  </button>
                ))
              ) : (
                <p>Loading Tables ...</p>
              )
            }
          </div>
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

       {/* {showList && (
  <div className="card-body">
    {tables.length > 0 ? (
      <div className="row g-2 text-center">
        {tables.map((table, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-4">
            <div
              className={`p-2 border rounded ${selectedtable === table ? 'bg-primary text-white' : 'bg-light'}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleselectedtable(table)}
            >
              {tableNameMap[table] || table}

            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center">Loading Tables...</p>
    )}
  </div>
)} */}

{showList && (
  <div className="card-body">
    {tables.length > 0 ? (
      <select
        className="form-select"
        value={selectedtable}
        onChange={e => handleselectedtable(e.target.value)}
      >
        <option value="" disabled selected>Select a Database</option>
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
          {columns && columns.length > 0 ? (
            inputFields.map((input, index) => (
              <div className="col mb-2 align-items-center" key={index}>
                {/* Dropdown Validation */}
                <select
                  className={`form-select ${!input.dropdownValue ? "border-danger" : ""}`}
                  value={input.dropdownValue}
                  onChange={(e) => handleInputChange(index, 'dropdownValue', e.target.value)}
                >
                  <option value="" disabled>Select an option</option>
                  {columns.map((column, i) => (
                    <option key={i} value={column}>
                      {column}
                    </option>
                  ))}
                </select>
                {!input.dropdownValue && <small className="text-danger">Please select a column</small>}

                {/* Textbox Validation */}
                <div className="mt-4">
                  <input
                    type="text"
                    className={`form-control ${!input.textBoxValue.trim() ? "border-danger" : ""}`}
                    placeholder="Enter keyword"
                    value={input.textBoxValue}
                    onChange={(e) => handleInputChange(index, 'textBoxValue', e.target.value)}
                  />
                </div>
                {!input.textBoxValue.trim() && <small className="text-danger">Please enter a keyword</small>}

                <div className="d-flex align-items-center justify-content-center gap-2 m-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveRow(index)}
                    disabled={inputFields.length === 1}
                  >
                    Remove
                  </button>

                  {index === inputFields.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn btn-dark btn-sm "
                    onClick={fetchkeyworddetails}
                    disabled={loading || inputFields.some(input => !input.dropdownValue || !input.textBoxValue.trim())}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-search" viewBox="0 0 15 20">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                    </svg>
                  </button>
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
          <h6 className='mt-1'>
            {searchresults.length > 0
              ? `Results: ${count} Rows`
              : (search ? "No results found." : "Welcome to Trove!")}
          </h6>

          <form className="subnav-search d-flex flex-nowrap ms-auto">
            <input
              className="form-control-sm me-2 border "
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ outline: "none", border: "none" }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-dark btn-sm bg-gradient downloadbutton"
              onClick={() => setShowModal(true)}
              disabled={!searchresults || searchresults.length === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 20 20">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708"></path>
              </svg>Export
            </button>
          </form>
        </div>

        <div className="container" style={{ maxHeight: "500px" }}>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : searchresults.length > 0 ? (
            <div className="tableWrapper" style={{ overflow: "auto", maxHeight: "500px" }}>
              <table className="flTable">
                <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
                  <tr>
                    {Object.keys(searchresults[0]).map((key, index) => (
                      <th
                        key={index}
                        style={{
                          width: `${100 / Object.keys(searchresults[0]).length}%`,
                          position: "relative",
                          background: "#fff",
                          padding: "10px",
                          borderBottom: "2px solid #ddd",
                          textAlign: "left",
                        }}
                      >
                        <span className="">
                          {key}
                          <span className="tooltip-text">{key}</span>
                        </span>
                        <button
                          className="btn btn-sm btn-link ms-1 sort-button"
                          onClick={() => handleSort(key)}
                        >
                          {sortColumn === key && sortorder === "asc" ? "🔼" : "🔽"}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.slice(0, 100).map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => {
                        const formattedValue = formatDateIfValid(value);
                        const highlightedValue = highlightSearch(formattedValue);
                        return (
                          <td key={i} dangerouslySetInnerHTML={{ __html: highlightedValue }}></td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : search ? (
            <h6 className="text-center">No results found.</h6>
          ) : null}
        </div>

        {showModal && (
          <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select Columns to Export</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  {columns.map((column, index) => (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={column}
                        checked={selectedColumns.includes(column)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedColumns((prev) =>
                            prev.includes(value)
                              ? prev.filter((col) => col !== value)
                              : [...prev, value]
                          );
                        }}
                      />
                      <label className="form-check-label">{column}</label>
                    </div>
                  ))}
                </div>


                <div className="modal-footer">
                  <button className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  {/* Select All / Deselect All Button  */}
                  <button
                    className="btn btn-outline-primary "
                    onClick={() => {
                      if (selectedColumns.length === columns.length) {
                        setSelectedColumns([]); // Deselect All
                      } else {
                        setSelectedColumns([...columns]); // Select All
                      }
                    }}
                  >
                    {selectedColumns.length === columns.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <button className="btn btn-outline-success" onClick={downloadexcel} disabled={selectedColumns.length === 0}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

    </div>
  )
}