import React, { useState,useContext } from 'react'
import noteContext from "../context/notes/NoteContext";

function AddNote(props) {
    
    const context = useContext(noteContext);
    const { addNote} = context;
    const [note , setnote]=useState({title:"", description:"", tag:""})
    const handleClick=(e)=>{
      e.preventDefault();
      props.showAlert("YOur note has added successfully",'success')
        addNote(note.title,note.description,note.tag);
        setnote({title:"", description:"", tag:""})
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value})
    }
 
  return (
    <div style={{marginTop:'5rem'}}>
        <h1>Add a Note</h1>
      <form onSubmit={handleClick}>
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control my-2"
            id="title"
            name='title'
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="description" >Description</label>
          <input
            type="description"
            className="form-control my-2"
            id="description"
            placeholder="description"
            name='description'
            onChange={onChange}
            minLength={5} required
            value={note.description}
          />
          <label htmlFor="tag" >tag</label>
          <input
            type="tag"
            className="form-control my-2"
            id="tag"
            placeholder="tag"
            name='tag'
            onChange={onChange}
            value={note.tag}
          />
        </div>
        {/* onClick={handleClick} */}
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddNote
