import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../../app/store";
import { act } from "@testing-library/react";
import * as api from './PostAPI'



export interface PostInterface {
  posts: any[];
  searchPosts: any[];
  usersPosts: any[];
  stories: any[];
  imageUpload: any[];
  storyOwner: any;
  viewstories: any[];
  trendingPost: any[];
  storyNumberOfViews: number;
  post: any;
  story: any;
  currentSearch: string;
  viewingStory: boolean;
  menuActive: boolean;
  isEditPost: boolean;
  comments: any[];
  repliedcomments: any[];
  likes: any[];
  bookmark: any[];
  reshared: any[];
  openPostForm: boolean;
  whichPost: 'story' | 'post' | 'none';
  view: 'likes' | 'bookmark' | 'reshare' | 'none'
  status: "success" | "loading" | "failed" | "idle";
  editCommentStatus: "success" | "loading" | "failed" | "idle";
  hideMobileNav: boolean
}

const initialState: PostInterface = {
  posts: [],
  searchPosts: [],
  trendingPost: [],
  usersPosts: [],
  stories: [],
  viewstories: [],
  post: {},
  imageUpload: [],
  story: {},
  storyOwner: {},
  storyNumberOfViews: 0,
  comments: [],
  status: "idle",
  repliedcomments: [],
  viewingStory: false,
  menuActive: false,
  currentSearch: '',
  likes: [],
  bookmark: [],
  openPostForm: false,
  isEditPost: false,
  hideMobileNav: false,
  whichPost: 'none',
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

export const createStory = createAsyncThunk("/story/new", async (story: any) => {
  try {
    const res = await api.createstory(story);
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

export const searchForPost = createAsyncThunk("/post/search", async (word: string) => {
  try {
    const res = await api.searchForPost(word);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getAvailableStories = createAsyncThunk("/story/available", async () => {
  try {
    const res = await api.fetchAvailableStories();
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getAllUserPosts = createAsyncThunk("/story/userposts", async (userId: string) => {
  try {
    const res = await api.fetchAllPostsForAUser(userId);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getAllUserStories = createAsyncThunk("/story/userstories", async (userId: string) => {
  try {
    const res = await api.fetchAllUserStories(userId);
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

export const deleteRepliedComment = createAsyncThunk("/post/deletereplycomment", async (comments: any) => {
  try {
    const res = await api.deleteRepliedComment(comments);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const allImagesUserAPost = createAsyncThunk("/post/allusersImage", async (comments: any) => {
  try {
    const res = await api.usersPostImages(comments);
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

export const topPostTrending = createAsyncThunk("/post/trending", async () => {
  try {
    const res = await api.postTrending();
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
    openpostForm: (state, action: PayloadAction<boolean>) => {
       state.openPostForm = action.payload;
    },
    setWhichPost: (state, action: PayloadAction<'story' | 'post' | 'none'>) => {
       state.whichPost = action.payload;
    },
    resetSearchPost: (state) => {
       state.searchPosts = [];
    },
    currentSearchTrend: (state, action: PayloadAction<string>) => {
       state.currentSearch = action.payload;
    },
    updateViewingStatus: (state, action: PayloadAction<boolean>) => {
       state.viewingStory = action.payload;
    },
    shouldWeHideMobileNav: (state, action: PayloadAction<boolean>) => {
       state.hideMobileNav = action.payload;
    },
    shouldWeEditPost: (state, action: PayloadAction<boolean>) => {
       state.isEditPost = action.payload;
    },
    setMenuActive: (state, action: PayloadAction<boolean>) => {
       state.menuActive = action.payload;
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
          state.posts.unshift(action.payload)
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createStory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createStory.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
          state.story = action.payload;
        }
      })
      .addCase(createStory.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._id) {
          state.status = "success";
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
        if (action.payload !== undefined) {
          state.status = "success";
          const findIndex = state.posts.findIndex((p: any) => p._id === action.payload);
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
      .addCase(searchForPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchForPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.searchPosts = action.payload;
        }
      })
      .addCase(searchForPost.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAvailableStories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAvailableStories.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.stories = action.payload;
        }
      })
      .addCase(getAvailableStories.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllUserStories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUserStories.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.viewstories = action.payload.photoUrls;
          state.storyOwner = action.payload.owner;
        }
      })
      .addCase(getAllUserStories.rejected, (state, action) => {
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
      .addCase(deleteRepliedComment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteRepliedComment.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          const index = state.repliedcomments.findIndex((c: any) => c._id === action.payload);
          state.repliedcomments.splice(index, 1)
        }
      })
      .addCase(deleteRepliedComment.rejected, (state, action) => {
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
      .addCase(allImagesUserAPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(allImagesUserAPost.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.imageUpload = action.payload;
        }
      })
      .addCase(allImagesUserAPost.rejected, (state, action) => {
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
      .addCase(getAllUserPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUserPosts.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          state.usersPosts = action.payload;
        }
      })
      .addCase(getAllUserPosts.rejected, (state, action) => {
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
      .addCase(topPostTrending.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(topPostTrending.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
           state.trendingPost = action.payload;
        }
      })
      .addCase(topPostTrending.rejected, (state, action) => {
        state.status = "failed";
      })
      
  },
});

export const { logout, resetEditCommentStatus, openpostForm, shouldWeHideMobileNav, setWhichPost, setMenuActive, updateViewingStatus, resetSearchPost, shouldWeEditPost, currentSearchTrend } = postSlice.actions;

export const selectPost = (state: RootState) => state.posts;

export default postSlice.reducer;
