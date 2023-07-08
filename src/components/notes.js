import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"

const NoteRow = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return (
    <ul>
      {notes.map(item =>
        <NoteRow
          key={item.id}
          note={item}
          handleClick={() => dispatch(toggleImportanceOf(item.id))}
        />
      )}
    </ul>
  )
}

export default Notes