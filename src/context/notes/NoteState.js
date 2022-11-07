import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = async (title, description, tag) => {
     //Api call
     const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title , description, tag})
    });
    const note =await response.json();
    setNotes(notes.concat(note.saveNote));
  };
 
  //get a Note
  const getNotes = async () => {
     //Api call
     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const note = await response.json()
    setNotes(note)
  };



  //Delete a Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      }
    });
    const json = await response.json()
    // console.log("deleting the note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    let newNotes=JSON.parse(JSON.stringify(notes))
    // login to edit in client '
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes,getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

// const s1 = {
//     "name":"harry",
//     "class":"5b"
//  }
//  const [state,setstate] = useState(s1);
//  const update =()=>{
//     setTimeout(() => {
//         setstate({
//             "name":"larry",
//             "class":"6b"

//         } )
//     }, 2000)
//  }
