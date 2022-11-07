import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import EditNote from "./Onclick/EditNote";
import { useNavigate } from 'react-router-dom';
function Notes(props) {
  const navigate=useNavigate()
  const context = useContext(noteContext);
  const [loading,setloading]=useState(false)
  const { notes, getNotes, editNote } = context;
  const [note , setnote]=useState({id:"",etitle:"", edescription:"", etag:"" })
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();

    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    setnote({id: currentNote._id ,etitle: currentNote.title , edescription: currentNote.description, etag: currentNote.tag})
    ref.current.click();
    setloading(true)
  
  };
  const handleClick=(e)=>{
    e.preventDefault();
    setloading(false)
    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("updated successfully",'success')

  }
  const onChange=(e)=>{
      setnote({...note,[e.target.name]: e.target.value})
  }
  return (
    <div style={{marginTop:'5rem'}}>
      { !loading &&<AddNote showAlert={props.showAlert} />}
      {/* my modal  */}
      <button style={{display:'none'}}
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      
     { loading &&<EditNote key={note._id}  note={note} onChange={onChange} handleClick={handleClick} />}
      <div className="row">
        <h2>your notes</h2>
        {notes.length===0 &&  <div className="container mx-2" >NO Notes to Display</div>}
        {notes.map((note) => {
          return  <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
      </div>
    </div>
  );
}

export default Notes;
