import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlogCommentsByBlogId = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const addBlogComment = async (content, blogId) => {
  console.log(content)
  console.log(blogId)

  const response = await axios.post(`${baseUrl}/${blogId}/comments`, content, getConfig())
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, getConfig())
  return response.data
}

const update = async (blog, blogId) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blog, getConfig())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, create, update, remove, getBlogCommentsByBlogId, addBlogComment }