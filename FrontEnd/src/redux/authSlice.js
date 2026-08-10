import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import apiList from "../../api.json";
import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";
import api, {
  authApi,
} from "../utils/api";

import {
  getRefreshToken,
  logoutUser as clearStorage,
  saveTokens,
  saveUser,
} from "../utils/storage";

// Check Username
export const checkUsername =
  createAsyncThunk(
    "auth/checkUsername",

    async (
      username,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.post(
            apiList.auth.checkUsername,
            {
              username,
            }
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { getState, rejectWithValue }) => {
    try {
      const signupData = {
        ...getState().auth.signupData,
        ...data,
      };

      console.log("Final Register Data", signupData);

      const response = await authApi.post(
        apiList.auth.register,
        signupData
      );

      console.log(
        "Register Response",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log(
        "Register Error",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const verifyOtp =
  createAsyncThunk(
    "auth/verifyOtp",

    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.post(
            apiList.auth.verifyOtp,
            data
          );

        const result =
          response.data;

        console.log(
          "VERIFY OTP RESPONSE =>",
          result
        );

        // Save tokens
        await saveTokens(
          result.access_token,
          result.refresh_token
        );

        // Save user
        if (result.user) {
          await saveUser(
            result.user
          );
        }

        return result;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const resendOtp =
  createAsyncThunk(
    "auth/resendOtp",

    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.post(
            apiList.auth.requestOtp,
            data
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const loginUser =
  createAsyncThunk(
    "auth/login",

    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.post(
            apiList.auth.login,
            data
          );

        const result =
          response.data;

        console.log(
          "LOGIN RESPONSE =>",
          result
        );

        // Save tokens
        await saveTokens(
          result.access_token,
          result.refresh_token
        );

        // Save user
        if (result.user) {
          await saveUser(
            result.user
          );
        }

        return result;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const forgotPassword =
  createAsyncThunk(
    "auth/forgotPassword",

    async (
      identifier,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.post(
            apiList.auth.forgotPassword,
            {
              identifier,
            }
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const resetPassword =
  createAsyncThunk(
    "auth/resetPassword",

    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await authApi.post(
            apiList.auth.resetPassword,
            data
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const logout =
  createAsyncThunk(
    "auth/logout",

    async (
      _,
      { rejectWithValue }
    ) => {
      try {
        const refreshToken =
          await getRefreshToken();

        console.log(
          "LOGOUT REFRESH TOKEN EXISTS =>",
          !!refreshToken
        );

        // Already logged out locally
        if (!refreshToken) {
          await clearStorage();

          return {
            message:
              "Logged out successfully",
          };
        }

        // IMPORTANT:
        // Use authApi, NOT api
        //
        // This means logout will NOT
        // trigger access-token refresh.
        const response =
          await authApi.post(
            apiList.auth.logout,
            {
              refresh_token:
                refreshToken,
            }
          );

        console.log(
          "LOGOUT RESPONSE =>",
          response.data
        );

        // Clear local tokens
        await clearStorage();

        return response.data;
      } catch (error) {
        console.log(
          "LOGOUT ERROR =>",
          error.response?.data ||
            error.message
        );

        // Even if backend logout fails,
        // clear local authentication.
        await clearStorage();

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

const authSlice = createSlice({
  name: "auth",

  initialState: {
    signupData: {
      username: "",
      identifier: "",
      password: "",
      date_of_birth: "",
      gender: "",
    },

    usernameData: null,
    registerData: null,
    verifyOtpData: null,
    resendOtpData: null,
    loginData: null,
    forgotPasswordData: null,
    resetPasswordData: null,

    loading: false,
    error: null,
  },

  reducers: {
    setSignupData: (state, action) => {
      state.signupData = {
        ...state.signupData,
        ...action.payload,
      };
    },

    clearSignupData: (state) => {
      state.signupData = {
        username: "",
        identifier: "",
        password: "",
        date_of_birth: "",
        gender: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        checkUsername.fulfilled,
        (state, action) => {
          state.loading = false;
          state.usernameData =
            action.payload;
        }
      )

      .addCase(
        checkUsername.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )
      .addCase(registerUser.pending, (state) => {
  state.loading = true;
})

.addCase(registerUser.fulfilled, (state, action) => {
  state.loading = false;
  state.registerData = action.payload;
})

.addCase(registerUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(verifyOtp.pending, (state) => {
  state.loading = true;
})

.addCase(verifyOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.verifyOtpData = action.payload;

  console.log(
    "VERIFY OTP STORED =>",
    JSON.stringify(action.payload, null, 2)
  );
})

.addCase(verifyOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(resendOtp.pending, (state) => {
  state.loading = true;
})

.addCase(resendOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.resendOtpData = action.payload;
})

.addCase(resendOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(loginUser.pending, (state) => {
  state.loading = true;
})

.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.loginData = action.payload;
    console.log(
    "LOGIN STORED =>",
    JSON.stringify(action.payload, null, 2)
  );
})

.addCase(loginUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(forgotPassword.pending, (state) => {
  state.loading = true;
})

.addCase(forgotPassword.fulfilled, (state, action) => {
  state.loading = false;
  state.forgotPasswordData = action.payload;
})

.addCase(forgotPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(resetPassword.pending, (state) => {
  state.loading = true;
})

.addCase(resetPassword.fulfilled, (state, action) => {
  state.loading = false;
  state.resetPasswordData = action.payload;
})

.addCase(resetPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(
  logout.pending,
  (state) => {
    state.loading = true;
    state.error = null;
  }
)

.addCase(
  logout.fulfilled,
  (state) => {
    state.loading = false;

    state.signupData = {
      username: "",
      identifier: "",
      password: "",
      date_of_birth: "",
      gender: "",
    };

    state.usernameData = null;
    state.registerData = null;
    state.verifyOtpData = null;
    state.resendOtpData = null;
    state.loginData = null;
    state.forgotPasswordData = null;
    state.resetPasswordData = null;
    state.error = null;
  }
)

.addCase(
  logout.rejected,
  (state, action) => {
    state.loading = false;

    // Session is already cleared by thunk
    state.signupData = {
      username: "",
      identifier: "",
      password: "",
      date_of_birth: "",
      gender: "",
    };

    state.usernameData = null;
    state.registerData = null;
    state.verifyOtpData = null;
    state.resendOtpData = null;
    state.loginData = null;
    state.forgotPasswordData = null;
    state.resetPasswordData = null;

    state.error = action.payload;
  }
);
  },
});

export const {
  setSignupData,
  clearSignupData,
} = authSlice.actions;

export default authSlice.reducer;