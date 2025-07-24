import { Workflowheader } from "../Components/Workflowheader";

export const Workflow = () => {


    return (
      <div className="container-fluid mt-5 ">
      
        <div className="row">
        <Workflowheader/>
          {/* Sidebar */}
          {/* <nav className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div
              className="offcanvas-md offcanvas-end bg-body-tertiary"
              tabIndex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarMenuLabel">Company Name</h5>
                <button
                  type="button"
                  className="btn-close btn-dark"
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul className="nav flex-column container p-2">
                <button type="button" className="btn btn-sm btn-outline-dark m-2">Workflows</button>
                <button type="button" className="btn btn-sm btn-outline-dark m-2">Templates</button>
                <button type="button" className="btn btn-sm btn-outline-dark m-2">Tracking Sheets</button>
                </ul>
                <hr className="my-3" />
                <ul className="nav flex-column mb-auto">
                
                  <li className="nav-item">
                  <a className="nav-link text-dark" href="#">Settings</a>
                    <a className="nav-link text-dark" href="#">Sign out</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}
  
          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2 text-secondary">Workflows</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-dark">Move to Drive<i className="bi bi-arrow-bar-right"></i></button>
                  
                </div>
              </div>
            </div>
            
            <h2>Templates</h2>
           <div className="table-responsive small" style={{ maxHeight: "500px", overflowY: "auto" }}>
  <table className="table table-striped table-sm">
    <thead className="table-light" style={{ position: "sticky", top: 0, zIndex: 1020 }}>
      <tr>
        <th scope="col">Header</th>
        <th scope="col">Header</th>
        <th scope="col">Header</th>
        <th scope="col">Header</th>
        <th scope="col">Header</th>
        <th scope="col">Update</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(15)].map((_, index) => (
        <tr key={index}>
          <td>{1001 + index}</td>
          <td>Random</td>
          <td>Data</td>
          <td>Placeholder</td>
          <td>Text</td>
          <td>
            <button className="btn btn-success">Edit</button>
          </td>
          <td>
            <button className="btn btn-danger">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </main>
        </div>
      </div>
    );
  };
  