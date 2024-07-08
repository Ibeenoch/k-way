import axios from "axios";
const API = "https://k-waybackend.onrender.com";

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

export const createstory = async(story: any) => {
  try {
    const token = story.token;
    const data = story.postData;
    const option = {
      headers: {
        'Content-type': 'multipart/form-data',
        'authorization': `Bearer ${token}`
      }
    }
    const res = await axios.post(`${API}/story/create`, data, option);
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

export const usersPostImages = async(post: any) => {
  try {
    const userId = post.userId;

    const res = await axios.get(`${API}/post/alluserimages/${userId}`);
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

export const searchForPost = async(searchWord: string) => {
  try {
    const res = await axios.get(`${API}/post/searchpost?searchWord=${searchWord}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const postTrending = async() => {
  try {
    const res = await axios.get(`${API}/post/trending`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchAllPostsForAUser = async(userId: string) => {
  try {
    const res = await axios.get(`${API}/post/user/${userId}`);
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

export const fetchAllUserStories = async(userId: string) => {
  try {
    const res = await axios.get(`${API}/story/all/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export const fetchAvailableStories = async() => {
  try {
    const res = await axios.get(`${API}/story/available`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchUserStories = async(userId: string) => {
  try {
    const res = await axios.get(`${API}/story/all/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchAPost = async(id: string) => {
  try {
    if(!id) return;
    console.log('postId ', id);
    const res = await axios.get(`${API}/post/single/${id}`);
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
    const commentId = comments.commentId;
    const token = comments.token;
    const comment = comments.comment;
    const data = {comment};

    const option = {
      headers: {
        'Content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    };
    const res = await axios.put(`${API}/post/updatecomment/${commentId}`, data, option);
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

export const deleteRepliedComment = async(comments: any) => {
  try {
    const repliedId = comments.repliedId;
    const commentId = comments.commentId;
    const token = comments.token;

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };
    const res = await axios.delete(`${API}/post/deleterepliedcomment/${repliedId}/${commentId}`, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const replyComment = async(comments: any) => {
  try {
    
    const commentId = comments.commentId;
    const token = comments.token;
    const content = comments.comment;
    const data = { content };

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };
    console.log('the data ', data)
    const res = await axios.post(`${API}/post/replycomment/${commentId}`, data, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const allrepliesforaComment = async(commentId: any) => {
  try {
    const res = await axios.get(`${API}/post/replies/${commentId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const likeAComment = async(comments: any) => {
  try {
    const token = comments.token;
    const commentId = comments.commentId;

    const option = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };

    const res = await axios.put(`${API}/post/likecomment/${commentId}`, comments, option);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const allCommentsforaPost = async(id: any) => {
  try {
    const res = await axios.get(`${API}/post/comment/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getLikesForAPost = async(userId: any) => {
  try {
    const res = await axios.get(`${API}/post/getlikes/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarkForAPost = async(userId: any) => {
  try {
    const res = await axios.get(`${API}/post/getbookmark/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getresharedForAPost = async(userId: any) => {
  try {
    const res = await axios.get(`${API}/post/getreshare/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};