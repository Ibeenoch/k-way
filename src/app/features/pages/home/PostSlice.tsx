import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../../app/store";
import { act } from "@testing-library/react";
import * as api from './PostAPI'


export interface postInterface {
  posts: any;
  status: "success" | "loading" | "failed" | "idle";
}

const initialState: postInterface = {
  posts: [],
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
      
  },
});

export const { logout } = postSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postSlice.reducer;
