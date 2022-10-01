import React , {useState} from "react";
import  NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "6330e81e1e8df86dfbd17ad1",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My  title has been updated",
          "description": "Please Wake up Early updated",
          "tag": "personal",
          "date": "2022-09-25T23:45:34.088Z",
          "__v": 0
        },
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My second title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        } ,
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My second title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        },
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My second title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        },
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My second title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        },
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My second title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        }
      ]
      const onedele = [
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My second fack title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        },
        {
          "_id": "633573cc45c01545bbca6ae9",
          "user": "632a5c301f12f291b2fe04aa",
          "title": "My thsi is my thirdd created bloag to check that if i can use this or on title",
          "description": "Please Wake up Early",
          "tag": "personal",
          "date": "2022-09-29T10:30:36.317Z",
          "__v": 0
        }
      ]
       const [dele,setdele]=useState(onedele)
      const [notes,setNotes]=useState(notesInitial)
    
    return (
        <NoteContext.Provider value={{notes,setNotes , dele , setdele}}>
            {props.children}
        </NoteContext.Provider>
    )
}

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