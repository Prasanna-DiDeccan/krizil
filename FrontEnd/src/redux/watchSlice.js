// import {
//   createSlice,
//   createAsyncThunk,
// } from "@reduxjs/toolkit";

// import api from "../utils/api";
// import { API_ENDPOINTS } from "../config/apiEndpoints";

// // ======================================================
// // START WATCH
// // ======================================================

// export const startWatch = createAsyncThunk(
//   "watch/startWatch",

//   async ({ reelId }, { rejectWithValue }) => {
//     try {
//       console.log("====================================");
//       console.log("▶️ START WATCH");
//       console.log("REEL ID =>", reelId);

//       const response = await api.post(
//         API_ENDPOINTS.watch.start,
//         {
//           reel_id: reelId,
//         }
//       );

//       console.log("✅ WATCH START SUCCESS");
//       console.log("STATUS =>", response.status);
//       console.log("RESPONSE =>", response.data);

//       return response.data;
//     } catch (error) {
//       console.log("====================================");
//       console.log("❌ START WATCH ERROR");

//       console.log(
//         "MESSAGE =>",
//         error?.message
//       );

//       console.log(
//         "STATUS =>",
//         error?.response?.status
//       );

//       console.log(
//         "SERVER ERROR =>",
//         error?.response?.data
//       );

//       return rejectWithValue(
//         error?.response?.data ||
//           error?.message ||
//           "Failed to start watch session"
//       );
//     }
//   }
// );

// // ======================================================
// // END WATCH
// // ======================================================

// export const endWatch = createAsyncThunk(
//   "watch/endWatch",

//   async ({ sessionId }, { rejectWithValue }) => {
//     try {
//       console.log("====================================");
//       console.log("⏹️ END WATCH");
//       console.log("SESSION ID =>", sessionId);

//       const response = await api.post(
//         API_ENDPOINTS.watch.end,
//         {
//           session_id: sessionId,
//         }
//       );

//       console.log("✅ WATCH END SUCCESS");
//       console.log("STATUS =>", response.status);
//       console.log("RESPONSE =>", response.data);

//       return response.data;
//     } catch (error) {
//       console.log("====================================");
//       console.log("❌ END WATCH ERROR");

//       console.log(
//         "MESSAGE =>",
//         error?.message
//       );

//       console.log(
//         "STATUS =>",
//         error?.response?.status
//       );

//       console.log(
//         "SERVER ERROR =>",
//         error?.response?.data
//       );

//       return rejectWithValue(
//         error?.response?.data ||
//           error?.message ||
//           "Failed to end watch session"
//       );
//     }
//   }
// );

// // ======================================================
// // GET WATCH HISTORY
// // ======================================================

// export const getWatchHistory = createAsyncThunk(
//   "watch/getWatchHistory",

//   async (
//     {
//       limit = 20,
//       offset = 0,
//     } = {},
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("====================================");
//       console.log("📜 GET WATCH HISTORY");

//       console.log("LIMIT =>", limit);
//       console.log("OFFSET =>", offset);

//       const response = await api.get(
//         API_ENDPOINTS.watch.history,
//         {
//           params: {
//             limit,
//             offset,
//           },
//         }
//       );

//       console.log("✅ WATCH HISTORY SUCCESS");
//       console.log("STATUS =>", response.status);
//       console.log("RESPONSE =>", response.data);

//       return response.data;
//     } catch (error) {
//       console.log("====================================");
//       console.log("❌ WATCH HISTORY ERROR");

//       console.log(
//         "MESSAGE =>",
//         error?.message
//       );

//       console.log(
//         "STATUS =>",
//         error?.response?.status
//       );

//       console.log(
//         "SERVER ERROR =>",
//         error?.response?.data
//       );

//       return rejectWithValue(
//         error?.response?.data ||
//           error?.message ||
//           "Failed to get watch history"
//       );
//     }
//   }
// );

// // ======================================================
// // GET WATCH STATS
// // ======================================================

// export const getWatchStats = createAsyncThunk(
//   "watch/getWatchStats",

//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("====================================");
//       console.log("📊 GET WATCH STATS");

//       const response = await api.get(
//         API_ENDPOINTS.watch.stats
//       );

//       console.log("✅ WATCH STATS SUCCESS");
//       console.log("STATUS =>", response.status);
//       console.log("RESPONSE =>", response.data);

//       return response.data;
//     } catch (error) {
//       console.log("====================================");
//       console.log("❌ WATCH STATS ERROR");

//       console.log(
//         "MESSAGE =>",
//         error?.message
//       );

//       console.log(
//         "STATUS =>",
//         error?.response?.status
//       );

//       console.log(
//         "SERVER ERROR =>",
//         error?.response?.data
//       );

//       return rejectWithValue(
//         error?.response?.data ||
//           error?.message ||
//           "Failed to get watch stats"
//       );
//     }
//   }
// );

// // ======================================================
// // INITIAL STATE
// // ======================================================

// const initialState = {
//   currentSessionId: null,
//   currentReelId: null,
//   startedAt: null,

//   lastEndedSession: null,

//   history: [],
//   historyTotal: 0,
//   historyLimit: 20,
//   historyOffset: 0,

//   totalWatchSeconds: 0,
//   totalReelsWatched: 0,

//   stats: {
//     today: {
//       watch_seconds: 0,
//       reels_watched: 0,
//     },

//     week: {
//       watch_seconds: 0,
//       reels_watched: 0,
//     },

//     month: {
//       watch_seconds: 0,
//       reels_watched: 0,
//     },

//     total: {
//       watch_seconds: 0,
//       reels_watched: 0,
//     },
//   },

//   starting: false,
//   ending: false,
//   historyLoading: false,
//   statsLoading: false,

//   startError: null,
//   endError: null,
//   historyError: null,
//   statsError: null,
// };

// // ======================================================
// // SLICE
// // ======================================================

// const watchSlice = createSlice({
//   name: "watch",

//   initialState,

//   reducers: {
//     clearCurrentWatchSession: (state) => {
//       console.log(
//         "🧹 CLEAR CURRENT WATCH SESSION"
//       );

//       state.currentSessionId = null;
//       state.currentReelId = null;
//       state.startedAt = null;
//     },

//     resetWatchState: () => {
//       return initialState;
//     },

//     clearWatchHistory: (state) => {
//       state.history = [];
//       state.historyTotal = 0;
//       state.historyOffset = 0;
//     },
//   },

//   extraReducers: (builder) => {
//     // ==================================================
//     // START
//     // ==================================================

//     builder
//       .addCase(
//         startWatch.pending,
//         (state) => {
//           state.starting = true;
//           state.startError = null;
//         }
//       )

//       .addCase(
//         startWatch.fulfilled,
//         (state, action) => {
//           state.starting = false;

//           const data =
//             action.payload || {};

//           state.currentSessionId =
//             data?.session_id ?? null;

//           state.currentReelId =
//             data?.reel_id ?? null;

//           state.startedAt =
//             data?.started_at ?? null;
//         }
//       )

//       .addCase(
//         startWatch.rejected,
//         (state, action) => {
//           state.starting = false;

//           state.startError =
//             action.payload ||
//             "Failed to start watch session";
//         }
//       );

//     // ==================================================
//     // END
//     // ==================================================

//     builder
//       .addCase(
//         endWatch.pending,
//         (state) => {
//           state.ending = true;
//           state.endError = null;
//         }
//       )

//       .addCase(
//         endWatch.fulfilled,
//         (state, action) => {
//           state.ending = false;

//           state.lastEndedSession =
//             action.payload;

//           state.currentSessionId = null;
//           state.currentReelId = null;
//           state.startedAt = null;
//         }
//       )

//       .addCase(
//         endWatch.rejected,
//         (state, action) => {
//           state.ending = false;

//           state.endError =
//             action.payload ||
//             "Failed to end watch session";
//         }
//       );

//     // ==================================================
//     // HISTORY
//     // ==================================================

//     builder
//       .addCase(
//         getWatchHistory.pending,
//         (state) => {
//           state.historyLoading = true;
//           state.historyError = null;
//         }
//       )

//       .addCase(
//         getWatchHistory.fulfilled,
//         (state, action) => {
//           state.historyLoading = false;

//           const data =
//             action.payload || {};

//           const items =
//             Array.isArray(data?.items)
//               ? data.items
//               : [];

//           const offset =
//             Number(data?.offset || 0);

//           // First page
//           if (offset === 0) {
//             state.history = items;
//           } else {
//             // Pagination
//             const existingIds =
//               new Set(
//                 state.history.map(
//                   (item) =>
//                     item.session_id
//                 )
//               );

//             const newItems =
//               items.filter(
//                 (item) =>
//                   !existingIds.has(
//                     item.session_id
//                   )
//               );

//             state.history = [
//               ...state.history,
//               ...newItems,
//             ];
//           }

//           state.historyTotal =
//             Number(data?.total || 0);

//           state.historyLimit =
//             Number(data?.limit || 20);

//           state.historyOffset =
//             offset;

//           state.totalWatchSeconds =
//             Number(
//               data?.total_watch_seconds ||
//                 0
//             );

//           state.totalReelsWatched =
//             Number(
//               data?.total_reels_watched ||
//                 0
//             );
//         }
//       )

//       .addCase(
//         getWatchHistory.rejected,
//         (state, action) => {
//           state.historyLoading = false;

//           state.historyError =
//             action.payload ||
//             "Failed to get watch history";
//         }
//       );

//     // ==================================================
//     // STATS
//     // ==================================================

//     builder
//       .addCase(
//         getWatchStats.pending,
//         (state) => {
//           state.statsLoading = true;
//           state.statsError = null;
//         }
//       )

//       .addCase(
//         getWatchStats.fulfilled,
//         (state, action) => {
//           state.statsLoading = false;

//           state.stats =
//             action.payload || {
//               today: {
//                 watch_seconds: 0,
//                 reels_watched: 0,
//               },

//               week: {
//                 watch_seconds: 0,
//                 reels_watched: 0,
//               },

//               month: {
//                 watch_seconds: 0,
//                 reels_watched: 0,
//               },

//               total: {
//                 watch_seconds: 0,
//                 reels_watched: 0,
//               },
//             };
//         }
//       )

//       .addCase(
//         getWatchStats.rejected,
//         (state, action) => {
//           state.statsLoading = false;

//           state.statsError =
//             action.payload ||
//             "Failed to get watch stats";
//         }
//       );
//   },
// });

// // ======================================================
// // ACTIONS
// // ======================================================

// export const {
//   clearCurrentWatchSession,
//   resetWatchState,
//   clearWatchHistory,
// } = watchSlice.actions;

// // ======================================================
// // SELECTORS
// // ======================================================

// export const selectWatchState = (
//   state
// ) => state.watch;

// export const selectCurrentSessionId = (
//   state
// ) =>
//   state.watch.currentSessionId;

// export const selectCurrentReelId = (
//   state
// ) =>
//   state.watch.currentReelId;

// export const selectWatchStats = (
//   state
// ) =>
//   state.watch.stats;

// export const selectWatchHistory = (
//   state
// ) =>
//   state.watch.history;

// // ======================================================
// // REDUCER
// // ======================================================

// export default watchSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// ======================================================
// START WATCH
// ======================================================

export const startWatch = createAsyncThunk(
  "watch/startWatch",

  async ({ reelId }, { rejectWithValue }) => {
    try {
      console.log("====================================");
      console.log("▶️ START WATCH");
      console.log("REEL ID =>", reelId);

      const response = await api.post(
        API_ENDPOINTS.watch.start,
        {
          reel_id: Number(reelId),
        }
      );

      console.log("✅ WATCH START SUCCESS");
      console.log("STATUS =>", response.status);
      console.log("RESPONSE =>", response.data);

      return response.data;
    } catch (error) {
      console.log("====================================");
      console.log("❌ START WATCH ERROR");

      console.log(
        "MESSAGE =>",
        error?.message
      );

      console.log(
        "STATUS =>",
        error?.response?.status
      );

      console.log(
        "SERVER ERROR =>",
        error?.response?.data
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to start watch session"
      );
    }
  }
);

// ======================================================
// END WATCH
// ======================================================

export const endWatch = createAsyncThunk(
  "watch/endWatch",

  async ({ sessionId }, { rejectWithValue }) => {
    try {
      console.log("====================================");
      console.log("⏹️ END WATCH");
      console.log("SESSION ID =>", sessionId);

      const response = await api.post(
        API_ENDPOINTS.watch.end,
        {
          session_id: Number(sessionId),
        }
      );

      console.log("✅ WATCH END SUCCESS");
      console.log("STATUS =>", response.status);
      console.log("RESPONSE =>", response.data);

      return response.data;
    } catch (error) {
      console.log("====================================");
      console.log("❌ END WATCH ERROR");

      console.log(
        "MESSAGE =>",
        error?.message
      );

      console.log(
        "STATUS =>",
        error?.response?.status
      );

      console.log(
        "SERVER ERROR =>",
        error?.response?.data
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to end watch session"
      );
    }
  }
);

// ======================================================
// GET WATCH HISTORY
// ======================================================

export const getWatchHistory = createAsyncThunk(
  "watch/getWatchHistory",

  async (
    {
      limit = 20,
      offset = 0,
    } = {},
    { rejectWithValue }
  ) => {
    try {
      console.log("====================================");
      console.log("📜 GET WATCH HISTORY");
      console.log("LIMIT =>", limit);
      console.log("OFFSET =>", offset);

      const response = await api.get(
        API_ENDPOINTS.watch.history,
        {
          params: {
            limit: Number(limit),
            offset: Number(offset),
          },
        }
      );

      console.log("✅ WATCH HISTORY SUCCESS");
      console.log(
        "RESPONSE =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log("====================================");
      console.log("❌ WATCH HISTORY ERROR");

      console.log(
        "MESSAGE =>",
        error?.message
      );

      console.log(
        "STATUS =>",
        error?.response?.status
      );

      console.log(
        "SERVER ERROR =>",
        error?.response?.data
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to get watch history"
      );
    }
  }
);

// ======================================================
// GET WATCH STATS
// ======================================================

export const getWatchStats = createAsyncThunk(
  "watch/getWatchStats",

  async (_, { rejectWithValue }) => {
    try {
      console.log("====================================");
      console.log("📊 GET WATCH STATS");

      const response = await api.get(
        API_ENDPOINTS.watch.stats
      );

      console.log("✅ WATCH STATS SUCCESS");
      console.log(
        "RESPONSE =>",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log("====================================");
      console.log("❌ WATCH STATS ERROR");

      console.log(
        "MESSAGE =>",
        error?.message
      );

      console.log(
        "STATUS =>",
        error?.response?.status
      );

      console.log(
        "SERVER ERROR =>",
        error?.response?.data
      );

      return rejectWithValue(
        error?.response?.data ||
          error?.message ||
          "Failed to get watch stats"
      );
    }
  }
);

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  currentSessionId: null,
  currentReelId: null,
  startedAt: null,

  lastEndedSession: null,

  history: [],
  historyTotal: 0,
  historyLimit: 20,
  historyOffset: 0,

  totalWatchSeconds: 0,
  totalReelsWatched: 0,

  stats: {
    today: {
      watch_seconds: 0,
      reels_watched: 0,
    },

    week: {
      watch_seconds: 0,
      reels_watched: 0,
    },

    month: {
      watch_seconds: 0,
      reels_watched: 0,
    },

    total: {
      watch_seconds: 0,
      reels_watched: 0,
    },
  },

  starting: false,
  ending: false,
  historyLoading: false,
  statsLoading: false,

  startError: null,
  endError: null,
  historyError: null,
  statsError: null,
};

// ======================================================
// SLICE
// ======================================================

const watchSlice = createSlice({
  name: "watch",

  initialState,

  reducers: {
    clearCurrentWatchSession: (state) => {
      console.log(
        "🧹 CLEAR CURRENT WATCH SESSION"
      );

      state.currentSessionId = null;
      state.currentReelId = null;
      state.startedAt = null;
    },

    resetWatchState: () => ({
      ...initialState,
    }),

    clearWatchHistory: (state) => {
      state.history = [];
      state.historyTotal = 0;
      state.historyOffset = 0;
      state.totalWatchSeconds = 0;
      state.totalReelsWatched = 0;
    },
  },

  extraReducers: (builder) => {
    // ==================================================
    // START
    // ==================================================

    builder
      .addCase(
        startWatch.pending,
        (state) => {
          state.starting = true;
          state.startError = null;
        }
      )

      .addCase(
        startWatch.fulfilled,
        (state, action) => {
          state.starting = false;

          const data =
            action.payload || {};

          state.currentSessionId =
            data?.session_id != null
              ? Number(data.session_id)
              : null;

          state.currentReelId =
            data?.reel_id != null
              ? Number(data.reel_id)
              : null;

          state.startedAt =
            data?.started_at ?? null;
        }
      )

      .addCase(
        startWatch.rejected,
        (state, action) => {
          state.starting = false;

          state.startError =
            action.payload ||
            "Failed to start watch session";
        }
      );

    // ==================================================
    // END
    // ==================================================

    builder
      .addCase(
        endWatch.pending,
        (state) => {
          state.ending = true;
          state.endError = null;
        }
      )

      .addCase(
        endWatch.fulfilled,
        (state, action) => {
          state.ending = false;

          state.lastEndedSession =
            action.payload;

          state.currentSessionId = null;
          state.currentReelId = null;
          state.startedAt = null;
        }
      )

      .addCase(
        endWatch.rejected,
        (state, action) => {
          state.ending = false;

          state.endError =
            action.payload ||
            "Failed to end watch session";
        }
      );

    // ==================================================
    // HISTORY
    // ==================================================

    builder
      .addCase(
        getWatchHistory.pending,
        (state) => {
          state.historyLoading = true;
          state.historyError = null;
        }
      )

      .addCase(
        getWatchHistory.fulfilled,
        (state, action) => {
          state.historyLoading = false;

          const data =
            action.payload || {};

          const items =
            Array.isArray(data.items)
              ? data.items
              : [];

          const offset =
            Number(data.offset ?? 0);

          const normalizedItems =
            items.map((item) => ({
              ...item,

              session_id:
                Number(
                  item?.session_id ?? 0
                ),

              reel_id:
                Number(
                  item?.reel_id ?? 0
                ),

              watch_seconds:
                Number(
                  item?.watch_seconds ?? 0
                ),
            }));

          // ==============================================
          // FIRST PAGE
          // ==============================================

          if (offset === 0) {
            state.history =
              normalizedItems;
          }

          // ==============================================
          // PAGINATION
          // ==============================================

          else {
            const existingIds =
              new Set(
                state.history.map(
                  (item) =>
                    String(
                      item.session_id
                    )
                )
              );

            const newItems =
              normalizedItems.filter(
                (item) =>
                  !existingIds.has(
                    String(
                      item.session_id
                    )
                  )
              );

            state.history = [
              ...state.history,
              ...newItems,
            ];
          }

          // ==============================================
          // SERVER TOTALS
          // ==============================================

          state.historyTotal =
            Number(data.total ?? 0);

          state.historyLimit =
            Number(data.limit ?? 20);

          state.historyOffset =
            offset;

          state.totalWatchSeconds =
            Number(
              data.total_watch_seconds ??
                0
            );

          state.totalReelsWatched =
            Number(
              data.total_reels_watched ??
                0
            );

          console.log(
            "📊 HISTORY TOTAL SECONDS =>",
            state.totalWatchSeconds
          );

          console.log(
            "📊 HISTORY TOTAL REELS =>",
            state.totalReelsWatched
          );
        }
      )

      .addCase(
        getWatchHistory.rejected,
        (state, action) => {
          state.historyLoading = false;

          state.historyError =
            action.payload ||
            "Failed to get watch history";
        }
      );

    // ==================================================
    // STATS
    // ==================================================

    builder
      .addCase(
        getWatchStats.pending,
        (state) => {
          state.statsLoading = true;
          state.statsError = null;
        }
      )

      .addCase(
        getWatchStats.fulfilled,
        (state, action) => {
          state.statsLoading = false;

          const data =
            action.payload || {};

          state.stats = {
            today: {
              watch_seconds:
                Number(
                  data?.today
                    ?.watch_seconds ?? 0
                ),

              reels_watched:
                Number(
                  data?.today
                    ?.reels_watched ?? 0
                ),
            },

            week: {
              watch_seconds:
                Number(
                  data?.week
                    ?.watch_seconds ?? 0
                ),

              reels_watched:
                Number(
                  data?.week
                    ?.reels_watched ?? 0
                ),
            },

            month: {
              watch_seconds:
                Number(
                  data?.month
                    ?.watch_seconds ?? 0
                ),

              reels_watched:
                Number(
                  data?.month
                    ?.reels_watched ?? 0
                ),
            },

            total: {
              watch_seconds:
                Number(
                  data?.total
                    ?.watch_seconds ?? 0
                ),

              reels_watched:
                Number(
                  data?.total
                    ?.reels_watched ?? 0
                ),
            },
          };

          console.log(
            "📊 NORMALIZED WATCH STATS =>",
            state.stats
          );
        }
      )

      .addCase(
        getWatchStats.rejected,
        (state, action) => {
          state.statsLoading = false;

          state.statsError =
            action.payload ||
            "Failed to get watch stats";
        }
      );
  },
});

// ======================================================
// ACTIONS
// ======================================================

export const {
  clearCurrentWatchSession,
  resetWatchState,
  clearWatchHistory,
} = watchSlice.actions;

// ======================================================
// SELECTORS
// ======================================================

export const selectWatchState = (
  state
) => state.watch;

export const selectCurrentSessionId = (
  state
) =>
  state.watch.currentSessionId;

export const selectCurrentReelId = (
  state
) =>
  state.watch.currentReelId;

export const selectWatchStats = (
  state
) =>
  state.watch.stats;

export const selectWatchHistory = (
  state
) =>
  state.watch.history;

export const selectTotalWatchSeconds = (
  state
) =>
  Number(
    state.watch.totalWatchSeconds || 0
  );

export const selectTotalReelsWatched = (
  state
) =>
  Number(
    state.watch.totalReelsWatched || 0
  );

// ======================================================
// REDUCER
// ======================================================

export default watchSlice.reducer;