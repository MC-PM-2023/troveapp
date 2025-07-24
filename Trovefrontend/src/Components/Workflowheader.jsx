
import { NavLink } from "react-router-dom";
import datasolve from '../assets/datasolve.png'

export const Workflowheader = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-light">
    <div className="container-fluid">
    <img src={datasolve} alt="Datasolvelogo" height={50} />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <NavLink className="nav-link active text-dark" aria-current="page" to="/workflow">Workflow</NavLink>
        </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-dark m-1" type="submit"> <i className="bi bi-search"></i></button>
          <button className="btn btn-outline-dark m-1" type="submit"><i className="bi bi-person-fill"></i></button>
        </form>
      </div>
    </div>
  </nav>
  );
};

 
