const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require( '../modals/Note');
const fetchuser = require('../middleware/fetchuser')
//RoutE:1 --> Get All the Notes using :get "api/notes/fetchallnotes"  . Login Required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
  try {
    const notes = await Note.find({user: req.user.id});
     res.json(notes)
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Serve Error")
  }
})

//RoutE:1 -->add a new note using :post "api/notes/addnote"  . Login Required
router.post('/addnote',fetchuser,[
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description',"description must be at list five characters").isLength({min:5}),
 ],async(req,res)=>{
    const {title,description,tag}  = req.body
    //if there are errors, return bad rquest and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        title, description, tag ,user:req.user.id
      })
      const saveNote=await note.save()
      res.json({saveNote})
      
    } catch (error) {
      console.error(error.message);
    res.status(500).send("Internal Serve Error")
    }
})

//Route ;3 --> update an exitsting Note Using : put "/api/Note/updatenote" . Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag} =req.body;

  try {
    //create a newnote object 
    const newNote = {}
    if(title){newNote.title=title}
    if(description){newNote.description = description}
    if(tag){newNote.tag=tag}
  
    //Find the note to be updated and update it 
    //const note = Note.findByIdAndUpdate()
    let note =await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
  
     // Allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){return res.status(401).send("Note Allowed")};
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server Error")
  }
})
//Route ; 4--> delete an exitsting Note Using : delete "/api/Note/deletenote" . Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
 
  try {
    //Find the note to be deleted and delete it 
    let note =await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
  
    // Allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){return res.status(401).send("Note Allowed")};
    note = await Note.findByIdAndDelete(req.params.id)
  
    res.json({"Success":"note has been deleted "})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})
module.exports = router;