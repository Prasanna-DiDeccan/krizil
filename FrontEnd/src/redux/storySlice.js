import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// =====================================================
// GET STORY FEED
// =====================================================

export const getStoryFeed =
  createAsyncThunk(
    "stories/getStoryFeed",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(
          API_ENDPOINTS.stories.getStoryFeed
        );

        return response.data.items || [];
      } catch (error) {
        return rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

// =====================================================
// GET MY STORIES
// =====================================================

export const getMyStories =
  createAsyncThunk(
    "stories/getMyStories",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get(
          API_ENDPOINTS.stories.getMyStories
        );

        console.log(
          "MY STORIES RESPONSE =>",
          response.data
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

// =====================================================
// CREATE STORY
// =====================================================

export const createStory =
  createAsyncThunk(
    "stories/createStory",
    async (
      { file, caption },
      { rejectWithValue }
    ) => {
      try {
        const formData = new FormData();

        formData.append("file", {
          uri: file.uri,
          name:
            file.fileName ||
            "story.jpg",
          type:
            file.mimeType ||
            "image/jpeg",
        });

        if (caption) {
          formData.append(
            "caption",
            caption
          );
        }

        const response =
          await api.post(
            API_ENDPOINTS.stories
              .createStory,
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        console.log(
          "CREATE STORY RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "CREATE STORY ERROR =>",
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
// VIEW STORY
// =====================================================

export const viewStory =
  createAsyncThunk(
    "stories/viewStory",
    async (
      storyId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            API_ENDPOINTS.stories.viewStory(
              storyId
            )
          );

        console.log(
          "VIEW STORY RESPONSE =>",
          response.data
        );

        return {
          storyId,
          ...response.data,
        };
      } catch (error) {
        console.log(
          "VIEW STORY ERROR =>",
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
// DELETE STORY
// =====================================================

export const deleteStory =
  createAsyncThunk(
    "stories/deleteStory",
    async (
      storyId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.delete(
            API_ENDPOINTS.stories.deleteStory(
              storyId
            )
          );

        console.log(
          "DELETE STORY RESPONSE =>",
          response.data
        );

        return storyId;
      } catch (error) {
        console.log(
          "DELETE STORY ERROR =>",
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
// GET SINGLE STORY
// =====================================================

export const getStory =
  createAsyncThunk(
    "stories/getStory",
    async (
      storyId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.get(
            API_ENDPOINTS.stories.getStory(
              storyId
            )
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

// =====================================================
// GET STORY VIEWERS
// =====================================================

export const getStoryViewers =
  createAsyncThunk(
    "stories/getStoryViewers",
    async (
      storyId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.get(
            API_ENDPOINTS.stories
              .getStoryViewers(
                storyId
              )
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

// =====================================================
// REACT TO STORY
// =====================================================

export const reactToStory =
  createAsyncThunk(
    "stories/reactToStory",
    async (
      { storyId, emoji },
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            API_ENDPOINTS.stories
              .reactToStory(
                storyId
              ),
            {
              emoji,
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

// =====================================================
// REMOVE REACTION
// =====================================================

export const removeStoryReaction =
  createAsyncThunk(
    "stories/removeReaction",
    async (
      storyId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.delete(
            API_ENDPOINTS.stories
              .removeStoryReaction(
                storyId
              )
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

// =====================================================
// GET REACTIONS
// =====================================================

export const getStoryReactions =
  createAsyncThunk(
    "stories/getStoryReactions",
    async (
      storyId,
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.get(
            API_ENDPOINTS.stories
              .getStoryReactions(
                storyId
              )
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

// =====================================================
// REPLY
// =====================================================

export const replyToStory =
  createAsyncThunk(
    "stories/replyToStory",
    async (
      { storyId, content },
      { rejectWithValue }
    ) => {
      try {
        const response =
          await api.post(
            API_ENDPOINTS.stories
              .replyToStory(
                storyId
              ),
            {
              content,
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

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  feed: [],
  myStories: [],
  storyDetails: null,
  viewers: [],
  reactions: [],
  loading: false,
  creating: false,
  deleting: false,
  viewing: false,
  error: null,
};

// =====================================================
// SLICE
// =====================================================

const storySlice = createSlice({
  name: "stories",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =================================================
      // FEED
      // =================================================

      .addCase(
        getStoryFeed.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getStoryFeed.fulfilled,
        (state, action) => {
          state.loading = false;
          state.feed = action.payload;
        }
      )

      .addCase(
        getStoryFeed.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // MY STORIES
      // =================================================

      .addCase(
        getMyStories.fulfilled,
        (state, action) => {
          if (
            Array.isArray(
              action.payload
            )
          ) {
            state.myStories =
              action.payload;
          } else if (
            Array.isArray(
              action.payload?.stories
            )
          ) {
            state.myStories =
              action.payload.stories;
          } else if (
            Array.isArray(
              action.payload?.items
            )
          ) {
            state.myStories =
              action.payload.items;
          } else {
            state.myStories = [];
          }
        }
      )

      // =================================================
      // CREATE
      // =================================================

      .addCase(
        createStory.pending,
        (state) => {
          state.creating = true;
          state.error = null;
        }
      )

      .addCase(
        createStory.fulfilled,
        (state, action) => {
          state.creating = false;

          const newStory =
            action.payload;

          if (
            !Array.isArray(
              state.myStories
            )
          ) {
            state.myStories = [];
          }

          state.myStories.unshift(
            newStory
          );

          // Update current user's
          // story group in feed

          const existingUser =
            state.feed.find(
              (item) =>
                item.user?.id ===
                newStory.user_id
            );

          if (
            existingUser
          ) {
            if (
              !Array.isArray(
                existingUser.stories
              )
            ) {
              existingUser.stories =
                [];
            }

            existingUser.stories.unshift(
              newStory
            );

            existingUser.has_unseen =
              true;
          }
        }
      )

      .addCase(
        createStory.rejected,
        (state, action) => {
          state.creating = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // VIEW
      // =================================================

      .addCase(
        viewStory.pending,
        (state) => {
          state.viewing = true;
        }
      )

      .addCase(
        viewStory.fulfilled,
        (state, action) => {
          state.viewing = false;

          const storyId =
            action.payload.storyId;

          state.feed.forEach(
            (user) => {
              if (
                !Array.isArray(
                  user.stories
                )
              ) {
                return;
              }

              user.stories.forEach(
                (story) => {
                  if (
                    story.id ===
                    storyId
                  ) {
                    story.viewed_by_me =
                      true;
                  }
                }
              );

              user.has_unseen =
                user.stories.some(
                  (story) =>
                    !story.viewed_by_me
                );
            }
          );

          state.myStories.forEach(
            (story) => {
              if (
                story.id === storyId
              ) {
                story.viewed_by_me =
                  true;
              }
            }
          );
        }
      )

      .addCase(
        viewStory.rejected,
        (state, action) => {
          state.viewing = false;
          state.error =
            action.payload;
        }
      )

      // =================================================
      // DELETE
      // =================================================

      .addCase(
        deleteStory.pending,
        (state) => {
          state.deleting = true;
          state.error = null;
        }
      )

      .addCase(
        deleteStory.fulfilled,
        (state, action) => {
          state.deleting = false;

          const storyId =
            action.payload;

          // Remove from my stories

          state.myStories =
            state.myStories.filter(
              (story) =>
                story.id !== storyId
            );

          // Remove from feed

          state.feed =
            state.feed
              .map((user) => {
                if (
                  !Array.isArray(
                    user.stories
                  )
                ) {
                  return user;
                }

                user.stories =
                  user.stories.filter(
                    (story) =>
                      story.id !==
                      storyId
                  );

                user.has_unseen =
                  user.stories.some(
                    (story) =>
                      !story.viewed_by_me
                  );

                return user;
              })
              .filter(
                (user) =>
                  user.stories?.length
              );
        }
      )

      .addCase(
        deleteStory.rejected,
        (state, action) => {
          state.deleting = false;
          state.error =
            action.payload;
        }
      );
  },
});

export default storySlice.reducer;