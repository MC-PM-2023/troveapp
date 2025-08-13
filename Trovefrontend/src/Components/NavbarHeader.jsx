// Header.jsx
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";



const NavbarHeader = ({
  user,
  appsIconRef,
  handleimageclick,
  handleselectchange,
  showdropdown,
  dropdownItemStyle,
  searchkeyword,
  setSearchkeyword,
  analyticslogo,
  avataricon,
  trovelogo,
  appsicon
}) => {
const [open, setOpen] = useState(false);
  const navigate=useNavigate()

  const handleLogout=async()=>{
    const token=localStorage.removeItem("auth_token");
    const user=localStorage.removeItem("user")
    const email=localStorage.removeItem('email')
    navigate("/login")
  }

  return (
    <header className="header bg-white shadow-sm">
      <div className="container-fluid">
        <div className="row align-items-center">

          {/* Left: Analytics Logo */}
          <div className="col-auto">
            <img src={analyticslogo} alt="Analytics Logo" style={{ height: 40 }} className="logo" />
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

          {/* Right: Avatar and Logos */}
          <div className="col-auto d-flex align-items-center">
             {/* <p className="mb-0 fw-medium me-2">{user?.username}</p> */}

<div className="dropdown" style={{ position: "relative" }}>
  <img
    src={user?.profilelink || avataricon}
    alt="Profile"
    className="rounded-circle border border-2 shadow-sm me-2"
    height={45}
    width={45}
    onClick={() => setOpen(!open)}
    style={{ objectFit: "cover", cursor: "pointer" }}
  />

  {open && (
    <ul
      className="dropdown-menu dropdown-menu-end show"
      style={{ position: "absolute", top: "100%", right: 0 }}
    >
      <li className="dropdown-item-text">{user?.email}</li>
      <li><hr className="dropdown-divider" /></li>
      <li>
        <button className="dropdown-item" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </button>
      </li>
    </ul>
  )}
</div>



            {/* <img src={avataricon} alt="avataricon" style={{ height: 30,  borderRadius:10}} className="logo" />
            */}
            <img src={trovelogo} alt="Trove Logo" style={{ height: 40 }} className="logo" />
          </div>

          {/* Right: Apps Icon and Dropdown */}
          <div className="col-auto" style={{ position: 'relative' }}>
            <img
              src={appsicon}
              ref={appsIconRef}
              alt="Apps Icon"
              className="appsicon"
              style={{ height: 30, width: 30, cursor: 'pointer' }}
              onClick={handleimageclick}
            />

            {showdropdown && (
              <div style={{
                position: 'absolute',
                top: '45px',
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
                   <li style={dropdownItemStyle} onClick={() => handleselectchange('textinputsearch')}>Text Input Search</li>
                  <li style={dropdownItemStyle} onClick={() => handleselectchange('workflow')}>Workflows</li>
                  <li style={dropdownItemStyle} onClick={() => handleselectchange('chatwithsql')}>Chat With SQL</li>
                  <li style={dropdownItemStyle} onClick={()=>handleselectchange('Logfile')}>Activity Logs</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default NavbarHeader;
