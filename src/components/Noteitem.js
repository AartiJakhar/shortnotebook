import React, { useContext } from 'react'
import noteContext from "../context/notes/NoteContext";
function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote} = context;
    const {note,updateNote}=props;
    
  return (
    <div className='col-md-3'>
    <div className="card my-3 " >
    <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className='far fa-trash-alt 'onClick={()=>{deleteNote(note._id);props.showAlert("deleted successfully",'success')}} ></i>
    <i className='far fa-edit mx-2'onClick={()=>{updateNote(note)}}></i>
    {/* here passing arguments  */}
  </div>
</div>

    </div>
  )
}

export default Noteitem
