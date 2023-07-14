import axios from "axios"

const baseUrl = "http://localhost:3001/notes"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (content) => {
  const noteObj = {content, import: false}
  const res = await axios.post(baseUrl, noteObj)
  return res.data
}

const update = async (id, newObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObj)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }