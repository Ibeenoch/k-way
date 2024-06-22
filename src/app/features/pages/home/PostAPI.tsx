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

export const fetchAllPosts = async() => {
  try {
    const res = await axios.get(`${API}/post/all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}