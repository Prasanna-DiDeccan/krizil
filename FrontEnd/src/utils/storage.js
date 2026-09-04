// import AsyncStorage from "@react-native-async-storage/async-storage";

// const USER_KEY = "krizil_user";
// const ACCESS_TOKEN_KEY = "access_token";
// const REFRESH_TOKEN_KEY = "refresh_token";

// // ================================
// // USER
// // ================================

// export const saveUser = async (user) => {
//   try {
//     if (user) {
//       await AsyncStorage.setItem(
//         USER_KEY,
//         JSON.stringify(user)
//       );
//     }
//   } catch (error) {
//     console.log("SAVE USER ERROR =>", error);
//   }
// };

// export const getUser = async () => {
//   try {
//     const value = await AsyncStorage.getItem(
//       USER_KEY
//     );

//     return value ? JSON.parse(value) : null;
//   } catch (error) {
//     console.log("GET USER ERROR =>", error);
//     return null;
//   }
// };

// // ================================
// // TOKENS
// // ================================

// export const saveTokens = async (
//   accessToken,
//   refreshToken
// ) => {
//   try {
//     if (accessToken) {
//       await AsyncStorage.setItem(
//         ACCESS_TOKEN_KEY,
//         accessToken
//       );
//     }

//     if (refreshToken) {
//       await AsyncStorage.setItem(
//         REFRESH_TOKEN_KEY,
//         refreshToken
//       );
//     }

//     console.log("TOKENS SAVED");
//   } catch (error) {
//     console.log("SAVE TOKENS ERROR =>", error);
//   }
// };

// export const getAccessToken = async () => {
//   return await AsyncStorage.getItem(
//     ACCESS_TOKEN_KEY
//   );
// };

// export const getRefreshToken = async () => {
//   return await AsyncStorage.getItem(
//     REFRESH_TOKEN_KEY
//   );
// };

// // ================================
// // LOGOUT / CLEAR SESSION
// // ================================

// export const logoutUser = async () => {
//   try {
//     await AsyncStorage.multiRemove([
//       USER_KEY,
//       ACCESS_TOKEN_KEY,
//       REFRESH_TOKEN_KEY,
//     ]);

//     console.log("LOCAL SESSION CLEARED");
//   } catch (error) {
//     console.log(
//       "CLEAR SESSION ERROR =>",
//       error
//     );
//   }
// };

import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "krizil_user";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// ======================================================
// SAVE USER
// ======================================================

export const saveUser = async (user) => {
  try {
    if (!user) return;

    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

    console.log("USER SAVED =>", user?.id);
  } catch (error) {
    console.log(
      "SAVE USER ERROR =>",
      error
    );
  }
};

// ======================================================
// GET USER
// ======================================================

export const getUser = async () => {
  try {
    const value =
      await AsyncStorage.getItem(
        USER_KEY
      );

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.log(
      "GET USER ERROR =>",
      error
    );

    return null;
  }
};

// ======================================================
// SAVE TOKENS
// ======================================================

export const saveTokens = async (
  accessToken,
  refreshToken
) => {
  try {
    if (accessToken) {
      await AsyncStorage.setItem(
        ACCESS_TOKEN_KEY,
        accessToken
      );
    }

    if (refreshToken) {
      await AsyncStorage.setItem(
        REFRESH_TOKEN_KEY,
        refreshToken
      );
    }

    console.log(
      "TOKENS SAVED"
    );
  } catch (error) {
    console.log(
      "SAVE TOKENS ERROR =>",
      error
    );
  }
};

// ======================================================
// GET ACCESS TOKEN
// ======================================================

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(
      ACCESS_TOKEN_KEY
    );
  } catch (error) {
    console.log(
      "GET ACCESS TOKEN ERROR =>",
      error
    );

    return null;
  }
};

// ======================================================
// GET REFRESH TOKEN
// ======================================================

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(
      REFRESH_TOKEN_KEY
    );
  } catch (error) {
    console.log(
      "GET REFRESH TOKEN ERROR =>",
      error
    );

    return null;
  }
};

// ======================================================
// CLEAR SESSION
// ======================================================

export const logoutUser = async () => {
  try {
    await AsyncStorage.multiRemove([
      USER_KEY,
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY,
    ]);

    console.log(
      "================================"
    );

    console.log(
      "🚪 LOCAL SESSION CLEARED"
    );

    console.log(
      "================================"
    );
  } catch (error) {
    console.log(
      "CLEAR SESSION ERROR =>",
      error
    );
  }
};

// ======================================================
// CHECK SESSION
// ======================================================

export const hasSession = async () => {
  try {
    const [
      accessToken,
      refreshToken,
      user,
    ] = await Promise.all([
      getAccessToken(),
      getRefreshToken(),
      getUser(),
    ]);

    return Boolean(
      accessToken &&
        refreshToken &&
        user
    );
  } catch (error) {
    console.log(
      "HAS SESSION ERROR =>",
      error
    );

    return false;
  }
};