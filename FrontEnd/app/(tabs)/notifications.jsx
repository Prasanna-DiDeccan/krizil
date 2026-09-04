// // import React, {
// //   useCallback,
// //   useEffect,
// //   useRef,
// //   useState,
// // } from "react";

// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   RefreshControl,
// //   ActivityIndicator,
// //   Image,
// //   StatusBar,
// //   Modal,
// //   Pressable,
// // } from "react-native";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import { useRouter } from "expo-router";

// // import { Ionicons } from "@expo/vector-icons";

// // import {
// //   getNotifications,
// //   markNotificationRead,
// //   deleteNotification,
// //   getFollowRequests,
// //   acceptFollowRequest,
// //   rejectFollowRequest,

// //   selectNotifications,
// //   selectUnreadNotificationCount,
// //   selectNotificationLoading,
// //   selectNotificationLoadingMore,
// //   selectNotificationHasMore,
// //   selectNotificationError,

// //   selectFollowRequests,
// //   selectFollowRequestsLoading,
// //   selectAcceptingRequestId,
// //   selectRejectingRequestId,
// //   selectDeletingNotificationId,
// // } from "../../src/redux/notificationSlice";

// // import {
// //   followUser,
// //   unfollowUser,
// // } from "../../src/redux/followSlice";

// // import {
// //   getProfile,
// // } from "../../src/redux/profileSlice";


// // // ======================================================
// // // SCREEN
// // // ======================================================

// // export default function NotificationsScreen() {
// //   const dispatch = useDispatch();
// //   const router = useRouter();

// //   // ====================================================
// //   // NOTIFICATIONS
// //   // ====================================================

// //   const notifications = useSelector(
// //     selectNotifications
// //   );

// //   const unreadCount = useSelector(
// //     selectUnreadNotificationCount
// //   );

// //   const loading = useSelector(
// //     selectNotificationLoading
// //   );

// //   const loadingMore = useSelector(
// //     selectNotificationLoadingMore
// //   );

// //   const hasMore = useSelector(
// //     selectNotificationHasMore
// //   );

// //   const error = useSelector(
// //     selectNotificationError
// //   );

// //   const deletingNotificationId =
// //     useSelector(
// //       selectDeletingNotificationId
// //     );

// //   // ====================================================
// //   // FOLLOW REQUESTS
// //   // ====================================================

// //   const followRequests = useSelector(
// //     selectFollowRequests
// //   );

// //   const followRequestsLoading =
// //     useSelector(
// //       selectFollowRequestsLoading
// //     );

// //   const acceptingRequestId =
// //     useSelector(
// //       selectAcceptingRequestId
// //     );

// //   const rejectingRequestId =
// //     useSelector(
// //       selectRejectingRequestId
// //     );

// //   // ====================================================
// //   // FOLLOWING MAP
// //   // ====================================================

// //   const followingMap = useSelector(
// //     (state) =>
// //       state.follow?.following || {}
// //   );

// //   // ====================================================
// //   // LOCAL STATE
// //   // ====================================================

// //   const [refreshing, setRefreshing] =
// //     useState(false);

// //   const [
// //     followingBackUserId,
// //     setFollowingBackUserId,
// //   ] = useState(null);

// //   const [
// //     unfollowingUserId,
// //     setUnfollowingUserId,
// //   ] = useState(null);

// //   // ====================================================
// //   // RELATIONSHIP OVERRIDES
// //   //
// //   // THIS IS ALWAYS SYNCHRONIZED WITH BACKEND.
// //   //
// //   // {
// //   //   "22": {
// //   //      following: true,
// //   //      requested: false
// //   //   }
// //   // }
// //   //
// //   // OR
// //   //
// //   // {
// //   //   "23": {
// //   //      following: false,
// //   //      requested: true
// //   //   }
// //   // }
// //   // ====================================================

// //   const [
// //     relationshipOverrides,
// //     setRelationshipOverrides,
// //   ] = useState({});

// //   // ====================================================
// //   // ACCEPTED USERS
// //   // ====================================================

// //   const [
// //     acceptedFollowUsers,
// //     setAcceptedFollowUsers,
// //   ] = useState({});

// //   // ====================================================
// //   // THREE DOT MENU
// //   // ====================================================

// //   const [
// //     selectedNotification,
// //     setSelectedNotification,
// //   ] = useState(null);

// //   const [
// //     menuVisible,
// //     setMenuVisible,
// //   ] = useState(false);

// //   // ====================================================
// //   // REFS
// //   // ====================================================

// //   const isMountedRef =
// //     useRef(true);

// //   const loadingRefreshRef =
// //     useRef(false);

// //   // ====================================================
// //   // GET REQUESTER
// //   // ====================================================

// //   const getRequester =
// //     useCallback(
// //       (notification) => {
// //         return (
// //           notification?.requester ||
// //           notification?.actor ||
// //           notification?.user ||
// //           null
// //         );
// //       },
// //       []
// //     );

// //   // ====================================================
// //   // GET USER ID
// //   //
// //   // IMPORTANT:
// //   //
// //   // target_id is NOT used here.
// //   //
// //   // target_id = follow request ID.
// //   // ====================================================

// //   const getUserId =
// //     useCallback(
// //       (notification) => {
// //         const requester =
// //           getRequester(notification);

// //         return (
// //           requester?.id ??
// //           notification?.actor_id ??
// //           notification?.user_id ??
// //           notification?.requester_id ??
// //           null
// //         );
// //       },
// //       [getRequester]
// //     );

// //   // ====================================================
// //   // GET USERNAME
// //   // ====================================================

// //   const getUsername =
// //     useCallback(
// //       (notification) => {
// //         const requester =
// //           getRequester(notification);

// //         if (requester?.username) {
// //           return requester.username;
// //         }

// //         if (
// //           notification?.username
// //         ) {
// //           return notification.username;
// //         }

// //         const message =
// //           notification?.message ||
// //           "";

// //         const firstWord =
// //           message
// //             .trim()
// //             .split(" ")[0];

// //         return (
// //           firstWord || "User"
// //         );
// //       },
// //       [getRequester]
// //     );

// //   // ====================================================
// //   // GET AVATAR
// //   // ====================================================

// //   const getAvatar =
// //     useCallback(
// //       (notification) => {
// //         const requester =
// //           getRequester(notification);

// //         return (
// //           requester?.avatar_url ||
// //           requester?.avatar ||
// //           requester?.profile_picture ||
// //           requester?.profile_image ||
// //           requester?.image ||
// //           notification?.avatar_url ||
// //           notification?.actor
// //             ?.avatar_url ||
// //           notification?.actor?.avatar ||
// //           null
// //         );
// //       },
// //       [getRequester]
// //     );

// //   // ====================================================
// //   // GET FOLLOW REQUEST ID
// //   //
// //   // target_id = FOLLOW REQUEST ID
// //   // ====================================================

// //   const getFollowRequestId =
// //     useCallback(
// //       (notification) => {
// //         if (!notification) {
// //           return null;
// //         }

// //         if (
// //           notification.target_id !==
// //             undefined &&
// //           notification.target_id !==
// //             null
// //         ) {
// //           return notification.target_id;
// //         }

// //         if (
// //           notification.request_id !==
// //             undefined &&
// //           notification.request_id !==
// //             null
// //         ) {
// //           return notification.request_id;
// //         }

// //         if (
// //           notification.follow_request_id !==
// //             undefined &&
// //           notification.follow_request_id !==
// //             null
// //         ) {
// //           return notification.follow_request_id;
// //         }

// //         return null;
// //       },
// //       []
// //     );

// //   // ====================================================
// //   // IS FOLLOW NOTIFICATION
// //   // ====================================================

// //   const isFollowNotification =
// //     useCallback(
// //       (notification) => {
// //         const type =
// //           notification?.type;

// //         return (
// //           type === "follow" ||
// //           type === "follow_request" ||
// //           type === "follow-request" ||
// //           type ===
// //             "follow_request_received"
// //         );
// //       },
// //       []
// //     );

// //   // ====================================================
// //   // FORMAT TIME
// //   // ====================================================

// //   const formatTime =
// //     useCallback(
// //       (createdAt) => {
// //         if (!createdAt) {
// //           return "";
// //         }

// //         const date =
// //           new Date(createdAt);

// //         if (
// //           Number.isNaN(
// //             date.getTime()
// //           )
// //         ) {
// //           return "";
// //         }

// //         const now =
// //           new Date();

// //         const difference =
// //           Math.max(
// //             0,
// //             now.getTime() -
// //               date.getTime()
// //           );

// //         const seconds =
// //           Math.floor(
// //             difference / 1000
// //           );

// //         if (seconds < 60) {
// //           return "now";
// //         }

// //         const minutes =
// //           Math.floor(
// //             seconds / 60
// //           );

// //         if (minutes < 60) {
// //           return `${minutes}m`;
// //         }

// //         const hours =
// //           Math.floor(
// //             minutes / 60
// //           );

// //         if (hours < 24) {
// //           return `${hours}h`;
// //         }

// //         const days =
// //           Math.floor(
// //             hours / 24
// //           );

// //         if (days < 7) {
// //           return `${days}d`;
// //         }

// //         const weeks =
// //           Math.floor(
// //             days / 7
// //           );

// //         if (weeks < 4) {
// //           return `${weeks}w`;
// //         }

// //         const months =
// //           Math.floor(
// //             days / 30
// //           );

// //         if (months < 12) {
// //           return `${months}mo`;
// //         }

// //         const years =
// //           Math.floor(
// //             days / 365
// //           );

// //         return `${years}y`;
// //       },
// //       []
// //     );

// //   // ====================================================
// //   // CHECK INCOMING FOLLOW REQUEST
// //   // ====================================================

// //   const isPendingFollowRequest =
// //     useCallback(
// //       (notification) => {
// //         const userId =
// //           getUserId(notification);

// //         if (
// //           userId &&
// //           acceptedFollowUsers[
// //             String(userId)
// //           ]
// //         ) {
// //           return false;
// //         }

// //         const requestId =
// //           getFollowRequestId(
// //             notification
// //           );

// //         if (!requestId) {
// //           return false;
// //         }

// //         return followRequests.some(
// //           (request) =>
// //             String(request?.id) ===
// //             String(requestId)
// //         );
// //       },
// //       [
// //         followRequests,
// //         getFollowRequestId,
// //         getUserId,
// //         acceptedFollowUsers,
// //       ]
// //     );

// //   // ====================================================
// //   // GET CURRENT USER RELATIONSHIP
// //   //
// //   // BACKEND PROFILE DATA HAS PRIORITY.
// //   //
// //   // following=true
// //   //     => Following
// //   //
// //   // request_pending=true
// //   //     => Requested
// //   //
// //   // following=false
// //   // request_pending=false
// //   //     => Follow Back
// //   // ====================================================

// //   const getRelationship =
// //     useCallback(
// //       (notification) => {
// //         const userId =
// //           getUserId(notification);

// //         if (!userId) {
// //           return {
// //             following: false,
// //             requested: false,
// //           };
// //         }

// //         const key =
// //           String(userId);

// //         // --------------------------------------------
// //         // 1. BACKEND PROFILE RELATIONSHIP
// //         // --------------------------------------------

// //         const override =
// //           relationshipOverrides[key];

// //         if (override) {
// //           return {
// //             following:
// //               override.following ===
// //               true,

// //             requested:
// //               override.requested ===
// //               true,
// //           };
// //         }

// //         // --------------------------------------------
// //         // 2. NOTIFICATION BACKEND RELATIONSHIP
// //         // --------------------------------------------

// //         if (
// //           typeof notification
// //             ?.current_user_following ===
// //           "boolean"
// //         ) {
// //           return {
// //             following:
// //               notification
// //                 .current_user_following ===
// //               true,

// //             requested:
// //               notification
// //                 ?.request_pending ===
// //               true,
// //           };
// //         }

// //         // --------------------------------------------
// //         // 3. FOLLOW SLICE
// //         // --------------------------------------------

// //         const mapValue =
// //           followingMap[key];

// //         if (
// //           typeof mapValue ===
// //           "boolean"
// //         ) {
// //           return {
// //             following:
// //               mapValue === true,

// //             requested:
// //               notification
// //                 ?.request_pending ===
// //               true,
// //           };
// //         }

// //         // --------------------------------------------
// //         // 4. NOTIFICATION REQUEST STATE
// //         // --------------------------------------------

// //         return {
// //           following:
// //             notification?.following ===
// //               true &&
// //             notification
// //               ?.current_user_following ===
// //               true,

// //           requested:
// //             notification
// //               ?.request_pending ===
// //             true,
// //         };
// //       },
// //       [
// //         getUserId,
// //         relationshipOverrides,
// //         followingMap,
// //       ]
// //     );

// //   // ====================================================
// //   // LOAD PROFILE RELATIONSHIPS
// //   //
// //   // THIS IS THE MAIN FIX.
// //   //
// //   // Every time notifications are initially loaded
// //   // or manually refreshed:
// //   //
// //   // notification user
// //   //       ↓
// //   // getProfile(userId)
// //   //       ↓
// //   // is_following
// //   // request_pending
// //   //       ↓
// //   // relationshipOverrides
// //   //
// //   // We REPLACE the old value.
// //   //
// //   // We DO NOT do:
// //   //
// //   // if (!next[userId])
// //   //
// //   // because that was causing stale Requested/
// //   // Follow Back values to remain forever.
// //   // ====================================================

// //   const loadNotificationRelationships =
// //     useCallback(
// //       async (notificationItems) => {
// //         if (
// //           !Array.isArray(
// //             notificationItems
// //           )
// //         ) {
// //           return;
// //         }

// //         const userIds = [
// //           ...new Set(
// //             notificationItems
// //               .map((notification) =>
// //                 getUserId(
// //                   notification
// //                 )
// //               )
// //               .filter(Boolean)
// //               .map((id) =>
// //                 String(id)
// //               )
// //           ),
// //         ];

// //         if (
// //           userIds.length === 0
// //         ) {
// //           setRelationshipOverrides({});
// //           return;
// //         }

// //         try {
// //           const results =
// //             await Promise.all(
// //               userIds.map(
// //                 async (userId) => {
// //                   try {
// //                     const profileResult =
// //                       await dispatch(
// //                         getProfile(
// //                           userId
// //                         )
// //                       ).unwrap();

// //                     /*
// //                      * Depending on your profileSlice,
// //                      * profile can be returned directly
// //                      * or inside profile/data.
// //                      */
// //                     const profile =
// //                       profileResult?.profile ||
// //                       profileResult?.data ||
// //                       profileResult ||
// //                       {};

// //                     console.log(
// //                       "===================================="
// //                     );

// //                     console.log(
// //                       "NOTIFICATION PROFILE RELATIONSHIP"
// //                     );

// //                     console.log(
// //                       "USER ID =>",
// //                       userId
// //                     );

// //                     console.log(
// //                       "IS FOLLOWING =>",
// //                       profile?.is_following
// //                     );

// //                     console.log(
// //                       "REQUEST PENDING =>",
// //                       profile?.request_pending
// //                     );

// //                     console.log(
// //                       "===================================="
// //                     );

// //                     return {
// //                       userId,
// //                       profile,
// //                     };
// //                   } catch (
// //                     profileError
// //                   ) {
// //                     console.log(
// //                       "PROFILE RELATIONSHIP ERROR =>",
// //                       userId,
// //                       profileError
// //                     );

// //                     return null;
// //                   }
// //                 }
// //               )
// //             );

// //           const relationshipData =
// //             {};

// //           results.forEach(
// //             (result) => {
// //               if (
// //                 !result?.userId ||
// //                 !result?.profile
// //               ) {
// //                 return;
// //               }

// //               const profile =
// //                 result.profile;

// //               /*
// //                * BACKEND IS THE SOURCE OF TRUTH.
// //                *
// //                * If backend says:
// //                *
// //                * is_following=true
// //                *
// //                * then Following.
// //                *
// //                * If backend says:
// //                *
// //                * request_pending=true
// //                *
// //                * then Requested.
// //                */
// //               relationshipData[
// //                 String(
// //                   result.userId
// //                 )
// //               ] = {
// //                 following:
// //                   profile
// //                     ?.is_following ===
// //                   true,

// //                 requested:
// //                   profile
// //                     ?.request_pending ===
// //                   true,
// //               };
// //             }
// //           );

// //           if (
// //             isMountedRef.current
// //           ) {
// //             /*
// //              * IMPORTANT:
// //              *
// //              * REPLACE old relationships.
// //              *
// //              * Do not preserve stale values.
// //              */
// //             setRelationshipOverrides(
// //               relationshipData
// //             );
// //           }
// //         } catch (error) {
// //           console.log(
// //             "LOAD RELATIONSHIPS ERROR =>",
// //             error
// //           );
// //         }
// //       },
// //       [dispatch, getUserId]
// //     );

// //   // ====================================================
// //   // LOAD ALL NOTIFICATIONS
// //   //
// //   // NO POLLING.
// //   // NO APPSTATE REFRESH.
// //   //
// //   // Called:
// //   // 1. Initial screen load
// //   // 2. Pull to refresh
// //   // 3. Retry
// //   // ====================================================

// //   const loadNotificationData =
// //     useCallback(
// //       async ({
// //         loadRelationships = true,
// //       } = {}) => {
// //         if (
// //           loadingRefreshRef.current
// //         ) {
// //           return;
// //         }

// //         loadingRefreshRef.current =
// //           true;

// //         try {
// //           const notificationResult =
// //             await dispatch(
// //               getNotifications({
// //                 limit: 20,
// //                 offset: 0,
// //                 append: false,
// //               })
// //             ).unwrap();

// //           await dispatch(
// //             getFollowRequests()
// //           ).unwrap();

// //           // ------------------------------------------
// //           // IMPORTANT:
// //           // Use ONLY fresh API response.
// //           // Do NOT fallback to old `notifications`.
// //           // ------------------------------------------

// //           const items =
// //             Array.isArray(
// //               notificationResult?.items
// //             )
// //               ? notificationResult.items
// //               : Array.isArray(
// //                   notificationResult
// //                 )
// //               ? notificationResult
// //               : [];

// //           // ------------------------------------------
// //           // GET BACKEND RELATIONSHIP
// //           // ------------------------------------------

// //           if (
// //             loadRelationships &&
// //             items.length > 0
// //           ) {
// //             await loadNotificationRelationships(
// //               items
// //             );
// //           } else if (
// //             loadRelationships
// //           ) {
// //             setRelationshipOverrides({});
// //           }
// //         } catch (loadError) {
// //           console.log(
// //             "NOTIFICATION LOAD ERROR =>",
// //             loadError
// //           );
// //         } finally {
// //           loadingRefreshRef.current =
// //             false;
// //         }
// //       },
// //       [
// //         dispatch,
// //         loadNotificationRelationships,
// //       ]
// //     );

// //   // ====================================================
// //   // INITIAL LOAD
// //   // ====================================================

// //   useEffect(() => {
// //     isMountedRef.current =
// //       true;

// //     loadNotificationData();

// //     return () => {
// //       isMountedRef.current =
// //         false;
// //     };
// //   }, [
// //     loadNotificationData,
// //   ]);

// //   // ====================================================
// //   // NO CONTINUOUS REFRESH
// //   //
// //   // IMPORTANT:
// //   //
// //   // There is intentionally NO:
// //   //
// //   // setInterval()
// //   //
// //   // and NO:
// //   //
// //   // AppState.addEventListener()
// //   //
// //   // Notifications refresh only when:
// //   //
// //   // 1. Screen initially loads
// //   // 2. User pulls down
// //   // 3. User taps Try Again
// //   // ====================================================

// //   // ====================================================
// //   // PULL TO REFRESH
// //   // ====================================================

// //   const handleRefresh =
// //     useCallback(
// //       async () => {
// //         if (
// //           loadingRefreshRef.current
// //         ) {
// //           return;
// //         }

// //         try {
// //           setRefreshing(true);

// //           await loadNotificationData();
// //         } catch (error) {
// //           console.log(
// //             "REFRESH ERROR =>",
// //             error
// //           );
// //         } finally {
// //           setRefreshing(false);
// //         }
// //       },
// //       [loadNotificationData]
// //     );

// //   // ====================================================
// //   // LOAD MORE
// //   // ====================================================

// //   const handleLoadMore =
// //     useCallback(() => {
// //       if (
// //         loading ||
// //         loadingMore ||
// //         !hasMore
// //       ) {
// //         return;
// //       }

// //       dispatch(
// //         getNotifications({
// //           limit: 20,
// //           offset:
// //             notifications.length,
// //           append: true,
// //         })
// //       );
// //     }, [
// //       dispatch,
// //       notifications.length,
// //       loading,
// //       loadingMore,
// //       hasMore,
// //     ]);

// //   // ====================================================
// //   // OPEN NOTIFICATION
// //   // ====================================================

// //   const handleNotificationPress =
// //     useCallback(
// //       async (notification) => {
// //         if (!notification) {
// //           return;
// //         }

// //         const userId =
// //           getUserId(notification);

// //         console.log(
// //           "===================================="
// //         );

// //         console.log(
// //           "NOTIFICATION CLICKED"
// //         );

// //         console.log(
// //           "USERNAME =>",
// //           getUsername(
// //             notification
// //           )
// //         );

// //         console.log(
// //           "USER ID =>",
// //           userId
// //         );

// //         console.log(
// //           "===================================="
// //         );

// //         if (!userId) {
// //           console.log(
// //             "NO USER ID FOUND"
// //           );

// //           return;
// //         }

// //         // ------------------------------------------
// //         // MARK READ
// //         // ------------------------------------------

// //         if (
// //           notification.is_read ===
// //             false &&
// //           notification.id
// //         ) {
// //           try {
// //             await dispatch(
// //               markNotificationRead(
// //                 notification.id
// //               )
// //             ).unwrap();
// //           } catch (error) {
// //             console.log(
// //               "MARK READ ERROR =>",
// //               error
// //             );
// //           }
// //         }

// //         // ------------------------------------------
// //         // OPEN PROFILE
// //         // ------------------------------------------

// //         router.push({
// //           pathname:
// //             "/profile-screens/user-profile",
// //           params: {
// //             userId:
// //               String(userId),
// //           },
// //         });
// //       },
// //       [
// //         dispatch,
// //         router,
// //         getUserId,
// //         getUsername,
// //       ]
// //     );

// //   // ====================================================
// //   // OPEN MENU
// //   // ====================================================

// //   const handleOpenMenu =
// //     useCallback(
// //       (notification) => {
// //         setSelectedNotification(
// //           notification
// //         );

// //         setMenuVisible(true);
// //       },
// //       []
// //     );

// //   // ====================================================
// //   // CLOSE MENU
// //   // ====================================================

// //   const handleCloseMenu =
// //     useCallback(() => {
// //       if (
// //         deletingNotificationId ||
// //         unfollowingUserId
// //       ) {
// //         return;
// //       }

// //       setMenuVisible(false);

// //       setSelectedNotification(
// //         null
// //       );
// //     }, [
// //       deletingNotificationId,
// //       unfollowingUserId,
// //     ]);

// //   // ====================================================
// //   // DELETE NOTIFICATION
// //   // ====================================================

// //   const handleDeleteNotification =
// //     useCallback(
// //       async () => {
// //         if (
// //           !selectedNotification?.id
// //         ) {
// //           return;
// //         }

// //         const notificationId =
// //           selectedNotification.id;

// //         try {
// //           await dispatch(
// //             deleteNotification(
// //               notificationId
// //             )
// //           ).unwrap();

// //           setMenuVisible(false);

// //           setSelectedNotification(
// //             null
// //           );
// //         } catch (error) {
// //           console.log(
// //             "DELETE NOTIFICATION ERROR =>",
// //             error
// //           );
// //         }
// //       },
// //       [
// //         dispatch,
// //         selectedNotification,
// //       ]
// //     );

// //   // ====================================================
// //   // UNFOLLOW
// //   // ====================================================

// //   const handleUnfollow =
// //     useCallback(
// //       async () => {
// //         if (
// //           !selectedNotification
// //         ) {
// //           return;
// //         }

// //         const userId =
// //           getUserId(
// //             selectedNotification
// //           );

// //         if (!userId) {
// //           return;
// //         }

// //         const key =
// //           String(userId);

// //         try {
// //           setUnfollowingUserId(
// //             key
// //           );

// //           await dispatch(
// //             unfollowUser(userId)
// //           ).unwrap();

// //           /*
// //            * Backend successfully unfollowed.
// //            *
// //            * Immediately show:
// //            *
// //            * following=false
// //            * requested=false
// //            *
// //            * => Follow Back
// //            */
// //           setRelationshipOverrides(
// //             (previous) => ({
// //               ...previous,
// //               [key]: {
// //                 following: false,
// //                 requested: false,
// //               },
// //             })
// //           );

// //           setMenuVisible(false);

// //           setSelectedNotification(
// //             null
// //           );

// //           /*
// //            * No notification reload here.
// //            */
// //         } catch (error) {
// //           console.log(
// //             "UNFOLLOW ERROR =>",
// //             error
// //           );
// //         } finally {
// //           setUnfollowingUserId(
// //             null
// //           );
// //         }
// //       },
// //       [
// //         dispatch,
// //         getUserId,
// //         selectedNotification,
// //       ]
// //     );

// //   // ====================================================
// //   // ACCEPT FOLLOW REQUEST
// //   //
// //   // IMPORTANT FIX:
// //   //
// //   // You said:
// //   //
// //   // Click Confirm
// //   //       ↓
// //   // backend following = true
// //   //       ↓
// //   // UI = Following
// //   //
// //   // So we use the ACCEPT API response AND then
// //   // getProfile() to confirm the final backend state.
// //   // ====================================================

// //   const handleAccept =
// //     useCallback(
// //       async (notification) => {
// //         const requestId =
// //           getFollowRequestId(
// //             notification
// //           );

// //         if (!requestId) {
// //           return;
// //         }

// //         const userId =
// //           getUserId(notification);

// //         try {
// //           const result =
// //             await dispatch(
// //               acceptFollowRequest(
// //                 requestId
// //               )
// //             ).unwrap();

// //           console.log(
// //             "===================================="
// //           );

// //           console.log(
// //             "ACCEPT FOLLOW REQUEST RESPONSE =>",
// //             result
// //           );

// //           console.log(
// //             "===================================="
// //           );

// //           // ------------------------------------------
// //           // ACCEPT API RESPONSE
// //           // ------------------------------------------

// //           const response =
// //             result?.data ||
// //             result ||
// //             {};

// //           if (userId) {
// //             const key =
// //               String(userId);

// //             /*
// //              * Immediately use backend response.
// //              *
// //              * Example:
// //              *
// //              * {
// //              *   following: true,
// //              *   request_pending: false
// //              * }
// //              */
// //             if (
// //               response?.following !==
// //                 undefined ||
// //               response?.request_pending !==
// //                 undefined
// //             ) {
// //               setRelationshipOverrides(
// //                 (previous) => ({
// //                   ...previous,
// //                   [key]: {
// //                     following:
// //                       response
// //                         ?.following ===
// //                       true,

// //                     requested:
// //                       response
// //                         ?.request_pending ===
// //                       true,
// //                   },
// //                 })
// //               );
// //             }

// //             setAcceptedFollowUsers(
// //               (previous) => ({
// //                 ...previous,
// //                 [key]: true,
// //               })
// //             );

// //             // ----------------------------------------
// //             // GET PROFILE AGAIN
// //             //
// //             // This confirms the final backend state.
// //             // ----------------------------------------

// //             try {
// //               const profileResult =
// //                 await dispatch(
// //                   getProfile(
// //                     userId
// //                   )
// //                 ).unwrap();

// //               const profile =
// //                 profileResult?.profile ||
// //                 profileResult?.data ||
// //                 profileResult ||
// //                 {};

// //               console.log(
// //                 "===================================="
// //               );

// //               console.log(
// //                 "PROFILE AFTER ACCEPT"
// //               );

// //               console.log(
// //                 "USER ID =>",
// //                 userId
// //               );

// //               console.log(
// //                 "IS FOLLOWING =>",
// //                 profile?.is_following
// //               );

// //               console.log(
// //                 "REQUEST PENDING =>",
// //                 profile?.request_pending
// //               );

// //               console.log(
// //                 "===================================="
// //               );

// //               if (
// //                 isMountedRef.current
// //               ) {
// //                 /*
// //                  * FINAL SOURCE OF TRUTH.
// //                  */
// //                 setRelationshipOverrides(
// //                   (previous) => ({
// //                     ...previous,
// //                     [key]: {
// //                       following:
// //                         profile
// //                           ?.is_following ===
// //                         true,

// //                       requested:
// //                         profile
// //                           ?.request_pending ===
// //                         true,
// //                     },
// //                   })
// //                 );
// //               }
// //             } catch (
// //               profileError
// //             ) {
// //               console.log(
// //                 "PROFILE AFTER ACCEPT ERROR =>",
// //                 profileError
// //               );
// //             }
// //           }

// //           // ------------------------------------------
// //           // Refresh follow-request list ONLY.
// //           //
// //           // This does not reload notifications.
// //           // ------------------------------------------

// //           await dispatch(
// //             getFollowRequests()
// //           ).unwrap();
// //         } catch (error) {
// //           console.log(
// //             "ACCEPT REQUEST ERROR =>",
// //             error
// //           );
// //         }
// //       },
// //       [
// //         dispatch,
// //         getFollowRequestId,
// //         getUserId,
// //       ]
// //     );

// //   // ====================================================
// //   // REJECT FOLLOW REQUEST
// //   // ====================================================

// //   const handleReject =
// //     useCallback(
// //       async (notification) => {
// //         const requestId =
// //           getFollowRequestId(
// //             notification
// //           );

// //         if (!requestId) {
// //           return;
// //         }

// //         try {
// //           await dispatch(
// //             rejectFollowRequest(
// //               requestId
// //             )
// //           ).unwrap();

// //           // ------------------------------------------
// //           // Delete notification
// //           // ------------------------------------------

// //           if (
// //             notification?.id
// //           ) {
// //             await dispatch(
// //               deleteNotification(
// //                 notification.id
// //               )
// //             ).unwrap();
// //           }

// //           await dispatch(
// //             getFollowRequests()
// //           ).unwrap();
// //         } catch (error) {
// //           console.log(
// //             "REJECT REQUEST ERROR =>",
// //             error
// //           );
// //         }
// //       },
// //       [
// //         dispatch,
// //         getFollowRequestId,
// //       ]
// //     );

// //   // ====================================================
// //   // FOLLOW BACK
// //   //
// //   // PUBLIC:
// //   // following=true
// //   // request_pending=false
// //   //
// //   // PRIVATE:
// //   // following=false
// //   // request_pending=true
// //   //
// //   // After backend responds, getProfile() confirms it.
// //   // ====================================================

// //   const handleFollowBack =
// //     useCallback(
// //       async (notification) => {
// //         const userId =
// //           getUserId(notification);

// //         if (!userId) {
// //           return;
// //         }

// //         const key =
// //           String(userId);

// //         try {
// //           setFollowingBackUserId(
// //             key
// //           );

// //           console.log(
// //             "===================================="
// //           );

// //           console.log(
// //             "FOLLOW BACK"
// //           );

// //           console.log(
// //             "TARGET USER ID =>",
// //             userId
// //           );

// //           const result =
// //             await dispatch(
// //               followUser(userId)
// //             ).unwrap();

// //           console.log(
// //             "FOLLOW API RESPONSE =>",
// //             result
// //           );

// //           const response =
// //             result?.data ||
// //             result ||
// //             {};

// //           const isFollowing =
// //             response?.following ===
// //             true;

// //           const isRequested =
// //             response?.request_pending ===
// //             true;

// //           console.log(
// //             "CURRENT USER FOLLOWING =>",
// //             isFollowing
// //           );

// //           console.log(
// //             "CURRENT USER REQUEST PENDING =>",
// //             isRequested
// //           );

// //           // ------------------------------------------
// //           // IMMEDIATE BACKEND RESPONSE
// //           // ------------------------------------------

// //           setRelationshipOverrides(
// //             (previous) => ({
// //               ...previous,
// //               [key]: {
// //                 following:
// //                   isFollowing,

// //                 requested:
// //                   isRequested,
// //               },
// //             })
// //           );

// //           // ------------------------------------------
// //           // GET PROFILE AGAIN
// //           //
// //           // This is what guarantees reload behavior
// //           // matches backend.
// //           // ------------------------------------------

// //           try {
// //             const profileResult =
// //               await dispatch(
// //                 getProfile(
// //                   userId
// //                 )
// //               ).unwrap();

// //             const profile =
// //               profileResult?.profile ||
// //               profileResult?.data ||
// //               profileResult ||
// //               {};

// //             console.log(
// //               "===================================="
// //             );

// //             console.log(
// //               "PROFILE AFTER FOLLOW BACK"
// //             );

// //             console.log(
// //               "USER ID =>",
// //               userId
// //             );

// //             console.log(
// //               "IS FOLLOWING =>",
// //               profile?.is_following
// //             );

// //             console.log(
// //               "REQUEST PENDING =>",
// //               profile?.request_pending
// //             );

// //             console.log(
// //               "===================================="
// //             );

// //             if (
// //               isMountedRef.current
// //             ) {
// //               setRelationshipOverrides(
// //                 (previous) => ({
// //                   ...previous,
// //                   [key]: {
// //                     following:
// //                       profile
// //                         ?.is_following ===
// //                       true,

// //                     requested:
// //                       profile
// //                         ?.request_pending ===
// //                       true,
// //                   },
// //                 })
// //               );
// //             }
// //           } catch (
// //             profileError
// //           ) {
// //             console.log(
// //               "PROFILE AFTER FOLLOW BACK ERROR =>",
// //               profileError
// //             );
// //           }
// //         } catch (error) {
// //           console.log(
// //             "FOLLOW BACK ERROR =>",
// //             error
// //           );
// //         } finally {
// //           setFollowingBackUserId(
// //             null
// //           );
// //         }
// //       },
// //       [
// //         dispatch,
// //         getUserId,
// //       ]
// //     );

// //   // ====================================================
// //   // RENDER NOTIFICATION
// //   // ====================================================

// //   const renderNotification =
// //     useCallback(
// //       ({ item }) => {
// //         const unread =
// //           item?.is_read ===
// //           false;

// //         const username =
// //           getUsername(item);

// //         const avatar =
// //           getAvatar(item);

// //         const userId =
// //           getUserId(item);

// //         const requestId =
// //           getFollowRequestId(
// //             item
// //           );

// //         // ------------------------------------------
// //         // Incoming request
// //         // ------------------------------------------

// //         const pendingFollowRequest =
// //           isPendingFollowRequest(
// //             item
// //           );

// //         // ------------------------------------------
// //         // Loading
// //         // ------------------------------------------

// //         const accepting =
// //           requestId &&
// //           String(
// //             acceptingRequestId
// //           ) ===
// //             String(requestId);

// //         const rejecting =
// //           requestId &&
// //           String(
// //             rejectingRequestId
// //           ) ===
// //             String(requestId);

// //         // ------------------------------------------
// //         // Relationship
// //         // ------------------------------------------

// //         const relationship =
// //           getRelationship(item);

// //         const currentUserFollowing =
// //           relationship.following;

// //         const currentUserRequested =
// //           relationship.requested;

// //         // ------------------------------------------
// //         // Follow notification
// //         // ------------------------------------------

// //         const followNotification =
// //           isFollowNotification(
// //             item
// //           );

// //         // ------------------------------------------
// //         // Buttons
// //         // ------------------------------------------

// //         const showRequestButtons =
// //           pendingFollowRequest;

// //         /*
// //          * FOLLOW BACK:
// //          *
// //          * following=false
// //          * requested=false
// //          */
// //         const showFollowBack =
// //           followNotification &&
// //           !pendingFollowRequest &&
// //           !!userId &&
// //           !currentUserFollowing &&
// //           !currentUserRequested;

// //         /*
// //          * REQUESTED:
// //          *
// //          * following=false
// //          * requested=true
// //          */
// //         const showRequested =
// //           followNotification &&
// //           !pendingFollowRequest &&
// //           !!userId &&
// //           !currentUserFollowing &&
// //           currentUserRequested;

// //         /*
// //          * FOLLOWING:
// //          *
// //          * following=true
// //          *
// //          * This ALWAYS wins over requested.
// //          */
// //         const showFollowing =
// //           followNotification &&
// //           !pendingFollowRequest &&
// //           !!userId &&
// //           currentUserFollowing;

// //         const followingBack =
// //           followingBackUserId ===
// //           String(userId);

// //         return (
// //           <TouchableOpacity
// //             activeOpacity={0.75}
// //             onPress={() =>
// //               handleNotificationPress(
// //                 item
// //               )
// //             }
// //             style={[
// //               styles.notificationRow,
// //               unread &&
// //                 styles.unreadRow,
// //             ]}
// //           >
// //             {/* ========================================
// //                 AVATAR
// //             ======================================== */}

// //             <View
// //               style={
// //                 styles.avatarWrapper
// //               }
// //             >
// //               {avatar ? (
// //                 <Image
// //                   source={{
// //                     uri: avatar,
// //                   }}
// //                   style={
// //                     styles.avatar
// //                   }
// //                 />
// //               ) : (
// //                 <View
// //                   style={
// //                     styles.avatarPlaceholder
// //                   }
// //                 >
// //                   <Ionicons
// //                     name="person"
// //                     size={25}
// //                     color="#8e8e8e"
// //                   />
// //                 </View>
// //               )}
// //             </View>

// //             {/* ========================================
// //                 CONTENT
// //             ======================================== */}

// //             <View
// //               style={
// //                 styles.notificationContent
// //               }
// //             >
// //               <Text
// //                 style={
// //                   styles.notificationText
// //                 }
// //               >
// //                 <Text
// //                   style={
// //                     styles.username
// //                   }
// //                 >
// //                   {username}
// //                 </Text>

// //                 {" "}

// //                 {pendingFollowRequest
// //                   ? "requested to follow you"
// //                   : followNotification
// //                   ? "started following you"
// //                   : item?.message
// //                       ?.replace(
// //                         `${username} `,
// //                         ""
// //                       ) ||
// //                     "interacted with you"}

// //                 {" "}

// //                 <Text
// //                   style={
// //                     styles.time
// //                   }
// //                 >
// //                   {formatTime(
// //                     item?.created_at ||
// //                       item?.createdAt
// //                   )}
// //                 </Text>
// //               </Text>

// //               {/* ======================================
// //                   CONFIRM / DELETE
// //               ====================================== */}

// //               {showRequestButtons && (
// //                 <View
// //                   style={
// //                     styles.requestButtons
// //                   }
// //                 >
// //                   <TouchableOpacity
// //                     activeOpacity={0.8}
// //                     disabled={
// //                       !requestId ||
// //                       accepting ||
// //                       rejecting ||
// //                       followRequestsLoading
// //                     }
// //                     style={[
// //                       styles.confirmButton,
// //                       (
// //                         !requestId ||
// //                         accepting ||
// //                         rejecting ||
// //                         followRequestsLoading
// //                       ) &&
// //                         styles.disabledButton,
// //                     ]}
// //                     onPress={(event) => {
// //                       event.stopPropagation();

// //                       handleAccept(
// //                         item
// //                       );
// //                     }}
// //                   >
// //                     {accepting ? (
// //                       <ActivityIndicator
// //                         size="small"
// //                         color="#fff"
// //                       />
// //                     ) : (
// //                       <Text
// //                         style={
// //                           styles.confirmText
// //                         }
// //                       >
// //                         Confirm
// //                       </Text>
// //                     )}
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     activeOpacity={0.8}
// //                     disabled={
// //                       !requestId ||
// //                       accepting ||
// //                       rejecting ||
// //                       followRequestsLoading
// //                     }
// //                     style={[
// //                       styles.deleteButton,
// //                       (
// //                         !requestId ||
// //                         accepting ||
// //                         rejecting ||
// //                         followRequestsLoading
// //                       ) &&
// //                         styles.disabledButton,
// //                     ]}
// //                     onPress={(event) => {
// //                       event.stopPropagation();

// //                       handleReject(
// //                         item
// //                       );
// //                     }}
// //                   >
// //                     {rejecting ? (
// //                       <ActivityIndicator
// //                         size="small"
// //                         color="#fff"
// //                       />
// //                     ) : (
// //                       <Text
// //                         style={
// //                           styles.deleteText
// //                         }
// //                       >
// //                         Delete
// //                       </Text>
// //                     )}
// //                   </TouchableOpacity>
// //                 </View>
// //               )}

// //               {/* ======================================
// //                   FOLLOW BACK
// //               ====================================== */}

// //               {showFollowBack && (
// //                 <View
// //                   style={
// //                     styles.followBackContainer
// //                   }
// //                 >
// //                   <TouchableOpacity
// //                     activeOpacity={0.8}
// //                     disabled={
// //                       followingBack
// //                     }
// //                     style={[
// //                       styles.followBackButton,
// //                       followingBack &&
// //                         styles.disabledButton,
// //                     ]}
// //                     onPress={(event) => {
// //                       event.stopPropagation();

// //                       handleFollowBack(
// //                         item
// //                       );
// //                     }}
// //                   >
// //                     {followingBack ? (
// //                       <ActivityIndicator
// //                         size="small"
// //                         color="#fff"
// //                       />
// //                     ) : (
// //                       <Text
// //                         style={
// //                           styles.followBackText
// //                         }
// //                       >
// //                         Follow Back
// //                       </Text>
// //                     )}
// //                   </TouchableOpacity>
// //                 </View>
// //               )}

// //               {/* ======================================
// //                   REQUESTED
// //               ====================================== */}

// //               {showRequested && (
// //                 <View
// //                   style={
// //                     styles.followBackContainer
// //                   }
// //                 >
// //                   <View
// //                     style={
// //                       styles.followingButton
// //                     }
// //                   >
// //                     <Text
// //                       style={
// //                         styles.followingText
// //                       }
// //                     >
// //                       Requested
// //                     </Text>
// //                   </View>
// //                 </View>
// //               )}

// //               {/* ======================================
// //                   FOLLOWING
// //               ====================================== */}

// //               {showFollowing && (
// //                 <View
// //                   style={
// //                     styles.followBackContainer
// //                   }
// //                 >
// //                   <View
// //                     style={
// //                       styles.followingButton
// //                     }
// //                   >
// //                     <Text
// //                       style={
// //                         styles.followingText
// //                       }
// //                     >
// //                       Following
// //                     </Text>
// //                   </View>
// //                 </View>
// //               )}
// //             </View>

// //             {/* ========================================
// //                 THREE DOT
// //             ======================================== */}

// //             <TouchableOpacity
// //               activeOpacity={0.7}
// //               style={
// //                 styles.moreButton
// //               }
// //               onPress={(event) => {
// //                 event.stopPropagation();

// //                 handleOpenMenu(item);
// //               }}
// //             >
// //               <Ionicons
// //                 name="ellipsis-horizontal"
// //                 size={22}
// //                 color="#fff"
// //               />
// //             </TouchableOpacity>

// //             {/* ========================================
// //                 UNREAD DOT
// //             ======================================== */}

// //             {unread && (
// //               <View
// //                 style={
// //                   styles.unreadDot
// //                 }
// //               />
// //             )}
// //           </TouchableOpacity>
// //         );
// //       },
// //       [
// //         acceptingRequestId,
// //         rejectingRequestId,
// //         followRequestsLoading,
// //         followingBackUserId,
// //         getAvatar,
// //         getFollowRequestId,
// //         getRelationship,
// //         getUserId,
// //         getUsername,
// //         handleAccept,
// //         handleFollowBack,
// //         handleNotificationPress,
// //         handleOpenMenu,
// //         handleReject,
// //         isFollowNotification,
// //         isPendingFollowRequest,
// //         formatTime,
// //       ]
// //     );

// //   // ====================================================
// //   // EMPTY
// //   // ====================================================

// //   const renderEmpty =
// //     useCallback(() => {
// //       if (loading) {
// //         return null;
// //       }

// //       return (
// //         <View
// //           style={
// //             styles.emptyContainer
// //           }
// //         >
// //           <View
// //             style={
// //               styles.emptyCircle
// //             }
// //           >
// //             <Ionicons
// //               name="heart-outline"
// //               size={42}
// //               color="#fff"
// //             />
// //           </View>

// //           <Text
// //             style={
// //               styles.emptyTitle
// //             }
// //           >
// //             Notifications
// //           </Text>

// //           <Text
// //             style={
// //               styles.emptySubtitle
// //             }
// //           >
// //             When people interact
// //             with you, you'll see
// //             it here.
// //           </Text>
// //         </View>
// //       );
// //     }, [loading]);

// //   // ====================================================
// //   // FOOTER
// //   // ====================================================

// //   const renderFooter =
// //     useCallback(() => {
// //       if (!loadingMore) {
// //         return null;
// //       }

// //       return (
// //         <View
// //           style={
// //             styles.footer
// //           }
// //         >
// //           <ActivityIndicator
// //             size="small"
// //             color="#a8a8a8"
// //           />
// //         </View>
// //       );
// //     }, [loadingMore]);

// //   // ====================================================
// //   // ERROR
// //   // ====================================================

// //   if (
// //     error &&
// //     notifications.length === 0 &&
// //     !loading
// //   ) {
// //     return (
// //       <View
// //         style={
// //           styles.container
// //         }
// //       >
// //         <StatusBar
// //           barStyle="light-content"
// //           backgroundColor="#000"
// //         />

// //         <View
// //           style={
// //             styles.header
// //           }
// //         >
// //           <TouchableOpacity
// //             style={
// //               styles.backButton
// //             }
// //             activeOpacity={0.7}
// //             onPress={() =>
// //               router.back()
// //             }
// //           >
// //             <Ionicons
// //               name="chevron-back"
// //               size={30}
// //               color="#fff"
// //             />
// //           </TouchableOpacity>

// //           <Text
// //             style={
// //               styles.headerTitle
// //             }
// //           >
// //             Notifications
// //           </Text>
// //         </View>

// //         <View
// //           style={
// //             styles.errorContainer
// //           }
// //         >
// //           <Ionicons
// //             name="alert-circle-outline"
// //             size={50}
// //             color="#777"
// //           />

// //           <Text
// //             style={
// //               styles.errorTitle
// //             }
// //           >
// //             Couldn't load
// //             notifications
// //           </Text>

// //           <Text
// //             style={
// //               styles.errorText
// //             }
// //           >
// //             {typeof error ===
// //             "string"
// //               ? error
// //               : "Something went wrong"}
// //           </Text>

// //           <TouchableOpacity
// //             style={
// //               styles.retryButton
// //             }
// //             onPress={() =>
// //               loadNotificationData()
// //             }
// //           >
// //             <Text
// //               style={
// //                 styles.retryText
// //               }
// //             >
// //               Try Again
// //             </Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     );
// //   }

// //   // ====================================================
// //   // SCREEN
// //   // ====================================================

// //   return (
// //     <View
// //       style={
// //         styles.container
// //       }
// //     >
// //       <StatusBar
// //         barStyle="light-content"
// //         backgroundColor="#000"
// //       />

// //       {/* ==============================================
// //           HEADER
// //       ============================================== */}

// //       <View
// //         style={
// //           styles.header
// //         }
// //       >
// //         <TouchableOpacity
// //           style={
// //             styles.backButton
// //           }
// //           activeOpacity={0.7}
// //           onPress={() =>
// //             router.back()
// //           }
// //         >
// //           <Ionicons
// //             name="chevron-back"
// //             size={30}
// //             color="#fff"
// //           />
// //         </TouchableOpacity>

// //         <Text
// //           style={
// //             styles.headerTitle
// //           }
// //         >
// //           Notifications
// //         </Text>

// //         {unreadCount > 0 && (
// //           <View
// //             style={
// //               styles.headerBadge
// //             }
// //           >
// //             <Text
// //               style={
// //                 styles.headerBadgeText
// //               }
// //             >
// //               {unreadCount > 99
// //                 ? "99+"
// //                 : unreadCount}
// //             </Text>
// //           </View>
// //         )}
// //       </View>

// //       {/* ==============================================
// //           LIST
// //       ============================================== */}

// //       {loading &&
// //       notifications.length ===
// //         0 ? (
// //         <View
// //           style={
// //             styles.loadingContainer
// //           }
// //         >
// //           <ActivityIndicator
// //             size="large"
// //             color="#fff"
// //           />
// //         </View>
// //       ) : (
// //         <FlatList
// //           data={notifications}
// //           keyExtractor={(
// //             item,
// //             index
// //           ) =>
// //             String(
// //               item?.id ??
// //                 `notification-${index}`
// //             )
// //           }
// //           renderItem={
// //             renderNotification
// //           }
// //           ListEmptyComponent={
// //             renderEmpty
// //           }
// //           ListFooterComponent={
// //             renderFooter
// //           }
// //           contentContainerStyle={
// //             notifications.length ===
// //             0
// //               ? styles.emptyList
// //               : styles.listContent
// //           }
// //           showsVerticalScrollIndicator={
// //             false
// //           }
// //           refreshControl={
// //             <RefreshControl
// //               refreshing={
// //                 refreshing
// //               }
// //               onRefresh={
// //                 handleRefresh
// //               }
// //               tintColor="#fff"
// //               colors={[
// //                 "#fff",
// //               ]}
// //               progressBackgroundColor="#1c1c1c"
// //             />
// //           }
// //           onEndReached={
// //             handleLoadMore
// //           }
// //           onEndReachedThreshold={
// //             0.5
// //           }
// //         />
// //       )}

// //       {/* ==============================================
// //           THREE DOT MENU
// //       ============================================== */}

// //       <Modal
// //         visible={menuVisible}
// //         transparent
// //         animationType="fade"
// //         onRequestClose={
// //           handleCloseMenu
// //         }
// //       >
// //         <Pressable
// //           style={
// //             styles.modalBackdrop
// //           }
// //           onPress={
// //             handleCloseMenu
// //           }
// //         >
// //           <Pressable
// //             style={
// //               styles.actionSheet
// //             }
// //             onPress={(event) =>
// //               event.stopPropagation()
// //             }
// //           >
// //             <View
// //               style={
// //                 styles.sheetHandle
// //               }
// //             />

// //             {/* USER INFO */}

// //             {selectedNotification && (
// //               <View
// //                 style={
// //                   styles.selectedUserRow
// //                 }
// //               >
// //                 {getAvatar(
// //                   selectedNotification
// //                 ) ? (
// //                   <Image
// //                     source={{
// //                       uri: getAvatar(
// //                         selectedNotification
// //                       ),
// //                     }}
// //                     style={
// //                       styles.selectedUserAvatar
// //                     }
// //                   />
// //                 ) : (
// //                   <View
// //                     style={
// //                       styles.selectedUserAvatarPlaceholder
// //                     }
// //                   >
// //                     <Ionicons
// //                       name="person"
// //                       size={22}
// //                       color="#8e8e8e"
// //                     />
// //                   </View>
// //                 )}

// //                 <View
// //                   style={
// //                     styles.selectedUserInfo
// //                   }
// //                 >
// //                   <Text
// //                     style={
// //                       styles.selectedUsername
// //                     }
// //                   >
// //                     {getUsername(
// //                       selectedNotification
// //                     )}
// //                   </Text>

// //                   <Text
// //                     style={
// //                       styles.selectedUserSubtext
// //                     }
// //                   >
// //                     Notification options
// //                   </Text>
// //                 </View>
// //               </View>
// //             )}

// //             {/* UNFOLLOW */}

// //             {selectedNotification &&
// //               (() => {
// //                 const userId =
// //                   getUserId(
// //                     selectedNotification
// //                   );

// //                 if (!userId) {
// //                   return null;
// //                 }

// //                 const relationship =
// //                   getRelationship(
// //                     selectedNotification
// //                   );

// //                 if (
// //                   !relationship.following
// //                 ) {
// //                   return null;
// //                 }

// //                 const isUnfollowing =
// //                   unfollowingUserId ===
// //                   String(userId);

// //                 return (
// //                   <TouchableOpacity
// //                     activeOpacity={0.7}
// //                     disabled={
// //                       isUnfollowing ||
// //                       !!deletingNotificationId
// //                     }
// //                     style={
// //                       styles.menuItem
// //                     }
// //                     onPress={
// //                       handleUnfollow
// //                     }
// //                   >
// //                     <View
// //                       style={
// //                         styles.menuIconWrapper
// //                       }
// //                     >
// //                       {isUnfollowing ? (
// //                         <ActivityIndicator
// //                           size="small"
// //                           color="#fff"
// //                         />
// //                       ) : (
// //                         <Ionicons
// //                           name="person-remove-outline"
// //                           size={22}
// //                           color="#fff"
// //                         />
// //                       )}
// //                     </View>

// //                     <Text
// //                       style={
// //                         styles.menuText
// //                       }
// //                     >
// //                       Unfollow
// //                     </Text>
// //                   </TouchableOpacity>
// //                 );
// //               })()}

// //             {/* DELETE */}

// //             <TouchableOpacity
// //               activeOpacity={0.7}
// //               disabled={
// //                 !!deletingNotificationId ||
// //                 !!unfollowingUserId
// //               }
// //               style={
// //                 styles.menuItem
// //               }
// //               onPress={
// //                 handleDeleteNotification
// //               }
// //             >
// //               <View
// //                 style={
// //                   styles.menuIconWrapper
// //                 }
// //               >
// //                 {deletingNotificationId &&
// //                 selectedNotification?.id &&
// //                 String(
// //                   deletingNotificationId
// //                 ) ===
// //                   String(
// //                     selectedNotification.id
// //                   ) ? (
// //                   <ActivityIndicator
// //                     size="small"
// //                     color="#ff3040"
// //                   />
// //                 ) : (
// //                   <Ionicons
// //                     name="trash-outline"
// //                     size={22}
// //                     color="#ff3040"
// //                   />
// //                 )}
// //               </View>

// //               <Text
// //                 style={
// //                   styles.deleteMenuText
// //                 }
// //               >
// //                 Delete
// //               </Text>
// //             </TouchableOpacity>

// //             {/* CANCEL */}

// //             <TouchableOpacity
// //               activeOpacity={0.7}
// //               disabled={
// //                 !!deletingNotificationId ||
// //                 !!unfollowingUserId
// //               }
// //               style={[
// //                 styles.cancelButton,
// //                 (
// //                   deletingNotificationId ||
// //                   unfollowingUserId
// //                 ) &&
// //                   styles.disabledCancel,
// //               ]}
// //               onPress={
// //                 handleCloseMenu
// //               }
// //             >
// //               <Text
// //                 style={
// //                   styles.cancelText
// //                 }
// //               >
// //                 Cancel
// //               </Text>
// //             </TouchableOpacity>
// //           </Pressable>
// //         </Pressable>
// //       </Modal>
// //     </View>
// //   );
// // }


// // // ======================================================
// // // STYLES
// // // ======================================================

// // const styles =
// //   StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       backgroundColor: "#000",
// //       paddingTop: 40,
// //     },

// //     header: {
// //       height: 58,
// //       width: "100%",
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingHorizontal: 8,
// //       backgroundColor: "#000",
// //       borderBottomWidth: 0.5,
// //       borderBottomColor: "#262626",
// //     },

// //     backButton: {
// //       width: 44,
// //       height: 44,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       marginRight: 2,
// //     },

// //     headerTitle: {
// //       color: "#fff",
// //       fontSize: 20,
// //       fontWeight: "700",
// //       lineHeight: 24,
// //       includeFontPadding: false,
// //     },

// //     headerBadge: {
// //       minWidth: 18,
// //       height: 18,
// //       paddingHorizontal: 4,
// //       borderRadius: 9,
// //       marginLeft: 7,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#ff3040",
// //     },

// //     headerBadgeText: {
// //       color: "#fff",
// //       fontSize: 10,
// //       fontWeight: "700",
// //       includeFontPadding: false,
// //     },

// //     listContent: {
// //       paddingTop: 4,
// //       paddingBottom: 30,
// //     },

// //     notificationRow: {
// //       minHeight: 72,
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingHorizontal: 14,
// //       paddingVertical: 10,
// //       backgroundColor: "#000",
// //     },

// //     unreadRow: {
// //       backgroundColor: "#080808",
// //     },

// //     avatarWrapper: {
// //       width: 52,
// //       height: 52,
// //       marginRight: 12,
// //     },

// //     avatar: {
// //       width: 52,
// //       height: 52,
// //       borderRadius: 26,
// //       backgroundColor: "#1c1c1c",
// //     },

// //     avatarPlaceholder: {
// //       width: 52,
// //       height: 52,
// //       borderRadius: 26,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#1c1c1c",
// //     },

// //     notificationContent: {
// //       flex: 1,
// //       paddingRight: 4,
// //     },

// //     notificationText: {
// //       color: "#f5f5f5",
// //       fontSize: 14,
// //       lineHeight: 19,
// //     },

// //     username: {
// //       color: "#fff",
// //       fontWeight: "700",
// //     },

// //     time: {
// //       color: "#8e8e8e",
// //       fontWeight: "400",
// //     },

// //     moreButton: {
// //       width: 36,
// //       height: 42,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       marginLeft: 3,
// //     },

// //     unreadDot: {
// //       width: 7,
// //       height: 7,
// //       borderRadius: 4,
// //       marginLeft: 3,
// //       backgroundColor: "#0095f6",
// //     },

// //     requestButtons: {
// //       flexDirection: "row",
// //       marginTop: 9,
// //       gap: 8,
// //     },

// //     confirmButton: {
// //       height: 34,
// //       minWidth: 90,
// //       paddingHorizontal: 20,
// //       borderRadius: 7,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#0095f6",
// //     },

// //     confirmText: {
// //       color: "#fff",
// //       fontSize: 13,
// //       fontWeight: "700",
// //     },

// //     deleteButton: {
// //       height: 34,
// //       minWidth: 90,
// //       paddingHorizontal: 20,
// //       borderRadius: 7,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#363636",
// //     },

// //     deleteText: {
// //       color: "#fff",
// //       fontSize: 13,
// //       fontWeight: "600",
// //     },

// //     followBackContainer: {
// //       marginTop: 9,
// //       flexDirection: "row",
// //     },

// //     followBackButton: {
// //       height: 34,
// //       minWidth: 100,
// //       paddingHorizontal: 18,
// //       borderRadius: 7,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#0095f6",
// //     },

// //     followBackText: {
// //       color: "#fff",
// //       fontSize: 13,
// //       fontWeight: "700",
// //     },

// //     followingButton: {
// //       height: 34,
// //       minWidth: 100,
// //       paddingHorizontal: 18,
// //       borderRadius: 7,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#363636",
// //     },

// //     followingText: {
// //       color: "#fff",
// //       fontSize: 13,
// //       fontWeight: "600",
// //     },

// //     disabledButton: {
// //       opacity: 0.55,
// //     },

// //     loadingContainer: {
// //       flex: 1,
// //       alignItems: "center",
// //       justifyContent: "center",
// //     },

// //     footer: {
// //       paddingVertical: 22,
// //       alignItems: "center",
// //       justifyContent: "center",
// //     },

// //     emptyList: {
// //       flexGrow: 1,
// //     },

// //     emptyContainer: {
// //       flex: 1,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       paddingHorizontal: 45,
// //     },

// //     emptyCircle: {
// //       width: 82,
// //       height: 82,
// //       borderRadius: 41,
// //       marginBottom: 20,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       borderWidth: 2,
// //       borderColor: "#fff",
// //     },

// //     emptyTitle: {
// //       color: "#fff",
// //       fontSize: 20,
// //       fontWeight: "700",
// //       marginBottom: 8,
// //     },

// //     emptySubtitle: {
// //       color: "#8e8e8e",
// //       fontSize: 14,
// //       lineHeight: 20,
// //       textAlign: "center",
// //     },

// //     errorContainer: {
// //       flex: 1,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       paddingHorizontal: 30,
// //     },

// //     errorTitle: {
// //       marginTop: 15,
// //       color: "#fff",
// //       fontSize: 17,
// //       fontWeight: "700",
// //       textAlign: "center",
// //     },

// //     errorText: {
// //       marginTop: 8,
// //       color: "#8e8e8e",
// //       fontSize: 13,
// //       textAlign: "center",
// //     },

// //     retryButton: {
// //       marginTop: 18,
// //       minWidth: 110,
// //       height: 38,
// //       paddingHorizontal: 20,
// //       borderRadius: 7,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#0095f6",
// //     },

// //     retryText: {
// //       color: "#fff",
// //       fontSize: 13,
// //       fontWeight: "700",
// //     },

// //     modalBackdrop: {
// //       flex: 1,
// //       backgroundColor:
// //         "rgba(0,0,0,0.65)",
// //       justifyContent: "flex-end",
// //     },

// //     actionSheet: {
// //       width: "100%",
// //       backgroundColor: "#1c1c1c",
// //       borderTopLeftRadius: 18,
// //       borderTopRightRadius: 18,
// //       paddingTop: 10,
// //       paddingBottom: 28,
// //       paddingHorizontal: 16,
// //     },

// //     sheetHandle: {
// //       width: 38,
// //       height: 4,
// //       borderRadius: 2,
// //       backgroundColor: "#666",
// //       alignSelf: "center",
// //       marginBottom: 18,
// //     },

// //     selectedUserRow: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingVertical: 10,
// //       paddingHorizontal: 4,
// //       marginBottom: 8,
// //     },

// //     selectedUserAvatar: {
// //       width: 44,
// //       height: 44,
// //       borderRadius: 22,
// //       backgroundColor: "#2b2b2b",
// //     },

// //     selectedUserAvatarPlaceholder: {
// //       width: 44,
// //       height: 44,
// //       borderRadius: 22,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#2b2b2b",
// //     },

// //     selectedUserInfo: {
// //       flex: 1,
// //       marginLeft: 12,
// //     },

// //     selectedUsername: {
// //       color: "#fff",
// //       fontSize: 15,
// //       fontWeight: "700",
// //     },

// //     selectedUserSubtext: {
// //       color: "#8e8e8e",
// //       fontSize: 12,
// //       marginTop: 3,
// //     },

// //     menuItem: {
// //       height: 54,
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingHorizontal: 8,
// //       borderBottomWidth: 0.5,
// //       borderBottomColor: "#303030",
// //     },

// //     menuIconWrapper: {
// //       width: 38,
// //       alignItems: "center",
// //       justifyContent: "center",
// //     },

// //     menuText: {
// //       color: "#fff",
// //       fontSize: 15,
// //       fontWeight: "600",
// //       marginLeft: 8,
// //     },

// //     deleteMenuText: {
// //       color: "#ff3040",
// //       fontSize: 15,
// //       fontWeight: "600",
// //       marginLeft: 8,
// //     },

// //     cancelButton: {
// //       height: 48,
// //       marginTop: 12,
// //       borderRadius: 10,
// //       alignItems: "center",
// //       justifyContent: "center",
// //       backgroundColor: "#2b2b2b",
// //     },

// //     cancelText: {
// //       color: "#fff",
// //       fontSize: 15,
// //       fontWeight: "600",
// //     },

// //     disabledCancel: {
// //       opacity: 0.5,
// //     },
// //   });


// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Image,
//   // StatusBar,
//   Modal,
//   Pressable,
// } from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ScreenLayout from "../../src/components/ScreenLayout";
// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import { useRouter } from "expo-router";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   getNotifications,
//   markNotificationRead,
//   deleteNotification,
//   getFollowRequests,
//   acceptFollowRequest,
//   rejectFollowRequest,
//   addNotificationFromWebSocket,

//   selectNotifications,
//   selectUnreadNotificationCount,
//   selectNotificationLoading,
//   selectNotificationLoadingMore,
//   selectNotificationHasMore,
//   selectNotificationError,

//   selectFollowRequests,
//   selectFollowRequestsLoading,
//   selectAcceptingRequestId,
//   selectRejectingRequestId,
//   selectDeletingNotificationId,
// } from "../../src/redux/notificationSlice";

// import {
//   followUser,
//   unfollowUser,
// } from "../../src/redux/followSlice";

// import {
//   getProfile,
// } from "../../src/redux/profileSlice";

// // ======================================================
// // SCREEN
// // ======================================================

// const NotificationsScreen = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // ====================================================
//   // REDUX
//   // ====================================================

//   const notifications = useSelector(
//     selectNotifications
//   );

//   const unreadCount = useSelector(
//     selectUnreadNotificationCount
//   );

//   const loading = useSelector(
//     selectNotificationLoading
//   );

//   const loadingMore = useSelector(
//     selectNotificationLoadingMore
//   );

//   const hasMore = useSelector(
//     selectNotificationHasMore
//   );

//   const error = useSelector(
//     selectNotificationError
//   );

//   const followRequests = useSelector(
//     selectFollowRequests
//   );

//   const followRequestsLoading =
//     useSelector(
//       selectFollowRequestsLoading
//     );

//   const acceptingRequestId =
//     useSelector(
//       selectAcceptingRequestId
//     );

//   const rejectingRequestId =
//     useSelector(
//       selectRejectingRequestId
//     );

//   const deletingNotificationId =
//     useSelector(
//       selectDeletingNotificationId
//     );

//   // ====================================================
//   // LOCAL STATE
//   // ====================================================

//   const [
//     refreshing,
//     setRefreshing,
//   ] = useState(false);

//   const [
//     relationshipOverrides,
//     setRelationshipOverrides,
//   ] = useState({});

//   const [
//     acceptedFollowUsers,
//     setAcceptedFollowUsers,
//   ] = useState({});

//   const [
//     menuNotification,
//     setMenuNotification,
//   ] = useState(null);

//   // ====================================================
//   // WEBSOCKET REFS
//   // ====================================================

//   const notificationSocketRef =
//     useRef(null);

//   const notificationReconnectTimeoutRef =
//     useRef(null);

//   const notificationSocketClosedManuallyRef =
//     useRef(false);

//   const notificationSocketConnectingRef =
//     useRef(false);

//   // ====================================================
//   // LOAD NOTIFICATIONS
//   // ====================================================

//   const loadNotificationData =
//     useCallback(async () => {
//       try {
//         await Promise.all([
//           dispatch(
//             getNotifications({
//               limit: 20,
//               offset: 0,
//               append: false,
//             })
//           ).unwrap(),

//           dispatch(
//             getFollowRequests()
//           ).unwrap(),
//         ]);
//       } catch (error) {
//         console.log(
//           "LOAD NOTIFICATION DATA ERROR =>",
//           error
//         );
//       }
//     }, [dispatch]);

//   // ====================================================
//   // INITIAL LOAD
//   // ====================================================

//   useEffect(() => {
//     loadNotificationData();
//   }, [loadNotificationData]);

//   // ====================================================
//   // LOAD ACTOR PROFILES
//   // ====================================================

//   useEffect(() => {
//     if (!notifications?.length) {
//       return;
//     }

//     const loadProfiles = async () => {
//       const actorIds = [
//         ...new Set(
//           notifications
//             .map(
//               (notification) =>
//                 notification?.actor_id ||
//                 notification?.requester?.id ||
//                 notification?.user_id
//             )
//             .filter(Boolean)
//         ),
//       ];

//       for (const actorId of actorIds) {
//         try {
//           const profile =
//             await dispatch(
//               getProfile(actorId)
//             ).unwrap();

//           setRelationshipOverrides(
//             (previous) => ({
//               ...previous,
//               [actorId]: {
//                 isFollowing:
//                   Boolean(
//                     profile?.is_following
//                   ),
//                 requestPending:
//                   Boolean(
//                     profile?.request_pending
//                   ),
//               },
//             })
//           );
//         } catch (error) {
//           console.log(
//             "PROFILE LOAD ERROR =>",
//             actorId,
//             error
//           );
//         }
//       }
//     };

//     loadProfiles();
//   }, [notifications, dispatch]);

//   // ====================================================
//   // NOTIFICATION WEBSOCKET
//   // ====================================================

//   const connectNotificationWebSocket =
//     useCallback(async () => {
//       if (
//         notificationSocketConnectingRef.current
//       ) {
//         return;
//       }

//       const currentSocket =
//         notificationSocketRef.current;

//       if (
//         currentSocket &&
//         (
//           currentSocket.readyState ===
//             WebSocket.OPEN ||
//           currentSocket.readyState ===
//             WebSocket.CONNECTING
//         )
//       ) {
//         return;
//       }

//       try {
//         notificationSocketConnectingRef.current =
//           true;

//         // --------------------------------------------
//         // ACCESS TOKEN
//         // --------------------------------------------

//         const accessToken =
//           await AsyncStorage.getItem(
//             "access_token"
//           );

//         if (!accessToken) {
//           console.log(
//             "NOTIFICATION WS => ACCESS TOKEN NOT FOUND"
//           );

//           notificationSocketConnectingRef.current =
//             false;

//           return;
//         }

//         // --------------------------------------------
//         // BACKEND WEBSOCKET URL
//         // --------------------------------------------

//         const wsUrl =
//           `ws://32.199.119.31:8000/api/notifications/ws?token=${encodeURIComponent(
//             accessToken
//           )}`;

//         console.log(
//           "========== NOTIFICATION WS CONNECTING =========="
//         );

//         const socket =
//           new WebSocket(wsUrl);

//         notificationSocketRef.current =
//           socket;

//         // --------------------------------------------
//         // OPEN
//         // --------------------------------------------

//         socket.onopen = () => {
//           console.log(
//             "========== NOTIFICATION WS CONNECTED =========="
//           );

//           notificationSocketConnectingRef.current =
//             false;
//         };

//         // --------------------------------------------
//         // MESSAGE
//         // --------------------------------------------

//         socket.onmessage = async (
//           event
//         ) => {
//           try {
//             console.log(
//               "========== NOTIFICATION WS MESSAGE =========="
//             );

//             console.log(
//               "RAW DATA =>",
//               event?.data
//             );

//             const data =
//               typeof event?.data ===
//               "string"
//                 ? JSON.parse(
//                     event.data
//                   )
//                 : event.data;

//             console.log(
//               "PARSED DATA =>",
//               data
//             );

//             // ----------------------------------------
//             // CONNECTED
//             // ----------------------------------------

//             if (
//               data?.type ===
//               "connected"
//             ) {
//               console.log(
//                 "NOTIFICATION WS => CONNECTED EVENT"
//               );

//               return;
//             }

//             // ----------------------------------------
//             // PONG
//             // ----------------------------------------

//             if (
//               data?.type === "pong"
//             ) {
//               return;
//             }

//             // ----------------------------------------
//             // ERROR
//             // ----------------------------------------

//             if (
//               data?.type === "error"
//             ) {
//               console.log(
//                 "NOTIFICATION WS SERVER ERROR =>",
//                 data
//               );

//               return;
//             }

//             // ----------------------------------------
//             // NEW NOTIFICATION
//             // ----------------------------------------

//             if (
//               data?.type !==
//                 "notification" ||
//               !data?.notification
//             ) {
//               return;
//             }

//             const notification =
//               data.notification;

//             console.log(
//               "========== NEW NOTIFICATION =========="
//             );

//             console.log(
//               "NOTIFICATION OBJECT =>",
//               notification
//             );

//             // ----------------------------------------
//             // ADD DIRECTLY TO REDUX
//             // ----------------------------------------

//             dispatch(
//               addNotificationFromWebSocket(
//                 notification
//               )
//             );

//             // ----------------------------------------
//             // FOLLOW REQUEST
//             // ----------------------------------------

//             const isFollowRequest =
//               notification?.type ===
//                 "follow_request" ||
//               notification?.type ===
//                 "follow-request" ||
//               notification?.type ===
//                 "follow_request_received";

//             if (isFollowRequest) {
//               dispatch(
//                 getFollowRequests()
//               );
//             }

//             // ----------------------------------------
//             // LOAD ACTOR PROFILE
//             // ----------------------------------------

//             const actorId =
//               notification?.actor_id;

//             if (actorId) {
//               try {
//                 const profile =
//                   await dispatch(
//                     getProfile(actorId)
//                   ).unwrap();

//                 console.log(
//                   "WS ACTOR PROFILE =>",
//                   profile
//                 );

//                 setRelationshipOverrides(
//                   (previous) => ({
//                     ...previous,
//                     [actorId]: {
//                       isFollowing:
//                         Boolean(
//                           profile?.is_following
//                         ),
//                       requestPending:
//                         Boolean(
//                           profile?.request_pending
//                         ),
//                     },
//                   })
//                 );
//               } catch (profileError) {
//                 console.log(
//                   "WS ACTOR PROFILE ERROR =>",
//                   profileError
//                 );
//               }
//             }
//           } catch (error) {
//             console.log(
//               "NOTIFICATION WS PARSE ERROR =>",
//               error
//             );
//           }
//         };

//         // --------------------------------------------
//         // ERROR
//         // --------------------------------------------

//         socket.onerror = (
//           socketError
//         ) => {
//           console.log(
//             "========== NOTIFICATION WS ERROR =========="
//           );

//           console.log(
//             "WS ERROR =>",
//             socketError
//           );

//           notificationSocketConnectingRef.current =
//             false;
//         };

//         // --------------------------------------------
//         // CLOSE
//         // --------------------------------------------

//         socket.onclose = (
//           closeEvent
//         ) => {
//           console.log(
//             "========== NOTIFICATION WS CLOSED =========="
//           );

//           console.log(
//             "CLOSE CODE =>",
//             closeEvent?.code
//           );

//           console.log(
//             "CLOSE REASON =>",
//             closeEvent?.reason
//           );

//           notificationSocketConnectingRef.current =
//             false;

//           notificationSocketRef.current =
//             null;

//           if (
//             notificationSocketClosedManuallyRef.current
//           ) {
//             return;
//           }

//           console.log(
//             "NOTIFICATION WS => RECONNECTING IN 3 SECONDS"
//           );

//           if (
//             notificationReconnectTimeoutRef.current
//           ) {
//             clearTimeout(
//               notificationReconnectTimeoutRef.current
//             );
//           }

//           notificationReconnectTimeoutRef.current =
//             setTimeout(() => {
//               connectNotificationWebSocket();
//             }, 3000);
//         };
//       } catch (error) {
//         console.log(
//           "NOTIFICATION WS CONNECTION ERROR =>",
//           error
//         );

//         notificationSocketConnectingRef.current =
//           false;
//       }
//     }, [dispatch]);

//   // ====================================================
//   // START / STOP WEBSOCKET
//   // ====================================================

//   useEffect(() => {
//     notificationSocketClosedManuallyRef.current =
//       false;

//     connectNotificationWebSocket();

//     return () => {
//       console.log(
//         "========== NOTIFICATION WS CLEANUP =========="
//       );

//       notificationSocketClosedManuallyRef.current =
//         true;

//       if (
//         notificationReconnectTimeoutRef.current
//       ) {
//         clearTimeout(
//           notificationReconnectTimeoutRef.current
//         );

//         notificationReconnectTimeoutRef.current =
//           null;
//       }

//       const socket =
//         notificationSocketRef.current;

//       if (socket) {
//         try {
//           socket.close(1000);
//         } catch (error) {
//           console.log(
//             "NOTIFICATION WS CLOSE ERROR =>",
//             error
//           );
//         }
//       }

//       notificationSocketRef.current =
//         null;

//       notificationSocketConnectingRef.current =
//         false;
//     };
//   }, [
//     connectNotificationWebSocket,
//   ]);

//   // ====================================================
//   // REFRESH
//   // ====================================================

//   const handleRefresh =
//     useCallback(async () => {
//       try {
//         setRefreshing(true);

//         await loadNotificationData();
//       } finally {
//         setRefreshing(false);
//       }
//     }, [loadNotificationData]);

//   // ====================================================
//   // LOAD MORE
//   // ====================================================

//   const handleLoadMore =
//     useCallback(() => {
//       if (
//         loading ||
//         loadingMore ||
//         !hasMore
//       ) {
//         return;
//       }

//       dispatch(
//         getNotifications({
//           limit: 20,
//           offset: notifications.length,
//           append: true,
//         })
//       );
//     }, [
//       dispatch,
//       loading,
//       loadingMore,
//       hasMore,
//       notifications.length,
//     ]);

//   // ====================================================
//   // HELPERS
//   // ====================================================

//   const getRequester = (
//     notification
//   ) => {
//     return (
//       notification?.requester ||
//       notification?.actor ||
//       notification?.user ||
//       null
//     );
//   };

//   const getUserId = (
//     notification
//   ) => {
//     const requester =
//       getRequester(notification);

//     return (
//       requester?.id ||
//       notification?.actor_id ||
//       notification?.user_id ||
//       notification?.requester_id ||
//       null
//     );
//   };

//   const getUsername = (
//     notification
//   ) => {
//     const requester =
//       getRequester(notification);

//     if (requester?.username) {
//       return requester.username;
//     }

//     if (notification?.username) {
//       return notification.username;
//     }

//     if (
//       notification?.message
//     ) {
//       return notification.message
//         .split(" ")[0]
//         .replace("@", "");
//     }

//     return "User";
//   };

//   const getAvatar = (
//     notification
//   ) => {
//     const requester =
//       getRequester(notification);

//     return (
//       requester?.avatar ||
//       requester?.avatar_url ||
//       requester?.profile_picture ||
//       requester?.profile_image ||
//       notification?.avatar ||
//       notification?.avatar_url ||
//       notification?.profile_picture ||
//       null
//     );
//   };

//   const getFollowRequestId = (
//     notification
//   ) => {
//     return (
//       notification?.target_id ||
//       notification?.request_id ||
//       notification?.follow_request_id ||
//       null
//     );
//   };

//   const isFollowNotification = (
//     notification
//   ) => {
//     const type =
//       notification?.type;

//     return (
//       type === "follow" ||
//       type === "follow_request" ||
//       type === "follow-request" ||
//       type ===
//         "follow_request_received"
//     );
//   };

//   const isPendingFollowRequest = (
//     notification
//   ) => {
//     const requestId =
//       getFollowRequestId(
//         notification
//       );

//     if (!requestId) {
//       return false;
//     }

//     return followRequests.some(
//       (request) =>
//         String(request?.id) ===
//         String(requestId)
//     );
//   };

//   const getRelationship = (
//     notification
//   ) => {
//     const userId =
//       getUserId(notification);

//     if (
//       relationshipOverrides[userId]
//     ) {
//       return relationshipOverrides[
//         userId
//       ];
//     }

//     return {
//       isFollowing:
//         Boolean(
//           notification
//             ?.current_user_following
//         ),

//       requestPending:
//         Boolean(
//           notification
//             ?.request_pending
//         ),
//     };
//   };

//   // ====================================================
//   // FOLLOW BACK
//   // ====================================================
// const handleFollowBack = async (notification) => {
//   const userId = getUserId(notification);

//   if (!userId) return;

//   try {
//     const response = await dispatch(
//       followUser(userId)
//     ).unwrap();

//     console.log("FOLLOW BACK RESPONSE =>", response);

//     setRelationshipOverrides((previous) => ({
//       ...previous,
//       [userId]: {
//         isFollowing: Boolean(response?.following),
//         requestPending: Boolean(response?.request_pending),
//       },
//     }));
//   } catch (error) {
//     console.log("FOLLOW BACK ERROR =>", error);
//   }
// };

//   // ====================================================
//   // UNFOLLOW
//   // ====================================================

//   const handleUnfollow =
//     async (notification) => {
//       const userId =
//         getUserId(notification);

//       if (!userId) {
//         return;
//       }

//       try {
//         await dispatch(
//           unfollowUser(userId)
//         ).unwrap();

//         setRelationshipOverrides(
//           (previous) => ({
//             ...previous,
//             [userId]: {
//               isFollowing: false,
//               requestPending: false,
//             },
//           })
//         );

//         setAcceptedFollowUsers(
//           (previous) => ({
//             ...previous,
//             [userId]: false,
//           })
//         );
//       } catch (error) {
//         console.log(
//           "UNFOLLOW ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // ACCEPT REQUEST
//   // ====================================================

//  const handleAcceptRequest = async (notification) => {
//   const requestId = getFollowRequestId(notification);
//   const userId = getUserId(notification);

//   if (!requestId) return;

//   try {
//     const response = await dispatch(
//       acceptFollowRequest(requestId)
//     ).unwrap();

//     console.log("ACCEPT FOLLOW REQUEST RESPONSE =>", response);

//     if (userId) {
//       setAcceptedFollowUsers((previous) => ({
//         ...previous,
//         [userId]: true,
//       }));

//       setRelationshipOverrides((previous) => ({
//         ...previous,
//         [userId]: {
//           isFollowing: Boolean(response?.following),
//           requestPending: Boolean(response?.request_pending),
//         },
//       }));
//     }
//   } catch (error) {
//     console.log("ACCEPT FOLLOW REQUEST ERROR =>", error);
//   }
// };

//   // ====================================================
//   // REJECT REQUEST
//   // ====================================================

//   const handleRejectRequest =
//     async (notification) => {
//       const requestId =
//         getFollowRequestId(
//           notification
//         );

//       if (!requestId) {
//         console.log(
//           "REQUEST ID NOT FOUND"
//         );
//         return;
//       }

//       try {
//         await dispatch(
//           rejectFollowRequest(
//             requestId
//           )
//         ).unwrap();

//         // --------------------------------------------
//         // DELETE NOTIFICATION AFTER REJECT
//         // --------------------------------------------

//         if (notification?.id) {
//           await dispatch(
//             deleteNotification(
//               notification.id
//             )
//           ).unwrap();
//         }
//       } catch (error) {
//         console.log(
//           "REJECT REQUEST ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // NOTIFICATION PRESS
//   // ====================================================

//   const handleNotificationPress =
//     async (notification) => {
//       if (
//         !notification?.id
//       ) {
//         return;
//       }

//       if (
//         notification.is_read ===
//         false
//       ) {
//         dispatch(
//           markNotificationRead(
//             notification.id
//           )
//         );
//       }

//       const userId =
//         getUserId(notification);

//       if (!userId) {
//         return;
//       }

//       router.push({
//         pathname:
//           "/profile-screens/user-profile",
//         params: {
//           userId: String(userId),
//         },
//       });
//     };

//   // ====================================================
//   // DELETE
//   // ====================================================

//   const handleDelete =
//     async () => {
//       if (
//         !menuNotification?.id
//       ) {
//         return;
//       }

//       try {
//         await dispatch(
//           deleteNotification(
//             menuNotification.id
//           )
//         ).unwrap();

//         setMenuNotification(null);
//       } catch (error) {
//         console.log(
//           "DELETE ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // RENDER NOTIFICATION
//   // ====================================================

//   const renderNotification =
//     ({ item }) => {
//       const userId =
//         getUserId(item);

//       const username =
//         getUsername(item);

//       const avatar =
//         getAvatar(item);

//       const relationship =
//         getRelationship(item);

//       const isFollow =
//         isFollowNotification(item);

//       const pending =
//         isPendingFollowRequest(
//           item
//         );

//       const accepted =
//         Boolean(
//           acceptedFollowUsers[userId]
//         );

//       const isUnread =
//         item?.is_read === false;

//       return (
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() =>
//             handleNotificationPress(
//               item
//             )
//           }
//           style={[
//             styles.notificationRow,
//             isUnread &&
//               styles.unreadRow,
//           ]}
//         >
//           {/* AVATAR */}
//           <View style={styles.avatarContainer}>
//             {avatar ? (
//               <Image
//                 source={{
//                   uri: avatar,
//                 }}
//                 style={styles.avatar}
//               />
//             ) : (
//               <View
//                 style={styles.defaultAvatar}
//               >
//                 <Ionicons
//                   name="person"
//                   size={24}
//                   color="#aaa"
//                 />
//               </View>
//             )}
//           </View>

//           {/* CONTENT */}
//           <View
//             style={styles.notificationContent}
//           >
//             <Text
//               style={styles.notificationText}
//               numberOfLines={3}
//             >
//               {item?.message ||
//                 `${username} sent you a notification`}
//             </Text>

//             {item?.created_at ? (
//               <Text
//                 style={styles.dateText}
//               >
//                 {new Date(
//                   item.created_at
//                 ).toLocaleString()}
//               </Text>
//             ) : null}

//             {/* FOLLOW REQUEST */}
//             {pending && (
//               <View
//                 style={
//                   styles.actionContainer
//                 }
//               >
//                 <TouchableOpacity
//                   style={
//                     styles.confirmButton
//                   }
//                   disabled={
//                     acceptingRequestId ===
//                     getFollowRequestId(
//                       item
//                     )
//                   }
//                   onPress={() =>
//                     handleAcceptRequest(
//                       item
//                     )
//                   }
//                 >
//                   {acceptingRequestId ===
//                   getFollowRequestId(
//                     item
//                   ) ? (
//                     <ActivityIndicator
//                       size="small"
//                       color="#fff"
//                     />
//                   ) : (
//                     <Text
//                       style={
//                         styles.buttonText
//                       }
//                     >
//                       Confirm
//                     </Text>
//                   )}
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={
//                     styles.deleteButton
//                   }
//                   disabled={
//                     rejectingRequestId ===
//                     getFollowRequestId(
//                       item
//                     )
//                   }
//                   onPress={() =>
//                     handleRejectRequest(
//                       item
//                     )
//                   }
//                 >
//                   {rejectingRequestId ===
//                   getFollowRequestId(
//                     item
//                   ) ? (
//                     <ActivityIndicator
//                       size="small"
//                       color="#fff"
//                     />
//                   ) : (
//                     <Text
//                       style={
//                         styles.buttonText
//                       }
//                     >
//                       Delete
//                     </Text>
//                   )}
//                 </TouchableOpacity>
//               </View>
//             )}

//             {/* FOLLOW BACK */}
//             {isFollow &&
//               !pending &&
//               !accepted &&
//               userId &&
//               !relationship
//                 .isFollowing &&
//               !relationship
//                 .requestPending && (
//                 <TouchableOpacity
//                   style={
//                     styles.followButton
//                   }
//                   onPress={() =>
//                     handleFollowBack(
//                       item
//                     )
//                   }
//                 >
//                   <Text
//                     style={
//                       styles.buttonText
//                     }
//                   >
//                     Follow
//                   </Text>
//                 </TouchableOpacity>
//               )}

//             {/* FOLLOWING */}
//             {isFollow &&
//               !pending &&
//               !accepted &&
//               relationship
//                 .isFollowing && (
//                 <TouchableOpacity
//                   style={
//                     styles.followingButton
//                   }
//                   onPress={() =>
//                     handleUnfollow(
//                       item
//                     )
//                   }
//                 >
//                   <Text
//                     style={
//                       styles.followingText
//                     }
//                   >
//                     Following
//                   </Text>
//                 </TouchableOpacity>
//               )}

//             {accepted && (
//               <TouchableOpacity
//                 style={
//                   styles.followButton
//                 }
//                 onPress={() =>
//                   handleFollowBack(
//                     item
//                   )
//                 }
//               >
//                 <Text
//                   style={
//                     styles.buttonText
//                   }
//                 >
//                   Follow Back
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* MENU */}
//           <TouchableOpacity
//             style={styles.menuButton}
//             onPress={() =>
//               setMenuNotification(item)
//             }
//           >
//             <Ionicons
//               name="ellipsis-horizontal"
//               size={20}
//               color="#aaa"
//             />
//           </TouchableOpacity>

//           {/* UNREAD DOT */}
//           {isUnread && (
//             <View
//               style={styles.unreadDot}
//             />
//           )}
//         </TouchableOpacity>
//       );
//     };

//   // ====================================================
//   // EMPTY
//   // ====================================================

//   const renderEmpty = () => {
//     if (loading) {
//       return null;
//     }

//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons
//           name="notifications-off-outline"
//           size={50}
//           color="#555"
//         />

//         <Text
//           style={styles.emptyTitle}
//         >
//           No notifications
//         </Text>

//         <Text
//           style={styles.emptyText}
//         >
//           You don't have any notifications yet.
//         </Text>
//       </View>
//     );
//   };

//   // ====================================================
//   // HEADER
//   // ====================================================

//   return (
//     // <View style={styles.container}>
//     <ScreenLayout
//     backgroundColor="#000"
//     keyboardAvoid={false}
//     header={
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => router.back()}
//           hitSlop={10}
//           activeOpacity={0.7}
//         >
//           <Ionicons
//             name="arrow-back"
//             size={24}
//             color="#fff"
//           />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>
//           Notifications
//         </Text>

//         {unreadCount > 0 && (
//           <View style={styles.countBadge}>
//             <Text style={styles.countText}>
//               {unreadCount > 99 ? "99+" : unreadCount}
//             </Text>
//           </View>
//         )}
//       </View>
//     }
//   >

//       {/* HEADER */}
//       {/* <View style={styles.header}>
//         <Text style={styles.headerTitle}>
//           Notifications
//         </Text>

//         {unreadCount > 0 && (
//           <View style={styles.countBadge}>
//             <Text
//               style={styles.countText}
//             >
//               {unreadCount > 99
//                 ? "99+"
//                 : unreadCount}
//             </Text>
//           </View>
//         )}
//       </View> */}

//       {/* ERROR */}
//       {error ? (
//         <TouchableOpacity
//           style={styles.errorContainer}
//           onPress={
//             loadNotificationData
//           }
//         >
//           <Text
//             style={styles.errorText}
//           >
//             {error}
//           </Text>

//           <Text
//             style={styles.retryText}
//           >
//             Tap to retry
//           </Text>
//         </TouchableOpacity>
//       ) : null}

//       {/* LIST */}
//       <FlatList
//         data={notifications}
//         keyExtractor={(item, index) =>
//           String(
//             item?.id ?? index
//           )
//         }
//         renderItem={
//           renderNotification
//         }
//         ListEmptyComponent={
//           renderEmpty
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={
//               handleRefresh
//             }
//             tintColor="#fff"
//             colors={["#fff"]}
//           />
//         }
//         onEndReached={
//           handleLoadMore
//         }
//         onEndReachedThreshold={0.5}
//         contentContainerStyle={
//           notifications.length === 0
//             ? styles.emptyList
//             : styles.listContent
//         }
//         ListFooterComponent={
//           loadingMore ? (
//             <View
//               style={
//                 styles.footerLoader
//               }
//             >
//               <ActivityIndicator
//                 size="small"
//                 color="#fff"
//               />
//             </View>
//           ) : null
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//       />

//       {/* MENU MODAL */}
//       <Modal
//         visible={
//           Boolean(menuNotification)
//         }
//         transparent
//         animationType="fade"
//         onRequestClose={() =>
//           setMenuNotification(null)
//         }
//       >
//         <Pressable
//           style={styles.modalOverlay}
//           onPress={() =>
//             setMenuNotification(null)
//           }
//         >
//           <Pressable
//             style={styles.menuModal}
//             onPress={() => {}}
//           >
//             <TouchableOpacity
//               style={styles.modalOption}
//               disabled={
//                 deletingNotificationId ===
//                 menuNotification?.id
//               }
//               onPress={
//                 handleDelete
//               }
//             >
//               {deletingNotificationId ===
//               menuNotification?.id ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <>
//                   <Ionicons
//                     name="trash-outline"
//                     size={22}
//                     color="#ff3b30"
//                   />

//                   <Text
//                     style={
//                       styles.deleteOptionText
//                     }
//                   >
//                     Delete
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>

//             {menuNotification &&
//               getRelationship(
//                 menuNotification
//               ).isFollowing && (
//                 <TouchableOpacity
//                   style={
//                     styles.modalOption
//                   }
//                   onPress={() => {
//                     setMenuNotification(
//                       null
//                     );

//                     handleUnfollow(
//                       menuNotification
//                     );
//                   }}
//                 >
//                   <Ionicons
//                     name="person-remove-outline"
//                     size={22}
//                     color="#fff"
//                   />

//                   <Text
//                     style={
//                       styles.modalOptionText
//                     }
//                   >
//                     Unfollow
//                   </Text>
//                 </TouchableOpacity>
//               )}

//             <TouchableOpacity
//               style={styles.modalCancel}
//               onPress={() =>
//                 setMenuNotification(null)
//               }
//             >
//               <Text
//                 style={
//                   styles.modalCancelText
//                 }
//               >
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//           </Pressable>
//         </Pressable>
//       </Modal>
//       </ScreenLayout>
//     // </View>
//   );
// };

// // ======================================================
// // STYLES
// // ======================================================

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: "#000",
//   // },
  

//   header: {
//     height: 60,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#262626",
//   },

//   backButton: {
//   width: 32,
//   height: 40,
//   alignItems: "flex-start",
//   justifyContent: "center",
//   marginRight: 8,
// },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },

//   countBadge: {
//     minWidth: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: "#ff3040",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 8,
//     paddingHorizontal: 6,
//   },

//   countText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   listContent: {
//     paddingBottom: 100,
//   },

//   emptyList: {
//     flexGrow: 1,
//   },

//   notificationRow: {
//     minHeight: 78,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#1b1b1b",
//   },

//   unreadRow: {
//     backgroundColor: "#0b0b0b",
//   },

//   avatarContainer: {
//     width: 50,
//     height: 50,
//     marginRight: 12,
//   },

//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#222",
//   },

//   defaultAvatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#222",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   notificationContent: {
//     flex: 1,
//     paddingRight: 8,
//   },

//   notificationText: {
//     color: "#fff",
//     fontSize: 14,
//     lineHeight: 20,
//   },

//   dateText: {
//     color: "#777",
//     fontSize: 11,
//     marginTop: 4,
//   },

//   actionContainer: {
//     flexDirection: "row",
//     marginTop: 9,
//     gap: 8,
//   },

//   confirmButton: {
//     height: 34,
//     minWidth: 90,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#0095f6",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   deleteButton: {
//     height: 34,
//     minWidth: 80,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#262626",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   followButton: {
//     marginTop: 9,
//     height: 34,
//     minWidth: 90,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#0095f6",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "flex-start",
//   },

//   followingButton: {
//     marginTop: 9,
//     height: 34,
//     minWidth: 90,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#262626",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "flex-start",
//   },

//   followingText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   menuButton: {
//     width: 30,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   unreadDot: {
//     position: "absolute",
//     right: 12,
//     top: 12,
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: "#0095f6",
//   },

//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//   },

//   emptyTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginTop: 15,
//   },

//   emptyText: {
//     color: "#777",
//     fontSize: 14,
//     textAlign: "center",
//     marginTop: 7,
//   },

//   errorContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#1b0808",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#442020",
//   },

//   errorText: {
//     color: "#ff6b6b",
//     fontSize: 13,
//   },

//   retryText: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//   },

//   footerLoader: {
//     paddingVertical: 20,
//     alignItems: "center",
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.7)",
//     justifyContent: "flex-end",
//   },

//   menuModal: {
//     backgroundColor: "#1c1c1c",
//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,
//     paddingBottom: 25,
//   },

//   modalOption: {
//     minHeight: 55,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#333",
//   },

//   modalOptionText: {
//     color: "#fff",
//     fontSize: 15,
//   },

//   deleteOptionText: {
//     color: "#ff3b30",
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   modalCancel: {
//     minHeight: 55,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   modalCancelText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
// });

// export default NotificationsScreen;


// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Image,
//   Modal,
//   Pressable,
// } from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// import ScreenLayout from "../../src/components/ScreenLayout";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import { useRouter } from "expo-router";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   getNotifications,
//   markNotificationRead,
//   deleteNotification,
//   getFollowRequests,
//   acceptFollowRequest,
//   rejectFollowRequest,
//   addNotificationFromWebSocket,

//   selectNotifications,
//   selectUnreadNotificationCount,
//   selectNotificationLoading,
//   selectNotificationLoadingMore,
//   selectNotificationHasMore,
//   selectNotificationError,

//   selectFollowRequests,
//   selectFollowRequestsLoading,
//   selectAcceptingRequestId,
//   selectRejectingRequestId,
//   selectDeletingNotificationId,
// } from "../../src/redux/notificationSlice";

// import {
//   followUser,
//   unfollowUser,
// } from "../../src/redux/followSlice";

// import {
//   getProfile,
// } from "../../src/redux/profileSlice";

// // ======================================================
// // SCREEN
// // ======================================================

// const NotificationsScreen = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // ====================================================
//   // REDUX
//   // ====================================================

//   const notifications = useSelector(
//     selectNotifications
//   );

//   const unreadCount = useSelector(
//     selectUnreadNotificationCount
//   );

//   const loading = useSelector(
//     selectNotificationLoading
//   );

//   const loadingMore = useSelector(
//     selectNotificationLoadingMore
//   );

//   const hasMore = useSelector(
//     selectNotificationHasMore
//   );

//   const error = useSelector(
//     selectNotificationError
//   );

//   const followRequests = useSelector(
//     selectFollowRequests
//   );

//   const followRequestsLoading = useSelector(
//     selectFollowRequestsLoading
//   );

//   const acceptingRequestId = useSelector(
//     selectAcceptingRequestId
//   );

//   const rejectingRequestId = useSelector(
//     selectRejectingRequestId
//   );

//   const deletingNotificationId = useSelector(
//     selectDeletingNotificationId
//   );

//   // ====================================================
//   // LOCAL STATE
//   // ====================================================

//   const [
//     refreshing,
//     setRefreshing,
//   ] = useState(false);

//   /*
//    * Backend relationship state.
//    *
//    * {
//    *   [userId]: {
//    *     isFollowing: boolean,
//    *     requestPending: boolean
//    *   }
//    * }
//    */
//   const [
//     relationshipOverrides,
//     setRelationshipOverrides,
//   ] = useState({});

//   /*
//    * User has accepted the incoming follow request.
//    *
//    * This is only used for the intermediate:
//    *
//    * Confirm -> Follow Back
//    *
//    * After Follow Back is clicked, this becomes false
//    * and backend response controls the UI.
//    */
//   const [
//     acceptedFollowUsers,
//     setAcceptedFollowUsers,
//   ] = useState({});

//   const [
//     menuNotification,
//     setMenuNotification,
//   ] = useState(null);

//   // ====================================================
//   // WEBSOCKET REFS
//   // ====================================================

//   const notificationSocketRef =
//     useRef(null);

//   const notificationReconnectTimeoutRef =
//     useRef(null);

//   const notificationSocketClosedManuallyRef =
//     useRef(false);

//   const notificationSocketConnectingRef =
//     useRef(false);

//   // ====================================================
//   // LOAD NOTIFICATIONS
//   // ====================================================

//   const loadNotificationData =
//     useCallback(async () => {
//       try {
//         await Promise.all([
//           dispatch(
//             getNotifications({
//               limit: 20,
//               offset: 0,
//               append: false,
//             })
//           ).unwrap(),

//           dispatch(
//             getFollowRequests()
//           ).unwrap(),
//         ]);
//       } catch (error) {
//         console.log(
//           "LOAD NOTIFICATION DATA ERROR =>",
//           error
//         );
//       }
//     }, [dispatch]);

//   // ====================================================
//   // INITIAL LOAD
//   // ====================================================

//   useEffect(() => {
//     loadNotificationData();
//   }, [loadNotificationData]);

//   // ====================================================
//   // LOAD ACTOR PROFILES
//   // ====================================================

// // ====================================================
// // LOAD ACTOR PROFILES
// // ====================================================

// useEffect(() => {
//   if (!notifications?.length) {
//     return;
//   }

//   const loadProfiles = async () => {
//     const actorIds = [
//       ...new Set(
//         notifications
//           .map((notification) => {
//             const requester =
//               notification?.requester ||
//               notification?.actor ||
//               notification?.user;

//             return (
//               requester?.id ||
//               notification?.actor_id ||
//               notification?.user_id ||
//               notification?.requester_id
//             );
//           })
//           .filter(Boolean)
//       ),
//     ];

//     for (const actorId of actorIds) {
//       try {
//         const profileResponse = await dispatch(
//           getProfile(actorId)
//         ).unwrap();

//         console.log(
//           "NOTIFICATION PROFILE =>",
//           actorId,
//           profileResponse
//         );

//         // Backend response:
//         // {
//         //   profile: {
//         //     is_following: true,
//         //     request_pending: false
//         //   },
//         //   userId: 22
//         // }

//         const profile = profileResponse?.profile;

//         setRelationshipOverrides((previous) => ({
//           ...previous,
//           [actorId]: {
//             isFollowing: Boolean(
//               profile?.is_following
//             ),
//             requestPending: Boolean(
//               profile?.request_pending
//             ),
//           },
//         }));
//       } catch (error) {
//         console.log(
//           "PROFILE LOAD ERROR =>",
//           actorId,
//           error
//         );
//       }
//     }
//   };

//   loadProfiles();
// }, [notifications, dispatch]);

//   // ====================================================
//   // NOTIFICATION WEBSOCKET
//   // ====================================================

//   const connectNotificationWebSocket =
//     useCallback(async () => {
//       if (
//         notificationSocketConnectingRef.current
//       ) {
//         return;
//       }

//       const currentSocket =
//         notificationSocketRef.current;

//       if (
//         currentSocket &&
//         (
//           currentSocket.readyState ===
//             WebSocket.OPEN ||
//           currentSocket.readyState ===
//             WebSocket.CONNECTING
//         )
//       ) {
//         return;
//       }

//       try {
//         notificationSocketConnectingRef.current =
//           true;

//         // --------------------------------------------
//         // ACCESS TOKEN
//         // --------------------------------------------

//         const accessToken =
//           await AsyncStorage.getItem(
//             "access_token"
//           );

//         if (!accessToken) {
//           console.log(
//             "NOTIFICATION WS => ACCESS TOKEN NOT FOUND"
//           );

//           notificationSocketConnectingRef.current =
//             false;

//           return;
//         }

//         // --------------------------------------------
//         // WEBSOCKET URL
//         // --------------------------------------------

//         const wsUrl =
//           `ws://32.199.119.31:8000/api/notifications/ws?token=${encodeURIComponent(
//             accessToken
//           )}`;

//         console.log(
//           "========== NOTIFICATION WS CONNECTING =========="
//         );

//         const socket =
//           new WebSocket(wsUrl);

//         notificationSocketRef.current =
//           socket;

//         // --------------------------------------------
//         // OPEN
//         // --------------------------------------------

//         socket.onopen = () => {
//           console.log(
//             "========== NOTIFICATION WS CONNECTED =========="
//           );

//           notificationSocketConnectingRef.current =
//             false;
//         };

//         // --------------------------------------------
//         // MESSAGE
//         // --------------------------------------------

//         socket.onmessage = async (
//           event
//         ) => {
//           try {
//             console.log(
//               "========== NOTIFICATION WS MESSAGE =========="
//             );

//             console.log(
//               "RAW DATA =>",
//               event?.data
//             );

//             const data =
//               typeof event?.data === "string"
//                 ? JSON.parse(event.data)
//                 : event.data;

//             console.log(
//               "PARSED DATA =>",
//               data
//             );

//             // ----------------------------------------
//             // CONNECTED
//             // ----------------------------------------

//             if (
//               data?.type === "connected"
//             ) {
//               console.log(
//                 "NOTIFICATION WS => CONNECTED EVENT"
//               );

//               return;
//             }

//             // ----------------------------------------
//             // PONG
//             // ----------------------------------------

//             if (
//               data?.type === "pong"
//             ) {
//               return;
//             }

//             // ----------------------------------------
//             // ERROR
//             // ----------------------------------------

//             if (
//               data?.type === "error"
//             ) {
//               console.log(
//                 "NOTIFICATION WS SERVER ERROR =>",
//                 data
//               );

//               return;
//             }

//             // ----------------------------------------
//             // NEW NOTIFICATION
//             // ----------------------------------------

//             if (
//               data?.type !== "notification" ||
//               !data?.notification
//             ) {
//               return;
//             }

//             const notification =
//               data.notification;

//             console.log(
//               "========== NEW NOTIFICATION =========="
//             );

//             console.log(
//               "NOTIFICATION OBJECT =>",
//               notification
//             );

//             // ----------------------------------------
//             // ADD TO REDUX
//             // ----------------------------------------

//             dispatch(
//               addNotificationFromWebSocket(
//                 notification
//               )
//             );

//             // ----------------------------------------
//             // FOLLOW REQUEST
//             // ----------------------------------------

//             const isFollowRequest =
//               notification?.type ===
//                 "follow_request" ||
//               notification?.type ===
//                 "follow-request" ||
//               notification?.type ===
//                 "follow_request_received";

//             if (isFollowRequest) {
//               dispatch(
//                 getFollowRequests()
//               );
//             }

//             // ----------------------------------------
//             // LOAD ACTOR PROFILE
//             // ----------------------------------------

//             const actorId =
//               notification?.actor_id;

//             if (actorId) {
//               try {
//                 const profile =
//                   await dispatch(
//                     getProfile(actorId)
//                   ).unwrap();

//                 console.log(
//                   "WS ACTOR PROFILE =>",
//                   profile
//                 );

//                const profileData = profile?.profile;

// setRelationshipOverrides(
//   (previous) => ({
//     ...previous,
//     [actorId]: {
//       isFollowing: Boolean(
//         profileData?.is_following
//       ),
//       requestPending: Boolean(
//         profileData?.request_pending
//       ),
//     },
//   })
// );
//               } catch (profileError) {
//                 console.log(
//                   "WS ACTOR PROFILE ERROR =>",
//                   profileError
//                 );
//               }
//             }
//           } catch (error) {
//             console.log(
//               "NOTIFICATION WS PARSE ERROR =>",
//               error
//             );
//           }
//         };

//         // --------------------------------------------
//         // ERROR
//         // --------------------------------------------

//         socket.onerror = (
//           socketError
//         ) => {
//           console.log(
//             "========== NOTIFICATION WS ERROR =========="
//           );

//           console.log(
//             "WS ERROR =>",
//             socketError
//           );

//           notificationSocketConnectingRef.current =
//             false;
//         };

//         // --------------------------------------------
//         // CLOSE
//         // --------------------------------------------

//         socket.onclose = (
//           closeEvent
//         ) => {
//           console.log(
//             "========== NOTIFICATION WS CLOSED =========="
//           );

//           console.log(
//             "CLOSE CODE =>",
//             closeEvent?.code
//           );

//           console.log(
//             "CLOSE REASON =>",
//             closeEvent?.reason
//           );

//           notificationSocketConnectingRef.current =
//             false;

//           notificationSocketRef.current =
//             null;

//           if (
//             notificationSocketClosedManuallyRef.current
//           ) {
//             return;
//           }

//           console.log(
//             "NOTIFICATION WS => RECONNECTING IN 3 SECONDS"
//           );

//           if (
//             notificationReconnectTimeoutRef.current
//           ) {
//             clearTimeout(
//               notificationReconnectTimeoutRef.current
//             );
//           }

//           notificationReconnectTimeoutRef.current =
//             setTimeout(() => {
//               connectNotificationWebSocket();
//             }, 3000);
//         };
//       } catch (error) {
//         console.log(
//           "NOTIFICATION WS CONNECTION ERROR =>",
//           error
//         );

//         notificationSocketConnectingRef.current =
//           false;
//       }
//     }, [dispatch]);

//   // ====================================================
//   // START / STOP WEBSOCKET
//   // ====================================================

//   useEffect(() => {
//     notificationSocketClosedManuallyRef.current =
//       false;

//     connectNotificationWebSocket();

//     return () => {
//       console.log(
//         "========== NOTIFICATION WS CLEANUP =========="
//       );

//       notificationSocketClosedManuallyRef.current =
//         true;

//       if (
//         notificationReconnectTimeoutRef.current
//       ) {
//         clearTimeout(
//           notificationReconnectTimeoutRef.current
//         );

//         notificationReconnectTimeoutRef.current =
//           null;
//       }

//       const socket =
//         notificationSocketRef.current;

//       if (socket) {
//         try {
//           socket.close(1000);
//         } catch (error) {
//           console.log(
//             "NOTIFICATION WS CLOSE ERROR =>",
//             error
//           );
//         }
//       }

//       notificationSocketRef.current =
//         null;

//       notificationSocketConnectingRef.current =
//         false;
//     };
//   }, [
//     connectNotificationWebSocket,
//   ]);

//   // ====================================================
//   // REFRESH
//   // ====================================================

//   const handleRefresh =
//     useCallback(async () => {
//       try {
//         setRefreshing(true);

//         await loadNotificationData();
//       } finally {
//         setRefreshing(false);
//       }
//     }, [loadNotificationData]);

//   // ====================================================
//   // LOAD MORE
//   // ====================================================

//   const handleLoadMore =
//     useCallback(() => {
//       if (
//         loading ||
//         loadingMore ||
//         !hasMore
//       ) {
//         return;
//       }

//       dispatch(
//         getNotifications({
//           limit: 20,
//           offset: notifications.length,
//           append: true,
//         })
//       );
//     }, [
//       dispatch,
//       loading,
//       loadingMore,
//       hasMore,
//       notifications.length,
//     ]);

//   // ====================================================
//   // HELPERS
//   // ====================================================

//   const getRequester = (
//     notification
//   ) => {
//     return (
//       notification?.requester ||
//       notification?.actor ||
//       notification?.user ||
//       null
//     );
//   };

//   const getUserId = (
//     notification
//   ) => {
//     const requester =
//       getRequester(notification);

//     return (
//       requester?.id ||
//       notification?.actor_id ||
//       notification?.user_id ||
//       notification?.requester_id ||
//       null
//     );
//   };

//   const getUsername = (
//     notification
//   ) => {
//     const requester =
//       getRequester(notification);

//     if (requester?.username) {
//       return requester.username;
//     }

//     if (notification?.username) {
//       return notification.username;
//     }

//     if (notification?.message) {
//       return notification.message
//         .split(" ")[0]
//         .replace("@", "");
//     }

//     return "User";
//   };

//   const getAvatar = (
//     notification
//   ) => {
//     const requester =
//       getRequester(notification);

//     return (
//       requester?.avatar ||
//       requester?.avatar_url ||
//       requester?.profile_picture ||
//       requester?.profile_image ||
//       notification?.avatar ||
//       notification?.avatar_url ||
//       notification?.profile_picture ||
//       null
//     );
//   };

//   const getFollowRequestId = (
//     notification
//   ) => {
//     return (
//       notification?.target_id ||
//       notification?.request_id ||
//       notification?.follow_request_id ||
//       null
//     );
//   };

//   const isFollowNotification = (
//     notification
//   ) => {
//     const type =
//       notification?.type;

//     return (
//       type === "follow" ||
//       type === "follow_request" ||
//       type === "follow-request" ||
//       type ===
//         "follow_request_received"
//     );
//   };

//   const isPendingFollowRequest = (
//     notification
//   ) => {
//     const requestId =
//       getFollowRequestId(
//         notification
//       );

//     if (!requestId) {
//       return false;
//     }

//     return followRequests.some(
//       (request) =>
//         String(request?.id) ===
//         String(requestId)
//     );
//   };

//   // ====================================================
//   // RELATIONSHIP
//   // ====================================================

//  const getRelationship = (notification) => {
//   const userId = getUserId(notification);

//   if (relationshipOverrides[userId]) {
//     return relationshipOverrides[userId];
//   }

//   return {
//     isFollowing: Boolean(
//       notification?.current_user_following
//     ),
//     requestPending: Boolean(
//       notification?.request_pending
//     ),
//   };
// };

//   // ====================================================
//   // FOLLOW BACK
//   // ====================================================

//   const handleFollowBack =
//     async (notification) => {
//       const userId =
//         getUserId(notification);

//       if (!userId) {
//         return;
//       }

//       try {
//         const response =
//           await dispatch(
//             followUser(userId)
//           ).unwrap();

//         console.log(
//           "FOLLOW BACK RESPONSE =>",
//           {
//             ...response,
//             userId,
//           }
//         );

//         /*
//          * IMPORTANT:
//          *
//          * Backend is now the source of truth.
//          *
//          * Public:
//          * following=true
//          * request_pending=false
//          *
//          * Private:
//          * following=false
//          * request_pending=true
//          */

//         setRelationshipOverrides(
//           (previous) => ({
//             ...previous,
//             [userId]: {
//               isFollowing:
//                 Boolean(
//                   response?.following
//                 ),
//               requestPending:
//                 Boolean(
//                   response?.request_pending
//                 ),
//             },
//           })
//         );

//         /*
//          * Follow Back has now been clicked.
//          * Remove the temporary Follow Back state.
//          */
//         setAcceptedFollowUsers(
//           (previous) => ({
//             ...previous,
//             [userId]: false,
//           })
//         );
//       } catch (error) {
//         console.log(
//           "FOLLOW BACK ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // UNFOLLOW
//   // ====================================================

//   const handleUnfollow =
//     async (notification) => {
//       const userId =
//         getUserId(notification);

//       if (!userId) {
//         return;
//       }

//       try {
//         await dispatch(
//           unfollowUser(userId)
//         ).unwrap();

//         setRelationshipOverrides(
//           (previous) => ({
//             ...previous,
//             [userId]: {
//               isFollowing: false,
//               requestPending: false,
//             },
//           })
//         );

//         setAcceptedFollowUsers(
//           (previous) => ({
//             ...previous,
//             [userId]: false,
//           })
//         );
//       } catch (error) {
//         console.log(
//           "UNFOLLOW ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // ACCEPT REQUEST
//   // ====================================================

//   const handleAcceptRequest =
//     async (notification) => {
//       const requestId =
//         getFollowRequestId(
//           notification
//         );

//       const userId =
//         getUserId(notification);

//       if (!requestId) {
//         console.log(
//           "REQUEST ID NOT FOUND"
//         );

//         return;
//       }

//       try {
//         const response =
//           await dispatch(
//             acceptFollowRequest(
//               requestId
//             )
//           ).unwrap();

//         console.log(
//           "ACCEPT FOLLOW REQUEST RESPONSE =>",
//           response
//         );

//         if (userId) {
//           /*
//            * This creates the temporary
//            *
//            * Confirm -> Follow Back
//            *
//            * state.
//            *
//            * Even though the accept API response
//            * says following=true, we intentionally
//            * show Follow Back at this stage.
//            */
//           setAcceptedFollowUsers(
//             (previous) => ({
//               ...previous,
//               [userId]: true,
//             })
//           );

//           /*
//            * Store the real backend relationship
//            * response.
//            */
//           setRelationshipOverrides(
//             (previous) => ({
//               ...previous,
//               [userId]: {
//                 isFollowing:
//                   Boolean(
//                     response?.following
//                   ),
//                 requestPending:
//                   Boolean(
//                     response?.request_pending
//                   ),
//               },
//             })
//           );
//         }
//       } catch (error) {
//         console.log(
//           "ACCEPT FOLLOW REQUEST ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // REJECT REQUEST
//   // ====================================================

//   const handleRejectRequest =
//     async (notification) => {
//       const requestId =
//         getFollowRequestId(
//           notification
//         );

//       if (!requestId) {
//         console.log(
//           "REQUEST ID NOT FOUND"
//         );

//         return;
//       }

//       try {
//         await dispatch(
//           rejectFollowRequest(
//             requestId
//           )
//         ).unwrap();

//         if (notification?.id) {
//           await dispatch(
//             deleteNotification(
//               notification.id
//             )
//           ).unwrap();
//         }
//       } catch (error) {
//         console.log(
//           "REJECT REQUEST ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // NOTIFICATION PRESS
//   // ====================================================

//   const handleNotificationPress =
//     async (notification) => {
//       if (!notification?.id) {
//         return;
//       }

//       if (
//         notification.is_read === false
//       ) {
//         dispatch(
//           markNotificationRead(
//             notification.id
//           )
//         );
//       }

//       const userId =
//         getUserId(notification);

//       if (!userId) {
//         return;
//       }

//       router.push({
//         pathname:
//           "/profile-screens/user-profile",

//         params: {
//           userId: String(userId),
//         },
//       });
//     };

//   // ====================================================
//   // DELETE
//   // ====================================================

//   const handleDelete =
//     async () => {
//       if (!menuNotification?.id) {
//         return;
//       }

//       try {
//         await dispatch(
//           deleteNotification(
//             menuNotification.id
//           )
//         ).unwrap();

//         setMenuNotification(null);
//       } catch (error) {
//         console.log(
//           "DELETE ERROR =>",
//           error
//         );
//       }
//     };

//   // ====================================================
//   // RENDER NOTIFICATION
//   // ====================================================

//   const renderNotification =
//     ({ item }) => {
//       const userId =
//         getUserId(item);

//       const username =
//         getUsername(item);

//       const avatar =
//         getAvatar(item);

//       const relationship =
//         getRelationship(item);

//       const isFollow =
//         isFollowNotification(item);

//       const pending =
//         isPendingFollowRequest(
//           item
//         );

//       const accepted =
//         Boolean(
//           acceptedFollowUsers[userId]
//         );

//       const isUnread =
//         item?.is_read === false;

//       /*
//        * ==================================================
//        * BUTTON LOGIC
//        * ==================================================
//        *
//        * 1. pending
//        *    -> Confirm + Delete
//        *
//        * 2. accepted
//        *    -> Follow Back
//        *
//        * 3. after Follow Back:
//        *
//        *    following=true
//        *    -> Following
//        *
//        *    request_pending=true
//        *    -> Requested
//        *
//        *    both false
//        *    -> Follow
//        *
//        * Backend controls 3rd state.
//        */

//       let actionButton = null;

//       if (pending) {
//         // ----------------------------------------------
//         // CONFIRM + DELETE
//         // ----------------------------------------------

//         actionButton = (
//           <View
//             style={
//               styles.actionContainer
//             }
//           >
//             <TouchableOpacity
//               style={
//                 styles.confirmButton
//               }
//               disabled={
//                 acceptingRequestId ===
//                 getFollowRequestId(item)
//               }
//               onPress={() =>
//                 handleAcceptRequest(
//                   item
//                 )
//               }
//             >
//               {acceptingRequestId ===
//               getFollowRequestId(
//                 item
//               ) ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <Text
//                   style={
//                     styles.buttonText
//                   }
//                 >
//                   Confirm
//                 </Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={
//                 styles.deleteButton
//               }
//               disabled={
//                 rejectingRequestId ===
//                 getFollowRequestId(item)
//               }
//               onPress={() =>
//                 handleRejectRequest(
//                   item
//                 )
//               }
//             >
//               {rejectingRequestId ===
//               getFollowRequestId(
//                 item
//               ) ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <Text
//                   style={
//                     styles.buttonText
//                   }
//                 >
//                   Delete
//                 </Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         );
//       } else if (
//         isFollow &&
//         accepted &&
//         userId
//       ) {
//         // ----------------------------------------------
//         // AFTER CONFIRM
//         // ----------------------------------------------
//         // Always show Follow Back here.
//         // Backend response will be used only
//         // after Follow Back is clicked.

//         actionButton = (
//           <TouchableOpacity
//             style={
//               styles.followButton
//             }
//             onPress={() =>
//               handleFollowBack(
//                 item
//               )
//             }
//           >
//             <Text
//               style={
//                 styles.buttonText
//               }
//             >
//               Follow Back
//             </Text>
//           </TouchableOpacity>
//         );
//       } else if (
//         isFollow &&
//         relationship.isFollowing
//       ) {
//         // ----------------------------------------------
//         // BACKEND:
//         // following=true
//         // request_pending=false
//         // ----------------------------------------------

//         actionButton = (
//           <TouchableOpacity
//             style={
//               styles.followingButton
//             }
//             onPress={() =>
//               handleUnfollow(
//                 item
//               )
//             }
//           >
//             <Text
//               style={
//                 styles.followingText
//               }
//             >
//               Following
//             </Text>
//           </TouchableOpacity>
//         );
//       } else if (
//         isFollow &&
//         relationship.requestPending
//       ) {
//         // ----------------------------------------------
//         // BACKEND:
//         // following=false
//         // request_pending=true
//         // ----------------------------------------------

//         actionButton = (
//           <TouchableOpacity
//             style={
//               styles.followingButton
//             }
//             disabled
//           >
//             <Text
//               style={
//                 styles.followingText
//               }
//             >
//               Requested
//             </Text>
//           </TouchableOpacity>
//         );
//       } else if (
//         isFollow &&
//         userId
//       ) {
//         // ----------------------------------------------
//         // NOT FOLLOWING / NOT REQUESTED
//         // ----------------------------------------------

//         actionButton = (
//           <TouchableOpacity
//             style={
//               styles.followButton
//             }
//             onPress={() =>
//               handleFollowBack(
//                 item
//               )
//             }
//           >
//             <Text
//               style={
//                 styles.buttonText
//               }
//             >
//               Follow
//             </Text>
//           </TouchableOpacity>
//         );
//       }

//       return (
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() =>
//             handleNotificationPress(
//               item
//             )
//           }
//           style={[
//             styles.notificationRow,
//             isUnread &&
//               styles.unreadRow,
//           ]}
//         >
//           {/* AVATAR */}

//           <View
//             style={
//               styles.avatarContainer
//             }
//           >
//             {avatar ? (
//               <Image
//                 source={{
//                   uri: avatar,
//                 }}
//                 style={
//                   styles.avatar
//                 }
//               />
//             ) : (
//               <View
//                 style={
//                   styles.defaultAvatar
//                 }
//               >
//                 <Ionicons
//                   name="person"
//                   size={24}
//                   color="#aaa"
//                 />
//               </View>
//             )}
//           </View>

//           {/* CONTENT */}

//           <View
//             style={
//               styles.notificationContent
//             }
//           >
//             <Text
//               style={
//                 styles.notificationText
//               }
//               numberOfLines={3}
//             >
//               {item?.message ||
//                 `${username} sent you a notification`}
//             </Text>

//             {item?.created_at ? (
//               <Text
//                 style={
//                   styles.dateText
//                 }
//               >
//                 {new Date(
//                   item.created_at
//                 ).toLocaleString()}
//               </Text>
//             ) : null}

//             {actionButton}
//           </View>

//           {/* MENU */}

//           <TouchableOpacity
//             style={
//               styles.menuButton
//             }
//             onPress={() =>
//               setMenuNotification(
//                 item
//               )
//             }
//           >
//             <Ionicons
//               name="ellipsis-horizontal"
//               size={20}
//               color="#aaa"
//             />
//           </TouchableOpacity>

//           {/* UNREAD DOT */}

//           {isUnread && (
//             <View
//               style={
//                 styles.unreadDot
//               }
//             />
//           )}
//         </TouchableOpacity>
//       );
//     };

//   // ====================================================
//   // EMPTY
//   // ====================================================

//   const renderEmpty = () => {
//     if (loading) {
//       return null;
//     }

//     return (
//       <View
//         style={
//           styles.emptyContainer
//         }
//       >
//         <Ionicons
//           name="notifications-off-outline"
//           size={50}
//           color="#555"
//         />

//         <Text
//           style={
//             styles.emptyTitle
//           }
//         >
//           No notifications
//         </Text>

//         <Text
//           style={
//             styles.emptyText
//           }
//         >
//           You don't have any notifications yet.
//         </Text>
//       </View>
//     );
//   };

//   // ====================================================
//   // HEADER
//   // ====================================================

//   return (
//     <ScreenLayout
//       backgroundColor="#000"
//       keyboardAvoid={false}
//       header={
//         <View
//           style={
//             styles.header
//           }
//         >
//           <TouchableOpacity
//             style={
//               styles.backButton
//             }
//             onPress={() =>
//               router.back()
//             }
//             hitSlop={10}
//             activeOpacity={0.7}
//           >
//             <Ionicons
//               name="arrow-back"
//               size={24}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           <Text
//             style={
//               styles.headerTitle
//             }
//           >
//             Notifications
//           </Text>

//           {unreadCount > 0 && (
//             <View
//               style={
//                 styles.countBadge
//               }
//             >
//               <Text
//                 style={
//                   styles.countText
//                 }
//               >
//                 {unreadCount > 99
//                   ? "99+"
//                   : unreadCount}
//               </Text>
//             </View>
//           )}
//         </View>
//       }
//     >
//       {/* ERROR */}

//       {error ? (
//         <TouchableOpacity
//           style={
//             styles.errorContainer
//           }
//           onPress={
//             loadNotificationData
//           }
//         >
//           <Text
//             style={
//               styles.errorText
//             }
//           >
//             {error}
//           </Text>

//           <Text
//             style={
//               styles.retryText
//             }
//           >
//             Tap to retry
//           </Text>
//         </TouchableOpacity>
//       ) : null}

//       {/* LIST */}

//       <FlatList
//         data={notifications}
//         keyExtractor={(
//           item,
//           index
//         ) =>
//           String(
//             item?.id ?? index
//           )
//         }
//         renderItem={
//           renderNotification
//         }
//         ListEmptyComponent={
//           renderEmpty
//         }
//         refreshControl={
//           <RefreshControl
//             refreshing={
//               refreshing
//             }
//             onRefresh={
//               handleRefresh
//             }
//             tintColor="#fff"
//             colors={[
//               "#fff",
//             ]}
//           />
//         }
//         onEndReached={
//           handleLoadMore
//         }
//         onEndReachedThreshold={
//           0.5
//         }
//         contentContainerStyle={
//           notifications.length === 0
//             ? styles.emptyList
//             : styles.listContent
//         }
//         ListFooterComponent={
//           loadingMore ? (
//             <View
//               style={
//                 styles.footerLoader
//               }
//             >
//               <ActivityIndicator
//                 size="small"
//                 color="#fff"
//               />
//             </View>
//           ) : null
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//       />

//       {/* MENU MODAL */}

//       <Modal
//         visible={
//           Boolean(
//             menuNotification
//           )
//         }
//         transparent
//         animationType="fade"
//         onRequestClose={() =>
//           setMenuNotification(
//             null
//           )
//         }
//       >
//         <Pressable
//           style={
//             styles.modalOverlay
//           }
//           onPress={() =>
//             setMenuNotification(
//               null
//             )
//           }
//         >
//           <Pressable
//             style={
//               styles.menuModal
//             }
//             onPress={() => {}}
//           >
//             {/* DELETE */}

//             <TouchableOpacity
//               style={
//                 styles.modalOption
//               }
//               disabled={
//                 deletingNotificationId ===
//                 menuNotification?.id
//               }
//               onPress={
//                 handleDelete
//               }
//             >
//               {deletingNotificationId ===
//               menuNotification?.id ? (
//                 <ActivityIndicator
//                   size="small"
//                   color="#fff"
//                 />
//               ) : (
//                 <>
//                   <Ionicons
//                     name="trash-outline"
//                     size={22}
//                     color="#ff3b30"
//                   />

//                   <Text
//                     style={
//                       styles.deleteOptionText
//                     }
//                   >
//                     Delete
//                   </Text>
//                 </>
//               )}
//             </TouchableOpacity>

//             {/* UNFOLLOW */}

//             {menuNotification &&
//               getRelationship(
//                 menuNotification
//               ).isFollowing && (
//                 <TouchableOpacity
//                   style={
//                     styles.modalOption
//                   }
//                   onPress={() => {
//                     const notification =
//                       menuNotification;

//                     setMenuNotification(
//                       null
//                     );

//                     handleUnfollow(
//                       notification
//                     );
//                   }}
//                 >
//                   <Ionicons
//                     name="person-remove-outline"
//                     size={22}
//                     color="#fff"
//                   />

//                   <Text
//                     style={
//                       styles.modalOptionText
//                     }
//                   >
//                     Unfollow
//                   </Text>
//                 </TouchableOpacity>
//               )}

//             {/* CANCEL */}

//             <TouchableOpacity
//               style={
//                 styles.modalCancel
//               }
//               onPress={() =>
//                 setMenuNotification(
//                   null
//                 )
//               }
//             >
//               <Text
//                 style={
//                   styles.modalCancelText
//                 }
//               >
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//           </Pressable>
//         </Pressable>
//       </Modal>
//     </ScreenLayout>
//   );
// };

// // ======================================================
// // STYLES
// // ======================================================

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#262626",
//   },

//   backButton: {
//     width: 32,
//     height: 40,
//     alignItems: "flex-start",
//     justifyContent: "center",
//     marginRight: 8,
//   },

//   headerTitle: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },

//   countBadge: {
//     minWidth: 22,
//     height: 22,
//     borderRadius: 11,
//     backgroundColor: "#ff3040",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 8,
//     paddingHorizontal: 6,
//   },

//   countText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   listContent: {
//     paddingBottom: 100,
//   },

//   emptyList: {
//     flexGrow: 1,
//   },

//   notificationRow: {
//     minHeight: 78,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#1b1b1b",
//   },

//   unreadRow: {
//     backgroundColor: "#0b0b0b",
//   },

//   avatarContainer: {
//     width: 50,
//     height: 50,
//     marginRight: 12,
//   },

//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#222",
//   },

//   defaultAvatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#222",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   notificationContent: {
//     flex: 1,
//     paddingRight: 8,
//   },

//   notificationText: {
//     color: "#fff",
//     fontSize: 14,
//     lineHeight: 20,
//   },

//   dateText: {
//     color: "#777",
//     fontSize: 11,
//     marginTop: 4,
//   },

//   actionContainer: {
//     flexDirection: "row",
//     marginTop: 9,
//     gap: 8,
//   },

//   confirmButton: {
//     height: 34,
//     minWidth: 90,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#0095f6",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   deleteButton: {
//     height: 34,
//     minWidth: 80,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#262626",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   followButton: {
//     marginTop: 9,
//     height: 34,
//     minWidth: 90,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#0095f6",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "flex-start",
//   },

//   followingButton: {
//     marginTop: 9,
//     height: 34,
//     minWidth: 90,
//     paddingHorizontal: 15,
//     borderRadius: 7,
//     backgroundColor: "#262626",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "flex-start",
//   },

//   followingText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   menuButton: {
//     width: 30,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   unreadDot: {
//     position: "absolute",
//     right: 12,
//     top: 12,
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: "#0095f6",
//   },

//   emptyContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//   },

//   emptyTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     marginTop: 15,
//   },

//   emptyText: {
//     color: "#777",
//     fontSize: 14,
//     textAlign: "center",
//     marginTop: 7,
//   },

//   errorContainer: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#1b0808",
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#442020",
//   },

//   errorText: {
//     color: "#ff6b6b",
//     fontSize: 13,
//   },

//   retryText: {
//     color: "#fff",
//     fontSize: 12,
//     marginTop: 4,
//   },

//   footerLoader: {
//     paddingVertical: 20,
//     alignItems: "center",
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.7)",
//     justifyContent: "flex-end",
//   },

//   menuModal: {
//     backgroundColor: "#1c1c1c",
//     borderTopLeftRadius: 18,
//     borderTopRightRadius: 18,
//     paddingBottom: 25,
//   },

//   modalOption: {
//     minHeight: 55,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     borderBottomWidth: 0.5,
//     borderBottomColor: "#333",
//   },

//   modalOptionText: {
//     color: "#fff",
//     fontSize: 15,
//   },

//   deleteOptionText: {
//     color: "#ff3b30",
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   modalCancel: {
//     minHeight: 55,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   modalCancelText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//   },
// });

// export default NotificationsScreen;



import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ScreenLayout from "../../src/components/ScreenLayout";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { useRouter } from "expo-router";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
  getFollowRequests,
  acceptFollowRequest,
  rejectFollowRequest,
  addNotificationFromWebSocket,

  selectNotifications,
  selectUnreadNotificationCount,
  selectNotificationLoading,
  selectNotificationLoadingMore,
  selectNotificationHasMore,
  selectNotificationError,

  selectFollowRequests,
  selectFollowRequestsLoading,
  selectAcceptingRequestId,
  selectRejectingRequestId,
  selectDeletingNotificationId,
} from "../../src/redux/notificationSlice";

import {
  followUser,
  unfollowUser,
} from "../../src/redux/followSlice";

import {
  getProfile,
} from "../../src/redux/profileSlice";

// ======================================================
// SCREEN
// ======================================================

const NotificationsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // ====================================================
  // REDUX
  // ====================================================

  const notifications = useSelector(
    selectNotifications
  );

  const unreadCount = useSelector(
    selectUnreadNotificationCount
  );

  const loading = useSelector(
    selectNotificationLoading
  );

  const loadingMore = useSelector(
    selectNotificationLoadingMore
  );

  const hasMore = useSelector(
    selectNotificationHasMore
  );

  const error = useSelector(
    selectNotificationError
  );

  const followRequests = useSelector(
    selectFollowRequests
  );

  const followRequestsLoading = useSelector(
    selectFollowRequestsLoading
  );

  const acceptingRequestId = useSelector(
    selectAcceptingRequestId
  );

  const rejectingRequestId = useSelector(
    selectRejectingRequestId
  );

  const deletingNotificationId = useSelector(
    selectDeletingNotificationId
  );

  // ====================================================
  // LOCAL STATE
  // ====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  /*
   * Backend relationship state.
   *
   * {
   *   [userId]: {
   *     isFollowing: boolean,
   *     requestPending: boolean
   *   }
   * }
   */
  const [
    relationshipOverrides,
    setRelationshipOverrides,
  ] = useState({});

  /*
   * Confirm -> Follow Back
   *
   * This is only a temporary UI state.
   */
  const [
    acceptedFollowUsers,
    setAcceptedFollowUsers,
  ] = useState({});

  /*
   * Realtime follow requests received
   * through WebSocket.
   *
   * Example:
   *
   * {
   *   "61": true
   * }
   *
   * This prevents the realtime notification
   * from temporarily showing "Follow" while
   * getFollowRequests() is still loading.
   */
  const [
    realtimePendingRequests,
    setRealtimePendingRequests,
  ] = useState({});

  const [
    menuNotification,
    setMenuNotification,
  ] = useState(null);

  // ====================================================
  // WEBSOCKET REFS
  // ====================================================

  const notificationSocketRef =
    useRef(null);

  const notificationReconnectTimeoutRef =
    useRef(null);

  const notificationSocketClosedManuallyRef =
    useRef(false);

  const notificationSocketConnectingRef =
    useRef(false);

  // ====================================================
  // LOAD NOTIFICATIONS
  // ====================================================

  const loadNotificationData =
    useCallback(async () => {
      try {
        await Promise.all([
          dispatch(
            getNotifications({
              limit: 20,
              offset: 0,
              append: false,
            })
          ).unwrap(),

          dispatch(
            getFollowRequests()
          ).unwrap(),
        ]);
      } catch (error) {
        console.log(
          "LOAD NOTIFICATION DATA ERROR =>",
          error
        );
      }
    }, [dispatch]);

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadNotificationData();
  }, [loadNotificationData]);

  // ====================================================
  // LOAD ACTOR PROFILES
  // ====================================================

  useEffect(() => {
    if (!notifications?.length) {
      return;
    }

    let cancelled = false;

    const loadProfiles = async () => {
      const actorIds = [
        ...new Set(
          notifications
            .map((notification) => {
              const requester =
                notification?.requester ||
                notification?.actor ||
                notification?.user;

              return (
                requester?.id ||
                notification?.actor_id ||
                notification?.user_id ||
                notification?.requester_id ||
                null
              );
            })
            .filter(Boolean)
        ),
      ];

      for (const actorId of actorIds) {
        try {
          const profileResponse =
            await dispatch(
              getProfile(actorId)
            ).unwrap();

          console.log(
            "NOTIFICATION PROFILE =>",
            actorId,
            profileResponse
          );

          if (cancelled) {
            return;
          }

          /*
           * IMPORTANT:
           *
           * getProfile() returns:
           *
           * {
           *   profile: {
           *     is_following: true,
           *     request_pending: false
           *   },
           *   userId: 22
           * }
           */

          const profile =
            profileResponse?.profile;

          setRelationshipOverrides(
            (previous) => ({
              ...previous,

              [actorId]: {
                isFollowing: Boolean(
                  profile?.is_following
                ),

                requestPending: Boolean(
                  profile?.request_pending
                ),
              },
            })
          );
        } catch (error) {
          console.log(
            "PROFILE LOAD ERROR =>",
            actorId,
            error
          );
        }
      }
    };

    loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [
    notifications,
    dispatch,
  ]);

  // ====================================================
  // NOTIFICATION WEBSOCKET
  // ====================================================

  const connectNotificationWebSocket =
    useCallback(async () => {
      if (
        notificationSocketConnectingRef.current
      ) {
        return;
      }

      const currentSocket =
        notificationSocketRef.current;

      if (
        currentSocket &&
        (
          currentSocket.readyState ===
            WebSocket.OPEN ||
          currentSocket.readyState ===
            WebSocket.CONNECTING
        )
      ) {
        return;
      }

      try {
        notificationSocketConnectingRef.current =
          true;

        // --------------------------------------------
        // ACCESS TOKEN
        // --------------------------------------------

        const accessToken =
          await AsyncStorage.getItem(
            "access_token"
          );

        if (!accessToken) {
          console.log(
            "NOTIFICATION WS => ACCESS TOKEN NOT FOUND"
          );

          notificationSocketConnectingRef.current =
            false;

          return;
        }

        // --------------------------------------------
        // WEBSOCKET URL
        // --------------------------------------------

        const wsUrl =
          `ws://32.199.119.31:8000/api/notifications/ws?token=${encodeURIComponent(
            accessToken
          )}`;

        console.log(
          "========== NOTIFICATION WS CONNECTING =========="
        );

        const socket =
          new WebSocket(wsUrl);

        notificationSocketRef.current =
          socket;

        // --------------------------------------------
        // OPEN
        // --------------------------------------------

        socket.onopen = () => {
          console.log(
            "========== NOTIFICATION WS CONNECTED =========="
          );

          notificationSocketConnectingRef.current =
            false;
        };

        // --------------------------------------------
        // MESSAGE
        // --------------------------------------------

        socket.onmessage = async (
          event
        ) => {
          try {
            console.log(
              "========== NOTIFICATION WS MESSAGE =========="
            );

            console.log(
              "RAW DATA =>",
              event?.data
            );

            const data =
              typeof event?.data === "string"
                ? JSON.parse(event.data)
                : event.data;

            console.log(
              "PARSED DATA =>",
              data
            );

            // ----------------------------------------
            // CONNECTED
            // ----------------------------------------

            if (
              data?.type === "connected"
            ) {
              console.log(
                "NOTIFICATION WS => CONNECTED EVENT",
                data
              );

              return;
            }

            // ----------------------------------------
            // PONG
            // ----------------------------------------

            if (
              data?.type === "pong"
            ) {
              return;
            }

            // ----------------------------------------
            // ERROR
            // ----------------------------------------

            if (
              data?.type === "error"
            ) {
              console.log(
                "NOTIFICATION WS SERVER ERROR =>",
                data
              );

              return;
            }

            // ----------------------------------------
            // NEW NOTIFICATION
            // ----------------------------------------

            if (
              data?.type !== "notification" ||
              !data?.notification
            ) {
              return;
            }

            const notification =
              data.notification;

            console.log(
              "========== NEW NOTIFICATION =========="
            );

            console.log(
              "NOTIFICATION OBJECT =>",
              notification
            );

            // ----------------------------------------
            // ADD TO REDUX
            // ----------------------------------------

            dispatch(
              addNotificationFromWebSocket(
                notification
              )
            );

            // ----------------------------------------
            // FOLLOW REQUEST
            // ----------------------------------------

            const isFollowRequest =
              notification?.type ===
                "follow_request" ||
              notification?.type ===
                "follow-request" ||
              notification?.type ===
                "follow_request_received";

            if (isFollowRequest) {
              const requestId =
                notification?.target_id;

              /*
               * Immediately mark this request
               * as pending locally.
               *
               * This means:
               *
               * WebSocket notification
               *          ↓
               * Confirm + Delete
               *
               * immediately.
               */
              if (requestId) {
                setRealtimePendingRequests(
                  (previous) => ({
                    ...previous,
                    [requestId]: true,
                  })
                );
              }

              /*
               * Also refresh the real backend
               * follow-request list.
               */
              dispatch(
                getFollowRequests()
              );
            }

            // ----------------------------------------
            // LOAD ACTOR PROFILE
            // ----------------------------------------

            const actorId =
              notification?.actor_id;

            if (actorId) {
              try {
                const profileResponse =
                  await dispatch(
                    getProfile(actorId)
                  ).unwrap();

                console.log(
                  "WS ACTOR PROFILE =>",
                  actorId,
                  profileResponse
                );

                const profile =
                  profileResponse?.profile;

                setRelationshipOverrides(
                  (previous) => ({
                    ...previous,

                    [actorId]: {
                      isFollowing: Boolean(
                        profile?.is_following
                      ),

                      requestPending: Boolean(
                        profile?.request_pending
                      ),
                    },
                  })
                );
              } catch (
                profileError
              ) {
                console.log(
                  "WS ACTOR PROFILE ERROR =>",
                  profileError
                );
              }
            }
          } catch (error) {
            console.log(
              "NOTIFICATION WS PARSE ERROR =>",
              error
            );
          }
        };

        // --------------------------------------------
        // ERROR
        // --------------------------------------------

        socket.onerror = (
          socketError
        ) => {
          console.log(
            "========== NOTIFICATION WS ERROR =========="
          );

          console.log(
            "WS ERROR =>",
            socketError
          );

          notificationSocketConnectingRef.current =
            false;
        };

        // --------------------------------------------
        // CLOSE
        // --------------------------------------------

        socket.onclose = (
          closeEvent
        ) => {
          console.log(
            "========== NOTIFICATION WS CLOSED =========="
          );

          console.log(
            "CLOSE CODE =>",
            closeEvent?.code
          );

          console.log(
            "CLOSE REASON =>",
            closeEvent?.reason
          );

          notificationSocketConnectingRef.current =
            false;

          notificationSocketRef.current =
            null;

          if (
            notificationSocketClosedManuallyRef.current
          ) {
            return;
          }

          console.log(
            "NOTIFICATION WS => RECONNECTING IN 3 SECONDS"
          );

          if (
            notificationReconnectTimeoutRef.current
          ) {
            clearTimeout(
              notificationReconnectTimeoutRef.current
            );
          }

          notificationReconnectTimeoutRef.current =
            setTimeout(() => {
              connectNotificationWebSocket();
            }, 3000);
        };
      } catch (error) {
        console.log(
          "NOTIFICATION WS CONNECTION ERROR =>",
          error
        );

        notificationSocketConnectingRef.current =
          false;
      }
    }, [dispatch]);

  // ====================================================
  // START / STOP WEBSOCKET
  // ====================================================

  useEffect(() => {
    notificationSocketClosedManuallyRef.current =
      false;

    connectNotificationWebSocket();

    return () => {
      console.log(
        "========== NOTIFICATION WS CLEANUP =========="
      );

      notificationSocketClosedManuallyRef.current =
        true;

      if (
        notificationReconnectTimeoutRef.current
      ) {
        clearTimeout(
          notificationReconnectTimeoutRef.current
        );

        notificationReconnectTimeoutRef.current =
          null;
      }

      const socket =
        notificationSocketRef.current;

      if (socket) {
        try {
          socket.close(1000);
        } catch (error) {
          console.log(
            "NOTIFICATION WS CLOSE ERROR =>",
            error
          );
        }
      }

      notificationSocketRef.current =
        null;

      notificationSocketConnectingRef.current =
        false;
    };
  }, [
    connectNotificationWebSocket,
  ]);

  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh =
    useCallback(async () => {
      try {
        setRefreshing(true);

        /*
         * Reload backend state.
         */
        await loadNotificationData();

        /*
         * Clear temporary realtime state.
         *
         * Backend followRequests is now
         * the source of truth.
         */
        setRealtimePendingRequests({});
      } finally {
        setRefreshing(false);
      }
    }, [
      loadNotificationData,
    ]);

  // ====================================================
  // LOAD MORE
  // ====================================================

  const handleLoadMore =
    useCallback(() => {
      if (
        loading ||
        loadingMore ||
        !hasMore
      ) {
        return;
      }

      dispatch(
        getNotifications({
          limit: 20,
          offset: notifications.length,
          append: true,
        })
      );
    }, [
      dispatch,
      loading,
      loadingMore,
      hasMore,
      notifications.length,
    ]);

  // ====================================================
  // HELPERS
  // ====================================================

  const getRequester = (
    notification
  ) => {
    return (
      notification?.requester ||
      notification?.actor ||
      notification?.user ||
      null
    );
  };

  // ====================================================
  // USER ID
  // ====================================================

  const getUserId = (
    notification
  ) => {
    const requester =
      getRequester(notification);

    return (
      requester?.id ||
      notification?.actor_id ||
      notification?.user_id ||
      notification?.requester_id ||
      null
    );
  };

  // ====================================================
  // USERNAME
  // ====================================================

  const getUsername = (
    notification
  ) => {
    const requester =
      getRequester(notification);

    if (requester?.username) {
      return requester.username;
    }

    if (notification?.username) {
      return notification.username;
    }

    if (notification?.message) {
      return notification.message
        .split(" ")[0]
        .replace("@", "");
    }

    return "User";
  };

  // ====================================================
  // AVATAR
  // ====================================================

  const getAvatar = (
    notification
  ) => {
    const requester =
      getRequester(notification);

    return (
      requester?.avatar ||
      requester?.avatar_url ||
      requester?.profile_picture ||
      requester?.profile_image ||
      notification?.avatar ||
      notification?.avatar_url ||
      notification?.profile_picture ||
      null
    );
  };

  // ====================================================
  // FOLLOW REQUEST ID
  // ====================================================

  const getFollowRequestId = (
    notification
  ) => {
    return (
      notification?.target_id ||
      notification?.request_id ||
      notification?.follow_request_id ||
      null
    );
  };

  // ====================================================
  // FOLLOW NOTIFICATION
  // ====================================================

  const isFollowNotification = (
    notification
  ) => {
    const type =
      notification?.type;

    return (
      type === "follow" ||
      type === "follow_request" ||
      type === "follow-request" ||
      type ===
        "follow_request_received"
    );
  };

  // ====================================================
  // PENDING FOLLOW REQUEST
  // ====================================================

  const isPendingFollowRequest = (
    notification
  ) => {
    const requestId =
      getFollowRequestId(
        notification
      );

    if (!requestId) {
      return false;
    }

    /*
     * First check the real backend
     * follow request list.
     */
    const existsInBackend =
      followRequests.some(
        (request) =>
          String(request?.id) ===
          String(requestId)
      );

    if (existsInBackend) {
      return true;
    }

    /*
     * Then check realtime WebSocket
     * state.
     */
    return Boolean(
      realtimePendingRequests[
        requestId
      ]
    );
  };

  // ====================================================
  // RELATIONSHIP
  // ====================================================

  const getRelationship = (
    notification
  ) => {
    const userId =
      getUserId(notification);

    if (
      relationshipOverrides[userId]
    ) {
      return (
        relationshipOverrides[userId]
      );
    }

    return {
      isFollowing: Boolean(
        notification?.current_user_following
      ),

      requestPending: Boolean(
        notification?.request_pending
      ),
    };
  };

  // ====================================================
  // FOLLOW BACK
  // ====================================================

  const handleFollowBack =
    async (notification) => {
      const userId =
        getUserId(notification);

      if (!userId) {
        return;
      }

      try {
        const response =
          await dispatch(
            followUser(userId)
          ).unwrap();

        console.log(
          "FOLLOW BACK RESPONSE =>",
          {
            ...response,
            userId,
          }
        );

        /*
         * Backend response is the source
         * of truth.
         *
         * Public:
         * following=true
         * request_pending=false
         *
         * Private:
         * following=false
         * request_pending=true
         */

        setRelationshipOverrides(
          (previous) => ({
            ...previous,

            [userId]: {
              isFollowing: Boolean(
                response?.following
              ),

              requestPending: Boolean(
                response?.request_pending
              ),
            },
          })
        );

        /*
         * Follow Back is complete.
         */
        setAcceptedFollowUsers(
          (previous) => ({
            ...previous,
            [userId]: false,
          })
        );
      } catch (error) {
        console.log(
          "FOLLOW BACK ERROR =>",
          error
        );
      }
    };

  // ====================================================
  // UNFOLLOW
  // ====================================================

  const handleUnfollow =
    async (notification) => {
      const userId =
        getUserId(notification);

      if (!userId) {
        return;
      }

      try {
        const response =
          await dispatch(
            unfollowUser(userId)
          ).unwrap();

        console.log(
          "UNFOLLOW RESPONSE =>",
          {
            response,
            userId,
          }
        );

        /*
         * If your unfollow API returns
         * following/request_pending, use it.
         *
         * Otherwise the relationship is
         * no longer following after a
         * successful unfollow.
         */
        setRelationshipOverrides(
          (previous) => ({
            ...previous,

            [userId]: {
              isFollowing:
                typeof response?.following ===
                "boolean"
                  ? response.following
                  : false,

              requestPending:
                typeof response?.request_pending ===
                "boolean"
                  ? response.request_pending
                  : false,
            },
          })
        );

        setAcceptedFollowUsers(
          (previous) => ({
            ...previous,
            [userId]: false,
          })
        );
      } catch (error) {
        console.log(
          "UNFOLLOW ERROR =>",
          error
        );
      }
    };

  // ====================================================
  // ACCEPT REQUEST
  // ====================================================

  const handleAcceptRequest =
    async (notification) => {
      const requestId =
        getFollowRequestId(
          notification
        );

      const userId =
        getUserId(notification);

      if (!requestId) {
        console.log(
          "REQUEST ID NOT FOUND"
        );

        return;
      }

      try {
        const response =
          await dispatch(
            acceptFollowRequest(
              requestId
            )
          ).unwrap();

        console.log(
          "ACCEPT FOLLOW REQUEST RESPONSE =>",
          response
        );

        /*
         * Request is no longer pending.
         */
        setRealtimePendingRequests(
          (previous) => {
            const next = {
              ...previous,
            };

            delete next[requestId];

            return next;
          }
        );

        if (userId) {
          /*
           * Confirm -> Follow Back
           *
           * This state intentionally has
           * priority over isFollowing.
           */
          setAcceptedFollowUsers(
            (previous) => ({
              ...previous,
              [userId]: true,
            })
          );

          /*
           * Save backend relationship.
           */
          setRelationshipOverrides(
            (previous) => ({
              ...previous,

              [userId]: {
                isFollowing: Boolean(
                  response?.following
                ),

                requestPending: Boolean(
                  response?.request_pending
                ),
              },
            })
          );
        }

        /*
         * Refresh backend follow requests.
         */
        dispatch(
          getFollowRequests()
        );
      } catch (error) {
        console.log(
          "ACCEPT FOLLOW REQUEST ERROR =>",
          error
        );
      }
    };

  // ====================================================
  // REJECT REQUEST
  // ====================================================

  const handleRejectRequest =
    async (notification) => {
      const requestId =
        getFollowRequestId(
          notification
        );

      if (!requestId) {
        console.log(
          "REQUEST ID NOT FOUND"
        );

        return;
      }

      try {
        await dispatch(
          rejectFollowRequest(
            requestId
          )
        ).unwrap();

        /*
         * Remove realtime pending state.
         */
        setRealtimePendingRequests(
          (previous) => {
            const next = {
              ...previous,
            };

            delete next[requestId];

            return next;
          }
        );

        /*
         * Delete notification.
         */
        if (notification?.id) {
          await dispatch(
            deleteNotification(
              notification.id
            )
          ).unwrap();
        }
      } catch (error) {
        console.log(
          "REJECT REQUEST ERROR =>",
          error
        );
      }
    };

  // ====================================================
  // NOTIFICATION PRESS
  // ====================================================

  const handleNotificationPress =
    async (notification) => {
      if (!notification?.id) {
        return;
      }

      if (
        notification.is_read === false
      ) {
        dispatch(
          markNotificationRead(
            notification.id
          )
        );
      }

      const userId =
        getUserId(notification);

      if (!userId) {
        return;
      }

      router.push({
        pathname:
          "/profile-screens/user-profile",

        params: {
          userId: String(userId),
        },
      });
    };

  // ====================================================
  // DELETE
  // ====================================================

  const handleDelete =
    async () => {
      if (!menuNotification?.id) {
        return;
      }

      try {
        await dispatch(
          deleteNotification(
            menuNotification.id
          )
        ).unwrap();

        /*
         * If it was a follow request,
         * remove the realtime pending
         * state too.
         */
        const requestId =
          getFollowRequestId(
            menuNotification
          );

        if (requestId) {
          setRealtimePendingRequests(
            (previous) => {
              const next = {
                ...previous,
              };

              delete next[requestId];

              return next;
            }
          );
        }

        setMenuNotification(null);
      } catch (error) {
        console.log(
          "DELETE ERROR =>",
          error
        );
      }
    };

  // ====================================================
  // RENDER NOTIFICATION
  // ====================================================

  const renderNotification =
    ({ item }) => {
      const userId =
        getUserId(item);

      const username =
        getUsername(item);

      const avatar =
        getAvatar(item);

      const relationship =
        getRelationship(item);

      const isFollow =
        isFollowNotification(item);

      const pending =
        isPendingFollowRequest(
          item
        );

      const accepted =
        Boolean(
          acceptedFollowUsers[userId]
        );

      const isUnread =
        item?.is_read === false;

      // ==================================================
      // BUTTON LOGIC
      // ==================================================

      let actionButton = null;

      // --------------------------------------------------
      // 1. PENDING
      // Confirm + Delete
      // --------------------------------------------------

      if (pending) {
        actionButton = (
          <View
            style={
              styles.actionContainer
            }
          >
            <TouchableOpacity
              style={
                styles.confirmButton
              }
              disabled={
                acceptingRequestId ===
                getFollowRequestId(item)
              }
              onPress={() =>
                handleAcceptRequest(
                  item
                )
              }
            >
              {acceptingRequestId ===
              getFollowRequestId(
                item
              ) ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Confirm
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={
                styles.deleteButton
              }
              disabled={
                rejectingRequestId ===
                getFollowRequestId(item)
              }
              onPress={() =>
                handleRejectRequest(
                  item
                )
              }
            >
              {rejectingRequestId ===
              getFollowRequestId(
                item
              ) ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <Text
                  style={
                    styles.buttonText
                  }
                >
                  Delete
                </Text>
              )}
            </TouchableOpacity>
          </View>
        );
      }

      // --------------------------------------------------
      // 2. ACCEPTED
      // Follow Back
      // --------------------------------------------------

      else if (
        isFollow &&
        accepted &&
        userId
      ) {
        actionButton = (
          <TouchableOpacity
            style={
              styles.followButton
            }
            onPress={() =>
              handleFollowBack(
                item
              )
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Follow Back
            </Text>
          </TouchableOpacity>
        );
      }

      // --------------------------------------------------
      // 3. FOLLOWING
      // Backend says following=true
      // --------------------------------------------------

      else if (
        isFollow &&
        relationship.isFollowing
      ) {
        actionButton = (
          <TouchableOpacity
            style={
              styles.followingButton
            }
            onPress={() =>
              handleUnfollow(
                item
              )
            }
          >
            <Text
              style={
                styles.followingText
              }
            >
              Following
            </Text>
          </TouchableOpacity>
        );
      }

      // --------------------------------------------------
      // 4. REQUESTED
      // Backend says request_pending=true
      // --------------------------------------------------

      else if (
        isFollow &&
        relationship.requestPending
      ) {
        actionButton = (
          <TouchableOpacity
            style={
              styles.followingButton
            }
            disabled
          >
            <Text
              style={
                styles.followingText
              }
            >
              Requested
            </Text>
          </TouchableOpacity>
        );
      }

      // --------------------------------------------------
      // 5. FOLLOW
      // Neither following nor requested
      // --------------------------------------------------

      else if (
        isFollow &&
        userId
      ) {
        actionButton = (
          <TouchableOpacity
            style={
              styles.followButton
            }
            onPress={() =>
              handleFollowBack(
                item
              )
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              Follow
            </Text>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            handleNotificationPress(
              item
            )
          }
          style={[
            styles.notificationRow,
            isUnread &&
              styles.unreadRow,
          ]}
        >
          {/* AVATAR */}

          <View
            style={
              styles.avatarContainer
            }
          >
            {avatar ? (
              <Image
                source={{
                  uri: avatar,
                }}
                style={
                  styles.avatar
                }
              />
            ) : (
              <View
                style={
                  styles.defaultAvatar
                }
              >
                <Ionicons
                  name="person"
                  size={24}
                  color="#aaa"
                />
              </View>
            )}
          </View>

          {/* CONTENT */}

          <View
            style={
              styles.notificationContent
            }
          >
            <Text
              style={
                styles.notificationText
              }
              numberOfLines={3}
            >
              {item?.message ||
                `${username} sent you a notification`}
            </Text>

            {item?.created_at ? (
              <Text
                style={
                  styles.dateText
                }
              >
                {new Date(
                  item.created_at
                ).toLocaleString()}
              </Text>
            ) : null}

            {actionButton}
          </View>

          {/* MENU */}

          <TouchableOpacity
            style={
              styles.menuButton
            }
            onPress={() =>
              setMenuNotification(
                item
              )
            }
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>

          {/* UNREAD DOT */}

          {isUnread && (
            <View
              style={
                styles.unreadDot
              }
            />
          )}
        </TouchableOpacity>
      );
    };

  // ====================================================
  // EMPTY
  // ====================================================

  const renderEmpty = () => {
    if (loading) {
      return null;
    }

    return (
      <View
        style={
          styles.emptyContainer
        }
      >
        <Ionicons
          name="notifications-off-outline"
          size={50}
          color="#555"
        />

        <Text
          style={
            styles.emptyTitle
          }
        >
          No notifications
        </Text>

        <Text
          style={
            styles.emptyText
          }
        >
          You don't have any notifications yet.
        </Text>
      </View>
    );
  };

  // ====================================================
  // HEADER
  // ====================================================

  return (
    <ScreenLayout
      backgroundColor="#000"
      keyboardAvoid={false}
      header={
        <View
          style={
            styles.header
          }
        >
          <TouchableOpacity
            style={
              styles.backButton
            }
            onPress={() =>
              router.back()
            }
            hitSlop={10}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text
            style={
              styles.headerTitle
            }
          >
            Notifications
          </Text>

          {unreadCount > 0 && (
            <View
              style={
                styles.countBadge
              }
            >
              <Text
                style={
                  styles.countText
                }
              >
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </Text>
            </View>
          )}
        </View>
      }
    >
      {/* ERROR */}

      {error ? (
        <TouchableOpacity
          style={
            styles.errorContainer
          }
          onPress={
            loadNotificationData
          }
        >
          <Text
            style={
              styles.errorText
            }
          >
            {error}
          </Text>

          <Text
            style={
              styles.retryText
            }
          >
            Tap to retry
          </Text>
        </TouchableOpacity>
      ) : null}

      {/* LIST */}

      <FlatList
        data={notifications}
        keyExtractor={(
          item,
          index
        ) =>
          String(
            item?.id ?? index
          )
        }
        renderItem={
          renderNotification
        }
        ListEmptyComponent={
          renderEmpty
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              handleRefresh
            }
            tintColor="#fff"
            colors={[
              "#fff",
            ]}
          />
        }
        onEndReached={
          handleLoadMore
        }
        onEndReachedThreshold={
          0.5
        }
        contentContainerStyle={
          notifications.length === 0
            ? styles.emptyList
            : styles.listContent
        }
        ListFooterComponent={
          loadingMore ? (
            <View
              style={
                styles.footerLoader
              }
            >
              <ActivityIndicator
                size="small"
                color="#fff"
              />
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={
          false
        }
      />

      {/* MENU MODAL */}

      <Modal
        visible={
          Boolean(
            menuNotification
          )
        }
        transparent
        animationType="fade"
        onRequestClose={() =>
          setMenuNotification(
            null
          )
        }
      >
        <Pressable
          style={
            styles.modalOverlay
          }
          onPress={() =>
            setMenuNotification(
              null
            )
          }
        >
          <Pressable
            style={
              styles.menuModal
            }
            onPress={() => {}}
          >
            {/* DELETE */}

            <TouchableOpacity
              style={
                styles.modalOption
              }
              disabled={
                deletingNotificationId ===
                menuNotification?.id
              }
              onPress={
                handleDelete
              }
            >
              {deletingNotificationId ===
              menuNotification?.id ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                />
              ) : (
                <>
                  <Ionicons
                    name="trash-outline"
                    size={22}
                    color="#ff3b30"
                  />

                  <Text
                    style={
                      styles.deleteOptionText
                    }
                  >
                    Delete
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* UNFOLLOW */}

            {menuNotification &&
              getRelationship(
                menuNotification
              ).isFollowing && (
                <TouchableOpacity
                  style={
                    styles.modalOption
                  }
                  onPress={() => {
                    const notification =
                      menuNotification;

                    setMenuNotification(
                      null
                    );

                    handleUnfollow(
                      notification
                    );
                  }}
                >
                  <Ionicons
                    name="person-remove-outline"
                    size={22}
                    color="#fff"
                  />

                  <Text
                    style={
                      styles.modalOptionText
                    }
                  >
                    Unfollow
                  </Text>
                </TouchableOpacity>
              )}

            {/* CANCEL */}

            <TouchableOpacity
              style={
                styles.modalCancel
              }
              onPress={() =>
                setMenuNotification(
                  null
                )
              }
            >
              <Text
                style={
                  styles.modalCancelText
                }
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </ScreenLayout>
  );
};

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#262626",
  },

  backButton: {
    width: 32,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 8,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ff3040",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    paddingHorizontal: 6,
  },

  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  listContent: {
    paddingBottom: 100,
  },

  emptyList: {
    flexGrow: 1,
  },

  notificationRow: {
    minHeight: 78,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#1b1b1b",
  },

  unreadRow: {
    backgroundColor: "#0b0b0b",
  },

  avatarContainer: {
    width: 50,
    height: 50,
    marginRight: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#222",
  },

  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationContent: {
    flex: 1,
    paddingRight: 8,
  },

  notificationText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },

  dateText: {
    color: "#777",
    fontSize: 11,
    marginTop: 4,
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 9,
    gap: 8,
  },

  confirmButton: {
    height: 34,
    minWidth: 90,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: "#0095f6",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    height: 34,
    minWidth: 80,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },

  followButton: {
    marginTop: 9,
    height: 34,
    minWidth: 90,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: "#0095f6",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  followingButton: {
    marginTop: 9,
    height: 34,
    minWidth: 90,
    paddingHorizontal: 15,
    borderRadius: 7,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  followingText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  menuButton: {
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  unreadDot: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#0095f6",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
  },

  emptyText: {
    color: "#777",
    fontSize: 14,
    textAlign: "center",
    marginTop: 7,
  },

  errorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#1b0808",
    borderBottomWidth: 0.5,
    borderBottomColor: "#442020",
  },

  errorText: {
    color: "#ff6b6b",
    fontSize: 13,
  },

  retryText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },

  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },

  menuModal: {
    backgroundColor: "#1c1c1c",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 25,
  },

  modalOption: {
    minHeight: 55,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },

  modalOptionText: {
    color: "#fff",
    fontSize: 15,
  },

  deleteOptionText: {
    color: "#ff3b30",
    fontSize: 15,
    fontWeight: "600",
  },

  modalCancel: {
    minHeight: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  modalCancelText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default NotificationsScreen;
