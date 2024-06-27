import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../../app/store";
import { act } from "@testing-library/react";
import * as api from './PostAPI'


export interface postInterface {
  posts: any;
  post: any;
  comments: any;
  repliedcomments: any[];
  likes: any[];
  bookmark: any[];
  reshared: any[];
  view: 'likes' | 'bookmark' | 'reshare' | 'none'
  status: "success" | "loading" | "failed" | "idle";
  editCommentStatus: "success" | "loading" | "failed" | "idle";
}

const initialState: postInterface = {
  posts: [],
  post: {},
  comments: [],
  status: "idle",
  repliedcomments: [],
  likes: [],
  bookmark: [],
  view: 'none',
  reshared: [],
  editCommentStatus: "idle",
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

export const getAllRepliesForComment = createAsyncThunk("/post/allrepliesforComment", async (commentId: any) => {
  try {
    const res = await api.allrepliesforaComment(commentId);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const likeComment = createAsyncThunk("/post/likeaComment", async (comments: any) => {
  try {
    const res = await api.likeAComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getLikesforaPost = createAsyncThunk("/post/getlikeforpost", async (postId: any) => {
  try {
    const res = await api.getLikesForAPost(postId);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getBookmarkforaPost = createAsyncThunk("/post/getbookmarkforpost", async (postId: any) => {
  try {
    const res = await api.getBookmarkForAPost(postId);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getresharedforaPost = createAsyncThunk("/post/getresharedforpost", async (postId: any) => {
  try {
    const res = await api.getresharedForAPost(postId);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const likeReplyComment = createAsyncThunk("/post/likereplyComment", async (comments: any) => {
  try {
    const res = await api.likeAComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getAPost = createAsyncThunk("/post/single", async (id: string) => {
  try {
    const res = await api.fetchAPost(id);
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

export const allCommentForAPost = createAsyncThunk("/post/allcomment", async (comments: any) => {
  try {
    const res = await api.allCommentsforaPost(comments);
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
    resetEditCommentStatus: (state) => {
       state.editCommentStatus = 'idle';
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
          state.posts.unshift(action.payload)
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
          state.post = action.payload;
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
          state.post = action.payload;
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
          state.post = action.payload;
        }
      })
      .addCase(rePost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
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
        if (action.payload !== undefined) {
          state.status = "success";
          state.posts = action.payload;
        }
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllRepliesForComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllRepliesForComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.repliedcomments = action.payload;
        }
      })
      .addCase(getAllRepliesForComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.post = action.payload;
        }
      })
      .addCase(getAPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(commentOnPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.comments.unshift(action.payload);
        }
      })
      .addCase(commentOnPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(editComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          state.comments[index] = action.payload;
          state.editCommentStatus = 'success';
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(likeComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          state.comments[index] = action.payload;
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(likeReplyComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(likeReplyComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          state.repliedcomments[index] = action.payload;
        }
      })
      .addCase(likeReplyComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.comments.findIndex((c: any) => c._id === action.payload._id);
          state.comments.splice(index, 1);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(allCommentForAPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(allCommentForAPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.comments = action.payload;
        }
      })
      .addCase(allCommentForAPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(replyComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
           state.repliedcomments.unshift(action.payload);
        }
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getLikesforaPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getLikesforaPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.view = 'likes';
           state.likes= action.payload;
        }
      })
      .addCase(getLikesforaPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getBookmarkforaPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBookmarkforaPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.view = 'bookmark';
           state.bookmark=action.payload;
        }
      })
      .addCase(getBookmarkforaPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getresharedforaPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getresharedforaPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.view = 'reshare';
           state.reshared=action.payload;
        }
      })
      .addCase(getresharedforaPost.rejected, (state, action) => {
        state.status = "failed";
      })
      
  },
});

export const { logout, resetEditCommentStatus } = postSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postSlice.reducer;
