import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  logoutUser,
} from "./storage";

import {
  emitAuthLogout,
} from "./authEvents";

// export const BASE_URL =
//   process.env.EXPO_PUBLIC_API_BASE_URL;
// console.log("BASE_URL =>", BASE_URL);
export const BASE_URL = "http://32.199.119.31:8000";

console.log("BASE_URL =>", BASE_URL);
// ==================================================
// NORMAL API
// Use this for protected APIs
// ==================================================

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// ==================================================
// AUTH API
// Login / Register / OTP / Refresh / Logout
//
// IMPORTANT:
// This instance does NOT have the refresh interceptor.
// ==================================================

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================================================
// REFRESH CONTROL
// ==================================================

let isRefreshing = false;

let failedQueue = [];

const processQueue = (
  error,
  token = null
) => {
  failedQueue.forEach(
    ({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    }
  );

  failedQueue = [];
};

// ==================================================
// REQUEST INTERCEPTOR
// ==================================================

api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    console.log(
      "ACCESS TOKEN =>",
      token
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==================================================
// RESPONSE INTERCEPTOR
// ==================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest =
      error.config;

    // Only handle 401
    if (
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    // Prevent infinite retry
    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    // ==================================================
    // Another request is already refreshing
    // ==================================================

    if (isRefreshing) {
      return new Promise(
        (resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }
      ).then((newAccessToken) => {
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      });
    }

    originalRequest._retry = true;

    isRefreshing = true;

    try {
      const refreshToken =
        await getRefreshToken();

      console.log(
        "REFRESH TOKEN EXISTS =>",
        !!refreshToken
      );

      // No refresh token
      if (!refreshToken) {
        await logoutUser();

        emitAuthLogout();
        
        processQueue(
          new Error(
            "Refresh token not found"
          )
        );

        return Promise.reject(error);
      }

      // ==================================================
      // Call refresh-token API
      // Use authApi, NOT api
      // ==================================================

      const response =
        await authApi.post(
          "/api/auth/refresh-token",
          {
            refresh_token:
              refreshToken,
          }
        );

      const newAccessToken =
        response.data.access_token;

      console.log(
        "NEW ACCESS TOKEN RECEIVED =>",
        !!newAccessToken
      );

      if (!newAccessToken) {
        throw new Error(
          "New access token not received"
        );
      }

      // ==================================================
      // Save new access token
      // Keep old refresh token
      // ==================================================

      await saveTokens(
        newAccessToken,
        refreshToken
      );

      // ==================================================
      // Resolve waiting requests
      // ==================================================

      processQueue(
        null,
        newAccessToken
      );

      // ==================================================
      // Retry original request
      // ==================================================

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      console.log(
        "REFRESH TOKEN ERROR =>",
        refreshError.response?.data ||
          refreshError.message
      );

      // Reject waiting requests
      processQueue(
        refreshError,
        null
      );

      // Refresh token invalid/expired
      await logoutUser();

      emitAuthLogout();

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;