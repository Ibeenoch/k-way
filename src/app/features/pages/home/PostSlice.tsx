import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../../app/store";
import { act } from "@testing-library/react";
import * as api from './PostAPI'


export interface postInterface {
  posts: any;
  comments: any;
  status: "success" | "loading" | "failed" | "idle";
}

const initialState: postInterface = {
  posts: [],
  comments: [],
  status: "idle",
};

export const createPost = createAsyncThunk("/post/new", async (post: any) => {
  try {
    const res = await api.createpost(post);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk("/post/update", async (post: any) => {
  try {
    const res = await api.updatepost(post);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("/post/like", async (post: any) => {
  try {
    const res = await api.likepost(post);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const bookmarkPost = createAsyncThunk("/post/bookmark", async (post: any) => {
  try {
    const res = await api.bookmarkpost(post);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const rePost = createAsyncThunk("/post/repost", async (post: any) => {
  try {
    const res = await api.repost(post);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk("/post/delete", async (post: any) => {
  try {
    const res = await api.deletepost(post);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getAllPosts = createAsyncThunk("/post/all", async () => {
  try {
    const res = await api.fetchAllPosts();
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const commentOnPost = createAsyncThunk("/post/comment", async (comments: any) => {
  try {
    const res = await api.makeComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const editComment = createAsyncThunk("/post/editcomment", async (comments: any) => {
  try {
    const res = await api.editComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const deleteComment = createAsyncThunk("/post/deletecomment", async (comments: any) => {
  try {
    const res = await api.deleteComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const allComments = createAsyncThunk("/post/allcomment", async (comments: any) => {
  try {
    const res = await api.allComments(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const replyComment = createAsyncThunk("/post/replycomment", async (comments: any) => {
  try {
    const res = await api.replyComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});


export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          console.log('created post ', action.payload)
          state.posts.push(action.payload)
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          console.log('updated post ', action.payload)
          const findIndex = state.posts.findIndex((p: any) => p._id === action.payload._id);
          state.posts[findIndex] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(likePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          console.log('like post ', action.payload)
          const findIndex = state.posts.findIndex((p: any) => p._id === action.payload._id);
          state.posts[findIndex] = action.payload;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(bookmarkPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          console.log('like post ', action.payload)
          const findIndex = state.posts.findIndex((p: any) => p._id === action.payload._id);
          state.posts[findIndex] = action.payload;
        }
      })
      .addCase(bookmarkPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(rePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(rePost.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          state.posts.push(action.payload);
        }
      })
      .addCase(rePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log('deleted post ', action.payload)
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          const findIndex = state.posts.findIndex((p: any) => p._id === action.payload._id);
          state.posts.splice(findIndex, 1);
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        console.log('fetched posts ', action.payload)
        if (action.payload !== undefined) {
          state.status = "success";
          state.posts = action.payload;
        }
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(commentOnPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        console.log('comments posts ', action.payload)
        if (action.payload !== undefined) {
          state.status = "success";
          state.comments.push(action.payload);
        }
      })
      .addCase(commentOnPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(editComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, action) => {
        console.log('edit comments posts ', action.payload)
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          state.comments[index] = action.payload;
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        console.log('delete comments posts ', action.payload)
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          state.comments.splice(index, 1);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(allComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(allComments.fulfilled, (state, action) => {
        console.log('delete comments posts ', action.payload)
        if (action.payload !== undefined) {
          state.status = "success";
          state.comments = action.payload;
        }
      })
      .addCase(allComments.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(replyComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        console.log('delete comments posts ', action.payload)
        if (action.payload !== undefined) {
          state.status = "success";
          console.log('reply comments ', action.payload)
          // state.comments = action.payload;
        }
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.status = "failed";
      })
      
  },
});

export const { logout } = postSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postSlice.reducer;
