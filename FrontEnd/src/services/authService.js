// import auth from "@react-native-firebase/auth";

// let confirmation = null;

// /**
//  * Send OTP
//  */
// export const sendOTP = async (phone) => {
//   try {
//     confirmation = await auth().signInWithPhoneNumber(phone);

//     return {
//       success: true,
//     };
//   } catch (error) {
//     console.log("Send OTP Error:", error);

//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

// /**
//  * Verify OTP
//  */
// export const verifyOTP = async (code) => {
//   try {
//     if (!confirmation) {
//       return {
//         success: false,
//         message: "OTP session expired. Please request a new OTP.",
//       };
//     }

//     const result = await confirmation.confirm(code);

//     const user = result.user;

//     return {
//       success: true,
//       user: {
//         uid: user.uid,
//         phoneNumber: user.phoneNumber,
//         displayName: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//         emailVerified: user.emailVerified,
//         isAnonymous: user.isAnonymous,
//       },
//     };
//   } catch (error) {
//     console.log("Verify OTP Error:", error);

//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

// /**
//  * Logout
//  */
// export const logout = async () => {
//   await auth().signOut();
// };

// /**
//  * Current User
//  */
// export const currentUser = () => {
//   const user = auth().currentUser;

//   if (!user) return null;

//   return {
//     uid: user.uid,
//     phoneNumber: user.phoneNumber,
//     displayName: user.displayName,
//     email: user.email,
//     photoURL: user.photoURL,
//     emailVerified: user.emailVerified,
//     isAnonymous: user.isAnonymous,
//   };
// };

import auth from "@react-native-firebase/auth";

let confirmation = null;

export const sendOTP = async (phone) => {
  try {
    confirmation = await auth().signInWithPhoneNumber(phone);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const verifyOTP = async (code) => {
  try {
    const result = await confirmation.confirm(code);

    const user = {
      uid: result.user.uid,
      phoneNumber: result.user.phoneNumber,
      displayName: result.user.displayName || "",
      photoURL: result.user.photoURL || "",
    };

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const logout = () => auth().signOut();

export const currentUser = () => auth().currentUser;