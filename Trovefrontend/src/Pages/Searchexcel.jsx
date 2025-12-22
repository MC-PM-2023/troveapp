//corrected code
// import analyticslogo from '../assets/datasolve.png';

// import { useEffect, useState,useRef } from 'react';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { useNavigate } from 'react-router-dom';
// import trovelogo from '../assets/Trovelogo.gif'
// import avataricon from '../assets/avataricon.png'
// import appsicon from '../assets/appsicon.png'
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';



// export default function Searchexcel() {
//   const [tables, setTables] = useState([]);
//   const [selectedtable, setSelectedtable] = useState(null);
//   const [isTableselected, setIstableselected] = useState(false);
//   const [inputFields, setInputFields] = useState([{ dropdownValue: "", textBoxValue: '' }]);
//   const [columns, setColumns] = useState([]);
//   const [searchkeyword, setSearchkeyword] = useState("");
//   const [searchresults, setSearchResults] = useState([]);
//   const [selectedcolumn, setselectedcolumn] = useState("");
//   const [inputvalue, setInputvalue] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const[count,setCount]=useState(0)
//   const[search,setSearch]=useState("")
//   const[sortorder,setSortOrder]=useState("asc")
//   const [sortColumn, setSortColumn] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedColumns, setSelectedColumns] = useState([]);
//     const[showDropdown,setShowDropdown]=useState(false)
// const [showList, setShowList] = useState(false);
// const[open ,setOpen]=useState(false)

//   const apiURL =import.meta.env.VITE_BACKENDAPIURL;
// // console.log("Apiurl:",apiURL) 

//   const user = JSON.parse(localStorage.getItem('user'));

//   const navigate=useNavigate();




// const dropdownItemStyle = {
//   padding: '8px 12px',
//   cursor: 'pointer',
//   borderRadius: '4px',
//   transition: 'background-color 0.2s',
//   fontSize: '14px'
// };

//   const tableNameMap = {
// mcdb_dr_db: "Desk Research",
// mcdb_st_db: "String",
// mcdb_nc_db: "Name Collection",
// mcdb_org_db: "Organization",
// mcdb_ol_db: "Overview",
// mcdb_kt_db: "KeyTerm",
//   // Add all your custom mappings here
// };

// // Add hover effect via inline styles
// dropdownItemStyle[':hover'] = {
//   backgroundColor: '#f2f2f2'
// };


//  const handleimageclick=()=>{
//     setShowDropdown(prev=>!prev)
//   }
//   useEffect(() => {
//     // Disable copy, cut, and paste actions
//     const disableActions = (e) => {
//       e.preventDefault(); 

//     };

//     // Disable right-click context menu
//     const disableRightClick = (e) => {
//       e.preventDefault();

//     };

//     // Disable text selection
//     const disableTextSelection = () => {
//       document.body.style.userSelect = "none"; // Disable text selection globally
//     };

//     // Add event listeners to disable actions
//     document.addEventListener("copy", disableActions);
//     document.addEventListener("cut", disableActions);
//     document.addEventListener("paste", disableActions);
//     document.addEventListener("contextmenu", disableRightClick);

//     // Disable text selection on body
//     disableTextSelection();

//     // Cleanup the event listeners on component unmount
//     return () => {
//       document.removeEventListener("copy", disableActions);
//       document.removeEventListener("cut", disableActions);
//       document.removeEventListener("paste", disableActions);
//       document.removeEventListener("contextmenu", disableRightClick);
//     };
//   }, []);


//   useEffect(() => {
//     axios.get(`${apiURL}gettables/gettablesbutton`)
//       .then((response) => {
//         setTables(response.data.tables);
//       }).catch((error) => {
//         console.error("There was an error fetching tables", error);
//       });
//   }, []);

//   const fetchtablecolumns = async (table) => {
//     try {
//       const response = await axios.post(`${apiURL}gettables/getcolumns`, { table });
//       setColumns(response.data.tablecolumns);
//     } catch (error) {
//       console.error("Error fetching columns:", error.response?.data || error.message);
//     }
//   };

//   const handleInputChange = (index, field, value, event = null) => {
//     const updatedFields = [...inputFields];
//     // console.log("Field being updated:", field);

//     if (field === "textBoxValue" && event) {
//       const file = event.target.files[0]; // Get the file object
//       // console.log("File selected:", file);
//       updatedFields[index][field] = file; // Store the file object
//     } else {
//       // console.log("Value entered:", value);
//       updatedFields[index][field] = value;
//     }

//     setInputFields(updatedFields);

//     if (field === "dropdownValue") {
//       setselectedcolumn(value);
//       // console.log("Selected column updated to:", value);
//     }
//   };



//   const fetchkeyworddetails = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('table', selectedtable);

//       let fileUploaded = false;

//       inputFields.forEach((field, index) => {
//         // console.log("Processing field:", field);
//         if (field.textBoxValue instanceof File) {
//           formData.append('file', field.textBoxValue); // Add the file to FormData
//           fileUploaded = true;

//         }
//       });

//       if (!fileUploaded) {
//         throw new Error('Please upload a valid Excel file.');
//       }

//       const response = await axios.post(`${apiURL}searchexcel/searchwithexcel`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });


//       const results=response.data.results||[]
//       const rowCount=results.length;

//       setSearchResults(results);
//       setCount(rowCount)
//       //  console.log("Response is:",response.data.results)
//       setResults(results); // Enable download button

//       const user=JSON.parse(localStorage.getItem('user'))


//       if(user?.id && user?.username){
//         await axios.post(`${apiURL}log/useractivity`,{
//           user_id:user.id,
//           username:user.username,
//           action:"process",
//           action_type:"process",
//           searchText:inputFields.map(f=>f.value).join(','),
//           tableName:selectedtable,
//           rowCount:rowCount,
//           message:`user searched using excel in ${selectedtable} and got ${rowCount} results.`

//         })




//       }
//       else{
//         console.warn("user not found in localstorage for logging ")
//       }

//     } catch (error) {
//       console.error('Error in fetching details:', error.response?.data || error.message);
//     }
//     finally {
//       setLoading(false);
//     }
//   };







//   useEffect(() => {
//     if (searchkeyword) {
//       fetchkeyworddetails(searchkeyword);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchkeyword]);

//   useEffect(() => {
//     if (selectedcolumn && inputvalue) {
//       setSearchkeyword(`${selectedcolumn}: ${inputvalue}`);
//     }
//   }, [selectedcolumn, inputvalue]);



//   const handleselectedtable = (tablename) => {
//     if (selectedtable === tablename) {
//       setSelectedtable(null);
//       setIstableselected(false);
//       setColumns([]);
//       setSearchResults([]);
//       setResults("")
//       setSearch("")
//       setCount("0")
//     } else {
//       setSelectedtable(tablename);
//       setIstableselected(true);
//       fetchtablecolumns(tablename);
//       setResults(null);
//     }
//   };

//   // const downloadexcel = () => {
//   //   console.log("Results to be exported:", results);
//   //   if (!results || !Array.isArray(results) || results.length === 0) {
//   //     console.error("Invalid results format or no results available.");
//   //     return; // Prevent download if results are invalid
//   //   }
//   //   const workbook = XLSX.utils.book_new();
//   //   const worksheet = XLSX.utils.json_to_sheet(results);
//   //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
//   //   XLSX.writeFile(workbook, 'Results.xlsx');
//   // };

//   //correct select columns to export code
//   const downloadexcel =async () => {

//     const filteredData = results.map(row => {
//       const filteredRow = {};
//       selectedColumns.forEach(col => {
//         filteredRow[col] = row[col];
//       });
//       return filteredRow;
//     });

//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Results');
//     XLSX.writeFile(workbook, 'Results.xlsx');

//     setShowModal(false); // Close the modal after download


// try{
// const user=JSON.parse(localStorage.getItem('user'))

// if(user?.id && user?.username){
//   await axios.post(`${apiURL}log/useractivity`,{
//     user_id:user.id,
//     username:user.username,
//     action:"download",
//     searchText:selectedColumns.join(','),
//     tableName:selectedtable,
//     rowCount:filteredData.length
//   })
// }
// else{
//   console.warn("user not found in localstorage for download logging")
// }
// } 
// catch(error){
// console.log("Error logging download acivity:",error.message)
// }

//   };



//     //     try{
//     //   const user=JSON.parse(localStorage.getItem('user'))
//     //   if(user?.id && user?.username){
//     //     await axios.post('http://localhost:5000/log/useractivity',{
//     //       user_id:user.id,
//     //       username:user.username,
//     //       action:"download", //error part
//     //       searchText:selectedColumns.join(','),
//     //       tableName:selectedtable
//     //     })
//     //   }
//     //   else{
//     //     console.warn("User not found in localstorage for download logging")
//     //   }
//     // }

//   const handleSort = (column) => {
//     // Toggle sorting order
//     const newOrder = sortColumn === column && sortorder === "asc" ? "desc" : "asc";
//     setSortColumn(column);
//     setSortOrder(newOrder);

//     // Sort the results array
//     const sortedResults = [...results].sort((a, b) => {
//       if (a[column] < b[column]) return newOrder === "asc" ? -1 : 1;
//       if (a[column] > b[column]) return newOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     setResults(sortedResults); // Update the state with sorted data
//   };

//   const formatDateIfValid = (value) => {
//     if (typeof value === "string" && !isNaN(Date.parse(value))) {
//       const dateObj = new Date(value);
//       return dateObj.toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       });

//     }
//     return value;
//   };

//   const highlightSearch = (text) => {
//     if (!search || typeof text !== "string") return text;
//     const regex = new RegExp(`(${search})`, "gi");
//     return text.replace(regex, (match) => `<span style="background-color: yellow; font-weight: bold;">${match}</span>`);
//   };

//   const handleselectchange=(value)=>{

// if(value==="textinput"){
//   navigate('/textinputsearch');
// }
// else if(value==="workflow"){
//    window.open("http://34.47.164.153:6060/", "_blank");
// }
// else if (value==="Logfile"){
//   navigate('/logfile')
// }
// else{
//  window.open("http://34.47.164.153:5050/", "_blank");
// }
//   }




//   const toggleList = () => setShowList(prev => !prev);

// const appsIconRef = useRef(null);

//   useEffect(() => {
//     if (appsIconRef.current) {
//       // Initialize Bootstrap Tooltip on the icon
//       const tooltip = new bootstrap.Tooltip(appsIconRef.current, {
//         title: 'Associated Apps',
//         placement:"bottom",
//         trigger: 'hover ',
//       });

//       // Cleanup on unmount
//       return () => {
//         tooltip.dispose();
//       };
//     }
//   }, []);



//     const handleLogout=async()=>{
//     const token=localStorage.removeItem("auth_token");
//     const user=localStorage.removeItem("user")
//     const email=localStorage.removeItem('email')
//     navigate("/login")

// }

//   return (
//     <div className='box'>
// {/* <header className="header bg-white shadow-sm">
//   <div className="container-fluid">
//     <div className="row align-items-center w-100">
//       <div className="col-auto">
//         <img src={analyticslogo} alt="Logo" style={{ height: 50 }} className="logo" />
//       </div>
//       <div className="col-auto">
//                     <img src={trovelogo} alt="Logo" style={{ height: 50 }} className="logo" />
//                   </div>
//       <div className="col-auto ms-auto">
//   <select
//     className="form-select"
//     style={{ width: '200px' }}
//     onChange={(e) => {
//       const value = e.target.value;
//       if (value === "textinput") {
//         navigate('/');
//       } else if (value === "workflow") {
//         window.open("http://34.47.164.153:6060/", "_blank");
//       } else if (value === "chatsql") {
//         window.open("http://34.100.216.188:5050/", "_blank");
//       }
//     }}
//     defaultValue=""
//   >
//     <option value="" disabled>Select Project</option>
//     <option value="textinput">Text Input Search</option>
//     <option value="workflow">Workflows</option>
//     <option value="chatsql">Chat With SQL</option>
//   </select>
// </div>
//     </div>
//   </div>

// </header> */}

//  <header className="header bg-white shadow-sm">
//   <div className="container-fluid">
//     <div className="d-flex justify-content-between align-items-center">

//       {/* Left: Analytics Logo */}
//       <div>
//         <img src={analyticslogo} alt="Analytics Logo" style={{ height: 40 }} className="logo" />
//       </div>

//       {/* Right: Apps Icon + Trove Logo */}
//       <div className="d-flex align-items-center gap-3 position-relative">



//         {/* Dropdown */}
//         {showDropdown && (
//           <div style={{
//             position: 'absolute',
//             top: '50px',
//             backgroundColor: 'white',
//             border: '1px solid #ddd',
//             borderRadius: '8px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             width: '220px',
//             zIndex: 1000
//           }}>
//             <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
//               <li style={dropdownItemStyle} onClick={() => handleselectchange('textinput')}>Text Input Search</li>
//               <li style={dropdownItemStyle} onClick={() => handleselectchange('workflow')}>Workflows</li>
//               <li style={dropdownItemStyle} onClick={() => handleselectchange('chatsql')}>Chat With SQL</li>
//               <li style={dropdownItemStyle} onClick={()=>handleselectchange('Logfile')}>Activity Logs</li>
//             </ul>
//           </div>
//         )}


//         {/* Trove Logo */}
//         {/* <img src={trovelogo} alt="Trove Logo" style={{ height: 40 }} className="logo" /> */}

//             <div className="col-auto d-flex align-items-center">


//               {/* <img src={avataricon} alt="avataticon" style={{ height: 30 }} className="logo" /> */}
//                {/* <p className="mb-0 fw-medium me-2">{user.username}</p> */}


// <div className="dropdown" style={{ position: "relative" }}>
//   <img
//     src={user?.profilelink || avataricon}
//     alt="Profile"
//     className="rounded-circle border border-2 shadow-sm me-2"
//     height={45}
//     width={45}
//    onClick={()=>setOpen(!open)}
//     style={{ objectFit: "cover", cursor: "pointer" }}
//   />


// {open &&
//    <ul
//       className="dropdown-menu dropdown-menu-end show"
//       style={{ position: "absolute", top: "110%", right: 0 }}
//     >
//       <li className="dropdown-item-text"><small>{user?.email}</small></li>
//       <li><hr className="dropdown-divider" /></li>
//       <li>
//         <button className="dropdown-item" onClick={handleLogout} >
//           <i className="bi bi-box-arrow-right me-2"></i> Logout
//         </button>
//       </li>
//     </ul>
//   } 
// </div>

//                     <img src={trovelogo} alt="Trove Logo" style={{ height: 40 }} className="logo" />
//             </div>

//          {/* Apps Icon */}
//         <img
//           src={appsicon}
//           alt="Apps Icon"
//           ref={appsIconRef}
//           className='appsicon'
//           style={{ height: 30, width: 30, cursor: 'pointer' }}
//           onClick={handleimageclick}
//         />
//       </div>


//     </div>
//   </div>
// </header>



//       <aside className='sidebar'>
//         {/* <div className='databasetables '>
//           <h6>Select the Database Table</h6>
//         </div>
//         <div className="d-flex flex-wrap gap-2">
//         {
//           tables.length > 0 ? (
//             tables.map((table, index) => (
//               // <button key={index} className={selectedtable === table ? 'btn btn-dark  ' : "btn btn-primary  "} type='button' onClick={() => handleselectedtable(table)} disabled={isTableselected && selectedtable !== table}>
//               //   {table}
//               // </button>
//               <button key={index} className={selectedtable === table ? 'btn btn-dark  btn-sm' : "btn btn-primary btn-sm "} type='button' onClick={() => handleselectedtable(table)} >
//               {table}
//             </button>
//             ))
//           ) : (
//             <p>Loading Tables ...</p>
//           )
//         }
//         </div> */}

//         <div className="databasetables">
//       <div className="card shadow">
//         <div
//           className="card-header bg-secondary text-white text-center"
//           style={{ cursor: "pointer" }}
//           onClick={toggleList}
//         >
//          <h6 className="mb-0">Trove<span><i className="bi bi-database"></i></span></h6>
//         </div>

//   {showList && (
//   <div className="card-body">
//     {tables.length > 0 ? (
//       <select
//         className="form-select"
//         value={selectedtable??""}
//         onChange={e => handleselectedtable(e.target.value)}
//       >
//         <option value="" disabled >Select a Database</option>
//         {tables.map((table, index) => (
//           <option key={index} value={table}>
//             {tableNameMap[table] || table}
//           </option>
//         ))}
//       </select>
//     ) : (
//       <p className="text-center">Loading Tables...</p>
//     )}
//   </div>
// )}


//       </div>
//     </div>


//         <div className="keywordsearch mt-3 p-2">
//           {/* <h5>Selected Database Columns</h5> */}
//           {columns && columns.length > 0 ? (
//             inputFields.map((input, index) => (
//               <div className="col mb-2 align-items-center" key={index}>

//    <div className="d-flex align-items-center mt-4 gap-3 flex-wrap">
//   <div className="flex-grow-1">
//     <input
//       type="file"
//       className={`form-control ${input.fileError ? "border-danger" : ""}`}
//       name="file"
//       accept=".xls, .xlsx"
//       onChange={(e) => {
//         const file = e.target.files[0];
//         if (file) {
//           const fileType = file.name.split('.').pop();
//           if (fileType !== 'xls' && fileType !== 'xlsx') {
//             handleInputChange(index, 'fileError', true);
//           } else {
//             handleInputChange(index, 'textBoxValue', file, e);
//             handleInputChange(index, 'fileError', false);
//           }
//         }
//       }}
//     />
//     {input.fileError && (
//       <small className="text-danger">Please upload a valid Excel file (.xls or .xlsx)</small>
//     )}
//   </div>

//   <div>
//     <button 
//       type="button" 
//       className="btn btn-dark" 
//       onClick={fetchkeyworddetails} 
//       disabled={loading}
//     >
//       Search
//     </button>
//   </div>
// </div>

//               </div>
//             ))
//           ) : (
//             <p className='text-center'>.....</p>
//           )}
//         </div>



//       </aside>

//       <main>
//         <div className="d-flex mb-4 flex-wrap align-items-center justify-content-between">
//           {/* <h4 id="icons" className="mb-0">{selectedtable ? `${selectedtable} Table Connected Successfully !` : "Database Table Not Connected"}</h4> */}
//           {/* <h5 className='mt-1'>Results: {count} Rows</h5> */}

//           {/* previous code */}
//           {Array.isArray(results) && results.length === 0 ? (
//       <h6 className="mb-0"></h6>
//     ) : (
//       <h6 className="mt-1">Results: {count} Rows</h6>
//     )}






//           <form className="subnav-search d-flex flex-nowrap ms-auto">
//           <input className="form me-2 border" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} style={{outline:"none",border:"none"}}/>
//             <button type="button" className="btn btn-dark btn-outline bg-gradient downloadbutton" onClick={()=>setShowModal(true)} disabled={!results || results.length === 0}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 20 20">
//                 <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.5 16 9.318c0-1.813-1.078-3.286-2.436-4.005a5.443 5.443 0 0 0-1.465-2.384A5.53 5.53 0 0 0 8 2zM5 9h2v5h3V9h2l-4 4-4-4z"></path>
//               </svg> Export
//             </button>
//           </form>
//         </div>

//         <div className="mt-4" id="tableContainer">
//   {loading ? (
//     <div className="text-center">
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </div>
//   ) : (

// <div className="container" style={{ maxHeight: "500px", overflowY: "auto" }}>
// {/* <div className="tableWrapper" style={{ overflow: "auto", maxHeight: "500px" }}> */}
// <div className="tableWrapper" >
//  {Array.isArray(results) && results.length === 0 ? (
//   <div className="text-center my-5">


//   </div>
// ) : (
//   Array.isArray(results) && results.length > 0 && (
//     <table className="flTable">
//       <thead style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
//         <tr>
//           {Object.keys(results[0]).map((columnName, index) => (
//             <th key={index} style={{ width: `${100 / Object.keys(results[0]).length}%`, position: "relative" }}>
//               <span className="">
//                 {columnName}
//                 <span className="tooltip-text">{columnName}</span>
//               </span>
//               <button
//                 className="btn btn-sm btn-link ms-1"
//                 onClick={() => handleSort(columnName)}
//               >
//                 {sortColumn === columnName && sortorder === "asc" ? "🔼" : "🔽"}
//               </button>
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody className='tablebody text-white'>
//   {results
//     .filter((row) =>
//       Object.values(row).some(
//         (cellValue) =>
//           cellValue &&
//           cellValue.toString().toLowerCase().includes(search.toLowerCase())
//       )
//     )
//     .slice(0, 100)
//     .map((row, rowIndex) => (
//       <tr key={rowIndex}>
//         {Object.values(row).map((cellValue, cellIndex) => {
//           const formattedValue = formatDateIfValid(cellValue);
//           const highlighted = highlightSearch(formattedValue ? formattedValue.toString() : "");


//           return (
//             <td key={cellIndex} dangerouslySetInnerHTML={{ __html: highlighted }} />
//           );
//         })}
//       </tr>
//     ))}
// </tbody>

//     </table>
//   )
// )}

// </div>
// </div>

//   )}
// </div>

// {showModal && (
//   <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
//     <div className="modal-dialog modal-lg">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h5 className="modal-title">Select Columns to Export</h5>
//           <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//         </div>
//         <div className="modal-body">
//   <div className="d-flex justify-content-end mb-2">

//   </div>

//   {columns.map((column, index) => (
//     <div className="form-check" key={index}>
//       <input
//         className="form-check-input"
//         type="checkbox"
//         value={column}
//         id={`column-${index}`}
//         checked={selectedColumns.includes(column)}
//         onChange={(e) => {
//           const col = e.target.value;
//           setSelectedColumns(prev =>
//             e.target.checked ? [...prev, col] : prev.filter(c => c !== col)
//           );
//         }}
//       />
//       <label className="form-check-label" htmlFor={`column-${index}`}>
//         {column}
//       </label>
//     </div>
//   ))}
// </div>

//         <div className="modal-footer">
//           <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Cancel</button>
//           <button
//       className="btn btn-outline-primary"
//       onClick={() => {
//         if (selectedColumns.length === columns.length) {
//           setSelectedColumns([]); // Unselect all
//         } else {
//           setSelectedColumns(columns); // Select all
//         }
//       }}
//     >
//       {selectedColumns.length === columns.length ? "Unselect All" : "Select All"}
//     </button>
//           <button type="button" className="btn btn-outline-success" onClick={() => downloadexcel()}  disabled={selectedColumns.length===0}>Download</button>

//         </div>
//       </div>
//     </div>
//   </div>
// )} 
//  <p className="text-center mt-2">Copyrights &copy; Datasolve Analytics Pvt Ltd</p> 
//       </main>


//     </div>
//   );
// }


//corrected
// import { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import analyticslogo from '../assets/datasolve.png';
// import trovelogo from '../assets/Trovelogo.gif';
// import avataricon from '../assets/avataricon.png';
// import appsicon from '../assets/appsicon.png';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// export default function Searchexcel() {
//   const [tables, setTables] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [file, setFile] = useState(null);
//   const [previewResults, setPreviewResults] = useState([]);
//   const [fullResults, setFullResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [matchType, setMatchType] = useState("exact"); // For fetch full
//   const [showFullData, setShowFullData] = useState(false);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [exactCount, setExactCount] = useState(0);
//   const [partialCount, setPartialCount] = useState(0);
//   const [selectedPreviewRows, setSelectedPreviewRows] = useState(new Set());

//   const apiURL = import.meta.env.VITE_BACKENDAPIURL;
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user')) || {};
//   const appsIconRef = useRef(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     axios.get(`${apiURL}gettables/gettablesbutton`)
//       .then(res => setTables(res.data.tables))
//       .catch(err => console.error(err));
//   }, []);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (!uploadedFile) return;
//     const ext = uploadedFile.name.split('.').pop().toLowerCase();
//     if (!['xls', 'xlsx'].includes(ext)) {
//       alert("Please upload a valid Excel file (.xls or .xlsx)");
//       return;
//     }
//     setFile(uploadedFile);
//   };

//   // Toggle checkbox selection
//   const toggleRowSelection = (index) => {
//     setSelectedPreviewRows(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(index)) newSet.delete(index);
//       else newSet.add(index);
//       return newSet;
//     });
//   };

//   // Step 1: Fetch preview (unique results)
//   const fetchPreview = async () => {
//     if (!selectedTable || !file) return;
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('table', selectedTable);
//       formData.append('file', file);

//       const response = await axios.post(
//         `${apiURL}searchexcel/preview`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       const { data, exactcount, partialcount } = response.data;
//       console.log(response.data)

//       const previewColumns = ['match_status','Project_Code','Geographic_Coverage','Activity_Type','Activity_Link','Activity_Title','Activity_Country','Last_Update_Date'];
//       const filteredPreview = (data || []).map(row => {
//         const newRow = {};
//         previewColumns.forEach(col => newRow[col] = row[col] ?? '');
//         return newRow;
//       });

//       setPreviewResults(filteredPreview);
//       setExactCount(exactcount || 0);
//       setPartialCount(partialcount || 0);
//       setSelectedPreviewRows(new Set());
//       setShowFullData(false);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Fetch full data based on selected rows
//   const fetchFullData = async () => {
//     if (!selectedTable || !file || selectedPreviewRows.size === 0) return;
//     setLoading(true);
//     try {
//       const activities = Array.from(selectedPreviewRows).map(idx => {
//         const r = previewResults[idx];
//         return { Activity_Title: r.Activity_Title, Activity_Type: r.Activity_Type };
//       });

//       const response = await axios.post(`${apiURL}searchexcel/fetchfull`, {
//         table: selectedTable,
//         matchType,
//         activities
//       });

//       setFullResults(response.data.data || []);
//       setShowFullData(true);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Highlight searched keyword
//   const highlightText = (text) => {
//     const stringText = text ? String(text) : '';
//     if (!searchKeyword) return stringText;
//     const regex = new RegExp(`(${searchKeyword})`, 'gi');
//     const parts = stringText.split(regex);
//     return parts.map((part, idx) =>
//       part.toLowerCase() === searchKeyword.toLowerCase() ? (
//         <span key={idx} style={{ backgroundColor: 'yellow' }}>{part}</span>
//       ) : part
//     );
//   };

//   // Export to Excel
//   const handleExport = () => {
//     const resultsToExport = showFullData ? fullResults : previewResults.filter((_, idx) => selectedPreviewRows.has(idx));
//     if (!resultsToExport.length) return;
//     const ws = XLSX.utils.json_to_sheet(resultsToExport);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Results");
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     saveAs(blob, `search_results_${Date.now()}.xlsx`);
//   };

//   const resultsToShow = showFullData ? fullResults : previewResults;
//   const tableHeaders = resultsToShow.length > 0 ? Object.keys(resultsToShow[0]) : [];

//   // Color for match_status
//   const getMatchStatusStyle = (status) => {
//     if (!status) return {};
//     switch (status.toLowerCase()) {
//       case 'exact': return { backgroundColor: '#d4edda' }; // green
//       case 'partial subset': return { backgroundColor: '#fff3cd' }; // yellow
//       case '80% matched': return { backgroundColor: '#ffe0b2' }; // orange
//       case 'no match': return { backgroundColor: '#f8d7da' }; // red
//       default: return {};
//     }
//   };

//   const tablename={
//     mcdb_dr_db:"Desk Research",
//     mcdb_nc_db:"Name Collection",
//     mcdb_nc_db_sample:"NC Sample",
//     mcdb_org_db:"Organization",
//     mcdb_kt_db:"KeyTerm",
//     mcdb_ol_db:"Overview",
//     mcdb_st_db:"String"
//   }



//   return (
//     <>
//       <header className="header bg-light shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
//         <img src={analyticslogo} alt="Logo" style={{ height: 40 }} />
//         <div className="d-flex align-items-center gap-3 position-relative">
//           <img src={appsicon} alt="Apps" ref={appsIconRef} style={{ height: 30, width: 30, cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)} />
//           {showDropdown && <div style={{ position: 'absolute', top: '50px', right: 0, backgroundColor: 'white', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 1000 }}>
//             <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
//               <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => navigate('/textinputsearch')}>Text Input Search</li>
//               <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => window.open("http://34.47.164.153:6060/", "_blank")}>Workflows</li>
//               <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => navigate('/logfile')}>Activity Logs</li>
//               <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => window.open("http://34.47.164.153:5050/", "_blank")}>Chat with SQL</li>
//             </ul>
//           </div>}
//           <div className="dropdown" style={{ position: 'relative' }}>
//             <img src={user?.profilelink || avataricon} alt="Profile" className="rounded-circle border border-2 shadow-sm me-2" height={45} width={45} style={{ objectFit: "cover", cursor: "pointer" }} onClick={() => setOpen(!open)} />
//             {open && <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', top: '110%', right: 0 }}>
//               <li className="dropdown-item-text"><small>{user?.email}</small></li>
//               <li><hr className="dropdown-divider" /></li>
//               <li><button className="dropdown-item" onClick={() => { localStorage.removeItem('user'); }}>Logout</button></li>
//             </ul>}
//           </div>
//           <img src={trovelogo} alt="Trove" style={{ height: 40 }} />
//         </div>
//       </header>

//       <div className="d-flex vh-100 bg-light text-dark">
//         {/* Sidebar */}
//         <aside className="p-4 border-end border-secondary bg-light text-dark" style={{ width: '200px', flexShrink: 0 }}>
//           <select className="form-select mb-3" value={selectedTable || ""} onChange={e => setSelectedTable(e.target.value)}>
//             <option value="" disabled style={{fontSize:11}}>Select Database</option>
//             {tables.map((t, i) => <option key={i} value={t} style={{fontSize:11}}>{tablename[t]}</option>)}
//           </select>

//           <input type="file" accept=".xls,.xlsx" className="form-control mb-3" onChange={handleFileChange} />

//           <button className="btn btn-dark w-100 mb-2" onClick={fetchPreview} disabled={loading || !selectedTable || !file} style={{fontSize:13}}>
//             <i class="bi bi-eye-fill"></i>{ " "}
//             {loading ? "Searching..." : "Preview"}
//           </button>

//           {previewResults.length > 0 && (
//             <>
//               {/* <select className="form-select mb-2" value={matchType} onChange={e => setMatchType(e.target.value)}>
//                 <option value="exact">Exact Match</option>
//                 <option value="partial">Partial Subset</option>
//               </select> */}
//               {/* <button className="btn btn-dark w-100 mb-2" onClick={fetchFullData} disabled={loading || selectedPreviewRows.size === 0} style={{fontSize:13}}>
//                   <i class="bi bi-arrow-repeat "></i>{" "}
//                 {loading ? "Fetching..." : "Fetch Full Data"}

//               </button> */}
//             </>
//           )}

//           {resultsToShow.length > 0 && (
//             <button className="btn btn-dark w-100 mt-2" onClick={handleExport} style={{fontSize:13}}><i class="bi bi-cloud-arrow-down"></i>{" "}Export </button>
//           )}
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow-1 p-3 overflow-auto">
//         <h2 className="fw-bold mb-1">Search Results</h2>
// <p className="text-muted mb-1 ">
//   Manage, review, and re-execute activity data fetching.
// </p>
// <h6 className="text-muted ">
//   Results : {Number(partialCount)+Number(exactCount)}
// </h6>


//     {/* <div className="d-flex align-items-center justify-content-between">
//   <input
//     type="search"
//     className="form-control  mb-2 mt-2 me-2 "
//     placeholder="Search by Project Code, Coverage, Type, Link, Title, or Country."
//     value={searchKeyword}
//     style={{width:"60%"}}
//     onChange={e => setSearchKeyword(e.target.value)}
//   />

//   <button
//     className="btn btn-dark mb-2"
//     onClick={fetchFullData}
//     disabled={loading || selectedPreviewRows.size === 0}
//     style={{ fontSize: 13 }}
//   >
//     <i className="bi bi-arrow-repeat"></i>{" "}
//     {loading ? "Fetching..." : "Fetch Full Data"}
//   </button>
// </div> */}


// <div className="d-flex align-items-center justify-content-between mb-2">





//   <input
//     type="search"
//     className="form-control mb-2 mt-2 me-2 bg-light"
//     placeholder="Search by Project Code, Coverage, Type, Link, Title, or Country."
//     value={searchKeyword}
//     style={{ width: "60%" }}
//     onChange={e => setSearchKeyword(e.target.value)}
//   />

//  {!showFullData && (
//     <button
//       className="btn btn-dark mb-2"
//       onClick={fetchFullData}
//       disabled={loading || selectedPreviewRows.size === 0}
//       style={{ fontSize: 13 }}
//     >
//       <i className="bi bi-arrow-repeat"></i>{" "}
//       {loading ? "Fetching..." : "Fetch Full Data"}
//     </button>
//   )}




//    {showFullData && (
//     <button
//       className="btn btn-dark mb-2"
//       onClick={() => setShowFullData(false)}
//       style={{ fontSize: 13 }}
//     >
//       <i className="bi bi-arrow-left"></i> Back to Preview
//     </button>
//   )}

// </div>




//           <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//             {resultsToShow.length > 0 ? (
//               <table className="table table-striped table-bordered">
//                 <thead className="sticky-top bg-white">
//                   <tr>
//                     {!showFullData && <th>
//                       <input
//                         type="checkbox"

//                         checked={selectedPreviewRows.size === previewResults.length && previewResults.length > 0}
//                          style={{cursor:"pointer"}}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             setSelectedPreviewRows(new Set(previewResults.map((_, idx) => idx)));
//                           } else {
//                             setSelectedPreviewRows(new Set());
//                           }
//                         }}
//                       />
//                     </th>}
//                     {tableHeaders.map((h, i) => <th key={i}>{h}</th>)}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {resultsToShow.map((row, rIdx) => (
//                     <tr key={rIdx} style={getMatchStatusStyle(row.match_status)}>
//                       {!showFullData && <td>
//                         <input
//                           type="checkbox"
//                            style={{cursor:"pointer"}}
//                           checked={selectedPreviewRows.has(rIdx)}
//                           onChange={() => toggleRowSelection(rIdx)}
//                         />
//                       </td>}
//                       {tableHeaders.map((col, cIdx) => (
//                         // <td key={cIdx}>{highlightText(row[col])}</td>
//                         <td key={cIdx}>
//                           {col ==="Activity_Link" && row[col] ?(
//                             <a href={row[col]} target='_blank' rel='noopener noreferrer'><i class="bi bi-box-arrow-up-right text-dark"></i></a>):(
// highlightText(row[col])

//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : <p className="text-muted">No results to display.</p>}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }



import { useEffect, useState, useRef, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import analyticslogo from '../assets/datasolve.png';
import trovelogo from '../assets/Trovelogo.gif';
import avataricon from '../assets/avataricon.png';
import appsicon from '../assets/appsicon.png';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function Searchexcel() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [file, setFile] = useState(null);
  const [previewResults, setPreviewResults] = useState([]);
  const [fullResults, setFullResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchType, setMatchType] = useState("exact");
  const [showFullData, setShowFullData] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [titleExactCount, setTitleExactCount] = useState(0);
  const [linkExactCount, setLinkExactCount] = useState(0);
  const [titlePartialCount, setTitlePartialCount] = useState(0);
  const [linkPartialCount, setLinkPartialCount] = useState(0);
  const [noMatchCount, setNoMatchCount] = useState(0);
  const [selectedPreviewRows, setSelectedPreviewRows] = useState(new Set());
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [uniqueValues, setUniqueValues] = useState([]);
  const [selectedFilterValues, setSelectedFilterValues] = useState({});
  const [projectCodeAsc, setProjectCodeAsc] = useState(true); // true = ascending, false = descending
  const [isOn, setIsOn] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
const [showPreviewTable, setShowPreviewTable] = useState(false); 
// true when preview results should be displayed in table

const [backendCounts, setBackendCounts] = useState({}); 


const [showFullDataTable, setShowFullDataTable] = useState(false);






  const handleToggle = () => {
  setIsOn(!isOn); // for UI toggle
  setProjectCodeAsc(prev => !prev); // toggle sorting order
};


  const apiURL = import.meta.env.VITE_BACKENDAPIURL;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const appsIconRef = useRef(null);
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const tablename = {
    mcdb_dr_db: "Desk Research",
    mcdb_nc_db: "Name Collection",
    mcdb_nc_db_sample: "NC Sample",
    mcdb_org_db: "Organization",
    mcdb_kt_db: "KeyTerm",
    mcdb_ol_db: "Overview",
    mcdb_st_db: "String"
  }

  const matchedByOrder = [
    'Activity Title Exact',
    'Activity Title Partial',
    'Activity Link Exact',
    'Activity Link Partial',
    'No Match'
  ];
  const colorSelection={
     'Activity Title Exact':"#ff9933",
    'Activity Title Partial':"#1a8cff",
    'Activity Link Exact':"#993366",
    'Activity Link Partial':"#009933",
    'No Match':"#cc00cc"
  }



  useEffect(() => {
    axios.get(`${apiURL}gettables/gettablesbutton`)
      .then(res => setTables(res.data.tables))
      .catch(err => console.error(err));
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    const ext = uploadedFile.name.split('.').pop().toLowerCase();
    if (!['xls', 'xlsx'].includes(ext)) {
      alert("Please upload a valid Excel file (.xls or .xlsx)");
      return;
    }
    setFile(uploadedFile);
  };




  const toggleRowSelection = (rowId) => {
  setSelectedPreviewRows((prev) => {
    const updatedSelection = new Set(prev);
    if (updatedSelection.has(rowId)) {
      updatedSelection.delete(rowId); // Unselect if already selected
    } else {
      updatedSelection.add(rowId); // Select if not selected
    }
    return updatedSelection;
  });
};

  // const fetchPreview = async () => {
  //   if (!selectedTable || !file) return;
  //   setLoading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('table', selectedTable);
  //     formData.append('file', file);

  //     const response = await axios.post(
  //       `${apiURL}searchexcel/preview`,
  //       formData,
  //       { headers: { 'Content-Type': 'multipart/form-data' } }
  //     );
      

  //     const counts = response.data.counts || {};

  //     setTotalCount(counts.total_excel_rows || 0);
  //     setTitleExactCount(counts.title_exact || 0);
  //     setLinkExactCount(counts.link_exact || 0);
  //     setTitlePartialCount(counts.title_partial || 0);
  //     setLinkPartialCount(counts.link_partial || 0);
  //     setNoMatchCount(counts.noMatch || 0);

  //     // Extract preview data
  //     const data = response.data.data || [];
  //     const previewColumns = ['matched_by', 'Project_Code', 'Geographic_Coverage', 'Activity_Type', 'Activity_Link', 'Activity_Title', 'Activity_Country', 'Last_Update_Date']; 
  //     const filteredPreview = data.map(row => {
  //       const newRow = {};
  //       previewColumns.forEach(col => newRow[col] = row[col] ?? '');
  //       return newRow;
  //     });

  //     setPreviewResults(filteredPreview);
  //     setShowPreviewTable(true);
  //     setSelectedPreviewRows(new Set());
  //     setShowFullData(false);
  //     setFilterColumn(null);
  //     setFilterValue(null);
  //     setUniqueValues([]);

  //   } catch (err) {
  //     console.error(err.response?.data || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//last corrected code
const fetchPreview = async () => {
  if (!selectedTable || !file) return;
  setLoading(true);
  try {
    const formData = new FormData();
    formData.append('table', selectedTable);
    formData.append('file', file);

    const response = await axios.post(
      `${apiURL}searchexcel/preview`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    const counts = response.data.counts || {};

    setTotalCount(counts.total_excel_rows || 0);
    setTitleExactCount(counts.title_exact || 0);
    setLinkExactCount(counts.link_exact || 0);
    setTitlePartialCount(counts.title_partial || 0);
    setLinkPartialCount(counts.link_partial || 0);
    setNoMatchCount(counts.noMatch || 0);

    // Extract preview data
    const data = response.data.data || [];
    const previewColumns = [
      'matched_by',
      'Project_Code',
      'Geographic_Coverage',
      'Activity_Type',
      'Activity_Link',
      'Activity_Title',
      'Activity_Country',
      'Last_Update_Date'
    ]; 

    // Keep only unique Project_Code + Activity_Type + Activity_Title
    const seen = new Set();
    const filteredPreview = data
      .filter(row => {
        const key = `${row.Project_Code}||${row.Activity_Type}||${row.Activity_Title} || ${row.Activity_Link} || ${row.Geographic_Coverage} || ${row.Activity_Country} || ${row.Last_Update_Date}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(row => {
        const newRow = {};
        previewColumns.forEach(col => newRow[col] = row[col] ?? '');
        return newRow;
      });

    setPreviewResults(filteredPreview);
    setShowPreviewTable(true);
    setSelectedPreviewRows(new Set());
    setShowFullData(false);
    setFilterColumn(null);
    setFilterValue(null);
    setUniqueValues([]);

  } catch (err) {
    console.error(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};




const fullDataColumns = [
  "Project_Code",
  "Therapeutic_Area",
  "Project_Type",
  "Geographic_Coverage",
  "Activity_Type",
  "Activity_Title",
  "Activity_Country",
  "Last_Update_Date"
];




// const fetchFullData = async () => {
//   if (!selectedTable || !file || selectedPreviewRows.size === 0) return;

//   setLoading(true);
//   try {
//     const activities = previewResults
//       .filter(row => selectedPreviewRows.has(getRowId(row)))
//       .map(r => ({
//         Activity_Title: r.Activity_Title,
//         Project_Code: r.Project_Code
//       }));

//     const response = await axios.post(
//       `${apiURL}searchexcel/fetchfull`,
//       { table: selectedTable, activities }
//     );
//     console.log(response.data)

//     // Filter to only the 8 columns
//     const data = (response.data.data || []).map(row => {
//       const filteredRow = {};
//       fullDataColumns.forEach(col => filteredRow[col] = row[col] || "");
//       return filteredRow;
//     });

//     setFullResults(data);
//     setShowFullData(true);
//     setFilterColumn(null);
//     setFilterValue(null);
//     setUniqueValues([]);

//   } catch (err) {
//     console.error(err.response?.data || err.message);
//   } finally {
//     setLoading(false);
//   }
// };


const fetchFullData = async () => {
  if (!selectedTable || !file || selectedPreviewRows.size === 0) return;

  setLoading(true);
  try {
    // Only send matched preview rows
    const activities = previewResults
      .filter(row => selectedPreviewRows.has(getRowId(row)) && row.matched_by && row.matched_by !== "No Match")
      .map(r => ({
        Activity_Title: r.Activity_Title,
        Project_Code: r.Project_Code
      }));

    if (activities.length === 0) {
      console.warn("No matched activities selected to fetch.");
      setFullResults([]);
      setBackendCounts({ total_output_rows: 0 });
      return;
    }

    const response = await axios.post(
      `${apiURL}searchexcel/fetchfull`,
      { table: selectedTable, activities }
    );

    console.log("Backend Response:", response.data);

    const data = (response.data.data || []).map(row => {
      const filteredRow = {};
      fullDataColumns.forEach(col => filteredRow[col] = row[col] ?? "");
      return filteredRow;
    });

    setFullResults(data);

    // ✅ Set counts from backend response
    setBackendCounts(response.data.count || { total_output_rows: data.length });

    setShowFullData(true);
    setFilterColumn(null);
    setFilterValue(null);
    setUniqueValues([]);

  } catch (err) {
    console.error(err.response?.data || err.message);
    setFullResults([]);
    setBackendCounts({ total_output_rows: 0 });
  } finally {
    setLoading(false);
  }
};

// Highlight searched keyword

  const highlightText = (text) => {
    const stringText = text ? String(text) : '';
    if (!searchKeyword) return stringText;
    const regex = new RegExp(`(${searchKeyword})`, 'gi');
    const parts = stringText.split(regex);
    return parts.map((part, idx) =>
      part.toLowerCase() === searchKeyword.toLowerCase() ? (
        <span key={idx} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : part
    );
  };

  // Export to Excel

  const handleExport = () => {
    // const resultsToExport = showFullData ? fullResults : previewResults.filter((_, idx) => selectedPreviewRows.has(idx));
     const resultsToExport = showFullData ? fullResults : previewResults.filter(row=> selectedPreviewRows.has(getRowId(row)));
     
    if (!resultsToExport.length) return;
    const ws = XLSX.utils.json_to_sheet(resultsToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `search_results_${Date.now()}.xlsx`);
  };

  const resultsToShow = showFullData ? fullResults : previewResults;
  const tableHeaders = resultsToShow.length > 0 ? Object.keys(resultsToShow[0]) : [];

  // Color for match_status
  const getMatchStatusStyle = (status) => {
    if (!status) return {};
    switch (status.toLowerCase()) {
      case 'exact': return { backgroundColor: '#d4edda' };
      case 'partial subset': return { backgroundColor: '#fff3cd' };
      case '80% matched': return { backgroundColor: '#ffe0b2' };
      case 'no match': return { backgroundColor: '#f8d7da' };
      default: return {};
    }
  };
;

// Apply column filters to results

const filteredRows = useMemo(() => {
  return resultsToShow.filter(row => {
    return Object.entries(selectedFilterValues).every(([col, vals]) => {
      if (!vals || vals.length === 0) return true; // no filter applied
      const cellValue = row[col] ?? '';
      return vals.some(v => String(cellValue).trim().toLowerCase() === String(v).trim().toLowerCase());
    });
  });
}, [resultsToShow, selectedFilterValues]);


// Handle header click for filtering

const handleHeaderClick = (col) => {
  if (filterColumn === col) {
    // toggle off
    setFilterColumn(null);
    setUniqueValues([]);
  } else {
    setFilterColumn(col);

    const values = resultsToShow
      .map(row => row[col])
      .filter(v => v !== null && v !== undefined && v !== '')
      .map(v => String(v).trim());

    setUniqueValues([...new Set(values)]);
  }
};

// Generate unique row ID based on Activity_Title and Activity_Type

  const getRowId = (row) => {
    return `${row.Activity_Title}-${row.Activity_Type}`;
  };


  // Auto-select all preview rows when previewResults change
  useEffect(() => {
    if (previewResults.length > 0) {
      const allRowIds = previewResults.map(row => getRowId(row));
      setSelectedPreviewRows(new Set(allRowIds));
    }
  }, [previewResults]);


//corrected sorted rows with project code sorting
// const sortedRows = useMemo(() => {
//   let rows = [...filteredRows];

//   // Sort by Project_Code if toggle is on
//   rows.sort((a, b) => {
//     if (!a.Project_Code) return 1;
//     if (!b.Project_Code) return -1;

//     if (projectCodeAsc) {
//       return String(a.Project_Code).localeCompare(String(b.Project_Code));
//     } else {
//       return String(b.Project_Code).localeCompare(String(a.Project_Code));
//     }
//   });

//   // Existing matched_by sorting
//   rows = rows.sort((a, b) => {
//     const specialCases = [
//       "activity title exact",
//       "activity title partial",
//       "activity link exact",
//       "activity link partial"
//     ];

//     const isNoMatchA = a.matched_by === "No Match";
//     const isNoMatchB = b.matched_by === "No Match";

//     if (isNoMatchA && !isNoMatchB) return 1;
//     if (!isNoMatchA && isNoMatchB) return -1;

//     const isSpecialCaseA = specialCases.includes(a.matched_by);
//     const isSpecialCaseB = specialCases.includes(b.matched_by);

//     if (isSpecialCaseA && isSpecialCaseB) {
//       const indexA = matchedByOrder.indexOf(a.matched_by) !== -1 ? matchedByOrder.indexOf(a.matched_by) : matchedByOrder.length;
//       const indexB = matchedByOrder.indexOf(b.matched_by) !== -1 ? matchedByOrder.indexOf(b.matched_by) : matchedByOrder.length;
//       return indexA - indexB;
//     }

//     if (isSpecialCaseA) return -1;
//     if (isSpecialCaseB) return 1;

//     const indexA = matchedByOrder.indexOf(a.matched_by) !== -1 ? matchedByOrder.indexOf(a.matched_by) : matchedByOrder.length;
//     const indexB = matchedByOrder.indexOf(b.matched_by) !== -1 ? matchedByOrder.indexOf(b.matched_by) : matchedByOrder.length;
//     return indexA - indexB;
//   }).map(row => {
//     const color = colorSelection[row.matched_by] || "#ffffff";
//     return { ...row, rowColor: color };
//   });

//   return rows;
// }, [filteredRows, matchedByOrder, projectCodeAsc]);

//latest sorted rows with project code sorting and matched by normalization deployed using this code
const sortedRows = useMemo(() => {
  let rows = [...filteredRows];

  // Sort by Project_Code if toggle is on
  rows.sort((a, b) => {
    if (!a.Project_Code) return 1;
    if (!b.Project_Code) return -1;

    if (projectCodeAsc) {
      return String(a.Project_Code).localeCompare(String(b.Project_Code));
    } else {
      return String(b.Project_Code).localeCompare(String(a.Project_Code));
    }
  });

  // Function to normalize matched_by for special cases
  const normalizeMatchedBy = (matched_by) => {
  const mb = matched_by || ""; // fallback to empty string
  if (mb.startsWith("Activity Title ") && mb.includes("%")) return "Activity Title Partial";
  if (mb.startsWith("Activity Link ") && mb.includes("%")) return "Activity Link Partial";
  return matched_by || "No Match"; // safe default if undefined
};


  const matchedByOrder = [
    "Activity Title Exact",
    "Activity Title Partial",
    "Activity Link Exact",
    "Activity Link Partial",
     "No Match - Activity_Type",
    "No Match"
  ];

  // Sort by matched_by order
  rows.sort((a, b) => {
    const aKey = normalizeMatchedBy(a.matched_by);
    const bKey = normalizeMatchedBy(b.matched_by);

    const indexA = matchedByOrder.indexOf(aKey) !== -1 ? matchedByOrder.indexOf(aKey) : matchedByOrder.length;
    const indexB = matchedByOrder.indexOf(bKey) !== -1 ? matchedByOrder.indexOf(bKey) : matchedByOrder.length;

    return indexA - indexB;
  });

  // Add rowColor for each row
  rows = rows.map(row => {
    const color = colorSelection[row.matched_by] || "#ffffff";
    return { ...row, rowColor: color };
  });

  return rows;
}, [filteredRows, projectCodeAsc]);


//
// const sortedRows = useMemo(() => {
//   let rows = [...filteredRows];

//   // Helper: get number after hyphen (ACT-10 → 10)
//   const getProjectCodeKey = (code) => {
//     if (!code) return -Infinity;
//     const parts = String(code).split("-");
//     return Number(parts[parts.length - 1]) || 0;
//   };

//   // Normalize matched_by
//   const normalizeMatchedBy = (matched_by) => {
//     const mb = matched_by || "";
//     if (mb.startsWith("Activity Title ") && mb.includes("%"))
//       return "Activity Title Partial";
//     if (mb.startsWith("Activity Link ") && mb.includes("%"))
//       return "Activity Link Partial";
//     return matched_by || "No Match";
//   };

//   const matchedByOrder = [
//     "Activity Title Exact",
//     "Activity Title Partial",
//     "Activity Link Exact",
//     "Activity Link Partial",
//     "No Match - Activity_Type",
//     "No Match"
//   ];

//   // 🔥 MAIN SORT LOGIC
//   rows.sort((a, b) => {
//     /* 1️⃣ Activity Title – group together */
//     const titleA = a.Activity_Title || "";
//     const titleB = b.Activity_Title || "";

//     if (titleA !== titleB) {
//       return titleA.localeCompare(titleB);
//     }

//     /* 2️⃣ Same Activity → Project_Code DESC (10,3,2,1) */
//     const projDiff =
//       getProjectCodeKey(b.Project_Code) -
//       getProjectCodeKey(a.Project_Code);

//     if (projDiff !== 0) return projDiff;

//     /* 3️⃣ Same Activity + Same Project → matched_by priority */
//     const indexA = matchedByOrder.indexOf(normalizeMatchedBy(a.matched_by));
//     const indexB = matchedByOrder.indexOf(normalizeMatchedBy(b.matched_by));

//     return (indexA === -1 ? matchedByOrder.length : indexA) -
//            (indexB === -1 ? matchedByOrder.length : indexB);
//   });

//   // Add rowColor
//   rows = rows.map(row => ({
//     ...row,
//     rowColor: colorSelection[row.matched_by] || "#ffffff"
//   }));

//   return rows;
// }, [filteredRows]);



//group by sorting of projec code desc to asc
// const sortedRows = useMemo(() => {
//   let rows = [...filteredRows];

//   // 🔹 Get number after last hyphen (ACT-DEV-10 → 10)
//   const getProjectCodeNumber = (code) => {
//     if (!code) return null;

//     const str = String(code).trim();
//     if (str === "" || str.toLowerCase().startsWith("no match")) {
//       return null;
//     }

//     const parts = str.split("-");
//     const num = Number(parts[parts.length - 1]);
//     return isNaN(num) ? null : num;
//   };

//   rows.sort((a, b) => {
//     const aNum = getProjectCodeNumber(a.Project_Code);
//     const bNum = getProjectCodeNumber(b.Project_Code);

//     // both no-match → same group
//     if (aNum === null && bNum === null) return 0;

//     // only A no-match → A last
//     if (aNum === null) return 1;

//     // only B no-match → B last
//     if (bNum === null) return -1;

//     // both valid → DESC order
//     return bNum - aNum; // ASC venum na aNum - bNum
//   });

//   return rows;
// }, [filteredRows]);

//group by sorting of projec code desc to asc with secondary sort on title
// const sortedRows = useMemo(() => {
//   let rows = [...filteredRows];

//   // 🔹 Get number after last hyphen (ACT-DEV-10 → 10)
//   const getProjectCodeNumber = (code) => {
//     if (!code) return null;

//     const str = String(code).trim();
//     if (str === "" || str.toLowerCase().startsWith("no match")) {
//       return null;
//     }

//     const parts = str.split("-");
//     const num = Number(parts[parts.length - 1]);
//     return isNaN(num) ? null : num;
//   };

//   rows.sort((a, b) => {
//     /* 1️⃣ Project_Code grouping + DESC */
//     const aNum = getProjectCodeNumber(a.Project_Code);
//     const bNum = getProjectCodeNumber(b.Project_Code);

//     if (aNum === null && bNum === null) {
//       // continue to next rule
//     } else if (aNum === null) {
//       return 1;
//     } else if (bNum === null) {
//       return -1;
//     } else {
//       const diff = bNum - aNum; // DESC
//       if (diff !== 0) return diff;
//     }

//     /* 2️⃣ Same Project_Code → Activity_Title */
//     const titleA = (a.Activity_Title || "").toLowerCase();
//     const titleB = (b.Activity_Title || "").toLowerCase();

//     // 🔼 ASC
//     return titleA.localeCompare(titleB);

//     // 🔽 DESC venum na use this instead
//     // return titleB.localeCompare(titleA);
//   });

//   return rows;
// }, [filteredRows]);


// const sortedRows = useMemo(() => {
//   // original index save pannrom (stable sort)
//   let rows = filteredRows.map((row, index) => ({
//     ...row,
//     __index: index
//   }));

//   // 🔹 Get number after last hyphen (ACT-DEV-10 → 10)
//   const getProjectCodeNumber = (code) => {
//     if (!code) return null;

//     const str = String(code).trim();
//     if (str === "" || str.toLowerCase().startsWith("no match")) {
//       return null;
//     }

//     const parts = str.split("-");
//     const num = Number(parts[parts.length - 1]);
//     return isNaN(num) ? null : num;
//   };

//   rows.sort((a, b) => {
//     /* 1️⃣ Project_Code grouping + DESC */
//     const aNum = getProjectCodeNumber(a.Project_Code);
//     const bNum = getProjectCodeNumber(b.Project_Code);

//     if (aNum === null && bNum === null) {
//       // continue
//     } else if (aNum === null) {
//       return 1;
//     } else if (bNum === null) {
//       return -1;
//     } else {
//       const diff = bNum - aNum; // DESC
//       if (diff !== 0) return diff;
//     }

//     /* 2️⃣ Same Project_Code → Activity_Title group ONLY */
//     const titleA = (a.Activity_Title || "").toLowerCase();
//     const titleB = (b.Activity_Title || "").toLowerCase();

//     if (titleA === titleB) return 0;

//     // ❌ no ASC / DESC → original order preserve
//     return a.__index - b.__index;
//   });

//   // cleanup helper key
//   return rows.map(({ __index, ...row }) => row);
// }, [filteredRows]);


const dynamicCounts = useMemo(() => {
  // Use backend counts if fetch full has been clicked
  if (Object.keys(backendCounts).length > 0) {
    
    return backendCounts;
  }

 
  // Otherwise fallback to preview counts
  const counts = {};
  const seenKeys = new Set();
 previewResults.forEach(row=>{
  if(!selectedPreviewRows.has(getRowId(row))) return;
  const key=`${row.Project_Code}||${row.Activity_Title}||${row.Activity_Type ?? ""}`;
  if(seenKeys.has(key)) return;
  seenKeys.add(key);
 })
 
  previewResults.forEach(row => {
    if (!selectedPreviewRows.has(getRowId(row))) return;
    const key = `${row.Project_Code}||${row.Activity_Title}||${row.Activity_Type ?? ""}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);

    const mb = String(row.matched_by ?? "unknown");
    if (!counts[mb]) counts[mb] = 0;
    counts[mb] += 1;
  });

  counts.total_output_rows = seenKeys.size;

  return counts;
}, [previewResults, selectedPreviewRows, backendCounts]);



//outside click handler for dropdown it hides the dropdown when clicked outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilterColumn(null); // or any state controlling dropdown visibility
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <>
      {/* Header */}
      <header className="header bg-light shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
        <img src={analyticslogo} alt="Logo" style={{ height: 40 }} />
        <div className="d-flex align-items-center gap-3 position-relative">
          <img src={appsicon} alt="Apps" ref={appsIconRef} style={{ height: 30, width: 30, cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && <div style={{ position: 'absolute', top: '50px', right: 0, backgroundColor: 'white', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 1050 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
              <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => navigate('/textinputsearch')}>Text Input Search</li>
              <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => window.open("http://34.47.164.153:6060/", "_blank")}>Workflows</li>
              <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => navigate('/logfile')}>Activity Logs</li>
              <li style={{ padding: '8px', cursor: 'pointer' }} onClick={() => window.open("http://34.47.164.153:5050/", "_blank")}>Chat with SQL</li>
            </ul>
          </div>}
          <div className="dropdown" style={{ position: 'relative' }}>
            <img src={user?.profilelink || avataricon} alt="Profile" className="rounded-circle border border-2 shadow-sm me-2" height={45} width={45} style={{ objectFit: "cover", cursor: "pointer" }} onClick={() => setOpen(!open)} />
            {open && <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute', top: '110%', right: 0 }}>
              <li className="dropdown-item-text"><small>{user?.email}</small></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" onClick={() => { localStorage.removeItem('user'); }}>Logout</button></li>
            </ul>}
          </div>
          <img src="https://storage.googleapis.com/my-react-image-bucket-123/DS_Logos/Logo_Gif/Trove.gif" alt="Trove" style={{ height: 40 }} />
        </div>
      </header>

      {/* Main Container */}
      <div className="container-fluid py-2">

        {/* Upload Card */}
        {!showFullData && previewResults.length === 0 && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="col-12 col-lg-8">
              <div className="card shadow-lg border-0 rounded-4 p-4">
                <div className="d-flex flex-column flex-md-row align-items-center gap-3 justify-content-center">

                  <div className="flex-fill">

                    <div className="position-relative">
                      <i className="bi bi-database position-absolute top-50 start-3 translate-middle-y text-secondary"></i>
                      <select
                        className="form-select ps-3 pe-4 py-2 text-sm"
                        value={selectedTable || ""}
                        onChange={e => setSelectedTable(e.target.value)}
                      >
                        <option value="">Select Database</option>
                        {tables.map((t, i) => (
                          <option key={i} value={t}>{tablename[t]}</option>
                        ))}
                      </select>
                      <i
                        className="bi bi-chevron-down position-absolute top-50 end-3 translate-middle-y text-secondary"
                        style={{ fontSize: "0.7rem", pointerEvents: "none" }}
                      ></i>
                    </div>
                  </div>

                  <div className="flex-fill">

                    <input
                      type="file"
                      accept=".xls,.xlsx"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="flex-fill d-flex align-items-end">
                    <button
                      className="btn btn-dark w-100 text-white fw-bold text-sm px-4 py-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={fetchPreview}
                      disabled={!selectedTable || !file || loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search"></i>
                          Discover
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full-Screen Results */}
        {previewResults.length > 0 && (
  <div className="container-fluid p-0">
    <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-white shadow-lg sticky-top rounded-3" >
      <div className="d-flex align-items-center gap-3">


{/* <small className="text-muted ">
  <div className="mb-1">
    <span className="badge bg-info text-dark me-1" style={{ fontSize: 11 }}>
      Total Results: {selectedPreviewRows.size} / {sortedRows.length} Records
    </span>
    {Object.entries(dynamicCounts).filter(([label])=> label !=="undefined").slice(0, 3).map(([label, count], idx) => (
      <span
        key={idx}
        className="badge bg-info text-dark  me-1"
        style={{ fontSize: 11 }}
      >
        {label}: {count}
      </span>
    ))}
  </div>
  <div>
    {Object.entries(dynamicCounts).filter(([label])=>label !=="undefined").slice(3, 7).map(([label, count], idx) => (
      <span
        key={idx}
        className="badge bg-info text-dark  me-1"
        style={{ fontSize: 11 }}
      >
        {label}: {count}
      </span>
    ))}
  </div>
</small> */}


<small className="text-muted">
  {(() => {
    // Define filteredCounts inside JSX
    const filteredCounts = Object.entries(dynamicCounts)
      .filter(([label]) => label && label !== "undefined" && label !== "total_output_rows");

    return (
      <>
        <div className="mb-1">
          <span className="badge bg-info text-dark me-1" style={{ fontSize: 11 }}>
            Total Results: {dynamicCounts.total_output_rows || 0}
          </span>
          {filteredCounts.slice(0, 5).map(([label, count], idx) => (
            <span key={idx} className="badge bg-info text-dark me-1" style={{ fontSize: 11 }}>
              {label}: {count}
            </span>
          ))}
        </div>
        <div>
          {filteredCounts.slice(6,13).map(([label, count], idx) => (
            <span key={idx} className="badge bg-info text-dark me-1" style={{ fontSize: 11 }}>
              {label}: {count}
            </span>
          ))}
        </div>
      </>
    );
  })()}
</small>









 
        <input
          type="search"
          className="form-control form-control-sm rounded-pill shadow-sm"
          placeholder="Search results..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ width: '250px', borderColor: '#ddd' }}
        />
      </div>

      <div className="d-flex gap-3">
  
 <button
  className="btn btn-outline-dark btn-sm rounded-pill d-flex align-items-center"
  onClick={handleToggle}
  title='Apply Filter Using Project Code'
>
  <i className={`bi ${isOn ? "bi-toggle-on" : "bi-toggle-off"}`}></i>
  {/* <span className="ms-1">{projectCodeAsc ? "Asc" : "Desc"}</span> */}


</button>



        {!showFullData && (
          <button
            className="btn btn-outline-dark btn-sm px-2 rounded-pill d-flex align-items-center"
            onClick={fetchFullData}
            disabled={loading || selectedPreviewRows.size === 0}
            title='Get All Records'
          >
         
            {loading ? "Fetching..." :    <i className="bi bi-arrow-repeat"></i>}
          </button>
        )}

        <button
          className="btn btn-outline-dark btn-sm  rounded-pill d-flex align-items-center"
          onClick={handleExport}
          title='Download'
        >
          <i className="bi bi-download "></i>
        </button>

        {/* <button
          className="btn btn-outline-dark btn-sm  rounded-pill d-flex align-items-center"
          onClick={() => setShowPreviewTable(true)}
          title='Back'
        >
          <i className="bi bi-arrow-left "></i> 
        </button> */}
        
  {(showPreviewTable || showFullData) && (
    <button
      className="btn btn-outline-dark btn-sm rounded-pill d-flex align-items-center"
      onClick={() => {
        if (showFullData) {
          // Full Data -> go back to Preview Table
          setShowFullData(false);
          setShowPreviewTable(true);
        } else if (showPreviewTable) {
          // Preview Table -> go back to Upload Form
          setShowPreviewTable(false);
          setPreviewResults([]);
          setSelectedPreviewRows(new Set());
        }
      }}
      title="Back"
    >
      <i className="bi bi-arrow-left"></i>
    </button>
  )}

  {/* Forward Button / Fetch Full Data */}
  {showPreviewTable && !showFullData && (
    <button
      className="btn btn-outline-dark btn-sm px-2 rounded-pill d-flex align-items-center"
      onClick={fetchFullData}
      disabled={loading || selectedPreviewRows.size === 0}
      title='Get All Records'
    >
      {loading ? <span className="spinner-border spinner-border-sm"></span> : <i className="bi bi-arrow-right"></i>}
    </button>
  )}

      </div>
    </div>

    <div className="px-3 py-4" style={{ height: 'calc(100vh - 130px)' }}>
      <div className="table-responsive h-100">
        <table className="table table-bordered table-hover table-sm mb-0">
          <thead className="table-light sticky-top" style={{ zIndex: 500 }}>
            <tr>
              {!showFullData && <th style={{ width: "35px" }}></th>}
              {tableHeaders.map((h, i) => (
<th
  key={i}
  className="text-nowrap position-relative"
  style={{
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#5e5e5e",
    fontSize: "13px",
    paddingRight: "22px" // space for filter icon
  }}
  onClick={() => handleHeaderClick(h)}
>
  {/* Column name */}
  <span>{h}</span>

  {/* 🔹 Filter Applied Icon (RIGHT corner) */}
  {selectedFilterValues[h]?.length > 0 && (
    <i
      className="bi bi-funnel-fill text-primary"
      style={{
        position: "absolute",
        right: "6px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "12px"
      }}
      title={`Filtered (${selectedFilterValues[h].length})`}
    ></i>
  )}

  {/* 🔽 Dropdown caret (only when open) */}
  {filterColumn === h && (
    <i
      className="bi bi-caret-down-fill ms-1"
      style={{ fontSize: "10px" }}
    ></i>
  )}

  {/* ================= Filter Dropdown ================= */}
 {filterColumn === h && uniqueValues.length > 0 && (
  <ul
    className="dropdown-menu show"
    ref={dropdownRef}
    style={{
      position: "absolute",
      top: "100%",
      left: 0,
      zIndex: 10000,
      maxHeight: "240px",
      maxWidth: "220px",
      overflowY: "auto",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "8px 5px",
      fontSize: "13px",
    }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* 🔍 Search Box */}
    <li className="px-2 mb-2">
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Search..."
        value={filterSearch[h] || ""}
        onChange={(e) =>
          setFilterSearch((prev) => ({
            ...prev,
            [h]: e.target.value,
          }))
        }
      />
    </li>

    {/* 🔘 Buttons Row */}
    <li className="d-flex justify-content-between align-items-center mb-2 px-2">
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => {
          const filteredValues = uniqueValues.filter((val) =>
            val
              ?.toString()
              .toLowerCase()
              .includes((filterSearch[h] || "").toLowerCase())
          );

          setSelectedFilterValues((prev) => ({
            ...prev,
            [h]:
              selectedFilterValues[h]?.length === filteredValues.length
                ? []
                : [...filteredValues],
          }));
        }}
      >
        {selectedFilterValues[h]?.length ===
        uniqueValues.filter((val) =>
          val
            ?.toString()
            .toLowerCase()
            .includes((filterSearch[h] || "").toLowerCase())
        ).length ? (
          <i className="bi bi-x-circle"></i>
        ) : (
          <i className="bi bi-check-all"></i>
        )}
      </button>

      <button
        className="btn btn-sm btn-outline-danger"
        style={{fontSize:10}}
        onClick={() =>
          setSelectedFilterValues((prev) => ({ ...prev, [h]: [] }))
        }
      >
        Clear
      </button>
    </li>

    {/* ☑️ Filtered Values */}
    {uniqueValues
      .filter((val) =>
        val
          ?.toString()
          .toLowerCase()
          .includes((filterSearch[h] || "").toLowerCase())
      )
      .map((val) => (
        <li key={val} className="d-flex align-items-center p-1 px-2">
          <input
            type="checkbox"
            checked={selectedFilterValues[h]?.includes(val) || false}
            onChange={() => {
              setSelectedFilterValues((prev) => {
                const prevValues = prev[h] || [];
                return {
                  ...prev,
                  [h]: prevValues.includes(val)
                    ? prevValues.filter((v) => v !== val)
                    : [...prevValues, val],
                };
              });
            }}
            className="me-2"
          />
          <span
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "12px",
            }}
            title={val}
          >
            {val}
          </span>
        </li>
      ))}
  </ul>
)}

</th>

              ))}
            </tr>
          </thead>

          <tbody>
            {sortedRows.map((row, rIdx) => {
              const rowId = getRowId(row);
              return (
                <tr key={rIdx} style={getMatchStatusStyle(row.match_status)}>
                  {!showFullData && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedPreviewRows.has(rowId)}
                        onChange={() => toggleRowSelection(rowId)}
                        className="form-check-input"
                        style={{cursor:"pointer"}}
                      />
                    </td>
                  )}

                 {
  tableHeaders.map((col, cIdx) => (
    <td
      key={cIdx}
      className="text-truncate"
      style={{
        maxWidth: '150px',
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
      }}
      title={row[col]}
    >
     
      {col === "Activity_Link" && row[col] ? (
        <a href={row[col]} target="_blank" rel="noreferrer">
          <i className="bi bi-box-arrow-up-right"></i>
        </a>
      ) : col === "Last_Update_Date" && row[col] ? (
        // Format the Last_Update_Date to a readable format
        new Date(row[col]).toLocaleDateString()
      ) : (
        // Highlight other text (you may have custom highlightText function)
        highlightText(row[col])
      )}
    </td>
  ))
}

                </tr>
              );

            })}
          </tbody>
          

        </table>
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
}












