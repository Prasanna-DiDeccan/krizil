export const API_ENDPOINTS = {
  
auth: {
    checkUsername: "/api/auth/check-username",
    register: "/api/auth/register",
    verifyOtp: "/api/auth/verify-otp",
    login: "/api/auth/login",
    refreshToken: "/api/auth/refresh-token",
    logout: "/api/auth/logout",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
    requestOtp: "/api/auth/request-otp",
    me: "/api/auth/me",
  },

  profile: {
    getProfile: (userId) => `/api/users/${userId}`,
    updateProfile: (userId) => `/api/users/${userId}`,
    uploadAvatar: (userId) => `/api/users/${userId}/avatar`,
    deleteAvatar: (userId) => `/api/users/${userId}/avatar`,
    getUserPosts: (userId) => `/api/users/${userId}/posts`,
    getUserReels: (userId) => `/api/users/${userId}/reels`,
    getSavedPosts: (userId) => `/api/users/${userId}/saved`,
     getSavedReels: (userId) => `/api/users/${userId}/saved/reels`,
    getUserStats: (userId) => `/api/users/${userId}/stats`,
  },

  posts: {
    createPost: "/api/posts",
    getFeed: "/api/posts/feed",
    getExplore: "/api/posts/explore",

    getPost: (postId) =>
      `/api/posts/${postId}`,

    updatePost: (postId) =>
      `/api/posts/${postId}`,

    deletePost: (postId) =>
      `/api/posts/${postId}`,

    savePost: (postId) =>
      `/api/posts/${postId}/save`,

    unsavePost: (postId) =>
      `/api/posts/${postId}/save`,
  },

  stories: {
    createStory: "/api/stories",

    getStoryFeed: "/api/stories/feed",

    getMyStories: "/api/stories/mine",

    getStory: (storyId) =>
      `/api/stories/${storyId}`,

    deleteStory: (storyId) =>
      `/api/stories/${storyId}`,

    viewStory: (storyId) =>
      `/api/stories/${storyId}/view`,

    getStoryViewers: (storyId) =>
      `/api/stories/${storyId}/viewers`,

    reactToStory: (storyId) =>
      `/api/stories/${storyId}/react`,

    removeStoryReaction: (storyId) =>
      `/api/stories/${storyId}/react`,

    getStoryReactions: (storyId) =>
      `/api/stories/${storyId}/reactions`,

    replyToStory: (storyId) =>
      `/api/stories/${storyId}/reply`,
  },

  // ======================================================
  // HIGHLIGHTS
  // ======================================================

  highlights: {
    createHighlight: "/api/highlights",

    getUserHighlights: (userId) =>
      `/api/users/${userId}/highlights`,

    getHighlight: (highlightId) =>
      `/api/highlights/${highlightId}`,

    updateHighlight: (highlightId) =>
      `/api/highlights/${highlightId}`,

    deleteHighlight: (highlightId) =>
      `/api/highlights/${highlightId}`,

    addStoriesToHighlight: (highlightId) =>
      `/api/highlights/${highlightId}/stories`,

    removeStoryFromHighlight: (
      highlightId,
      itemId
    ) =>
      `/api/highlights/${highlightId}/stories/${itemId}`,
  },

  follow: {
    followUser: (userId) =>
      `/api/follow/${userId}`,

    unfollowUser: (userId) =>
      `/api/follow/${userId}`,

    getFollowers: (userId) =>
      `/api/users/${userId}/followers`,

    getFollowing: (userId) =>
      `/api/users/${userId}/following`,

    getSuggested: (userId) =>
      `/api/users/${userId}/suggested`,
  },

  reels: {
    
    getFeed: "/api/reels/feed",

    getTrending: "/api/reels/trending",

     getHomeFeed: "/api/reels/home",

    getReel: (reelId) =>
      `/api/reels/${reelId}`,


    
    createReel: "/api/reels",

   
    deleteReel: (reelId) =>
      `/api/reels/${reelId}`,

    remixAudio: (reelId) =>
      `/api/reels/${reelId}/audio-remix`,
  },


  likes: {
    create: "/api/likes",

    delete: "/api/likes",
  },



  comments: {
    get: (postId) =>
      `/api/posts/${postId}/comments`,

    add: (postId) =>
      `/api/posts/${postId}/comments`,

    reply: (commentId) =>
      `/api/comments/${commentId}/reply`,

    like: (commentId) =>
      `/api/comments/${commentId}/like`,

    delete: (commentId) =>
      `/api/comments/${commentId}`,
  },

  

  reelSave: {
    save: (reelId) =>
      `/api/reels/${reelId}/save`,

    unsave: (reelId) =>
      `/api/reels/${reelId}/save`,
  },

  watch: {
  
  start: "/api/watch/start",

  
  end: "/api/watch/end",

  
  history: "/api/watch/history",

  
  stats: "/api/watch/stats",
},

};