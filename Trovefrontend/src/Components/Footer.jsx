// export default function Footer(){

//     return(
//         <>
//    <footer className=" py-4  text-center bg-dark bg-gradient ">
//       <span className="text-muted fw-bold">Copyrights © Datasolve Analytics Pvt Ltd</span>
//   </footer>
//         </>
//     )
// }

import { NavLink } from "react-router-dom";
export default function Footer() {
    return (
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top bg-dark text-light">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-light text-decoration-none lh-1">
            <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
          </a>
          <span className="mb-3 mb-md-0">Copyrights © Datasolve Analytics Pvt Ltd 2025</span>
        </div>
  
        <ul className="nav col-md-4 p-2 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <NavLink to ="https://datasolve-analytics.com/"className="text-light" href="#"><i className="bi bi-google" style={{ fontSize: "1.5rem" }}></i></NavLink>
          </li>
          <li className="ms-3">
            <NavLink to="https://www.linkedin.com/company/datasolve-analytics/" className="text-light" href="#"><i className="bi bi-linkedin" style={{ fontSize: "1.5rem" }}></i></NavLink>
          </li>
         
        </ul>
      </footer>
    );
  }
  