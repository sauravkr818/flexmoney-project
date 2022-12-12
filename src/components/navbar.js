import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="navbar-brand fw-bolder ms-4">{props.data.title}</div>
        {props.data.title === 'Dashboard'?
        <div className="d-flex">
          <button className="btn btn-dark dropdown-toggle me-5 fw-bold" type="button" data-bs-toggle="dropdown" aria-expanded="false">Profile</button>
          <ul className="dropdown-menu dropdown-menu-end me-3">
            <li><div className="dropdown-item">{props.data.email}</div></li>
            <li><hr className="dropdown-divider" /></li>
            <li><div className="text-center"><button className="btn btn-primary" onClick={handleLogout}>Logout</button></div></li>
          </ul>
        </div>
        : <></>}
      </div>

    </nav>

  )
}

export default Navbar
