import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "krizil_user";
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// ================================
// USER
// ================================

export const saveUser = async (user) => {
  try {
    if (user) {
      await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );
    }
  } catch (error) {
    console.log("SAVE USER ERROR =>", error);
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem(
      USER_KEY
    );

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log("GET USER ERROR =>", error);
    return null;
  }
};

// ================================
// TOKENS
// ================================

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

    console.log("TOKENS SAVED");
  } catch (error) {
    console.log("SAVE TOKENS ERROR =>", error);
  }
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(
    ACCESS_TOKEN_KEY
  );
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem(
    REFRESH_TOKEN_KEY
  );
};

// ================================
// LOGOUT / CLEAR SESSION
// ================================

export const logoutUser = async () => {
  try {
    await AsyncStorage.multiRemove([
      USER_KEY,
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY,
    ]);

    console.log("LOCAL SESSION CLEARED");
  } catch (error) {
    console.log(
      "CLEAR SESSION ERROR =>",
      error
    );
  }
};