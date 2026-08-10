import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";
import api from "../utils/api";

// Get Profile
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        apiList.profile.getProfile(userId)
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        apiList.profile.updateProfile(userId),
        profileData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Upload Avatar
export const uploadAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      console.log(
        "UPLOAD URL =>",
        apiList.profile.uploadAvatar(userId)
      );

      const response = await api.post(
        apiList.profile.uploadAvatar(userId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "UPLOAD RESPONSE =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log(
        "UPLOAD ERROR =>",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",

  initialState: {
    profileData: null,
    updateProfileData: null,
    avatarData: null,

    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
         console.log(
    "GET PROFILE RESPONSE =>",
    action.payload
  );
        state.loading = false;
        state.profileData = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProfileData = action.payload;
        state.profileData = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatarData = action.payload;

        if (state.profileData) {
          state.profileData.avatar_url =
            action.payload.avatar_url;
        }
      })

      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;