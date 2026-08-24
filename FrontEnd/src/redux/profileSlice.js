// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_ENDPOINTS as apiList } from "../config/apiEndpoints";
// import api from "../utils/api";

// // Get Profile
// export const getProfile = createAsyncThunk(
//   "profile/getProfile",
//   async (userId, { rejectWithValue }) => {
//     try {
//        if (!userId) {
//         return rejectWithValue(
//           "User ID is required"
//         );
//       }

//       const response = await api.get(
//         apiList.profile.getProfile(userId)
//       );

//       console.log(
//         "GET PROFILE RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "GET PROFILE ERROR =>",
//         error.response?.data || error.message
//       );
//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// // Update Profile
// export const updateProfile = createAsyncThunk(
//   "profile/updateProfile",
//   async ({ userId, profileData }, { rejectWithValue }) => {
//     try {
//        if (!userId) {
//         return rejectWithValue(
//           "User ID is required"
//         );
//       }

//         console.log(
//         "UPDATE PROFILE USER ID =>",
//         userId
//       );

//       console.log(
//         "UPDATE PROFILE DATA =>",
//         profileData
//       );

//       const response = await api.put(
//         apiList.profile.updateProfile(userId),
//         profileData
//       );

//        console.log(
//         "UPDATE PROFILE RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "UPDATE PROFILE ERROR =>",
//         error.response?.data || error.message
//       );
//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// // Upload Avatar
// export const uploadAvatar = createAsyncThunk(
//   "profile/uploadAvatar",
//   async ({ userId, formData }, { rejectWithValue }) => {
//     try {
//        if (!userId) {
//         return rejectWithValue(
//           "User ID is required"
//         );
//       }

//       console.log(
//         "UPLOAD AVATAR USER ID =>",
//         userId
//       );

//       console.log(
//         "UPLOAD AVATAR URL =>",
//         apiList.profile.uploadAvatar(userId)
//       );

//       const response = await api.post(
//         apiList.profile.uploadAvatar(userId),
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log(
//         "UPLOAD RESPONSE =>",
//         response.data
//       );

//       return response.data;
//     } catch (error) {
//       console.log(
//         "UPLOAD ERROR =>",
//         error.response?.data
//       );

//       return rejectWithValue(
//         error.response?.data || error.message
//       );
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "profile",

//   initialState: {
//     profileData: null,
//     updateProfileData: null,
//     avatarData: null,

//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // Get Profile
//       .addCase(getProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(getProfile.fulfilled, (state, action) => {
//          console.log(
//     "GET PROFILE RESPONSE =>",
//     action.payload
//   );
//         state.loading = false;
//         state.profileData = action.payload;
//       })

//       .addCase(getProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update Profile
//       .addCase(updateProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.updateProfileData = action.payload;
//         state.profileData = action.payload;
//       })

//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Upload Avatar
//       .addCase(uploadAvatar.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(uploadAvatar.fulfilled, (state, action) => {
//         state.loading = false;
//         state.avatarData = action.payload;

//         if (state.profileData) {
//           state.profileData.avatar_url =
//             action.payload.avatar_url;
//         }
//       })

//       .addCase(uploadAvatar.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default profileSlice.reducer;



import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  API_ENDPOINTS as apiList,
} from "../config/apiEndpoints";

import api from "../utils/api";

// =====================================================
// GET PROFILE
// =====================================================

export const getProfile =
  createAsyncThunk(
    "profile/getProfile",
    async (
      userId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.get(
            apiList.profile.getProfile(
              userId
            )
          );

        console.log(
          "GET PROFILE RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "GET PROFILE ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile =
  createAsyncThunk(
    "profile/updateProfile",
    async (
      {
        userId,
        profileData,
      },
      { rejectWithValue }
    ) => {
      try {
        console.log(
          "UPDATE PROFILE URL =>",
          apiList.profile.updateProfile(
            userId
          )
        );

        console.log(
          "UPDATE PROFILE DATA =>",
          profileData
        );

        const response =
          await api.put(
            apiList.profile.updateProfile(
              userId
            ),
            profileData
          );

        console.log(
          "UPDATE PROFILE RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "UPDATE PROFILE ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// =====================================================
// UPLOAD AVATAR
// =====================================================

export const uploadAvatar =
  createAsyncThunk(
    "profile/uploadAvatar",
    async (
      {
        userId,
        formData,
      },
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            apiList.profile.uploadAvatar(
              userId
            ),
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        console.log(
          "UPLOAD AVATAR RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "UPLOAD AVATAR ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// =====================================================
// DELETE AVATAR
// =====================================================

export const deleteAvatar =
  createAsyncThunk(
    "profile/deleteAvatar",
    async (
      userId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.delete(
            apiList.profile.deleteAvatar(
              userId
            )
          );

        console.log(
          "DELETE AVATAR RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "DELETE AVATAR ERROR =>",
          error.response?.data ||
            error.message
        );

        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// =====================================================
// SLICE
// =====================================================

const profileSlice =
  createSlice({
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

        // =============================================
        // GET PROFILE
        // =============================================

        .addCase(
          getProfile.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          getProfile.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.profileData =
              action.payload;
          }
        )

        .addCase(
          getProfile.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;
            state.error =
              action.payload;
          }
        )

        // =============================================
        // UPDATE PROFILE
        // =============================================

        .addCase(
          updateProfile.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          updateProfile.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.updateProfileData =
              action.payload;

            // IMPORTANT:
            // Keep Redux profile immediately updated
            state.profileData =
              action.payload;
          }
        )

        .addCase(
          updateProfile.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        )

        // =============================================
        // UPLOAD AVATAR
        // =============================================

        .addCase(
          uploadAvatar.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          uploadAvatar.fulfilled,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.avatarData =
              action.payload;

            if (
              state.profileData &&
              action.payload
                ?.avatar_url
            ) {
              state.profileData.avatar_url =
                action.payload.avatar_url;
            }
          }
        )

        .addCase(
          uploadAvatar.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        )

        // =============================================
        // DELETE AVATAR
        // =============================================

        .addCase(
          deleteAvatar.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          deleteAvatar.fulfilled,
          (
            state
          ) => {
            state.loading = false;

            if (
              state.profileData
            ) {
              state.profileData.avatar_url =
                null;
            }
          }
        )

        .addCase(
          deleteAvatar.rejected,
          (
            state,
            action
          ) => {
            state.loading = false;

            state.error =
              action.payload;
          }
        );
    },
  });

export default profileSlice.reducer;