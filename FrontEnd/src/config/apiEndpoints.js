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
    getUserPosts: (userId) => `/api/users/${userId}/posts`,
    getUserReels: (userId) => `/api/users/${userId}/reels`,
    getSavedPosts: (userId) => `/api/users/${userId}/saved`,
    getUserStats: (userId) => `/api/users/${userId}/stats`,
  },

  posts: {
  createPost: "/api/posts",
  getFeed: "/api/posts/feed",
  getExplore: "/api/posts/explore",
  getPost: (postId) => `/api/posts/${postId}`,
  updatePost: (postId) => `/api/posts/${postId}`,
  deletePost: (postId) => `/api/posts/${postId}`,
  savePost: (postId) => `/api/posts/${postId}/save`,
  unsavePost: (postId) => `/api/posts/${postId}/save`,
},
};