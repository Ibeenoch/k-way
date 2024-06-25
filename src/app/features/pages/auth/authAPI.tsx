import axios from "axios";
const API = "http://localhost:5800";


export const signup = async (data: any) => {
 try {
  if(data){
    const res = await axios.post(`${API}/user/register`, data);
    return res.data;
  }
  
 } catch (error) {
  console.log(error);
  return error;
 }
    
};

export const login = async (data: any) => {
  try {
    if(data){
      const res = await axios.post(`${API}/user/login`, data);
      return res.data;
    }
    
   } catch (error) {
    console.log(error);
    return error;
   }
};

export const verifyUser = async (data: any) => {
  try {
    if(data){
      const res = await axios.post(`${API}/user/verify`, data);
      return res.data;
    }
    
   } catch (error) {
    console.log(error)
   }
};

export const passwordRecovery = async (data: any) => {
  try {
    if(data){
      const res = await axios.post(`${API}/user/password/recovery`, data);
      console.log(res)
      return res.data;
    }
    
   } catch (error) {
    console.log(error)
   }
};

export const passwordReset = async (data: any) => {
  try {
    if(data){
      const id = data.id;
      const res = await axios.put(`${API}/user/password/reset/${id}`, data);
      return res.data;
    }
    
   } catch (error) {
    console.log(error)
   }
};

export const updateProfile = async (data: any) => {
  try {
    const token = data.token;
    const option = {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }
     const { _id, profilefile } = data
    if(profilefile){
      const res = await axios.put(`${API}/user/update/${_id}`, profilefile, option);
      return res.data;
    }
    
   } catch (error) {
    console.log(error)
   }
};

export const userFollowers = async (followers: any) => {
  try {
    const { userId, token } = followers;
    const option = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

      const res = await axios.put(`${API}/user/follower/${userId}`, followers, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const userFollowing = async (followers: any) => {
  try {
    const { userId, token } = followers;
    const option = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

      const res = await axios.put(`${API}/user/following/${userId}`, followers, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};
