import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"
import noteService from "../services/noteService"

const NewNote = (props) => {
  const dispatch = useDispatch()
  
  const addNote = async e => {
    e.preventDefault()

    const content = e.target.note.value
    e.target.note.value = ""
    const n = await noteService.createNew(content)
    dispatch(createNote(n))
  }
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
