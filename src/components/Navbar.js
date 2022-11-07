import React  from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation();
  const navigate=useNavigate()
    const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  // useEffect(() => {
  //   // Google Analytics
  //   console.log(location)
  // }, [location]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active": ""}` } to="/about">Template</Link>
        </li>
        
      </ul>
    { !localStorage.getItem('token')? <form className="d-flex" role="search">
        <Link className="btn btn-primary mx-1" to='/login' role='button'>Login</Link>
        <Link className="btn btn-primary mx-2" to='/signup' role='button'>Signup</Link>
      </form>: <Link className="btn btn-primary mx-1" to='/login' role='button' onClick={handleLogout}>Logout</Link>
      }
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
