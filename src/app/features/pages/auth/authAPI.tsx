import axios from "axios";
const API = "https://k-waybackend.onrender.com";


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
     const { _id, profilefile } = data;
    if(profilefile){
      const res = await axios.put(`${API}/user/update/${_id}`, profilefile, option);
      return res.data;
    }
    
   } catch (error) {
    console.log(error)
   }
};

export const fecthAllPrevChatForTwoUsers = async (data: any) => {
  try {
    const token = data.token;
    const chatId = data.chatId;

    const option = {
      headers : {
        'Authorization': `Bearer ${token}`
      }
    }
      const res = await axios.get(`${API}/chat/all/${chatId}`, option);
      return res.data;
    
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
    };
    

      const res = await axios.put(`${API}/user/follower/${userId}`, followers, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const userFollowing = async (followers: any) => {
  try {
    const { auserId, token } = followers;
    const option = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    
      const res = await axios.put(`${API}/user/following/${auserId}`, followers, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const getFollowing = async (userId: any) => {
  try {
   
      const res = await axios.get(`${API}/user/following/${userId}`);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const getFollowers = async (userId: any) => {
  try {
   
      const res = await axios.get(`${API}/user/followers/${userId}`);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const getAllNotificationForAUser = async (note: any) => {
  try {
      const userId = note.userId;
      const token = note.token;
      const postId = note.postId;
console.log('sending note ', note)
      const option = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get(`${API}/notification/${userId}/${postId}`, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const findChatIdForTwoUsers = async (note: any) => {
  try {
      const userId = note.userId;
      const myId = note.myId;
      const token = note.token;
      const data = { userId, myId }

      const option = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.post(`${API}/chat/find`, data, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const markreadChatBtwTwoUsers = async (note: any) => {
  try {
      const chatId = note.chatId;
      const token = note.token;
console.log('sending note ', note)
      const option = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.put(`${API}/chat/${chatId}`, note, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const markAllNotificationForAUser = async (note: any) => {
  try {
      const userId = note.userId;
      const token = note.token;
      const postId = note.postId;
console.log('sending note ', note)
      const option = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.put(`${API}/notification/${userId}/${postId}`, note, option);
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const getAUser = async (userId: any) => {
  try {

      const res = await axios.get(`${API}/user/${userId}`, );
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const userTrending = async () => {
  try {

      const res = await axios.get(`${API}/user/trending`, );
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const searchUser = async (searchWord: string) => {
  try {
      const res = await axios.get(`${API}/user/searchuser?searchWord=${searchWord}`, );
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};

export const getAllUser = async () => {
  try {

      const res = await axios.get(`${API}/user`, );
      return res.data;
    
   } catch (error) {
    console.log(error)
   }
};
