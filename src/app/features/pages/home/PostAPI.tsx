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

export const likepost = async(post: any) => {
  try {
    const token = post.token;
    const userId = post.userId;
    const id = post.postId;
console.log('post ', post);
const data = {userId}

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const res = await axios.put(`${API}/post/like/${id}/${userId}`, data, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const bookmarkpost = async(post: any) => {
  try {
    const token = post.token;
    const userId = post.userId;
    const id = post.postId;
console.log('post ', post);
const data = {userId}

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const res = await axios.put(`${API}/post/bookmark/${id}/${userId}`, data, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const repost = async(post: any) => {
  try {
    const token = post.token;
    const userId = post.userId;
    const id = post.postId;
    const data = {userId}
    console.log('post ', post);
    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
    const res = await axios.put(`${API}/post/reshare/${id}/${userId}`, data, option);
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
    const id = post.id;
    const option = {
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }
    const res = await axios.delete(`${API}/post/delete/${id}`, option);
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

export const makeComment = async(comments: any) => {
  try {
    const id = comments.id;
    const userId = comments.userId;
    const token = comments.token;
    const comment = comments.comment;
    const dataComment = { comment };

    const option = {
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    };
    const res = await axios.post(`${API}/post/comment/${id}/${userId}`, dataComment, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const editComment = async(comments: any) => {
  try {
    const id = comments.id;
    const commentId = comments.commentId;
    const token = comments.token;
    const comment = comments.comment;

    const option = {
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    };
    const res = await axios.put(`${API}/post/updatecomment/${id}/${commentId}`, comment, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = async(comments: any) => {
  try {
    const id = comments.id;
    const commentId = comments.commentId;
    const token = comments.token;

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };
    const res = await axios.delete(`${API}/post/deletecomment/${id}/${commentId}`, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const replyComment = async(comments: any) => {
  try {
    const userId = comments.userId;
    const id = comments.postId;
    const commentId = comments.commentId;
    const token = comments.token;
    const comment = comments.reply;

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };
    const res = await axios.post(`${API}/post/replycomment/${id}/${commentId}/${userId}`, comment, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const allComments = async(id: any) => {
  try {
    const res = await axios.get(`${API}/post/comment/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}