// import {
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import {
//   API_ENDPOINTS as apiList,
// } from "../config/apiEndpoints";

// import api from "../utils/api";

// // =====================================================
// // GET PROFILE
// // =====================================================

// export const getProfile =
//   createAsyncThunk(
//     "profile/getProfile",
//     async (
//       userId,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await api.get(
//             apiList.profile.getProfile(
//               userId
//             )
//           );

//         console.log(
//           "GET PROFILE RESPONSE =>",
//           response.data
//         );

//         return response.data;
//       } catch (error) {
//         console.log(
//           "GET PROFILE ERROR =>",
//           error.response?.data ||
//             error.message
//         );

//         return rejectWithValue(
//           error.response?.data ||
//             error.message
//         );
//       }
//     }
//   );

// // =====================================================
// // UPDATE PROFILE
// // =====================================================

// export const updateProfile =
//   createAsyncThunk(
//     "profile/updateProfile",
//     async (
//       {
//         userId,
//         profileData,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         console.log(
//           "UPDATE PROFILE URL =>",
//           apiList.profile.updateProfile(
//             userId
//           )
//         );

//         console.log(
//           "UPDATE PROFILE DATA =>",
//           profileData
//         );

//         const response =
//           await api.put(
//             apiList.profile.updateProfile(
//               userId
//             ),
//             profileData
//           );

//         console.log(
//           "UPDATE PROFILE RESPONSE =>",
//           response.data
//         );

//         return response.data;
//       } catch (error) {
//         console.log(
//           "UPDATE PROFILE ERROR =>",
//           error.response?.data ||
//             error.message
//         );

//         return rejectWithValue(
//           error.response?.data ||
//             error.message
//         );
//       }
//     }
//   );

// // =====================================================
// // UPLOAD AVATAR
// // =====================================================

// export const uploadAvatar =
//   createAsyncThunk(
//     "profile/uploadAvatar",
//     async (
//       {
//         userId,
//         formData,
//       },
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await api.post(
//             apiList.profile.uploadAvatar(
//               userId
//             ),
//             formData,
//             {
//               headers: {
//                 "Content-Type":
//                   "multipart/form-data",
//               },
//             }
//           );

//         console.log(
//           "UPLOAD AVATAR RESPONSE =>",
//           response.data
//         );

//         return response.data;
//       } catch (error) {
//         console.log(
//           "UPLOAD AVATAR ERROR =>",
//           error.response?.data ||
//             error.message
//         );

//         return rejectWithValue(
//           error.response?.data ||
//             error.message
//         );
//       }
//     }
//   );

// // =====================================================
// // DELETE AVATAR
// // =====================================================

// export const deleteAvatar =
//   createAsyncThunk(
//     "profile/deleteAvatar",
//     async (
//       userId,
//       { rejectWithValue }
//     ) => {
//       try {
//         const response =
//           await api.delete(
//             apiList.profile.deleteAvatar(
//               userId
//             )
//           );

//         console.log(
//           "DELETE AVATAR RESPONSE =>",
//           response.data
//         );

//         return response.data;
//       } catch (error) {
//         console.log(
//           "DELETE AVATAR ERROR =>",
//           error.response?.data ||
//             error.message
//         );

//         return rejectWithValue(
//           error.response?.data ||
//             error.message
//         );
//       }
//     }
//   );

// // =====================================================
// // SLICE
// // =====================================================

// const profileSlice =
//   createSlice({
//     name: "profile",

//     initialState: {
//       profileData: null,
//       updateProfileData: null,
//       avatarData: null,

//       loading: false,
//       error: null,
//     },

//     reducers: {},

//     extraReducers: (builder) => {
//       builder

//         // =============================================
//         // GET PROFILE
//         // =============================================

//         .addCase(
//           getProfile.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           getProfile.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.profileData =
//               action.payload;
//           }
//         )

//         .addCase(
//           getProfile.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;
//             state.error =
//               action.payload;
//           }
//         )

//         // =============================================
//         // UPDATE PROFILE
//         // =============================================

//         .addCase(
//           updateProfile.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           updateProfile.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.updateProfileData =
//               action.payload;

//             // IMPORTANT:
//             // Keep Redux profile immediately updated
//             state.profileData =
//               action.payload;
//           }
//         )

//         .addCase(
//           updateProfile.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.error =
//               action.payload;
//           }
//         )

//         // =============================================
//         // UPLOAD AVATAR
//         // =============================================

//         .addCase(
//           uploadAvatar.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           uploadAvatar.fulfilled,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.avatarData =
//               action.payload;

//             if (
//               state.profileData &&
//               action.payload
//                 ?.avatar_url
//             ) {
//               state.profileData.avatar_url =
//                 action.payload.avatar_url;
//             }
//           }
//         )

//         .addCase(
//           uploadAvatar.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.error =
//               action.payload;
//           }
//         )

//         // =============================================
//         // DELETE AVATAR
//         // =============================================

//         .addCase(
//           deleteAvatar.pending,
//           (state) => {
//             state.loading = true;
//             state.error = null;
//           }
//         )

//         .addCase(
//           deleteAvatar.fulfilled,
//           (
//             state
//           ) => {
//             state.loading = false;

//             if (
//               state.profileData
//             ) {
//               state.profileData.avatar_url =
//                 null;
//             }
//           }
//         )

//         .addCase(
//           deleteAvatar.rejected,
//           (
//             state,
//             action
//           ) => {
//             state.loading = false;

//             state.error =
//               action.payload;
//           }
//         );
//     },
//   });

// export default profileSlice.reducer;


import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  API_ENDPOINTS,
} from "../config/apiEndpoints";

import api from "../utils/api";


// =====================================================
// GET PROFILE
// GET /api/users/{user_id}
// =====================================================

export const getProfile =
  createAsyncThunk(
    "profile/getProfile",

    async (
      userId,
      { rejectWithValue }
    ) => {

      try {

        console.log(
          "========== GET PROFILE =========="
        );

        console.log(
          "GET PROFILE USER ID =>",
          userId
        );


        const response =
          await api.get(
            API_ENDPOINTS.profile.getProfile(
              userId
            )
          );


        console.log(
          "GET PROFILE RESPONSE =>",
          response.data
        );


        /*
         * IMPORTANT
         *
         * Return both the userId and
         * profile data.
         *
         * This allows Redux to store:
         *
         * profiles[16] = testuser1
         * profiles[22] = srinivas
         */

        return {
          userId,
          profile: response.data,
        };

      } catch (error) {

        console.log(
          "GET PROFILE ERROR =>",
          error.response?.data ||
          error.message
        );


        return rejectWithValue(
          error.response?.data || {
            message: error.message,
          }
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
          API_ENDPOINTS.profile.updateProfile(
            userId
          )
        );


        console.log(
          "UPDATE PROFILE DATA =>",
          profileData
        );


        const response =
          await api.put(
            API_ENDPOINTS.profile.updateProfile(
              userId
            ),
            profileData
          );


        console.log(
          "UPDATE PROFILE RESPONSE =>",
          response.data
        );


        return {
          userId,
          profile: response.data,
        };

      } catch (error) {

        console.log(
          "UPDATE PROFILE ERROR =>",
          error.response?.data ||
          error.message
        );


        return rejectWithValue(
          error.response?.data || {
            message: error.message,
          }
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

            API_ENDPOINTS.profile.uploadAvatar(
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


        return {
          userId,
          data: response.data,
        };

      } catch (error) {

        console.log(
          "UPLOAD AVATAR ERROR =>",
          error.response?.data ||
          error.message
        );


        return rejectWithValue(
          error.response?.data || {
            message: error.message,
          }
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
            API_ENDPOINTS.profile.deleteAvatar(
              userId
            )
          );


        console.log(
          "DELETE AVATAR RESPONSE =>",
          response.data
        );


        return {
          userId,
          data: response.data,
        };

      } catch (error) {

        console.log(
          "DELETE AVATAR ERROR =>",
          error.response?.data ||
          error.message
        );


        return rejectWithValue(
          error.response?.data || {
            message: error.message,
          }
        );

      }

    }
  );


// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {

  /*
   * IMPORTANT
   *
   * Profiles are stored using USER ID.
   *
   * Example:
   *
   * profiles: {
   *   16: {
   *     id: 16,
   *     username: "testuser1"
   *   },
   *
   *   22: {
   *     id: 22,
   *     username: "srinivas"
   *   }
   * }
   */

  profiles: {},


  loading: false,

  error: null,

};


// =====================================================
// SLICE
// =====================================================

const profileSlice =
  createSlice({

    name: "profile",

    initialState,

    reducers: {

      // ===============================================
      // CLEAR ALL PROFILES
      // ===============================================

      clearProfiles: (state) => {

        state.profiles = {};

        state.loading = false;

        state.error = null;

      },

    },


    extraReducers: (builder) => {

      // =================================================
      // GET PROFILE
      // =================================================

      builder

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

            const {
              userId,
              profile,
            } = action.payload;


            /*
             * IMPORTANT
             *
             * Do NOT do:
             *
             * state.profileData = profile
             *
             * Instead store by ID.
             */

            state.profiles[userId] =
              profile;

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
        );


      // =================================================
      // UPDATE PROFILE
      // =================================================

      builder

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


            const {
              userId,
              profile,
            } = action.payload;


            /*
             * Update only this user's profile.
             */

            state.profiles[userId] =
              profile;

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
        );


      // =================================================
      // UPLOAD AVATAR
      // =================================================

      builder

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


            const {
              userId,
              data,
            } = action.payload;


            /*
             * Update only selected user's avatar.
             */

            if (
              state.profiles[userId]
            ) {

              state.profiles[userId]
                .avatar_url =
                  data?.avatar_url ??
                  null;

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
        );


      // =================================================
      // DELETE AVATAR
      // =================================================

      builder

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
            state,
            action
          ) => {

            state.loading = false;


            const {
              userId,
            } = action.payload;


            /*
             * Only remove avatar from
             * the specified user.
             */

            if (
              state.profiles[userId]
            ) {

              state.profiles[userId]
                .avatar_url = null;

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


// =====================================================
// ACTIONS
// =====================================================

export const {
  clearProfiles,
} = profileSlice.actions;


// =====================================================
// SELECTORS
// =====================================================

export const selectProfile =
  (
    state,
    userId
  ) =>
    state.profile.profiles[userId];


export const selectProfileLoading =
  (state) =>
    state.profile.loading;


export const selectProfileError =
  (state) =>
    state.profile.error;


// =====================================================
// REDUCER
// =====================================================

export default profileSlice.reducer;
