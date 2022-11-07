import React from "react";

function Alert(props) {
  const capitalise=(word)=>{
    if(word==="danger"){
      word="error"
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1)
  }
  return (
    <div style={{height:'50px',top:"3.5rem"}} className="fixed-top ">
     {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capitalise(props.alert.type)}</strong>:{props.alert.msg}
     </div> }
    </div>
  );
}

export default Alert;
