// import  from "@remix-run/router";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials,setcredentials]=useState({email:"",password:""})
    const history=useNavigate()
const handleSubmit =async (e)=>{
    e.preventDefault();
   const response=await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
  
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json = await response.json()
      console.log(json)
      if(json.success){
        //redirect
        localStorage.setItem('token',json.authtoken)
        props.showAlert(" loged in successfully","success")
        history("/");
      }
      else{
             props.showAlert("Invalid details","danger")
      }
}
const onChange=(e)=>{
    setcredentials({...credentials,[e.target.name]: e.target.value})
}
  return (
    <form onSubmit={handleSubmit} style={{marginTop:"5rem"}}>
      <h1>Login for get All Your Notes</h1>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={credentials.email}
          onChange={onChange}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          id="password"
          placeholder="Password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
