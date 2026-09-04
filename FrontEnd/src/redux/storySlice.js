import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../utils/api";
import { API_ENDPOINTS } from "../config/apiEndpoints";

// =====================================================
// GET STORY FEED
// =====================================================

export const getStoryFeed = createAsyncThunk(
  "stories/getStoryFeed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_ENDPOINTS.stories.getStoryFeed
      );

      console.log(
        "STORY FEED RESPONSE =>",
        response.data
      );

      return response.data?.items || [];
    } catch (error) {
      console.log(
        "GET STORY FEED ERROR =>",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// =====================================================
// GET MY STORIES
// =====================================================

export const getMyStories = createAsyncThunk(
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
      console.log(
        "GET MY STORIES ERROR =>",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// =====================================================
// CREATE STORY
// =====================================================

export const createStory = createAsyncThunk(
  "stories/createStory",
  async (
    { file, caption },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "===================================="
      );
      console.log("CREATING STORY...");
      console.log("URI =>", file?.uri);
      console.log("TYPE =>", file?.type);
      console.log(
        "FILENAME =>",
        file?.fileName
      );
      console.log(
        "MIMETYPE =>",
        file?.mimeType
      );
      console.log(
        "===================================="
      );

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

      const response = await api.post(
        API_ENDPOINTS.stories.createStory,
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

export const viewStory = createAsyncThunk(
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

export const deleteStory = createAsyncThunk(
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

export const getStory = createAsyncThunk(
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
      console.log(
        "GET STORY ERROR =>",
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
            API_ENDPOINTS.stories.getStoryViewers(
              storyId
            )
          );

        console.log(
          "STORY VIEWERS RESPONSE =>",
          response.data
        );

        return response.data;
      } catch (error) {
        console.log(
          "GET STORY VIEWERS ERROR =>",
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
// REACT TO STORY
// =====================================================

export const reactToStory = createAsyncThunk(
  "stories/reactToStory",
  async ({ storyId, emoji }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_ENDPOINTS.stories.reactToStory(storyId),
        { emoji }
      );

      console.log(
        "STORY REACTION RESPONSE =>",
        response.data
      );

      return {
        storyId,
        emoji,
        ...response.data,
      };
    } catch (error) {
      console.log(
        "STORY REACTION ERROR =>",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || error.message
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
            API_ENDPOINTS.stories.removeStoryReaction(
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
            API_ENDPOINTS.stories.getStoryReactions(
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
         console.log("====================================");
      console.log("💬 REPLY TO STORY");
      console.log("STORY ID =>", storyId);
      console.log("CONTENT =>", content);
      console.log(
        "ENDPOINT =>",
        API_ENDPOINTS.stories.replyToStory(storyId)
      );
      console.log("====================================");

        const response =
          await api.post(
            API_ENDPOINTS.stories.replyToStory(
              storyId
            ),
            {
              content,
            }
          );
           console.log("====================================");
      console.log("✅ STORY REPLY SUCCESS");
      console.log("STATUS =>", response.status);
      console.log("RESPONSE =>", response.data);
      console.log("MESSAGE ID =>", response.data?.id);
      console.log(
        "CONVERSATION ID =>",
        response.data?.conversation_id
      );
      console.log(
        "REPLY TO STORY ID =>",
        response.data?.reply_to_story_id
      );
      console.log("====================================");

        return response.data;
      } catch (error) {
        console.log("====================================");
      console.log("❌ STORY REPLY ERROR");
      console.log(
        "STATUS =>",
        error.response?.status
      );
      console.log(
        "DATA =>",
        error.response?.data
      );
      console.log(
        "MESSAGE =>",
        error.message
      );
      console.log("====================================");
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

          state.feed =
            Array.isArray(
              action.payload
            )
              ? action.payload
              : [];
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
        getMyStories.pending,
        (state) => {
          state.error = null;
        }
      )

      .addCase(
        getMyStories.fulfilled,
        (state, action) => {
          const payload =
            action.payload;

          if (
            Array.isArray(payload)
          ) {
            state.myStories =
              payload;
          } else if (
            Array.isArray(
              payload?.stories
            )
          ) {
            state.myStories =
              payload.stories;
          } else if (
            Array.isArray(
              payload?.items
            )
          ) {
            state.myStories =
              payload.items;
          } else {
            state.myStories = [];
          }
        }
      )

      .addCase(
        getMyStories.rejected,
        (state, action) => {
          state.myStories = [];
          state.error =
            action.payload;
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

          // ---------------------------------------------
          // Update current user's story group
          // ---------------------------------------------

          const newStoryUserId =
            newStory?.user_id ??
            newStory?.user?.id;

          const existingUser =
            state.feed.find(
              (item) =>
                String(
                  item?.user?.id
                ) ===
                String(
                  newStoryUserId
                )
            );

          if (existingUser) {
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
            action.payload?.storyId;

          const serverViewsCount =
            action.payload?.views_count;

          // ---------------------------------------------
          // Update feed story
          // ---------------------------------------------

          state.feed.forEach(
            (user) => {
              if (
                !Array.isArray(
                  user?.stories
                )
              ) {
                return;
              }

              user.stories.forEach(
                (story) => {
                  if (
                    String(
                      story?.id
                    ) ===
                    String(storyId)
                  ) {
                    story.viewed_by_me =
                      true;

                    if (
                      typeof serverViewsCount ===
                      "number"
                    ) {
                      story.views_count =
                        serverViewsCount;
                    }
                  }
                }
              );

              user.has_unseen =
                user.stories.some(
                  (story) =>
                    !story?.viewed_by_me
                );
            }
          );

          // ---------------------------------------------
          // Update my stories
          // ---------------------------------------------

          state.myStories.forEach(
            (story) => {
              if (
                String(
                  story?.id
                ) ===
                String(storyId)
              ) {
                story.viewed_by_me =
                  true;

                if (
                  typeof serverViewsCount ===
                  "number"
                ) {
                  story.views_count =
                    serverViewsCount;
                }
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

          // ---------------------------------------------
          // Remove from my stories
          // ---------------------------------------------

          state.myStories =
            state.myStories.filter(
              (story) =>
                String(
                  story?.id
                ) !==
                String(storyId)
            );

          // ---------------------------------------------
          // Remove from feed
          // ---------------------------------------------

          state.feed =
            state.feed
              .map((user) => {
                if (
                  !Array.isArray(
                    user?.stories
                  )
                ) {
                  return user;
                }

                user.stories =
                  user.stories.filter(
                    (story) =>
                      String(
                        story?.id
                      ) !==
                      String(storyId)
                  );

                user.has_unseen =
                  user.stories.some(
                    (story) =>
                      !story?.viewed_by_me
                  );

                return user;
              })
              .filter(
                (user) =>
                  Array.isArray(
                    user?.stories
                  ) &&
                  user.stories.length >
                    0
              );

          // ---------------------------------------------
          // Clear viewers
          // ---------------------------------------------

          state.viewers = [];
        }
      )

      .addCase(
        deleteStory.rejected,
        (state, action) => {
          state.deleting = false;

          state.error =
            action.payload;
        }
      )

      // =================================================
      // VIEWERS
      // =================================================

      .addCase(
        getStoryViewers.pending,
        (state) => {
          state.error = null;
        }
      )

      .addCase(
        getStoryViewers.fulfilled,
        (state, action) => {
          const payload =
            action.payload;

          if (
            Array.isArray(payload)
          ) {
            state.viewers =
              payload;
          } else if (
            Array.isArray(
              payload?.viewers
            )
          ) {
            state.viewers =
              payload.viewers;
          } else if (
            Array.isArray(
              payload?.items
            )
          ) {
            state.viewers =
              payload.items;
          } else {
            state.viewers = [];
          }
        }
      )

      .addCase(
        getStoryViewers.rejected,
        (state, action) => {
          state.viewers = [];

          state.error =
            action.payload;
        }
      )

      // =================================================
      // REACTIONS
      // =================================================

      .addCase(
  reactToStory.fulfilled,
  (state, action) => {
    const storyId =
      action.payload?.storyId;

    const emoji =
      action.payload?.emoji;

    const reactionsCount =
      action.payload?.reactions_count;

    // ---------------------------------------------
    // UPDATE FEED
    // ---------------------------------------------

    state.feed.forEach((userGroup) => {
      if (!Array.isArray(userGroup?.stories)) {
        return;
      }

      userGroup.stories.forEach((story) => {
        if (
          String(story?.id) ===
          String(storyId)
        ) {
          story.my_reaction = emoji;

          if (
            typeof reactionsCount === "number"
          ) {
            story.reactions_count =
              reactionsCount;
          } else {
            story.reactions_count =
              (story.reactions_count || 0) + 1;
          }
        }
      });
    });

    // ---------------------------------------------
    // UPDATE MY STORIES
    // ---------------------------------------------

    state.myStories.forEach((story) => {
      if (
        String(story?.id) ===
        String(storyId)
      ) {
        story.my_reaction = emoji;

        if (
          typeof reactionsCount === "number"
        ) {
          story.reactions_count =
            reactionsCount;
        } else {
          story.reactions_count =
            (story.reactions_count || 0) + 1;
        }
      }
    });

    console.log(
      "✅ STORY REACTION UPDATED",
      {
        storyId,
        emoji,
        reactionsCount,
      }
    );
  }
)

.addCase(
  removeStoryReaction.fulfilled,
  (state, action) => {
    const storyId =
      action.meta.arg;

    const reactionsCount =
      action.payload?.reactions_count;

    state.feed.forEach((userGroup) => {
      if (!Array.isArray(userGroup?.stories)) {
        return;
      }

      userGroup.stories.forEach((story) => {
        if (
          String(story?.id) ===
          String(storyId)
        ) {
          story.my_reaction = null;

          if (
            typeof reactionsCount === "number"
          ) {
            story.reactions_count =
              reactionsCount;
          } else {
            story.reactions_count =
              Math.max(
                0,
                (story.reactions_count || 0) - 1
              );
          }
        }
      });
    });

    state.myStories.forEach((story) => {
      if (
        String(story?.id) ===
        String(storyId)
      ) {
        story.my_reaction = null;

        if (
          typeof reactionsCount === "number"
        ) {
          story.reactions_count =
            reactionsCount;
        } else {
          story.reactions_count =
            Math.max(
              0,
              (story.reactions_count || 0) - 1
            );
        }
      }
    });

    console.log(
      "✅ STORY REACTION REMOVED",
      storyId
    );
  }
)

      .addCase(
        getStoryReactions.fulfilled,
        (state, action) => {
          const payload =
            action.payload;

          if (
            Array.isArray(payload)
          ) {
            state.reactions =
              payload;
          } else if (
            Array.isArray(
              payload?.items
            )
          ) {
            state.reactions =
              payload.items;
          } else if (
            Array.isArray(
              payload?.reactions
            )
          ) {
            state.reactions =
              payload.reactions;
          } else {
            state.reactions = [];
          }
        }
      );
  },
});

export default storySlice.reducer;