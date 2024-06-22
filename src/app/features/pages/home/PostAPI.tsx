import axios from "axios";
const API = "http://localhost:5800";

export const createpost = async(post: any) => {
  try {
    const token = post.token;
    const data = post.postData;
    const option = {
      headers: {
        'Content-type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
      }
    }
    const res = await axios.post(`${API}/post/create`, data, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const updatepost = async(post: any) => {
  try {
    const token = post.token;
    const data = post.postData;
    const id = post._id;
    const option = {
      headers: {
        'Content-type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
      }
    }
    const res = await axios.put(`${API}/post/update/${id}`, data, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const deletepost = async(post: any) => {
  try {
    const token = post.token;
    const id = post._id;
    const option = {
      headers: {
        'Content-type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
      }
    }
    const res = await axios.put(`${API}/post/delete/${id}`, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchAllPosts = async() => {
  try {
    const res = await axios.get(`${API}/post/all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}