import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll =()=>{
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create =(newObject)=>{
  const request = axios.post(baseUrl,newObject)
  return request.then(response => response.data)
}

const update =(id, updatedObject)=>{
  const newUrl = `${baseUrl}/${id}`
  const request = axios.put(newUrl, updatedObject)
  return request.then(response => response.data)
}

const remove =(id)=>{
  const newUrl = `${baseUrl}/${id}`
  const request = axios.delete(newUrl)
  return request.then(response => response.data)
}

export default {
  getAll, create, update, remove
};