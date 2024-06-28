import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../../../app/store";
import * as api from "./authAPI";
import { act } from "@testing-library/react";

const authUser = JSON.parse(localStorage.getItem("user") as any);
const profile = JSON.parse(localStorage.getItem("profile") as any);
const otherUser = JSON.parse(localStorage.getItem("otheruser") as any);
const allUser = JSON.parse(localStorage.getItem("alluser") as any);

export interface userState {
  user: any;
  otherperson: any;
  profile: any;
  users: any;
  followers: any[];
  following: any[];
  active: string;
  profileType: 'local' | 'foreign';
  status: "success" | "loading" | "failed" | "idle";
}

const initialState: userState = {
  user: authUser ? authUser : {},
  otherperson: otherUser ? otherUser : {},
  users: allUser ? allUser : [],
  profile: profile ? profile : {},
  followers: [],
  following: [],
  active: 'home',
  status: "idle",
  profileType: 'local',
};

export const registerUser = createAsyncThunk("/user/new", async (user: any) => {
  try {
    const data = await api.signup(user);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createUserProfile = createAsyncThunk("/user/profile", async (user: any) => {
  try {
    const data = await api.updateProfile(user);
    return data;
  } catch (error) {
    console.log(error);
  }
});



export const loginUser = createAsyncThunk("/user/login", async (user: any, thunkAPI) => {
  try {
    const res = await api.login(user);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const userVerification = createAsyncThunk( "/user/verify", async (data: any) => {
    try {
      const res = await api.verifyUser(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPassword = createAsyncThunk( "/user/passwordreset", async (data: any) => {
    try {
      const res = await api.passwordReset(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const emailPasswordLink = createAsyncThunk(
  "/user/emaillink",
  async (data: any) => {
    try {
      const res = await api.passwordRecovery(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userFollowers = createAsyncThunk(
  "/user/followers",
  async (data: any) => {
    try {
      const res = await api.userFollowers(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userFollowing = createAsyncThunk(
  "/user/following",
  async (data: any) => {
    try {
      const res = await api.userFollowing(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFollowing = createAsyncThunk(
  "/user/getfollowing",
  async (data: any) => {
    try {
      const res = await api.getFollowing(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFollowers = createAsyncThunk(
  "/user/getfollowers",
  async (data: any) => {
    try {
      const res = await api.getFollowers(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOtherUser = createAsyncThunk(
  "/user/otheruser",
  async (data: any) => {
    try {
      const res = await api.getAUser(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAUser = createAsyncThunk(
  "/user/aUser",
  async (data: any) => {
    try {
      const res = await api.getAUser(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "/user/all",
  async () => {
    try {
      const res = await api.getAllUser();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);


export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    setProfileType: (state, action: PayloadAction<'local' | 'foreign'>) => {
      state.profileType = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload.email) {
          state.status = "success";
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._doc) {
          state.status = "success";
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(createUserProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          // if there is previous photo and it was edited without the user adding a photo, use the old photo else use the new one
          if(action.payload && action.payload._doc && !action.payload._doc.profilePhoto ){
            const getUser = JSON.parse(localStorage.getItem('user') as any);
            const profilePhoto = getUser && getUser._doc && getUser._doc.profilePhoto;
            const result = { ...action.payload, profilePhoto };
            localStorage.setItem('user', JSON.stringify(result));
            state.user = result;
          }else{
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload;
          }
        }
      })
      .addCase(createUserProfile.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(userVerification.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userVerification.fulfilled, (state, action) => {
        if (action.payload !== undefined && action.payload._doc) {
          state.status = "success";
         
        }
      })
      .addCase(userVerification.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
          state.status = "success";
         
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(emailPasswordLink.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(emailPasswordLink.fulfilled, (state, action) => {
        
          state.status = "success";
         
      })
      .addCase(emailPasswordLink.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(userFollowers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userFollowers.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
         };
      })
      .addCase(userFollowers.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(userFollowing.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userFollowing.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));         
         };
      })
      .addCase(userFollowing.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getFollowing.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.following = action.payload;
          localStorage.setItem('following', JSON.stringify(action.payload.following));
         };
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getFollowers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.followers = action.payload;
          localStorage.setItem('followers', JSON.stringify(action.payload.followers));
         };
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.user = action.payload;
          localStorage.setItem('user', JSON.stringify(action.payload));
         };
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getOtherUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOtherUser.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.otherperson = action.payload;
          localStorage.setItem('otheruser', JSON.stringify(action.payload));
         };
      })
      .addCase(getOtherUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        if(action.payload !== undefined){
          state.status = "success";
          state.users = action.payload;
          localStorage.setItem('alluser', JSON.stringify(action.payload));
         };
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.status = "failed";
      })
      
  },
});

export const { logout, setActivePage, setProfileType } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
