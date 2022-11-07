import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Signup(props) {
    const navigate=useNavigate()
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/creatuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken)
     
        props.showAlert("Account created successfully","success")
        navigate("/")
    }
    else{
      props.showAlert("Invalid credentials","danger")
    }
    console.log("cliked");
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form onSubmit={handleSubmit} style={{marginTop:'5rem'}}>
      <h1>Creat A Account to use INoteBook</h1>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder=" Enter Your Name"
          name="name"
          onChange={onChange} required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={onChange} required
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          minLength={5} required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Signup;
