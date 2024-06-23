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
  status: "success" | "loading" | "failed" | "idle";
}

const initialState: userState = {
  user: authUser ? authUser : {},
  otherperson: otherUser ? otherUser : {},
  users: allUser ? allUser : [],
  profile: profile ? profile : {},
  status: "idle",
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

// export const passwordChange = createAsyncThunk(
//   "/user/changepassword",
//   async (data: any) => {
//     try {
//       const res = await api.passwordReset(data);
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const getAUser = createAsyncThunk(
//   "/user/getAUser",
//   async (data: any) => {
//     try {
//       const res = await api.fetchAUser(data);
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const getotherUser = createAsyncThunk(
//   "/user/getotherUser",
//   async (data: any) => {
//     try {
//       const res = await api.fetchOtherUser(data);
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const getAllUser = createAsyncThunk(
//   "/user/getAllUser",
//   async (token: any) => {
//     try {
//       const res = await api.fetchAllUser(token);
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// export const deleteUser = createAsyncThunk(
//   "/user/delete",
//   async (data: any) => {
//     try {
//       const res = await api.deleteuser(data);
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );



// export const uploadUserPhoto = createAsyncThunk(
//   "/user/imageUpload",
//   async (data: any) => {
//     try {
//       const res = await api.uploadProfilePics(data);
//       return res?.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('regslice  ', action.payload)
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
        console.log('errtttt   ', action.payload)
      })
      .addCase(createUserProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createUserProfile.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.status = "success";
          console.log('the profile updated is ', action.payload)
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
        console.log('resetPassword ', action.payload)
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
      
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;