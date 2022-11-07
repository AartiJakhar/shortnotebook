import React from 'react'
function EditNote(props) {
    const {note,handleClick,onChange}=props;
  
    
   
  return (
    <div style={{boxShadow:"1px 1px 9px #918e8e" ,padding:'1rem',margin:'1rem'}}  >
      <h1>Edit Notes</h1>
      <form>
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control my-2"
            id="title"
            name='etitle'
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            value={note.etitle}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="description" >Description</label>
          <input
            type="description"
            className="form-control my-2"
            id="description"
            placeholder="description"
            name='edescription'
            value={note.edescription}
            onChange={onChange}
            minLength={5} required
          />
          <label htmlFor="tag" >tag</label>
          <input
            type="tag"
            className="form-control my-2"
            id="tag"
            placeholder="tag"
            name='etag'
            value={note.etag}
            onChange={onChange}
          />
        </div>
      
        <button disabled={note.etitle.length<5||note.edescription.length<5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditNote
