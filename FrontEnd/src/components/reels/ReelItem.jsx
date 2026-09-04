// // // import React, {
// // //   forwardRef,
// // //   useEffect,
// // //   useImperativeHandle,
// // //   useRef,
// // //   useState,
// // // } from "react";

// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   Dimensions,
// // //   Pressable,
// // //   Image,
// // // } from "react-native";

// // // import {
// // //   useVideoPlayer,
// // //   VideoView,
// // // } from "expo-video";

// // // import Ionicons from "@expo/vector-icons/Ionicons";

// // // import ReelSaveButton from "./ReelSaveButton";

// // // import { useDispatch } from "react-redux";

// // // import {
// // //   likeReel,
// // //   unlikeReel,
// // // } from "../../redux/reelsSlice";

// // // import { getMediaUrl } from "../../utils/media";

// // // // IMPORTANT:
// // // // CommentsSheet is inside ../comments/
// // // import CommentsSheet from "../comments/CommentsSheet";

// // // const { width: SCREEN_WIDTH } = Dimensions.get("window");

// // // // ======================================================
// // // // ACTIVE REEL VIDEO
// // // // ======================================================

// // // const ActiveReelVideo = forwardRef(
// // //   (
// // //     {
// // //       videoUrl,
// // //       reelHeight,
// // //       onProgress,
// // //       onPlayingChange,
// // //     },
// // //     ref
// // //   ) => {
// // //     const player = useVideoPlayer(
// // //       videoUrl,
// // //       (player) => {
// // //         player.loop = true;
// // //         player.muted = false;
// // //       }
// // //     );

// // //     // ==================================================
// // //     // PLAYER CONTROLS
// // //     // ==================================================

// // //     useImperativeHandle(
// // //       ref,
// // //       () => ({
// // //         play: () => {
// // //           if (!player) return;

// // //           try {
// // //             player.play();
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ PLAY ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         pause: () => {
// // //           if (!player) return;

// // //           try {
// // //             player.pause();
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ PAUSE ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         toggle: () => {
// // //           if (!player) return;

// // //           try {
// // //             if (player.playing) {
// // //               player.pause();
// // //             } else {
// // //               player.play();
// // //             }
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ TOGGLE ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         isPlaying: () => {
// // //           return !!player?.playing;
// // //         },
// // //       }),
// // //       [player]
// // //     );

// // //     // ==================================================
// // //     // AUTO PLAY
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       try {
// // //         player.play();
// // //       } catch (error) {
// // //         console.log(
// // //           "❌ AUTO PLAY ERROR =>",
// // //           error?.message
// // //         );
// // //       }
// // //     }, [player]);

// // //     // ==================================================
// // //     // PROGRESS
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       const subscription = player.addListener(
// // //         "timeUpdate",
// // //         (event) => {
// // //           const currentTime =
// // //             event?.currentTime ?? 0;

// // //           const duration =
// // //             event?.duration ??
// // //             player.duration ??
// // //             0;

// // //           if (
// // //             duration > 0 &&
// // //             typeof onProgress === "function"
// // //           ) {
// // //             const percentage =
// // //               currentTime / duration;

// // //             onProgress(
// // //               Math.min(
// // //                 Math.max(
// // //                   percentage,
// // //                   0
// // //                 ),
// // //                 1
// // //               )
// // //             );
// // //           }
// // //         }
// // //       );

// // //       return () => {
// // //         subscription?.remove();
// // //       };
// // //     }, [player, onProgress]);

// // //     // ==================================================
// // //     // PLAYING STATE
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       const subscription = player.addListener(
// // //         "playingChange",
// // //         (event) => {
// // //           const playing =
// // //             !!event?.isPlaying;

// // //           if (
// // //             typeof onPlayingChange ===
// // //             "function"
// // //           ) {
// // //             onPlayingChange(playing);
// // //           }
// // //         }
// // //       );

// // //       return () => {
// // //         subscription?.remove();
// // //       };
// // //     }, [player, onPlayingChange]);

// // //     return (
// // //       <VideoView
// // //         player={player}
// // //         style={[
// // //           styles.video,
// // //           {
// // //             height: reelHeight,
// // //           },
// // //         ]}
// // //         contentFit="cover"
// // //         nativeControls={false}
// // //         fullscreenOptions={{
// // //           enable: false,
// // //         }}
// // //         allowsPictureInPicture={false}
// // //       />
// // //     );
// // //   }
// // // );

// // // // ======================================================
// // // // REEL ITEM
// // // // ======================================================

// // // const ReelItem = ({
// // //   reel,
// // //   isActive,
// // //   reelHeight,
// // // }) => {
// // //   const dispatch = useDispatch();

// // //   const playerRef = useRef(null);

// // //   // ==================================================
// // //   // COMMENTS
// // //   // ==================================================

// // //   const [
// // //     commentsVisible,
// // //     setCommentsVisible,
// // //   ] = useState(false);

// // //   // ==================================================
// // //   // PLAYING
// // //   // ==================================================

// // //   const [
// // //     isPlaying,
// // //     setIsPlaying,
// // //   ] = useState(false);

// // //   // ==================================================
// // //   // PROGRESS
// // //   // ==================================================

// // //   const [
// // //     progress,
// // //     setProgress,
// // //   ] = useState(0);

// // //   // ==================================================
// // //   // MEDIA URLS
// // //   // ==================================================

// // //   const videoUrl = getMediaUrl(
// // //     reel?.video_url
// // //   );

// // //   const thumbnailUrl = getMediaUrl(
// // //     reel?.thumbnail_url
// // //   );

// // //   // ==================================================
// // //   // AUTHOR DATA
// // //   // ==================================================
// // //   //
// // //   // Different backend responses sometimes return:
// // //   //
// // //   // reel.author
// // //   // reel.user
// // //   // reel.owner
// // //   //
// // //   // So use whichever exists.
// // //   // ==================================================

// // //   const author =
// // //     reel?.author ||
// // //     reel?.user ||
// // //     reel?.owner ||
// // //     null;

// // //   const authorUsername =
// // //     author?.username ||
// // //     reel?.username ||
// // //     reel?.author_username ||
// // //     `User ${reel?.user_id || ""}`;

// // //   const authorAvatar =
// // //     author?.avatar ||
// // //     author?.avatar_url ||
// // //     author?.profile_avatar ||
// // //     reel?.avatar ||
// // //     reel?.avatar_url ||
// // //     reel?.author_avatar ||
// // //     null;

// // //   const authorAvatarUrl =
// // //     getMediaUrl(authorAvatar);

// // //   // ==================================================
// // //   // ACTIVE CHANGE
// // //   // ==================================================

// // //   useEffect(() => {
// // //     if (isActive) {
// // //       console.log(
// // //         "▶️ ACTIVE REEL =>",
// // //         reel?.id
// // //       );

// // //       setProgress(0);
// // //     } else {
// // //       console.log(
// // //         "🛑 INACTIVE REEL =>",
// // //         reel?.id
// // //       );

// // //       setIsPlaying(false);
// // //       setProgress(0);
// // //     }
// // //   }, [
// // //     isActive,
// // //     reel?.id,
// // //   ]);

// // //   // ==================================================
// // //   // VIDEO PRESS
// // //   // ==================================================

// // //   const handleVideoPress = () => {
// // //     if (!isActive) return;

// // //     if (!playerRef.current) {
// // //       console.log(
// // //         "❌ PLAYER REF NOT READY"
// // //       );

// // //       return;
// // //     }

// // //     playerRef.current.toggle();
// // //   };

// // //   // ==================================================
// // //   // LIKE
// // //   // ==================================================

// // //   const handleLike = () => {
// // //     if (!reel?.id) return;

// // //     if (reel?.is_liked) {
// // //       if (!reel?.like_id) {
// // //         console.log(
// // //           "❌ like_id is missing"
// // //         );

// // //         return;
// // //       }

// // //       dispatch(
// // //         unlikeReel({
// // //           reelId: reel.id,
// // //           likeId: reel.like_id,
// // //         })
// // //       );

// // //       return;
// // //     }

// // //     dispatch(
// // //       likeReel(reel.id)
// // //     );
// // //   };

// // //   // ==================================================
// // //   // OPEN COMMENTS
// // //   // ==================================================

// // //   const handleOpenComments = () => {
// // //     if (!reel?.id) return;

// // //     setCommentsVisible(true);
// // //   };

// // //   // ==================================================
// // //   // CLOSE COMMENTS
// // //   // ==================================================

// // //   const handleCloseComments = () => {
// // //     setCommentsVisible(false);
// // //   };

// // //   // ==================================================
// // //   // RENDER
// // //   // ==================================================

// // //   return (
// // //     <View
// // //       style={[
// // //         styles.container,
// // //         {
// // //           height: reelHeight,
// // //         },
// // //       ]}
// // //     >
// // //       {/* ==================================================
// // //           VIDEO
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.videoContainer,
// // //           {
// // //             height: reelHeight,
// // //           },
// // //         ]}
// // //       >
// // //         {/* THUMBNAIL */}

// // //         {thumbnailUrl ? (
// // //           <Image
// // //             source={{
// // //               uri: thumbnailUrl,
// // //             }}
// // //             style={[
// // //               styles.video,
// // //               {
// // //                 height: reelHeight,
// // //               },
// // //             ]}
// // //             resizeMode="cover"
// // //           />
// // //         ) : null}

// // //         {/* ACTIVE VIDEO */}

// // //         {isActive && videoUrl ? (
// // //           <Pressable
// // //             style={
// // //               styles.videoPressable
// // //             }
// // //             onPress={
// // //               handleVideoPress
// // //             }
// // //           >
// // //             <ActiveReelVideo
// // //               ref={playerRef}
// // //               videoUrl={videoUrl}
// // //               reelHeight={reelHeight}
// // //               onProgress={
// // //                 setProgress
// // //               }
// // //               onPlayingChange={
// // //                 setIsPlaying
// // //               }
// // //             />

// // //             {/* PLAY OVERLAY */}

// // //             {!isPlaying ? (
// // //               <View
// // //                 style={
// // //                   styles.playOverlay
// // //                 }
// // //               >
// // //                 <View
// // //                   style={
// // //                     styles.playCircle
// // //                   }
// // //                 >
// // //                   <Ionicons
// // //                     name="play"
// // //                     size={34}
// // //                     color="#fff"
// // //                   />
// // //                 </View>
// // //               </View>
// // //             ) : null}
// // //           </Pressable>
// // //         ) : null}
// // //       </View>

// // //       {/* ==================================================
// // //           RIGHT ACTIONS
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.actions,
// // //           {
// // //             bottom:
// // //               reelHeight * 0.18,
// // //           },
// // //         ]}
// // //       >
// // //         {/* LIKE */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={handleLike}
// // //         >
// // //           <Ionicons
// // //             name={
// // //               reel?.is_liked
// // //                 ? "heart"
// // //                 : "heart-outline"
// // //             }
// // //             size={34}
// // //             color={
// // //               reel?.is_liked
// // //                 ? "#ff3040"
// // //                 : "#fff"
// // //             }
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             {reel?.likes_count || 0}
// // //           </Text>
// // //         </Pressable>

// // //         {/* COMMENTS */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={
// // //             handleOpenComments
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="chatbubble-outline"
// // //             size={32}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             {reel?.comments_count || 0}
// // //           </Text>
// // //         </Pressable>

// // //         {/* SHARE */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={() =>
// // //             console.log(
// // //               "SHARE =>",
// // //               reel?.id
// // //             )
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="paper-plane-outline"
// // //             size={32}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             Share
// // //           </Text>
// // //         </Pressable>

// // //         {/* SAVE */}

// // //         <View
// // //           style={styles.action}
// // //         >
// // //           <ReelSaveButton
// // //             reelId={reel?.id}
// // //             isSaved={
// // //               reel?.is_saved
// // //             }
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             Save
// // //           </Text>
// // //         </View>

// // //         {/* MORE */}

// // //         <Pressable
// // //           style={styles.more}
// // //           onPress={() =>
// // //             console.log(
// // //               "MORE =>",
// // //               reel?.id
// // //             )
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="ellipsis-horizontal"
// // //             size={30}
// // //             color="#fff"
// // //           />
// // //         </Pressable>
// // //       </View>

// // //       {/* ==================================================
// // //           AUTHOR INFO
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.bottomInfo,
// // //           {
// // //             bottom:
// // //               reelHeight * 0.055,
// // //           },
// // //         ]}
// // //       >
// // //         <View
// // //           style={styles.userRow}
// // //         >
// // //           {/* AVATAR */}

// // //           {authorAvatarUrl ? (
// // //             <Image
// // //               source={{
// // //                 uri: authorAvatarUrl,
// // //               }}
// // //               style={styles.avatarImage}
// // //             />
// // //           ) : (
// // //             <View
// // //               style={styles.avatar}
// // //             >
// // //               <Ionicons
// // //                 name="person"
// // //                 size={22}
// // //                 color="#fff"
// // //               />
// // //             </View>
// // //           )}

// // //           {/* USERNAME */}

// // //           <Text
// // //             style={styles.username}
// // //             numberOfLines={1}
// // //           >
// // //             {authorUsername}
// // //           </Text>

// // //           {/* FOLLOW */}

// // //           <Pressable
// // //             style={styles.follow}
// // //             onPress={() =>
// // //               console.log(
// // //                 "FOLLOW =>",
// // //                 reel?.user_id
// // //               )
// // //             }
// // //           >
// // //             <Text
// // //               style={
// // //                 styles.followText
// // //               }
// // //             >
// // //               Follow
// // //             </Text>
// // //           </Pressable>
// // //         </View>

// // //         {/* CAPTION */}

// // //         {reel?.caption ? (
// // //           <Text
// // //             style={styles.caption}
// // //             numberOfLines={2}
// // //           >
// // //             {reel.caption}
// // //           </Text>
// // //         ) : null}

// // //         {/* AUDIO */}

// // //         <View
// // //           style={styles.audio}
// // //         >
// // //           <Ionicons
// // //             name="musical-notes"
// // //             size={14}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.audioText}
// // //           >
// // //             Original audio
// // //           </Text>
// // //         </View>
// // //       </View>

// // //       {/* ==================================================
// // //           PROGRESS
// // //       ================================================== */}

// // //       {isActive ? (
// // //         <View
// // //           style={styles.progressTrack}
// // //         >
// // //           <View
// // //             style={[
// // //               styles.progressFill,
// // //               {
// // //                 width: `${progress * 100}%`,
// // //               },
// // //             ]}
// // //           />
// // //         </View>
// // //       ) : null}

// // //       {/* ==================================================
// // //           REEL COMMENTS SHEET
// // //       ================================================== */}

// // //       <CommentsSheet
// // //         visible={commentsVisible}
// // //         reelId={reel?.id}
// // //         onClose={
// // //           handleCloseComments
// // //         }
// // //       />
// // //     </View>
// // //   );
// // // };

// // // export default ReelItem;

// // // // ======================================================
// // // // STYLES
// // // // ======================================================

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     width: SCREEN_WIDTH,
// // //     backgroundColor: "#000",
// // //     position: "relative",
// // //     overflow: "hidden",
// // //   },

// // //   videoContainer: {
// // //     width: SCREEN_WIDTH,
// // //     backgroundColor: "#000",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     overflow: "hidden",
// // //   },

// // //   video: {
// // //     position: "absolute",
// // //     width: SCREEN_WIDTH,
// // //   },

// // //   videoPressable: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   playOverlay: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor:
// // //       "rgba(0,0,0,0.12)",
// // //   },

// // //   playCircle: {
// // //     width: 68,
// // //     height: 68,
// // //     borderRadius: 34,
// // //     backgroundColor:
// // //       "rgba(0,0,0,0.55)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     paddingLeft: 4,
// // //   },

// // //   // ==================================================
// // //   // ACTIONS
// // //   // ==================================================

// // //   actions: {
// // //     position: "absolute",
// // //     right: 12,
// // //     alignItems: "center",
// // //     zIndex: 20,
// // //   },

// // //   action: {
// // //     alignItems: "center",
// // //     marginBottom: 22,
// // //   },

// // //   count: {
// // //     color: "#fff",
// // //     fontSize: 11,
// // //     fontWeight: "600",
// // //     marginTop: 4,
// // //     textShadowColor: "#000",
// // //     textShadowOffset: {
// // //       width: 0,
// // //       height: 1,
// // //     },
// // //     textShadowRadius: 3,
// // //   },

// // //   more: {
// // //     marginTop: 2,
// // //   },

// // //   // ==================================================
// // //   // AUTHOR
// // //   // ==================================================

// // //   bottomInfo: {
// // //     position: "absolute",
// // //     left: 14,
// // //     right: 75,
// // //     zIndex: 20,
// // //   },

// // //   userRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },

// // //   avatar: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: "#333",
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginRight: 9,
// // //   },

// // //   avatarImage: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     marginRight: 9,
// // //   },

// // //   username: {
// // //     flexShrink: 1,
// // //     color: "#fff",
// // //     fontSize: 15,
// // //     fontWeight: "700",
// // //     marginRight: 10,
// // //   },

// // //   follow: {
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     borderRadius: 6,
// // //     paddingHorizontal: 11,
// // //     paddingVertical: 5,
// // //   },

// // //   followText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //     fontWeight: "600",
// // //   },

// // //   caption: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     lineHeight: 19,
// // //     marginBottom: 6,
// // //   },

// // //   audio: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },

// // //   audioText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //     marginLeft: 5,
// // //   },

// // //   // ==================================================
// // //   // PROGRESS
// // //   // ==================================================

// // //   progressTrack: {
// // //     position: "absolute",
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     height: 3,
// // //     backgroundColor:
// // //       "rgba(255,255,255,0.35)",
// // //     zIndex: 100,
// // //   },

// // //   progressFill: {
// // //     height: 3,
// // //     backgroundColor: "#fff",
// // //     borderRadius: 2,
// // //   },
// // // });

// // // import React, {
// // //   forwardRef,
// // //   useEffect,
// // //   useImperativeHandle,
// // //   useRef,
// // //   useState,
// // // } from "react";

// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   Dimensions,
// // //   Pressable,
// // //   Image,
// // // } from "react-native";

// // // import {
// // //   useVideoPlayer,
// // //   VideoView,
// // // } from "expo-video";

// // // import Ionicons from "@expo/vector-icons/Ionicons";

// // // import ReelSaveButton from "./ReelSaveButton";

// // // import { useDispatch } from "react-redux";

// // // import {
// // //   likeReel,
// // //   unlikeReel,
// // // } from "../../redux/reelsSlice";

// // // import { getMediaUrl } from "../../utils/media";

// // // // IMPORTANT
// // // import CommentsSheet from "../comments/CommentsSheet";

// // // const { width: SCREEN_WIDTH } =
// // //   Dimensions.get("window");

// // // // ======================================================
// // // // ACTIVE REEL VIDEO
// // // // ======================================================

// // // const ActiveReelVideo = forwardRef(
// // //   (
// // //     {
// // //       videoUrl,
// // //       reelHeight,
// // //       onProgress,
// // //       onPlayingChange,
// // //     },
// // //     ref
// // //   ) => {
// // //     const player = useVideoPlayer(
// // //       videoUrl,
// // //       (player) => {
// // //         player.loop = true;
// // //         player.muted = false;
// // //       }
// // //     );

// // //     // ==================================================
// // //     // PLAYER CONTROLS
// // //     // ==================================================

// // //     useImperativeHandle(
// // //       ref,
// // //       () => ({
// // //         play: () => {
// // //           if (!player) return;

// // //           try {
// // //             player.play();
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ PLAY ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         pause: () => {
// // //           if (!player) return;

// // //           try {
// // //             player.pause();
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ PAUSE ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         toggle: () => {
// // //           if (!player) return;

// // //           try {
// // //             if (player.playing) {
// // //               player.pause();
// // //             } else {
// // //               player.play();
// // //             }
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ TOGGLE ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         isPlaying: () => {
// // //           return !!player?.playing;
// // //         },
// // //       }),
// // //       [player]
// // //     );

// // //     // ==================================================
// // //     // AUTO PLAY
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       try {
// // //         player.play();
// // //       } catch (error) {
// // //         console.log(
// // //           "❌ AUTO PLAY ERROR =>",
// // //           error?.message
// // //         );
// // //       }
// // //     }, [player]);

// // //     // ==================================================
// // //     // PROGRESS
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       const subscription =
// // //         player.addListener(
// // //           "timeUpdate",
// // //           (event) => {
// // //             const currentTime =
// // //               event?.currentTime ?? 0;

// // //             const duration =
// // //               event?.duration ??
// // //               player.duration ??
// // //               0;

// // //             if (
// // //               duration > 0 &&
// // //               typeof onProgress ===
// // //                 "function"
// // //             ) {
// // //               const percentage =
// // //                 currentTime / duration;

// // //               onProgress(
// // //                 Math.min(
// // //                   Math.max(
// // //                     percentage,
// // //                     0
// // //                   ),
// // //                   1
// // //                 )
// // //               );
// // //             }
// // //           }
// // //         );

// // //       return () => {
// // //         subscription?.remove();
// // //       };
// // //     }, [player, onProgress]);

// // //     // ==================================================
// // //     // PLAYING STATE
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       const subscription =
// // //         player.addListener(
// // //           "playingChange",
// // //           (event) => {
// // //             const playing =
// // //               !!event?.isPlaying;

// // //             if (
// // //               typeof onPlayingChange ===
// // //               "function"
// // //             ) {
// // //               onPlayingChange(
// // //                 playing
// // //               );
// // //             }
// // //           }
// // //         );

// // //       return () => {
// // //         subscription?.remove();
// // //       };
// // //     }, [
// // //       player,
// // //       onPlayingChange,
// // //     ]);

// // //     return (
// // //       <VideoView
// // //         player={player}
// // //         style={[
// // //           styles.video,
// // //           {
// // //             height: reelHeight,
// // //           },
// // //         ]}
// // //         contentFit="cover"
// // //         nativeControls={false}
// // //         fullscreenOptions={{
// // //           enable: false,
// // //         }}
// // //         allowsPictureInPicture={false}
// // //       />
// // //     );
// // //   }
// // // );

// // // // ======================================================
// // // // REEL ITEM
// // // // ======================================================

// // // const ReelItem = ({
// // //   reel,
// // //   isActive,
// // //   reelHeight,
// // // }) => {
// // //   const dispatch = useDispatch();

// // //   const playerRef = useRef(null);

// // //   // ==================================================
// // //   // COMMENTS
// // //   // ==================================================

// // //   const [
// // //     commentsVisible,
// // //     setCommentsVisible,
// // //   ] = useState(false);

// // //   // ==================================================
// // //   // PLAYING
// // //   // ==================================================

// // //   const [
// // //     isPlaying,
// // //     setIsPlaying,
// // //   ] = useState(false);

// // //   // ==================================================
// // //   // PROGRESS
// // //   // ==================================================

// // //   const [
// // //     progress,
// // //     setProgress,
// // //   ] = useState(0);

// // //   // ==================================================
// // //   // MEDIA URLS
// // //   // ==================================================

// // //   const videoUrl =
// // //     getMediaUrl(
// // //       reel?.video_url
// // //     );

// // //   const thumbnailUrl =
// // //     getMediaUrl(
// // //       reel?.thumbnail_url
// // //     );

// // //   // ==================================================
// // //   // AUTHOR
// // //   // ==================================================

// // //   const author =
// // //     reel?.author ||
// // //     reel?.user ||
// // //     reel?.owner ||
// // //     null;

// // //   const authorUsername =
// // //     author?.username ||
// // //     reel?.username ||
// // //     reel?.author_username ||
// // //     `User ${reel?.user_id || ""}`;

// // //   const authorAvatar =
// // //     author?.avatar ||
// // //     author?.avatar_url ||
// // //     author?.profile_avatar ||
// // //     reel?.avatar ||
// // //     reel?.avatar_url ||
// // //     reel?.author_avatar ||
// // //     null;

// // //   const authorAvatarUrl =
// // //     getMediaUrl(authorAvatar);

// // //   // ==================================================
// // //   // ACTIVE CHANGE
// // //   // ==================================================

// // //   useEffect(() => {
// // //     if (isActive) {
// // //       console.log(
// // //         "▶️ ACTIVE REEL =>",
// // //         reel?.id
// // //       );

// // //       setProgress(0);
// // //     } else {
// // //       console.log(
// // //         "🛑 INACTIVE REEL =>",
// // //         reel?.id
// // //       );

// // //       setIsPlaying(false);
// // //       setProgress(0);
// // //     }
// // //   }, [
// // //     isActive,
// // //     reel?.id,
// // //   ]);

// // //   // ==================================================
// // //   // VIDEO PRESS
// // //   // ==================================================

// // //   const handleVideoPress = () => {
// // //     if (!isActive) return;

// // //     if (!playerRef.current) {
// // //       console.log(
// // //         "❌ PLAYER REF NOT READY"
// // //       );

// // //       return;
// // //     }

// // //     playerRef.current.toggle();
// // //   };

// // //   // ==================================================
// // //   // LIKE
// // //   // ==================================================

// // //   const handleLike = () => {
// // //     if (!reel?.id) return;

// // //     if (reel?.is_liked) {
// // //       if (!reel?.like_id) {
// // //         console.log(
// // //           "❌ like_id is missing"
// // //         );

// // //         return;
// // //       }

// // //       dispatch(
// // //         unlikeReel({
// // //           reelId: reel.id,
// // //           likeId: reel.like_id,
// // //         })
// // //       );

// // //       return;
// // //     }

// // //     dispatch(
// // //       likeReel(reel.id)
// // //     );
// // //   };

// // //   // ==================================================
// // //   // OPEN COMMENTS
// // //   // ==================================================

// // //   const handleOpenComments = () => {
// // //     console.log(
// // //       "💬 OPEN REEL COMMENTS =>",
// // //       reel?.id
// // //     );

// // //     if (!reel?.id) {
// // //       console.log(
// // //         "❌ REEL ID MISSING"
// // //       );

// // //       return;
// // //     }

// // //     setCommentsVisible(true);
// // //   };

// // //   // ==================================================
// // //   // CLOSE COMMENTS
// // //   // ==================================================

// // //   const handleCloseComments = () => {
// // //     console.log(
// // //       "❌ CLOSE REEL COMMENTS =>",
// // //       reel?.id
// // //     );

// // //     setCommentsVisible(false);
// // //   };

// // //   // ==================================================
// // //   // RENDER
// // //   // ==================================================

// // //   return (
// // //     <View
// // //       style={[
// // //         styles.container,
// // //         {
// // //           height: reelHeight,
// // //         },
// // //       ]}
// // //     >
// // //       {/* ==================================================
// // //           VIDEO
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.videoContainer,
// // //           {
// // //             height: reelHeight,
// // //           },
// // //         ]}
// // //       >
// // //         {/* THUMBNAIL */}

// // //         {thumbnailUrl ? (
// // //           <Image
// // //             source={{
// // //               uri: thumbnailUrl,
// // //             }}
// // //             style={[
// // //               styles.video,
// // //               {
// // //                 height: reelHeight,
// // //               },
// // //             ]}
// // //             resizeMode="cover"
// // //           />
// // //         ) : null}

// // //         {/* ACTIVE VIDEO */}

// // //         {isActive && videoUrl ? (
// // //           <Pressable
// // //             style={
// // //               styles.videoPressable
// // //             }
// // //             onPress={
// // //               handleVideoPress
// // //             }
// // //           >
// // //             <ActiveReelVideo
// // //               ref={playerRef}
// // //               videoUrl={videoUrl}
// // //               reelHeight={reelHeight}
// // //               onProgress={
// // //                 setProgress
// // //               }
// // //               onPlayingChange={
// // //                 setIsPlaying
// // //               }
// // //             />

// // //             {/* PLAY OVERLAY */}

// // //             {!isPlaying ? (
// // //               <View
// // //                 style={
// // //                   styles.playOverlay
// // //                 }
// // //               >
// // //                 <View
// // //                   style={
// // //                     styles.playCircle
// // //                   }
// // //                 >
// // //                   <Ionicons
// // //                     name="play"
// // //                     size={34}
// // //                     color="#fff"
// // //                   />
// // //                 </View>
// // //               </View>
// // //             ) : null}
// // //           </Pressable>
// // //         ) : null}
// // //       </View>

// // //       {/* ==================================================
// // //           RIGHT ACTIONS
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.actions,
// // //           {
// // //             bottom:
// // //               reelHeight * 0.18,
// // //           },
// // //         ]}
// // //       >
// // //         {/* LIKE */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={
// // //             handleLike
// // //           }
// // //         >
// // //           <Ionicons
// // //             name={
// // //               reel?.is_liked
// // //                 ? "heart"
// // //                 : "heart-outline"
// // //             }
// // //             size={34}
// // //             color={
// // //               reel?.is_liked
// // //                 ? "#ff3040"
// // //                 : "#fff"
// // //             }
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             {reel?.likes_count || 0}
// // //           </Text>
// // //         </Pressable>

// // //         {/* COMMENTS */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={
// // //             handleOpenComments
// // //           }
// // //           hitSlop={10}
// // //         >
// // //           <Ionicons
// // //             name="chatbubble-outline"
// // //             size={32}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             {reel?.comments_count || 0}
// // //           </Text>
// // //         </Pressable>

// // //         {/* SHARE */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={() =>
// // //             console.log(
// // //               "SHARE =>",
// // //               reel?.id
// // //             )
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="paper-plane-outline"
// // //             size={32}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             Share
// // //           </Text>
// // //         </Pressable>

// // //         {/* SAVE */}

// // //         <View
// // //           style={styles.action}
// // //         >
// // //           <ReelSaveButton
// // //             reelId={reel?.id}
// // //             isSaved={
// // //               reel?.is_saved
// // //             }
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             Save
// // //           </Text>
// // //         </View>

// // //         {/* MORE */}

// // //         <Pressable
// // //           style={styles.more}
// // //           onPress={() =>
// // //             console.log(
// // //               "MORE =>",
// // //               reel?.id
// // //             )
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="ellipsis-horizontal"
// // //             size={30}
// // //             color="#fff"
// // //           />
// // //         </Pressable>
// // //       </View>

// // //       {/* ==================================================
// // //           AUTHOR INFO
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.bottomInfo,
// // //           {
// // //             bottom:
// // //               reelHeight * 0.055,
// // //           },
// // //         ]}
// // //       >
// // //         <View
// // //           style={styles.userRow}
// // //         >
// // //           {/* AVATAR */}

// // //           {authorAvatarUrl ? (
// // //             <Image
// // //               source={{
// // //                 uri: authorAvatarUrl,
// // //               }}
// // //               style={
// // //                 styles.avatarImage
// // //               }
// // //             />
// // //           ) : (
// // //             <View
// // //               style={styles.avatar}
// // //             >
// // //               <Ionicons
// // //                 name="person"
// // //                 size={22}
// // //                 color="#fff"
// // //               />
// // //             </View>
// // //           )}

// // //           {/* USERNAME */}

// // //           <Text
// // //             style={styles.username}
// // //             numberOfLines={1}
// // //           >
// // //             {authorUsername}
// // //           </Text>

// // //           {/* FOLLOW */}

// // //           <Pressable
// // //             style={styles.follow}
// // //             onPress={() =>
// // //               console.log(
// // //                 "FOLLOW =>",
// // //                 reel?.user_id
// // //               )
// // //             }
// // //           >
// // //             <Text
// // //               style={
// // //                 styles.followText
// // //               }
// // //             >
// // //               Follow
// // //             </Text>
// // //           </Pressable>
// // //         </View>

// // //         {/* CAPTION */}

// // //         {reel?.caption ? (
// // //           <Text
// // //             style={styles.caption}
// // //             numberOfLines={2}
// // //           >
// // //             {reel.caption}
// // //           </Text>
// // //         ) : null}

// // //         {/* AUDIO */}

// // //         <View
// // //           style={styles.audio}
// // //         >
// // //           <Ionicons
// // //             name="musical-notes"
// // //             size={14}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.audioText}
// // //           >
// // //             Original audio
// // //           </Text>
// // //         </View>
// // //       </View>

// // //       {/* ==================================================
// // //           PROGRESS
// // //       ================================================== */}

// // //       {isActive ? (
// // //         <View
// // //           style={
// // //             styles.progressTrack
// // //           }
// // //         >
// // //           <View
// // //             style={[
// // //               styles.progressFill,
// // //               {
// // //                 width: `${
// // //                   progress * 100
// // //                 }%`,
// // //               },
// // //             ]}
// // //           />
// // //         </View>
// // //       ) : null}

// // //       {/* ==================================================
// // //           COMMENTS SHEET
// // //       ================================================== */}

// // //       <CommentsSheet
// // //         visible={
// // //           commentsVisible
// // //         }
// // //         reelId={reel?.id}
// // //         onClose={
// // //           handleCloseComments
// // //         }
// // //       />
// // //     </View>
// // //   );
// // // };

// // // export default ReelItem;

// // // // ======================================================
// // // // STYLES
// // // // ======================================================

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     width: SCREEN_WIDTH,
// // //     backgroundColor: "#000",
// // //     position: "relative",
// // //     overflow: "hidden",
// // //   },

// // //   videoContainer: {
// // //     width: SCREEN_WIDTH,
// // //     backgroundColor: "#000",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     overflow: "hidden",
// // //   },

// // //   video: {
// // //     position: "absolute",
// // //     width: SCREEN_WIDTH,
// // //   },

// // //   videoPressable: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   playOverlay: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor:
// // //       "rgba(0,0,0,0.12)",
// // //   },

// // //   playCircle: {
// // //     width: 68,
// // //     height: 68,
// // //     borderRadius: 34,
// // //     backgroundColor:
// // //       "rgba(0,0,0,0.55)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     paddingLeft: 4,
// // //   },

// // //   actions: {
// // //     position: "absolute",
// // //     right: 12,
// // //     alignItems: "center",
// // //     zIndex: 20,
// // //   },

// // //   action: {
// // //     alignItems: "center",
// // //     marginBottom: 22,
// // //   },

// // //   count: {
// // //     color: "#fff",
// // //     fontSize: 11,
// // //     fontWeight: "600",
// // //     marginTop: 4,
// // //     textShadowColor: "#000",
// // //     textShadowOffset: {
// // //       width: 0,
// // //       height: 1,
// // //     },
// // //     textShadowRadius: 3,
// // //   },

// // //   more: {
// // //     marginTop: 2,
// // //   },

// // //   bottomInfo: {
// // //     position: "absolute",
// // //     left: 14,
// // //     right: 75,
// // //     zIndex: 20,
// // //   },

// // //   userRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },

// // //   avatar: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: "#333",
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginRight: 9,
// // //   },

// // //   avatarImage: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     marginRight: 9,
// // //   },

// // //   username: {
// // //     flexShrink: 1,
// // //     color: "#fff",
// // //     fontSize: 15,
// // //     fontWeight: "700",
// // //     marginRight: 10,
// // //   },

// // //   follow: {
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     borderRadius: 6,
// // //     paddingHorizontal: 11,
// // //     paddingVertical: 5,
// // //   },

// // //   followText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //     fontWeight: "600",
// // //   },

// // //   caption: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     lineHeight: 19,
// // //     marginBottom: 6,
// // //   },

// // //   audio: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },

// // //   audioText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //     marginLeft: 5,
// // //   },

// // //   progressTrack: {
// // //     position: "absolute",
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     height: 3,
// // //     backgroundColor:
// // //       "rgba(255,255,255,0.35)",
// // //     zIndex: 100,
// // //   },

// // //   progressFill: {
// // //     height: 3,
// // //     backgroundColor: "#fff",
// // //     borderRadius: 2,
// // //   },
// // // });

// // // import React, {
// // //   forwardRef,
// // //   useEffect,
// // //   useImperativeHandle,
// // //   useRef,
// // //   useState,
// // // } from "react";

// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   Dimensions,
// // //   Pressable,
// // //   Image,
// // // } from "react-native";

// // // import {
// // //   useVideoPlayer,
// // //   VideoView,
// // // } from "expo-video";

// // // import Ionicons from "@expo/vector-icons/Ionicons";

// // // import ReelSaveButton from "./ReelSaveButton";

// // // import LikesSheet from "../likes/LikesSheet";

// // // import {
// // //   useDispatch,
// // //   useSelector,
// // // } from "react-redux";

// // // import {
// // //   likeTarget,
// // //   unlikeTarget,
// // // } from "../../redux/likeSlice";

// // // import { getMediaUrl } from "../../utils/media";

// // // // Comments are a separate flow.
// // // // Nothing from the likes API is used for comments.
// // // import CommentsSheet from "../comments/CommentsSheet";

// // // const { width: SCREEN_WIDTH } =
// // //   Dimensions.get("window");

// // // // ======================================================
// // // // ACTIVE REEL VIDEO
// // // // ======================================================

// // // const ActiveReelVideo = forwardRef(
// // //   (
// // //     {
// // //       videoUrl,
// // //       reelHeight,
// // //       onProgress,
// // //       onPlayingChange,
// // //     },
// // //     ref
// // //   ) => {
// // //     const player = useVideoPlayer(
// // //       videoUrl,
// // //       (player) => {
// // //         player.loop = true;
// // //         player.muted = false;
// // //       }
// // //     );

// // //     // ==================================================
// // //     // PLAYER CONTROLS
// // //     // ==================================================

// // //     useImperativeHandle(
// // //       ref,
// // //       () => ({
// // //         play: () => {
// // //           if (!player) return;

// // //           try {
// // //             player.play();
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ PLAY ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         pause: () => {
// // //           if (!player) return;

// // //           try {
// // //             player.pause();
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ PAUSE ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         toggle: () => {
// // //           if (!player) return;

// // //           try {
// // //             if (player.playing) {
// // //               player.pause();
// // //             } else {
// // //               player.play();
// // //             }
// // //           } catch (error) {
// // //             console.log(
// // //               "❌ TOGGLE ERROR =>",
// // //               error?.message
// // //             );
// // //           }
// // //         },

// // //         isPlaying: () => {
// // //           return !!player?.playing;
// // //         },
// // //       }),
// // //       [player]
// // //     );

// // //     // ==================================================
// // //     // AUTO PLAY
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       try {
// // //         player.play();
// // //       } catch (error) {
// // //         console.log(
// // //           "❌ AUTO PLAY ERROR =>",
// // //           error?.message
// // //         );
// // //       }
// // //     }, [player]);

// // //     // ==================================================
// // //     // PROGRESS
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       const subscription =
// // //         player.addListener(
// // //           "timeUpdate",
// // //           (event) => {
// // //             const currentTime =
// // //               event?.currentTime ?? 0;

// // //             const duration =
// // //               event?.duration ??
// // //               player.duration ??
// // //               0;

// // //             if (
// // //               duration > 0 &&
// // //               typeof onProgress ===
// // //                 "function"
// // //             ) {
// // //               const percentage =
// // //                 currentTime / duration;

// // //               onProgress(
// // //                 Math.min(
// // //                   Math.max(
// // //                     percentage,
// // //                     0
// // //                   ),
// // //                   1
// // //                 )
// // //               );
// // //             }
// // //           }
// // //         );

// // //       return () => {
// // //         subscription?.remove();
// // //       };
// // //     }, [player, onProgress]);

// // //     // ==================================================
// // //     // PLAYING STATE
// // //     // ==================================================

// // //     useEffect(() => {
// // //       if (!player) return;

// // //       const subscription =
// // //         player.addListener(
// // //           "playingChange",
// // //           (event) => {
// // //             const playing =
// // //               !!event?.isPlaying;

// // //             if (
// // //               typeof onPlayingChange ===
// // //               "function"
// // //             ) {
// // //               onPlayingChange(
// // //                 playing
// // //               );
// // //             }
// // //           }
// // //         );

// // //       return () => {
// // //         subscription?.remove();
// // //       };
// // //     }, [
// // //       player,
// // //       onPlayingChange,
// // //     ]);

// // //     return (
// // //       <VideoView
// // //         player={player}
// // //         style={[
// // //           styles.video,
// // //           {
// // //             height: reelHeight,
// // //           },
// // //         ]}
// // //         contentFit="cover"
// // //         nativeControls={false}
// // //         fullscreenOptions={{
// // //           enable: false,
// // //         }}
// // //         allowsPictureInPicture={false}
// // //       />
// // //     );
// // //   }
// // // );

// // // // ======================================================
// // // // REEL ITEM
// // // // ======================================================

// // // const ReelItem = ({
// // //   reel,
// // //   isActive,
// // //   reelHeight,
// // // }) => {
// // //   const dispatch = useDispatch();

// // //   const playerRef = useRef(null);
  
// // //   const [
// // //   likesVisible,
// // //   setLikesVisible,
// // // ] = useState(false);

// // //   // ==================================================
// // //   // COMMENTS
// // //   // ==================================================

// // //   const [
// // //     commentsVisible,
// // //     setCommentsVisible,
// // //   ] = useState(false);

// // //   // ==================================================
// // //   // PLAYING
// // //   // ==================================================

// // //   const [
// // //     isPlaying,
// // //     setIsPlaying,
// // //   ] = useState(false);

// // //   // ==================================================
// // //   // PROGRESS
// // //   // ==================================================

// // //   const [
// // //     progress,
// // //     setProgress,
// // //   ] = useState(0);

// // //   // ==================================================
// // //   // LIKE STATE
// // //   // ==================================================

// // //   /*
// // //    * IMPORTANT:
// // //    *
// // //    * Reel like key:
// // //    *
// // //    * reel_123
// // //    *
// // //    * This comes from likesSlice:
// // //    *
// // //    * state.likes.likes["reel_123"]
// // //    */

// // //   const reelLike = useSelector(
// // //     (state) =>
// // //       state.likes?.likes?.[
// // //         `reel_${reel?.id}`
// // //       ]
// // //   );

// // //   // ==================================================
// // //   // DERIVED LIKE VALUES
// // //   // ==================================================

// // //   /*
// // //    * Initially use the values coming from the reel feed.
// // //    *
// // //    * After like/unlike API succeeds,
// // //    * likesSlice values take priority.
// // //    */

// // //   const isLiked =
// // //     reelLike?.isLiked ??
// // //     !!reel?.is_liked;

// // //   const likesCount =
// // //     reelLike?.count ??
// // //     reel?.likes_count ??
// // //     0;

// // //   // ==================================================
// // //   // MEDIA URLS
// // //   // ==================================================

// // //   const videoUrl =
// // //     getMediaUrl(
// // //       reel?.video_url
// // //     );

// // //   const thumbnailUrl =
// // //     getMediaUrl(
// // //       reel?.thumbnail_url
// // //     );

// // //   // ==================================================
// // //   // AUTHOR
// // //   // ==================================================

// // //   const author =
// // //     reel?.author ||
// // //     reel?.user ||
// // //     reel?.owner ||
// // //     null;

// // //   const authorUsername =
// // //     author?.username ||
// // //     reel?.username ||
// // //     reel?.author_username ||
// // //     `User ${reel?.user_id || ""}`;

// // //   const authorAvatar =
// // //     author?.avatar ||
// // //     author?.avatar_url ||
// // //     author?.profile_avatar ||
// // //     reel?.avatar ||
// // //     reel?.avatar_url ||
// // //     reel?.author_avatar ||
// // //     null;

// // //   const authorAvatarUrl =
// // //     getMediaUrl(authorAvatar);

// // //   // ==================================================
// // //   // ACTIVE CHANGE
// // //   // ==================================================

// // //   useEffect(() => {
// // //     if (isActive) {
// // //       console.log(
// // //         "▶️ ACTIVE REEL =>",
// // //         reel?.id
// // //       );

// // //       setProgress(0);
// // //     } else {
// // //       console.log(
// // //         "🛑 INACTIVE REEL =>",
// // //         reel?.id
// // //       );

// // //       setIsPlaying(false);
// // //       setProgress(0);
// // //     }
// // //   }, [
// // //     isActive,
// // //     reel?.id,
// // //   ]);

// // //   // ==================================================
// // //   // VIDEO PRESS
// // //   // ==================================================

// // //   const handleVideoPress = () => {
// // //     if (!isActive) return;

// // //     if (!playerRef.current) {
// // //       console.log(
// // //         "❌ PLAYER REF NOT READY"
// // //       );

// // //       return;
// // //     }

// // //     playerRef.current.toggle();
// // //   };

// // //   // ==================================================
// // //   // LIKE / UNLIKE REEL
// // //   // ==================================================

// // //   const handleLike = () => {
// // //     if (!reel?.id) {
// // //       console.log(
// // //         "❌ REEL ID MISSING FOR LIKE"
// // //       );

// // //       return;
// // //     }

// // //     const reelId = reel.id;

// // //     console.log(
// // //       "❤️ REEL LIKE CLICK =>",
// // //       {
// // //         reelId,
// // //         isLiked,
// // //       }
// // //     );

// // //     // ==================================================
// // //     // UNLIKE
// // //     // DELETE /api/likes
// // //     //
// // //     // target_type=reel
// // //     // target_id=reelId
// // //     // ==================================================

// // //     if (isLiked) {
// // //       console.log(
// // //         "💔 UNLIKE REEL =>",
// // //         reelId
// // //       );

// // //       dispatch(
// // //         unlikeTarget({
// // //           targetType: "reel",
// // //           targetId: reelId,
// // //         })
// // //       );

// // //       return;
// // //     }

// // //     // ==================================================
// // //     // LIKE
// // //     // POST /api/likes
// // //     //
// // //     // {
// // //     //   target_type: "reel",
// // //     //   target_id: reelId
// // //     // }
// // //     // ==================================================

// // //     console.log(
// // //       "❤️ LIKE REEL =>",
// // //       reelId
// // //     );

// // //     dispatch(
// // //       likeTarget({
// // //         targetType: "reel",
// // //         targetId: reelId,
// // //       })
// // //     );
// // //   };

// // //   // ==================================================
// // //   // OPEN COMMENTS
// // //   // ==================================================

// // //   const handleOpenComments = () => {
// // //     console.log(
// // //       "💬 OPEN REEL COMMENTS =>",
// // //       reel?.id
// // //     );

// // //     if (!reel?.id) {
// // //       console.log(
// // //         "❌ REEL ID MISSING"
// // //       );

// // //       return;
// // //     }

// // //     setCommentsVisible(true);
// // //   };

// // //   // ==================================================
// // //   // CLOSE COMMENTS
// // //   // ==================================================

// // //   const handleCloseComments = () => {
// // //     console.log(
// // //       "❌ CLOSE REEL COMMENTS =>",
// // //       reel?.id
// // //     );

// // //     setCommentsVisible(false);
// // //   };

// // //   // ==================================================
// // //   // RENDER
// // //   // ==================================================

// // //   return (
// // //     <View
// // //       style={[
// // //         styles.container,
// // //         {
// // //           height: reelHeight,
// // //         },
// // //       ]}
// // //     >
// // //       {/* ==================================================
// // //           VIDEO
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.videoContainer,
// // //           {
// // //             height: reelHeight,
// // //           },
// // //         ]}
// // //       >
// // //         {/* THUMBNAIL */}

// // //         {thumbnailUrl ? (
// // //           <Image
// // //             source={{
// // //               uri: thumbnailUrl,
// // //             }}
// // //             style={[
// // //               styles.video,
// // //               {
// // //                 height: reelHeight,
// // //               },
// // //             ]}
// // //             resizeMode="cover"
// // //           />
// // //         ) : null}

// // //         {/* ACTIVE VIDEO */}

// // //         {isActive && videoUrl ? (
// // //           <Pressable
// // //             style={
// // //               styles.videoPressable
// // //             }
// // //             onPress={
// // //               handleVideoPress
// // //             }
// // //           >
// // //             <ActiveReelVideo
// // //               ref={playerRef}
// // //               videoUrl={videoUrl}
// // //               reelHeight={reelHeight}
// // //               onProgress={
// // //                 setProgress
// // //               }
// // //               onPlayingChange={
// // //                 setIsPlaying
// // //               }
// // //             />

// // //             {/* PLAY OVERLAY */}

// // //             {!isPlaying ? (
// // //               <View
// // //                 style={
// // //                   styles.playOverlay
// // //                 }
// // //               >
// // //                 <View
// // //                   style={
// // //                     styles.playCircle
// // //                   }
// // //                 >
// // //                   <Ionicons
// // //                     name="play"
// // //                     size={34}
// // //                     color="#fff"
// // //                   />
// // //                 </View>
// // //               </View>
// // //             ) : null}
// // //           </Pressable>
// // //         ) : null}
// // //       </View>

// // //       {/* ==================================================
// // //           RIGHT ACTIONS
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.actions,
// // //           {
// // //             bottom:
// // //               reelHeight * 0.18,
// // //           },
// // //         ]}
// // //       >
// // //        <Pressable
// // //   style={styles.action}
// // //   onPress={handleLike}
// // //   hitSlop={10}
// // // >
// // //   <Ionicons
// // //     name={
// // //       isLiked
// // //         ? "heart"
// // //         : "heart-outline"
// // //     }
// // //     size={34}
// // //     color={
// // //       isLiked
// // //         ? "#ff3040"
// // //         : "#fff"
// // //     }
// // //   />
// // // </Pressable>

// // // <Pressable
// // //   onPress={() =>
// // //     setLikesVisible(true)
// // //   }
// // //   hitSlop={10}
// // // >
// // //   <Text
// // //     style={styles.count}
// // //   >
// // //     {likesCount}
// // //   </Text>
// // // </Pressable>

// // //         {/* ==================================================
// // //             COMMENTS

// // //             SEPARATE FLOW.
// // //             NO /api/likes CALL HERE.
// // //         ================================================== */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={
// // //             handleOpenComments
// // //           }
// // //           hitSlop={10}
// // //         >
// // //           <Ionicons
// // //             name="chatbubble-outline"
// // //             size={32}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             {reel?.comments_count ||
// // //               0}
// // //           </Text>
// // //         </Pressable>

// // //         {/* ==================================================
// // //             SHARE
// // //         ================================================== */}

// // //         <Pressable
// // //           style={styles.action}
// // //           onPress={() =>
// // //             console.log(
// // //               "SHARE =>",
// // //               reel?.id
// // //             )
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="paper-plane-outline"
// // //             size={32}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             Share
// // //           </Text>
// // //         </Pressable>

// // //         {/* ==================================================
// // //             SAVE
// // //         ================================================== */}

// // //         <View
// // //           style={styles.action}
// // //         >
// // //           <ReelSaveButton
// // //             reelId={reel?.id}
// // //             isSaved={
// // //               reel?.is_saved
// // //             }
// // //           />

// // //           <Text
// // //             style={styles.count}
// // //           >
// // //             Save
// // //           </Text>
// // //         </View>

// // //         {/* ==================================================
// // //             MORE
// // //         ================================================== */}

// // //         <Pressable
// // //           style={styles.more}
// // //           onPress={() =>
// // //             console.log(
// // //               "MORE =>",
// // //               reel?.id
// // //             )
// // //           }
// // //         >
// // //           <Ionicons
// // //             name="ellipsis-horizontal"
// // //             size={30}
// // //             color="#fff"
// // //           />
// // //         </Pressable>
// // //       </View>

// // //       {/* ==================================================
// // //           AUTHOR INFO
// // //       ================================================== */}

// // //       <View
// // //         style={[
// // //           styles.bottomInfo,
// // //           {
// // //             bottom:
// // //               reelHeight * 0.055,
// // //           },
// // //         ]}
// // //       >
// // //         <View
// // //           style={styles.userRow}
// // //         >
// // //           {/* AVATAR */}

// // //           {authorAvatarUrl ? (
// // //             <Image
// // //               source={{
// // //                 uri: authorAvatarUrl,
// // //               }}
// // //               style={
// // //                 styles.avatarImage
// // //               }
// // //             />
// // //           ) : (
// // //             <View
// // //               style={styles.avatar}
// // //             >
// // //               <Ionicons
// // //                 name="person"
// // //                 size={22}
// // //                 color="#fff"
// // //               />
// // //             </View>
// // //           )}

// // //           {/* USERNAME */}

// // //           <Text
// // //             style={styles.username}
// // //             numberOfLines={1}
// // //           >
// // //             {authorUsername}
// // //           </Text>

// // //           {/* FOLLOW */}

// // //           <Pressable
// // //             style={styles.follow}
// // //             onPress={() =>
// // //               console.log(
// // //                 "FOLLOW =>",
// // //                 reel?.user_id
// // //               )
// // //             }
// // //           >
// // //             <Text
// // //               style={
// // //                 styles.followText
// // //               }
// // //             >
// // //               Follow
// // //             </Text>
// // //           </Pressable>
// // //         </View>

// // //         {/* CAPTION */}

// // //         {reel?.caption ? (
// // //           <Text
// // //             style={styles.caption}
// // //             numberOfLines={2}
// // //           >
// // //             {reel.caption}
// // //           </Text>
// // //         ) : null}

// // //         {/* AUDIO */}

// // //         <View
// // //           style={styles.audio}
// // //         >
// // //           <Ionicons
// // //             name="musical-notes"
// // //             size={14}
// // //             color="#fff"
// // //           />

// // //           <Text
// // //             style={styles.audioText}
// // //           >
// // //             Original audio
// // //           </Text>
// // //         </View>
// // //       </View>

// // //       {/* ==================================================
// // //           PROGRESS
// // //       ================================================== */}

// // //       {isActive ? (
// // //         <View
// // //           style={
// // //             styles.progressTrack
// // //           }
// // //         >
// // //           <View
// // //             style={[
// // //               styles.progressFill,
// // //               {
// // //                 width: `${
// // //                   progress * 100
// // //                 }%`,
// // //               },
// // //             ]}
// // //           />
// // //         </View>
// // //       ) : null}

// // //       {/* ==================================================
// // //           COMMENTS SHEET
          
// // //           SEPARATE COMMENT API FLOW
// // //       ================================================== */}

// // //       <CommentsSheet
// // //         visible={
// // //           commentsVisible
// // //         }
// // //         reelId={reel?.id}
// // //         onClose={
// // //           handleCloseComments
// // //         }
// // //       />
// // //       <LikesSheet
// // //   visible={likesVisible}
// // //   reelId={reel?.id}
// // //   onClose={() =>
// // //     setLikesVisible(false)
// // //   }
// // // />
// // //     </View>
// // //   );
// // // };

// // // export default ReelItem;

// // // // ======================================================
// // // // STYLES
// // // // ======================================================

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     width: SCREEN_WIDTH,
// // //     backgroundColor: "#000",
// // //     position: "relative",
// // //     overflow: "hidden",
// // //   },

// // //   videoContainer: {
// // //     width: SCREEN_WIDTH,
// // //     backgroundColor: "#000",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     overflow: "hidden",
// // //   },

// // //   video: {
// // //     position: "absolute",
// // //     width: SCREEN_WIDTH,
// // //   },

// // //   videoPressable: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   playOverlay: {
// // //     position: "absolute",
// // //     top: 0,
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     backgroundColor:
// // //       "rgba(0,0,0,0.12)",
// // //   },

// // //   playCircle: {
// // //     width: 68,
// // //     height: 68,
// // //     borderRadius: 34,
// // //     backgroundColor:
// // //       "rgba(0,0,0,0.55)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     paddingLeft: 4,
// // //   },

// // //   actions: {
// // //     position: "absolute",
// // //     right: 12,
// // //     alignItems: "center",
// // //     zIndex: 20,
// // //   },

// // //   action: {
// // //     alignItems: "center",
// // //     marginBottom: 22,
// // //   },

// // //   count: {
// // //     color: "#fff",
// // //     fontSize: 11,
// // //     fontWeight: "600",
// // //     marginTop: 4,
// // //     textShadowColor: "#000",
// // //     textShadowOffset: {
// // //       width: 0,
// // //       height: 1,
// // //     },
// // //     textShadowRadius: 3,
// // //   },

// // //   more: {
// // //     marginTop: 2,
// // //   },

// // //   bottomInfo: {
// // //     position: "absolute",
// // //     left: 14,
// // //     right: 75,
// // //     zIndex: 20,
// // //   },

// // //   userRow: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },

// // //   avatar: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     backgroundColor: "#333",
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginRight: 9,
// // //   },

// // //   avatarImage: {
// // //     width: 40,
// // //     height: 40,
// // //     borderRadius: 20,
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     marginRight: 9,
// // //   },

// // //   username: {
// // //     flexShrink: 1,
// // //     color: "#fff",
// // //     fontSize: 15,
// // //     fontWeight: "700",
// // //     marginRight: 10,
// // //   },

// // //   follow: {
// // //     borderWidth: 1,
// // //     borderColor: "#fff",
// // //     borderRadius: 6,
// // //     paddingHorizontal: 11,
// // //     paddingVertical: 5,
// // //   },

// // //   followText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //     fontWeight: "600",
// // //   },

// // //   caption: {
// // //     color: "#fff",
// // //     fontSize: 14,
// // //     lineHeight: 19,
// // //     marginBottom: 6,
// // //   },

// // //   audio: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },

// // //   audioText: {
// // //     color: "#fff",
// // //     fontSize: 12,
// // //     marginLeft: 5,
// // //   },

// // //   progressTrack: {
// // //     position: "absolute",
// // //     left: 0,
// // //     right: 0,
// // //     bottom: 0,
// // //     height: 3,
// // //     backgroundColor:
// // //       "rgba(255,255,255,0.35)",
// // //     zIndex: 100,
// // //   },

// // //   progressFill: {
// // //     height: 3,
// // //     backgroundColor: "#fff",
// // //     borderRadius: 2,
// // //   },
// // // });

// // import React, {
// //   forwardRef,
// //   useEffect,
// //   useImperativeHandle,
// //   useRef,
// //   useState,
// // } from "react";

// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Dimensions,
// //   Pressable,
// //   Image,
// // } from "react-native";

// // import {
// //   useVideoPlayer,
// //   VideoView,
// // } from "expo-video";

// // import Ionicons from "@expo/vector-icons/Ionicons";

// // import ReelSaveButton from "./ReelSaveButton";

// // import LikesSheet from "../likes/LikesSheet";

// // import {
// //   useDispatch,
// //   useSelector,
// // } from "react-redux";

// // import {
// //   likeTarget,
// //   unlikeTarget,
// // } from "../../redux/likeSlice";

// // import { getMediaUrl } from "../../utils/media";

// // import CommentsSheet from "../comments/CommentsSheet";

// // const {
// //   width: SCREEN_WIDTH,
// // } = Dimensions.get("window");

// // // ======================================================
// // // ACTIVE REEL VIDEO
// // // ======================================================

// // const ActiveReelVideo = forwardRef(
// //   (
// //     {
// //       videoUrl,
// //       reelHeight,
// //       onProgress,
// //       onPlayingChange,
// //     },
// //     ref
// //   ) => {
// //     const player = useVideoPlayer(
// //       videoUrl,
// //       (player) => {
// //         player.loop = true;
// //         player.muted = false;
// //       }
// //     );

// //     // ==================================================
// //     // PLAYER CONTROLS
// //     // ==================================================

// //     useImperativeHandle(
// //       ref,
// //       () => ({
// //         play: () => {
// //           if (!player) {
// //             return;
// //           }

// //           try {
// //             player.play();
// //           } catch (error) {
// //             console.log(
// //               "❌ PLAY ERROR =>",
// //               error?.message
// //             );
// //           }
// //         },

// //         pause: () => {
// //           if (!player) {
// //             return;
// //           }

// //           try {
// //             player.pause();
// //           } catch (error) {
// //             console.log(
// //               "❌ PAUSE ERROR =>",
// //               error?.message
// //             );
// //           }
// //         },

// //         toggle: () => {
// //           if (!player) {
// //             return;
// //           }

// //           try {
// //             if (player.playing) {
// //               player.pause();
// //             } else {
// //               player.play();
// //             }
// //           } catch (error) {
// //             console.log(
// //               "❌ TOGGLE ERROR =>",
// //               error?.message
// //             );
// //           }
// //         },

// //         isPlaying: () => {
// //           return !!player?.playing;
// //         },
// //       }),
// //       [player]
// //     );

// //     // ==================================================
// //     // AUTO PLAY
// //     // ==================================================

// //     useEffect(() => {
// //       if (!player) {
// //         return;
// //       }

// //       try {
// //         player.play();
// //       } catch (error) {
// //         console.log(
// //           "❌ AUTO PLAY ERROR =>",
// //           error?.message
// //         );
// //       }
// //     }, [player]);

// //     // ==================================================
// //     // PROGRESS
// //     // ==================================================

// //     useEffect(() => {
// //       if (!player) {
// //         return;
// //       }

// //       const subscription =
// //         player.addListener(
// //           "timeUpdate",
// //           (event) => {
// //             const currentTime =
// //               event?.currentTime ?? 0;

// //             const duration =
// //               event?.duration ??
// //               player.duration ??
// //               0;

// //             if (
// //               duration > 0 &&
// //               typeof onProgress ===
// //                 "function"
// //             ) {
// //               const percentage =
// //                 currentTime / duration;

// //               onProgress(
// //                 Math.min(
// //                   Math.max(
// //                     percentage,
// //                     0
// //                   ),
// //                   1
// //                 )
// //               );
// //             }
// //           }
// //         );

// //       return () => {
// //         subscription?.remove();
// //       };
// //     }, [
// //       player,
// //       onProgress,
// //     ]);

// //     // ==================================================
// //     // PLAYING STATE
// //     // ==================================================

// //     useEffect(() => {
// //       if (!player) {
// //         return;
// //       }

// //       const subscription =
// //         player.addListener(
// //           "playingChange",
// //           (event) => {
// //             const playing =
// //               !!event?.isPlaying;

// //             if (
// //               typeof onPlayingChange ===
// //               "function"
// //             ) {
// //               onPlayingChange(
// //                 playing
// //               );
// //             }
// //           }
// //         );

// //       return () => {
// //         subscription?.remove();
// //       };
// //     }, [
// //       player,
// //       onPlayingChange,
// //     ]);

// //     return (
// //       <VideoView
// //         player={player}
// //         style={[
// //           styles.video,
// //           {
// //             height: reelHeight,
// //           },
// //         ]}
// //         contentFit="cover"
// //         nativeControls={false}
// //         fullscreenOptions={{
// //           enable: false,
// //         }}
// //         allowsPictureInPicture={false}
// //       />
// //     );
// //   }
// // );

// // // ======================================================
// // // REEL ITEM
// // // ======================================================

// // const ReelItem = ({
// //   reel,
// //   isActive,
// //   reelHeight,
// // }) => {
// //   const dispatch = useDispatch();

// //   const playerRef =
// //     useRef(null);

// //   // ==================================================
// //   // LIKES SHEET
// //   // ==================================================

// //   const [
// //     likesVisible,
// //     setLikesVisible,
// //   ] = useState(false);

// //   // ==================================================
// //   // COMMENTS SHEET
// //   // ==================================================

// //   const [
// //     commentsVisible,
// //     setCommentsVisible,
// //   ] = useState(false);

// //   // ==================================================
// //   // PLAYING
// //   // ==================================================

// //   const [
// //     isPlaying,
// //     setIsPlaying,
// //   ] = useState(false);

// //   // ==================================================
// //   // PROGRESS
// //   // ==================================================

// //   const [
// //     progress,
// //     setProgress,
// //   ] = useState(0);

// //   // ==================================================
// //   // LIKE LOADING
// //   // ==================================================

// //   const [
// //     liking,
// //     setLiking,
// //   ] = useState(false);

// //   // ==================================================
// //   // REEL ID
// //   // ==================================================

// //   const reelId = reel?.id;

// //   // ==================================================
// //   // REDUX LIKE DATA
// //   // ==================================================

// //   const reelLike =
// //     useSelector(
// //       (state) =>
// //         reelId
// //           ? state.likes?.likes?.[
// //               `reel_${reelId}`
// //             ]
// //           : null
// //     );

// //   // ==================================================
// //   // LIKE STATE
// //   // ==================================================

// //   const isLiked =
// //     reelLike?.isLiked ??
// //     Boolean(
// //       reel?.is_liked
// //     );

// //   const likesCount =
// //     reelLike?.count ??
// //     reel?.likes_count ??
// //     0;

// //   // ==================================================
// //   // MEDIA
// //   // ==================================================

// //   const videoUrl =
// //     getMediaUrl(
// //       reel?.video_url
// //     );

// //   const thumbnailUrl =
// //     getMediaUrl(
// //       reel?.thumbnail_url
// //     );

// //   // ==================================================
// //   // AUTHOR
// //   // ==================================================

// //   const author =
// //     reel?.author ||
// //     reel?.user ||
// //     reel?.owner ||
// //     null;

// //   const authorUsername =
// //     author?.username ||
// //     reel?.username ||
// //     reel?.author_username ||
// //     `User ${reel?.user_id || ""}`;

// //   const authorAvatar =
// //     author?.avatar ||
// //     author?.avatar_url ||
// //     author?.profile_avatar ||
// //     reel?.avatar ||
// //     reel?.avatar_url ||
// //     reel?.author_avatar ||
// //     null;

// //   const authorAvatarUrl =
// //     getMediaUrl(
// //       authorAvatar
// //     );

// //   // ==================================================
// //   // ACTIVE CHANGE
// //   // ==================================================

// //   useEffect(() => {
// //     if (isActive) {
// //       console.log(
// //         "▶️ ACTIVE REEL =>",
// //         reelId
// //       );

// //       setProgress(0);
// //     } else {
// //       console.log(
// //         "🛑 INACTIVE REEL =>",
// //         reelId
// //       );

// //       setIsPlaying(false);
// //       setProgress(0);

// //       // Close sheets when moving to another reel.
// //       setLikesVisible(false);
// //       setCommentsVisible(false);
// //     }
// //   }, [
// //     isActive,
// //     reelId,
// //   ]);

// //   // ==================================================
// //   // VIDEO PRESS
// //   // ==================================================

// //   const handleVideoPress =
// //     () => {
// //       if (!isActive) {
// //         return;
// //       }

// //       if (!playerRef.current) {
// //         console.log(
// //           "❌ PLAYER REF NOT READY"
// //         );

// //         return;
// //       }

// //       playerRef.current.toggle();
// //     };

// //   // ==================================================
// //   // LIKE / UNLIKE REEL
// //   // ==================================================

// //   const handleLike =
// //     async () => {
// //       if (!reelId) {
// //         console.log(
// //           "❌ REEL ID MISSING FOR LIKE"
// //         );

// //         return;
// //       }

// //       if (liking) {
// //         return;
// //       }

// //       try {
// //         setLiking(true);

// //         console.log(
// //           "================================"
// //         );

// //         console.log(
// //           isLiked
// //             ? "💔 UNLIKE REEL"
// //             : "❤️ LIKE REEL"
// //         );

// //         console.log(
// //           "TARGET TYPE => reel"
// //         );

// //         console.log(
// //           "TARGET ID =>",
// //           reelId
// //         );

// //         console.log(
// //           "================================"
// //         );

// //         // ==================================================
// //         // UNLIKE
// //         // ==================================================

// //         if (isLiked) {
// //           const result =
// //             await dispatch(
// //               unlikeTarget({
// //                 targetType:
// //                   "reel",
// //                 targetId:
// //                   Number(reelId),
// //               })
// //             ).unwrap();

// //           console.log(
// //             "✅ REEL UNLIKED =>",
// //             result
// //           );

// //           return;
// //         }

// //         // ==================================================
// //         // LIKE
// //         // ==================================================

// //         const result =
// //           await dispatch(
// //             likeTarget({
// //               targetType:
// //                 "reel",
// //               targetId:
// //                 Number(reelId),
// //             })
// //           ).unwrap();

// //         console.log(
// //           "✅ REEL LIKED =>",
// //           result
// //         );
// //       } catch (error) {
// //         console.log(
// //           "❌ REEL LIKE ERROR =>",
// //           error
// //         );
// //       } finally {
// //         setLiking(false);
// //       }
// //     };

// //   // ==================================================
// //   // OPEN LIKES SHEET
// //   // ==================================================

// //   const handleOpenLikes =
// //     () => {
// //       if (!reelId) {
// //         console.log(
// //           "❌ REEL ID MISSING FOR LIKES SHEET"
// //         );

// //         return;
// //       }

// //       console.log(
// //         "================================"
// //       );

// //       console.log(
// //         "❤️ OPEN REEL LIKES SHEET"
// //       );

// //       console.log(
// //         "REEL ID =>",
// //         reelId
// //       );

// //       console.log(
// //         "LIKE COUNT =>",
// //         likesCount
// //       );

// //       console.log(
// //         "================================"
// //       );

// //       setLikesVisible(true);
// //     };

// //   // ==================================================
// //   // CLOSE LIKES SHEET
// //   // ==================================================

// //   const handleCloseLikes =
// //     () => {
// //       console.log(
// //         "❌ CLOSE REEL LIKES SHEET =>",
// //         reelId
// //       );

// //       setLikesVisible(false);
// //     };

// //   // ==================================================
// //   // OPEN COMMENTS
// //   // ==================================================

// //   const handleOpenComments =
// //     () => {
// //       if (!reelId) {
// //         console.log(
// //           "❌ REEL ID MISSING FOR COMMENTS"
// //         );

// //         return;
// //       }

// //       console.log(
// //         "================================"
// //       );

// //       console.log(
// //         "💬 OPEN REEL COMMENTS"
// //       );

// //       console.log(
// //         "REEL ID =>",
// //         reelId
// //       );

// //       console.log(
// //         "================================"
// //       );

// //       setCommentsVisible(true);
// //     };

// //   // ==================================================
// //   // CLOSE COMMENTS
// //   // ==================================================

// //   const handleCloseComments =
// //     () => {
// //       console.log(
// //         "❌ CLOSE REEL COMMENTS =>",
// //         reelId
// //       );

// //       setCommentsVisible(false);
// //     };

// //   // ==================================================
// //   // RENDER
// //   // ==================================================

// //   return (
// //     <View
// //       style={[
// //         styles.container,
// //         {
// //           height:
// //             reelHeight,
// //         },
// //       ]}
// //     >
// //       {/* ==================================================
// //           VIDEO
// //       ================================================== */}

// //       <View
// //         style={[
// //           styles.videoContainer,
// //           {
// //             height:
// //               reelHeight,
// //           },
// //         ]}
// //       >
// //         {/* THUMBNAIL */}

// //         {thumbnailUrl ? (
// //           <Image
// //             source={{
// //               uri: thumbnailUrl,
// //             }}
// //             style={[
// //               styles.video,
// //               {
// //                 height:
// //                   reelHeight,
// //               },
// //             ]}
// //             resizeMode="cover"
// //           />
// //         ) : null}

// //         {/* ACTIVE VIDEO */}

// //         {isActive &&
// //         videoUrl ? (
// //           <Pressable
// //             style={
// //               styles.videoPressable
// //             }
// //             onPress={
// //               handleVideoPress
// //             }
// //           >
// //             <ActiveReelVideo
// //               ref={playerRef}
// //               videoUrl={
// //                 videoUrl
// //               }
// //               reelHeight={
// //                 reelHeight
// //               }
// //               onProgress={
// //                 setProgress
// //               }
// //               onPlayingChange={
// //                 setIsPlaying
// //               }
// //             />

// //             {/* PLAY OVERLAY */}

// //             {!isPlaying ? (
// //               <View
// //                 style={
// //                   styles.playOverlay
// //                 }
// //               >
// //                 <View
// //                   style={
// //                     styles.playCircle
// //                   }
// //                 >
// //                   <Ionicons
// //                     name="play"
// //                     size={34}
// //                     color="#fff"
// //                   />
// //                 </View>
// //               </View>
// //             ) : null}
// //           </Pressable>
// //         ) : null}
// //       </View>

// //       {/* ==================================================
// //           RIGHT ACTIONS
// //       ================================================== */}

// //       <View
// //         style={[
// //           styles.actions,
// //           {
// //             bottom:
// //               reelHeight * 0.18,
// //           },
// //         ]}
// //       >
// //         {/* ==================================================
// //             LIKE
// //         ================================================== */}

// //         <View
// //           style={
// //             styles.likeGroup
// //           }
// //         >
// //           <Pressable
// //             style={
// //               styles.action
// //             }
// //             onPress={
// //               handleLike
// //             }
// //             disabled={
// //               liking
// //             }
// //             hitSlop={10}
// //           >
// //             <Ionicons
// //               name={
// //                 isLiked
// //                   ? "heart"
// //                   : "heart-outline"
// //               }
// //               size={34}
// //               color={
// //                 isLiked
// //                   ? "#ff3040"
// //                   : "#fff"
// //               }
// //             />
// //           </Pressable>

// //           {/* ==================================================
// //               LIKE COUNT

// //               THIS OPENS LIKES SHEET
// //           ================================================== */}

// //           <Pressable
// //             onPress={
// //               handleOpenLikes
// //             }
// //             hitSlop={{
// //               top: 10,
// //               bottom: 10,
// //               left: 15,
// //               right: 15,
// //             }}
// //           >
// //             <Text
// //               style={
// //                 styles.count
// //               }
// //             >
// //               {likesCount}
// //             </Text>
// //           </Pressable>
// //         </View>

// //         {/* ==================================================
// //             COMMENTS
// //         ================================================== */}

// //         <Pressable
// //           style={
// //             styles.action
// //           }
// //           onPress={
// //             handleOpenComments
// //           }
// //           hitSlop={10}
// //         >
// //           <Ionicons
// //             name="chatbubble-outline"
// //             size={32}
// //             color="#fff"
// //           />

// //           <Text
// //             style={
// //               styles.count
// //             }
// //           >
// //             {reel?.comments_count ||
// //               0}
// //           </Text>
// //         </Pressable>

// //         {/* ==================================================
// //             SHARE
// //         ================================================== */}

// //         <Pressable
// //           style={
// //             styles.action
// //           }
// //           onPress={() =>
// //             console.log(
// //               "SHARE REEL =>",
// //               reelId
// //             )
// //           }
// //         >
// //           <Ionicons
// //             name="paper-plane-outline"
// //             size={32}
// //             color="#fff"
// //           />

// //           <Text
// //             style={
// //               styles.count
// //             }
// //           >
// //             Share
// //           </Text>
// //         </Pressable>

// //         {/* ==================================================
// //             SAVE
// //         ================================================== */}

// //         <View
// //           style={
// //             styles.action
// //           }
// //         >
// //           <ReelSaveButton
// //             reelId={
// //               reelId
// //             }
// //             isSaved={
// //               reel?.is_saved
// //             }
// //           />

// //           <Text
// //             style={
// //               styles.count
// //             }
// //           >
// //             Save
// //           </Text>
// //         </View>

// //         {/* ==================================================
// //             MORE
// //         ================================================== */}

// //         <Pressable
// //           style={
// //             styles.more
// //           }
// //           onPress={() =>
// //             console.log(
// //               "MORE =>",
// //               reelId
// //             )
// //           }
// //           hitSlop={10}
// //         >
// //           <Ionicons
// //             name="ellipsis-horizontal"
// //             size={30}
// //             color="#fff"
// //           />
// //         </Pressable>
// //       </View>

// //       {/* ==================================================
// //           AUTHOR INFO
// //       ================================================== */}

// //       <View
// //         style={[
// //           styles.bottomInfo,
// //           {
// //             bottom:
// //               reelHeight *
// //               0.055,
// //           },
// //         ]}
// //       >
// //         <View
// //           style={
// //             styles.userRow
// //           }
// //         >
// //           {/* AVATAR */}

// //           {authorAvatarUrl ? (
// //             <Image
// //               source={{
// //                 uri:
// //                   authorAvatarUrl,
// //               }}
// //               style={
// //                 styles.avatarImage
// //               }
// //             />
// //           ) : (
// //             <View
// //               style={
// //                 styles.avatar
// //               }
// //             >
// //               <Ionicons
// //                 name="person"
// //                 size={22}
// //                 color="#fff"
// //               />
// //             </View>
// //           )}

// //           {/* USERNAME */}

// //           <Text
// //             style={
// //               styles.username
// //             }
// //             numberOfLines={1}
// //           >
// //             {authorUsername}
// //           </Text>

// //           {/* FOLLOW */}

// //           <Pressable
// //             style={
// //               styles.follow
// //             }
// //             onPress={() =>
// //               console.log(
// //                 "FOLLOW =>",
// //                 reel?.user_id
// //               )
// //             }
// //           >
// //             <Text
// //               style={
// //                 styles.followText
// //               }
// //             >
// //               Follow
// //             </Text>
// //           </Pressable>
// //         </View>

// //         {/* CAPTION */}

// //         {reel?.caption ? (
// //           <Text
// //             style={
// //               styles.caption
// //             }
// //             numberOfLines={2}
// //           >
// //             {reel.caption}
// //           </Text>
// //         ) : null}

// //         {/* AUDIO */}

// //         <View
// //           style={
// //             styles.audio
// //           }
// //         >
// //           <Ionicons
// //             name="musical-notes"
// //             size={14}
// //             color="#fff"
// //           />

// //           <Text
// //             style={
// //               styles.audioText
// //             }
// //           >
// //             Original audio
// //           </Text>
// //         </View>
// //       </View>

// //       {/* ==================================================
// //           PROGRESS
// //       ================================================== */}

// //       {isActive ? (
// //         <View
// //           style={
// //             styles.progressTrack
// //           }
// //         >
// //           <View
// //             style={[
// //               styles.progressFill,
// //               {
// //                 width: `${
// //                   progress * 100
// //                 }%`,
// //               },
// //             ]}
// //           />
// //         </View>
// //       ) : null}

// //       {/* ==================================================
// //           COMMENTS SHEET
// //       ================================================== */}

// //       <CommentsSheet
// //         visible={
// //           commentsVisible
// //         }
// //         reelId={
// //           reelId
// //         }
// //         onClose={
// //           handleCloseComments
// //         }
// //       />

// //       {/* ==================================================
// //           LIKES SHEET
// //       ================================================== */}

// //       <LikesSheet
// //         visible={
// //           likesVisible
// //         }
// //         reelId={
// //           reelId
// //         }
// //         onClose={
// //           handleCloseLikes
// //         }
// //       />
// //     </View>
// //   );
// // };

// // export default ReelItem;

// // // ======================================================
// // // STYLES
// // // ======================================================

// // const styles =
// //   StyleSheet.create({
// //     container: {
// //       width:
// //         SCREEN_WIDTH,
// //       backgroundColor:
// //         "#000",
// //       position:
// //         "relative",
// //       overflow:
// //         "hidden",
// //     },

// //     videoContainer: {
// //       width:
// //         SCREEN_WIDTH,
// //       backgroundColor:
// //         "#000",
// //       justifyContent:
// //         "center",
// //       alignItems:
// //         "center",
// //       overflow:
// //         "hidden",
// //     },

// //     video: {
// //       position:
// //         "absolute",
// //       width:
// //         SCREEN_WIDTH,
// //     },

// //     videoPressable: {
// //       position:
// //         "absolute",
// //       top: 0,
// //       left: 0,
// //       right: 0,
// //       bottom: 0,
// //       justifyContent:
// //         "center",
// //       alignItems:
// //         "center",
// //     },

// //     playOverlay: {
// //       position:
// //         "absolute",
// //       top: 0,
// //       left: 0,
// //       right: 0,
// //       bottom: 0,
// //       justifyContent:
// //         "center",
// //       alignItems:
// //         "center",
// //       backgroundColor:
// //         "rgba(0,0,0,0.12)",
// //     },

// //     playCircle: {
// //       width: 68,
// //       height: 68,
// //       borderRadius: 34,
// //       backgroundColor:
// //         "rgba(0,0,0,0.55)",
// //       justifyContent:
// //         "center",
// //       alignItems:
// //         "center",
// //       paddingLeft: 4,
// //     },

// //     actions: {
// //       position:
// //         "absolute",
// //       right: 12,
// //       alignItems:
// //         "center",
// //       zIndex: 20,
// //     },

// //     likeGroup: {
// //       alignItems:
// //         "center",
// //       marginBottom:
// //         22,
// //     },

// //     action: {
// //       alignItems:
// //         "center",
// //       justifyContent:
// //         "center",
// //       marginBottom:
// //         4,
// //     },

// //     count: {
// //       color:
// //         "#fff",
// //       fontSize:
// //         11,
// //       fontWeight:
// //         "600",
// //       marginTop:
// //         4,
// //       textShadowColor:
// //         "#000",
// //       textShadowOffset: {
// //         width: 0,
// //         height: 1,
// //       },
// //       textShadowRadius:
// //         3,
// //     },

// //     more: {
// //       marginTop: 2,
// //     },

// //     bottomInfo: {
// //       position:
// //         "absolute",
// //       left: 14,
// //       right: 75,
// //       zIndex: 20,
// //     },

// //     userRow: {
// //       flexDirection:
// //         "row",
// //       alignItems:
// //         "center",
// //       marginBottom:
// //         10,
// //     },

// //     avatar: {
// //       width: 40,
// //       height: 40,
// //       borderRadius: 20,
// //       backgroundColor:
// //         "#333",
// //       borderWidth: 1,
// //       borderColor:
// //         "#fff",
// //       justifyContent:
// //         "center",
// //       alignItems:
// //         "center",
// //       marginRight: 9,
// //     },

// //     avatarImage: {
// //       width: 40,
// //       height: 40,
// //       borderRadius: 20,
// //       borderWidth: 1,
// //       borderColor:
// //         "#fff",
// //       marginRight: 9,
// //     },

// //     username: {
// //       flexShrink: 1,
// //       color:
// //         "#fff",
// //       fontSize:
// //         15,
// //       fontWeight:
// //         "700",
// //       marginRight:
// //         10,
// //     },

// //     follow: {
// //       borderWidth: 1,
// //       borderColor:
// //         "#fff",
// //       borderRadius: 6,
// //       paddingHorizontal:
// //         11,
// //       paddingVertical:
// //         5,
// //     },

// //     followText: {
// //       color:
// //         "#fff",
// //       fontSize:
// //         12,
// //       fontWeight:
// //         "600",
// //     },

// //     caption: {
// //       color:
// //         "#fff",
// //       fontSize:
// //         14,
// //       lineHeight:
// //         19,
// //       marginBottom:
// //         6,
// //     },

// //     audio: {
// //       flexDirection:
// //         "row",
// //       alignItems:
// //         "center",
// //     },

// //     audioText: {
// //       color:
// //         "#fff",
// //       fontSize:
// //         12,
// //       marginLeft:
// //         5,
// //     },

// //     progressTrack: {
// //       position:
// //         "absolute",
// //       left: 0,
// //       right: 0,
// //       bottom: 0,
// //       height: 3,
// //       backgroundColor:
// //         "rgba(255,255,255,0.35)",
// //       zIndex: 100,
// //     },

// //     progressFill: {
// //       height: 3,
// //       backgroundColor:
// //         "#fff",
// //       borderRadius: 2,
// //     },
// //   });

// import React, {
//   forwardRef,
//   useCallback,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Image,
//   useWindowDimensions,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   likeTarget,
//   unlikeTarget,
// } from "../../redux/likeSlice";

// import {
//   saveReel,
//   unsaveReel,
// } from "../../redux/savedSlice";

// import {
//   VideoView,
//   useVideoPlayer,
// } from "expo-video";

// import {
//   getMediaUrl,
// } from "../../utils/media";


// // =========================================================
// // ACTIVE REEL VIDEO
// // =========================================================

// const ActiveReelVideo =
//   forwardRef(
//     (
//       {
//         videoUrl,
//         reelId,
//         isActive,
//         onPlayingChange,
//         onProgress,
//       },
//       ref
//     ) => {
//       const player =
//         useVideoPlayer(
//           videoUrl,
//           (player) => {
//             player.loop = true;
//             player.muted = false;
//           }
//         );

//       const playerRef =
//         useRef(player);

//       // ===================================================
//       // IMPERATIVE CONTROLS
//       // ===================================================

//       useImperativeHandle(
//         ref,
//         () => ({
//           play: () => {
//             try {
//               playerRef.current?.play();
//             } catch (error) {
//               console.log(
//                 "PLAY ERROR =>",
//                 error
//               );
//             }
//           },

//           pause: () => {
//             try {
//               playerRef.current?.pause();
//             } catch (error) {
//               console.log(
//                 "PAUSE ERROR =>",
//                 error
//               );
//             }
//           },

//           toggle: () => {
//             try {
//               if (
//                 playerRef.current
//                   ?.playing
//               ) {
//                 playerRef.current.pause();
//               } else {
//                 playerRef.current.play();
//               }
//             } catch (error) {
//               console.log(
//                 "TOGGLE ERROR =>",
//                 error
//               );
//             }
//           },

//           isPlaying: () => {
//             return Boolean(
//               playerRef.current
//                 ?.playing
//             );
//           },
//         }),
//         []
//       );

//       // ===================================================
//       // AUTO PLAY / PAUSE
//       // ===================================================

//       useEffect(() => {
//         const currentPlayer =
//           playerRef.current;

//         if (!currentPlayer) {
//           return;
//         }

//         if (!isActive) {
//           try {
//             currentPlayer.pause();
//           } catch (error) {
//             console.log(
//               "INACTIVE PAUSE ERROR =>",
//               error
//             );
//           }

//           onPlayingChange?.(
//             false
//           );

//           return;
//         }

//         try {
//           currentPlayer.play();

//           onPlayingChange?.(
//             true
//           );

//           console.log(
//             "▶️ AUTO PLAY REEL =>",
//             reelId
//           );
//         } catch (error) {
//           console.log(
//             "AUTO PLAY ERROR =>",
//             error
//           );
//         }
//       }, [
//         isActive,
//         reelId,
//         onPlayingChange,
//       ]);

//       // ===================================================
//       // PLAYING CHANGE
//       // ===================================================

//       useEffect(() => {
//         const currentPlayer =
//           playerRef.current;

//         if (!currentPlayer) {
//           return;
//         }

//         const subscription =
//           currentPlayer.addListener(
//             "playingChange",
//             (event) => {
//               onPlayingChange?.(
//                 Boolean(
//                   event?.isPlaying
//                 )
//               );
//             }
//           );

//         return () => {
//           subscription?.remove?.();
//         };
//       }, [
//         onPlayingChange,
//       ]);

//       // ===================================================
//       // TIME UPDATE
//       // ===================================================

//       useEffect(() => {
//         const currentPlayer =
//           playerRef.current;

//         if (!currentPlayer) {
//           return;
//         }

//         const subscription =
//           currentPlayer.addListener(
//             "timeUpdate",
//             (event) => {
//               const currentTime =
//                 Number(
//                   event?.currentTime ||
//                     0
//                 );

//               const duration =
//                 Number(
//                   event?.duration ||
//                     0
//                 );

//               let progress = 0;

//               if (
//                 duration > 0
//               ) {
//                 progress =
//                   currentTime /
//                   duration;
//               }

//               onProgress?.(
//                 Math.max(
//                   0,
//                   Math.min(
//                     1,
//                     progress
//                   )
//                 )
//               );
//             }
//           );

//         return () => {
//           subscription?.remove?.();
//         };
//       }, [
//         onProgress,
//       ]);

//       // ===================================================
//       // NO VIDEO
//       // ===================================================

//       if (!videoUrl) {
//         return (
//           <View
//             style={
//               styles.videoPlaceholder
//             }
//           >
//             <Ionicons
//               name="videocam-off-outline"
//               size={40}
//               color="#777"
//             />
//           </View>
//         );
//       }

//       // ===================================================
//       // VIDEO
//       // ===================================================

//       return (
//         <VideoView
//           player={
//             playerRef.current
//           }
//           style={
//             StyleSheet.absoluteFillObject
//           }
//           contentFit="cover"
//           nativeControls={false}
//           allowsFullscreen={false}
//           allowsPictureInPicture={false}
//         />
//       );
//     }
//   );


// // =========================================================
// // REEL ITEM
// // =========================================================

// export default function ReelItem({
//   reel,
//   isActive,
//   reelHeight,
// }) {
//   const dispatch =
//     useDispatch();

//   const {
//     width: screenWidth,
//   } = useWindowDimensions();

//   // =======================================================
//   // CURRENT USER
//   // =======================================================

//   const currentUserId =
//     useSelector(
//       (state) =>
//         state.auth?.user?.id
//     );

//   // =======================================================
//   // REEL DATA
//   // =======================================================

//   const reelId =
//     reel?.id;

//   const reelLike =
//     useSelector(
//       (state) =>
//         state.likes?.likes?.[
//           `reel_${reelId}`
//         ]
//     );

//   const isLiked =
//     Boolean(
//       reel?.is_liked ??
//         reelLike?.is_liked ??
//         reelLike?.isLiked ??
//         false
//     );

//   const likesCount =
//     Number(
//       reel?.likes_count ??
//         reelLike?.likes_count ??
//         reelLike?.count ??
//         0
//     );

//   const videoUrl =
//     getMediaUrl(
//       reel?.video_url
//     );

//   const thumbnailUrl =
//     getMediaUrl(
//       reel?.thumbnail_url
//     );

//   // =======================================================
//   // AUTHOR
//   // =======================================================

//   const author =
//     reel?.author ||
//     reel?.user ||
//     reel?.owner ||
//     {};

//   const reelUserId =
//     reel?.user_id ??
//     author?.id ??
//     author?.user_id;

//   const username =
//     author?.username ||
//     reel?.username ||
//     "Unknown";

//   const avatarUrl =
//     getMediaUrl(
//       author?.avatar_url ||
//         author?.avatar ||
//         reel?.avatar_url
//     );

//   // =======================================================
//   // OWN REEL
//   // =======================================================

//   const isOwnReel =
//     currentUserId != null &&
//     reelUserId != null &&
//     String(
//       currentUserId
//     ) ===
//       String(
//         reelUserId
//       );

//   // =======================================================
//   // STATES
//   // =======================================================

//   const [
//     isPlaying,
//     setIsPlaying,
//   ] = useState(false);

//   const [
//     progress,
//     setProgress,
//   ] = useState(0);

//   const [
//     saved,
//     setSaved,
//   ] = useState(
//     Boolean(
//       reel?.is_saved
//     )
//   );

//   const [
//     saving,
//     setSaving,
//   ] = useState(false);

//   const playerRef =
//     useRef(null);

//   // =======================================================
//   // ACTIVE CHANGE
//   // =======================================================

//   useEffect(() => {
//     if (!isActive) {
//       setIsPlaying(false);
//       setProgress(0);
//     }
//   }, [
//     isActive,
//   ]);

//   // =======================================================
//   // SAVED SYNC
//   // =======================================================

//   useEffect(() => {
//     setSaved(
//       Boolean(
//         reel?.is_saved
//       )
//     );
//   }, [
//     reel?.is_saved,
//   ]);

//   // =======================================================
//   // PLAYING
//   // =======================================================

//   const handlePlayingChange =
//     useCallback(
//       (playing) => {
//         setIsPlaying(
//           Boolean(playing)
//         );
//       },
//       []
//     );

//   // =======================================================
//   // PROGRESS
//   // =======================================================

//   const handleProgress =
//     useCallback(
//       (value) => {
//         setProgress(
//           value
//         );
//       },
//       []
//     );

//   // =======================================================
//   // VIDEO PRESS
//   // =======================================================

//   const handleVideoPress =
//     useCallback(() => {
//       if (!isActive) {
//         return;
//       }

//       const player =
//         playerRef.current;

//       if (!player) {
//         console.log(
//           "PLAYER REF NOT READY"
//         );

//         return;
//       }

//       if (isPlaying) {
//         player.pause();
//       } else {
//         player.play();
//       }
//     }, [
//       isActive,
//       isPlaying,
//     ]);

//   // =======================================================
//   // LIKE
//   // =======================================================

//   const handleLike =
//     useCallback(() => {
//       if (!reelId) {
//         return;
//       }

//       if (isLiked) {
//         dispatch(
//           unlikeTarget({
//             targetType: "reel",
//             targetId: reelId,
//           })
//         );

//         return;
//       }

//       dispatch(
//         likeTarget({
//           targetType: "reel",
//           targetId: reelId,
//         })
//       );
//     }, [
//       dispatch,
//       reelId,
//       isLiked,
//     ]);

//   // =======================================================
//   // SAVE
//   // =======================================================

//   const handleSave =
//     useCallback(
//       async () => {
//         if (
//           !reelId ||
//           saving
//         ) {
//           return;
//         }

//         try {
//           setSaving(true);

//           if (saved) {
//             await dispatch(
//               unsaveReel(
//                 reelId
//               )
//             ).unwrap();

//             setSaved(false);
//           } else {
//             await dispatch(
//               saveReel(
//                 reelId
//               )
//             ).unwrap();

//             setSaved(true);
//           }
//         } catch (error) {
//           console.log(
//             "SAVE / UNSAVE REEL ERROR =>",
//             error
//           );
//         } finally {
//           setSaving(false);
//         }
//       },
//       [
//         dispatch,
//         reelId,
//         saved,
//         saving,
//       ]
//     );

//   // =======================================================
//   // COMMENTS
//   // =======================================================

//   const handleComments =
//     useCallback(() => {
//       console.log(
//         "COMMENTS =>",
//         reelId
//       );
//     }, [
//       reelId,
//     ]);

//   // =======================================================
//   // SHARE
//   // =======================================================

//   const handleShare =
//     useCallback(() => {
//       console.log(
//         "SHARE REEL =>",
//         reelId
//       );
//     }, [
//       reelId,
//     ]);

//   // =======================================================
//   // MORE
//   // =======================================================

//   const handleMore =
//     useCallback(() => {
//       console.log(
//         "MORE REEL =>",
//         reelId
//       );
//     }, [
//       reelId,
//     ]);

//   // =======================================================
//   // RENDER
//   // =======================================================

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           width:
//             screenWidth,

//           height:
//             reelHeight ||
//             screenWidth,

//           minHeight:
//             reelHeight ||
//             screenWidth,

//           maxHeight:
//             reelHeight ||
//             screenWidth,
//         },
//       ]}
//     >

//       {/* =================================================
//           FULL SCREEN VIDEO
//       ================================================= */}

//       <View
//         style={
//           styles.videoContainer
//         }
//       >

//         {/* THUMBNAIL */}

//         {thumbnailUrl ? (
//           <Image
//             source={{
//               uri: thumbnailUrl,
//             }}
//             style={
//               StyleSheet.absoluteFillObject
//             }
//             resizeMode="cover"
//           />
//         ) : null}

//         {/* ACTIVE VIDEO */}

//         {isActive &&
//         videoUrl ? (
//           <ActiveReelVideo
//             ref={playerRef}
//             videoUrl={videoUrl}
//             reelId={reelId}
//             isActive={isActive}
//             onPlayingChange={
//               handlePlayingChange
//             }
//             onProgress={
//               handleProgress
//             }
//           />
//         ) : null}

//         {/* VIDEO TAP */}

//         {isActive ? (
//           <Pressable
//             style={
//               StyleSheet.absoluteFillObject
//             }
//             onPress={
//               handleVideoPress
//             }
//           >
//             {!isPlaying ? (
//               <View
//                 pointerEvents="none"
//                 style={
//                   styles.playOverlay
//                 }
//               >
//                 <View
//                   style={
//                     styles.playCircle
//                   }
//                 >
//                   <Ionicons
//                     name="play"
//                     size={34}
//                     color="#fff"
//                   />
//                 </View>
//               </View>
//             ) : null}
//           </Pressable>
//         ) : null}

//       </View>


//       {/* =================================================
//           RIGHT ACTIONS
//       ================================================= */}

//       <View
//         style={
//           styles.rightActions
//         }
//       >

//         {/* LIKE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleLike
//           }
//         >
//           <Ionicons
//             name={
//               isLiked
//                 ? "heart"
//                 : "heart-outline"
//             }
//             size={30}
//             color={
//               isLiked
//                 ? "#ff3040"
//                 : "#fff"
//             }
//           />

//           <Text
//             style={
//               styles.actionText
//             }
//           >
//             {likesCount}
//           </Text>
//         </Pressable>


//         {/* COMMENTS */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleComments
//           }
//         >
//           <Ionicons
//             name="chatbubble-outline"
//             size={29}
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.actionText
//             }
//           >
//             {reel?.comments_count ??
//               0}
//           </Text>
//         </Pressable>


//         {/* SHARE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleShare
//           }
//         >
//           <Ionicons
//             name="paper-plane-outline"
//             size={29}
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.actionText
//             }
//           >
//             {reel?.share_count ??
//               0}
//           </Text>
//         </Pressable>


//         {/* SAVE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleSave
//           }
//           disabled={
//             saving
//           }
//         >
//           <Ionicons
//             name={
//               saved
//                 ? "bookmark"
//                 : "bookmark-outline"
//             }
//             size={30}
//             color="#fff"
//           />
//         </Pressable>


//         {/* MORE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleMore
//           }
//         >
//           <Ionicons
//             name="ellipsis-horizontal"
//             size={30}
//             color="#fff"
//           />
//         </Pressable>

//       </View>


//       {/* =================================================
//           BOTTOM CONTENT
//       ================================================= */}

//       <View
//         style={
//           styles.bottomContent
//         }
//       >

//         {/* USER */}

//         <View
//           style={
//             styles.userRow
//           }
//         >

//           {avatarUrl ? (
//             <Image
//               source={{
//                 uri: avatarUrl,
//               }}
//               style={
//                 styles.avatar
//               }
//             />
//           ) : (
//             <View
//               style={
//                 styles.avatarPlaceholder
//               }
//             >
//               <Ionicons
//                 name="person"
//                 size={20}
//                 color="#aaa"
//               />
//             </View>
//           )}

//           <Text
//             style={
//               styles.username
//             }
//             numberOfLines={1}
//           >
//             {username}
//           </Text>

//           {!isOwnReel ? (
//             <Pressable
//               style={
//                 styles.follow
//               }
//               onPress={() =>
//                 console.log(
//                   "FOLLOW =>",
//                   reelUserId
//                 )
//               }
//             >
//               <Text
//                 style={
//                   styles.followText
//                 }
//               >
//                 Follow
//               </Text>
//             </Pressable>
//           ) : null}

//         </View>


//         {/* CAPTION */}

//         {reel?.caption ? (
//           <Text
//             style={
//               styles.caption
//             }
//             numberOfLines={3}
//           >
//             {reel.caption}
//           </Text>
//         ) : null}


//         {/* MUSIC */}

//         {reel?.music ? (
//           <View
//             style={
//               styles.musicRow
//             }
//           >
//             <Ionicons
//               name="musical-notes"
//               size={16}
//               color="#fff"
//             />

//             <Text
//               style={
//                 styles.musicText
//               }
//               numberOfLines={1}
//             >
//               {reel.music?.title ||
//                 "Original audio"}
//             </Text>
//           </View>
//         ) : null}

//       </View>


//       {/* =================================================
//           PROGRESS BAR
//       ================================================= */}

//       <View
//         pointerEvents="none"
//         style={
//           styles.progressContainer
//         }
//       >
//         <View
//           style={[
//             styles.progress,
//             {
//               width:
//                 `${progress * 100}%`,
//             },
//           ]}
//         />
//       </View>

//     </View>
//   );
// }


// // =========================================================
// // STYLES
// // =========================================================

// const styles =
//   StyleSheet.create({

//     // =====================================================
//     // ROOT
//     // =====================================================

//     container: {
//       backgroundColor: "#000",
//       position: "relative",
//       overflow: "hidden",
//       margin: 0,
//       padding: 0,
//     },


//     // =====================================================
//     // VIDEO
//     // =====================================================

//     videoContainer: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: "#000",
//       overflow: "hidden",
//     },

//     videoPlaceholder: {
//       ...StyleSheet.absoluteFillObject,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#000",
//     },


//     // =====================================================
//     // PLAY
//     // =====================================================

//     playOverlay: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     playCircle: {
//       width: 68,
//       height: 68,
//       borderRadius: 34,
//       backgroundColor:
//         "rgba(0,0,0,0.55)",
//       alignItems: "center",
//       justifyContent: "center",
//       paddingLeft: 4,
//     },


//     // =====================================================
//     // RIGHT ACTIONS
//     // =====================================================

//     rightActions: {
//       position: "absolute",
//       right: 12,
//       bottom: 88,
//       alignItems: "center",
//       zIndex: 20,
//     },

//     actionButton: {
//       alignItems: "center",
//       justifyContent: "center",
//       marginBottom: 20,
//     },

//     actionText: {
//       color: "#fff",
//       fontSize: 12,
//       marginTop: 4,
//       fontWeight: "600",
//     },


//     // =====================================================
//     // BOTTOM CONTENT
//     // =====================================================

//     bottomContent: {
//       position: "absolute",
//       left: 14,
//       right: 78,
//       bottom: 26,
//       zIndex: 20,
//     },

//     userRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 9,
//     },

//     avatar: {
//       width: 38,
//       height: 38,
//       borderRadius: 19,
//       marginRight: 9,
//     },

//     avatarPlaceholder: {
//       width: 38,
//       height: 38,
//       borderRadius: 19,
//       backgroundColor: "#222",
//       alignItems: "center",
//       justifyContent: "center",
//       marginRight: 9,
//     },

//     username: {
//       color: "#fff",
//       fontSize: 15,
//       fontWeight: "700",
//       maxWidth: 130,
//     },

//     follow: {
//       marginLeft: 10,
//       paddingHorizontal: 10,
//       paddingVertical: 5,
//       borderWidth: 1,
//       borderColor: "#fff",
//       borderRadius: 5,
//     },

//     followText: {
//       color: "#fff",
//       fontSize: 12,
//       fontWeight: "600",
//     },

//     caption: {
//       color: "#fff",
//       fontSize: 14,
//       lineHeight: 19,
//       marginBottom: 8,
//     },

//     musicRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       maxWidth: "90%",
//     },

//     musicText: {
//       color: "#fff",
//       fontSize: 13,
//       marginLeft: 6,
//     },


//     // =====================================================
//     // PROGRESS
//     // =====================================================

//     progressContainer: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       bottom: 0,
//       height: 2,
//       backgroundColor:
//         "rgba(255,255,255,0.25)",
//       zIndex: 50,
//     },

//     progress: {
//       height: "100%",
//       backgroundColor: "#fff",
//     },

//   });


// import React, {
//   forwardRef,
//   useCallback,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Image,
//   useWindowDimensions,
// } from "react-native";

// import {
//   Ionicons,
// } from "@expo/vector-icons";

// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import {
//   likeTarget,
//   unlikeTarget,
// } from "../../redux/likeSlice";

// import {
//   saveReel,
//   unsaveReel,
// } from "../../redux/savedSlice";

// import {
//   VideoView,
//   useVideoPlayer,
// } from "expo-video";

// import {
//   getMediaUrl,
// } from "../../utils/media";


// // =========================================================
// // ACTIVE REEL VIDEO
// // =========================================================

// const ActiveReelVideo =
//   forwardRef(
//     (
//       {
//         videoUrl,
//         reelId,
//         isActive,
//         onPlayingChange,
//         onProgress,
//       },
//       ref
//     ) => {
//       const player =
//         useVideoPlayer(
//           videoUrl,
//           (player) => {
//             player.loop = true;
//             player.muted = false;
//           }
//         );

//       const playerRef =
//         useRef(player);

//       // ===================================================
//       // IMPERATIVE CONTROLS
//       // ===================================================

//       useImperativeHandle(
//         ref,
//         () => ({
//           play: () => {
//             try {
//               playerRef.current?.play();
//             } catch (error) {
//               console.log(
//                 "PLAY ERROR =>",
//                 error
//               );
//             }
//           },

//           pause: () => {
//             try {
//               playerRef.current?.pause();
//             } catch (error) {
//               console.log(
//                 "PAUSE ERROR =>",
//                 error
//               );
//             }
//           },

//           toggle: () => {
//             try {
//               if (
//                 playerRef.current
//                   ?.playing
//               ) {
//                 playerRef.current.pause();
//               } else {
//                 playerRef.current.play();
//               }
//             } catch (error) {
//               console.log(
//                 "TOGGLE ERROR =>",
//                 error
//               );
//             }
//           },

//           isPlaying: () => {
//             return Boolean(
//               playerRef.current
//                 ?.playing
//             );
//           },
//         }),
//         []
//       );

//       // ===================================================
//       // AUTO PLAY / PAUSE
//       // ===================================================

//       useEffect(() => {
//         const currentPlayer =
//           playerRef.current;

//         if (!currentPlayer) {
//           return;
//         }

//         if (!isActive) {
//           try {
//             currentPlayer.pause();
//           } catch (error) {
//             console.log(
//               "INACTIVE PAUSE ERROR =>",
//               error
//             );
//           }

//           onPlayingChange?.(
//             false
//           );

//           return;
//         }

//         try {
//           currentPlayer.play();

//           onPlayingChange?.(
//             true
//           );

//           console.log(
//             "▶️ AUTO PLAY REEL =>",
//             reelId
//           );
//         } catch (error) {
//           console.log(
//             "AUTO PLAY ERROR =>",
//             error
//           );
//         }
//       }, [
//         isActive,
//         reelId,
//         onPlayingChange,
//       ]);

//       // ===================================================
//       // PLAYING CHANGE
//       // ===================================================

//       useEffect(() => {
//         const currentPlayer =
//           playerRef.current;

//         if (!currentPlayer) {
//           return;
//         }

//         const subscription =
//           currentPlayer.addListener(
//             "playingChange",
//             (event) => {
//               onPlayingChange?.(
//                 Boolean(
//                   event?.isPlaying
//                 )
//               );
//             }
//           );

//         return () => {
//           subscription?.remove?.();
//         };
//       }, [
//         onPlayingChange,
//       ]);

//       // ===================================================
//       // TIME UPDATE
//       // ===================================================

//       useEffect(() => {
//         const currentPlayer =
//           playerRef.current;

//         if (!currentPlayer) {
//           return;
//         }

//         const subscription =
//           currentPlayer.addListener(
//             "timeUpdate",
//             (event) => {
//               const currentTime =
//                 Number(
//                   event?.currentTime ||
//                     0
//                 );

//               const duration =
//                 Number(
//                   event?.duration ||
//                     0
//                 );

//               let progress = 0;

//               if (
//                 duration > 0
//               ) {
//                 progress =
//                   currentTime /
//                   duration;
//               }

//               onProgress?.(
//                 Math.max(
//                   0,
//                   Math.min(
//                     1,
//                     progress
//                   )
//                 )
//               );
//             }
//           );

//         return () => {
//           subscription?.remove?.();
//         };
//       }, [
//         onProgress,
//       ]);

//       // ===================================================
//       // NO VIDEO
//       // ===================================================

//       if (!videoUrl) {
//         return (
//           <View
//             style={
//               styles.videoPlaceholder
//             }
//           >
//             <Ionicons
//               name="videocam-off-outline"
//               size={40}
//               color="#777"
//             />
//           </View>
//         );
//       }

//       // ===================================================
//       // VIDEO
//       // ===================================================

//       return (
//         <VideoView
//           player={
//             playerRef.current
//           }
//           style={
//             StyleSheet.absoluteFillObject
//           }
//           contentFit="cover"
//           nativeControls={false}
//           allowsFullscreen={false}
//           allowsPictureInPicture={false}
//           // Android defaults to a native SurfaceView, which lives in
//           // its own compositing window and can render on top of
//           // sibling overlays (avatar/username row, action icons) no
//           // matter what zIndex or JSX order you give them. TextureView
//           // is a normal view that composites correctly with overlapping
//           // UI, at a small performance cost.
//           surfaceType="textureView"
//         />
//       );
//     }
//   );


// // =========================================================
// // REEL ITEM
// // =========================================================

// export default function ReelItem({
//   reel,
//   isActive,
//   reelHeight,
// }) {
//   const dispatch =
//     useDispatch();

//   const {
//     width: screenWidth,
//   } = useWindowDimensions();

//   // =======================================================
//   // CURRENT USER
//   // =======================================================

//   const currentUserId =
//     useSelector(
//       (state) =>
//         state.auth?.user?.id
//     );

//   // =======================================================
//   // REEL DATA
//   // =======================================================

//   const reelId =
//     reel?.id;

//   const reelLike =
//     useSelector(
//       (state) =>
//         state.likes?.likes?.[
//           `reel_${reelId}`
//         ]
//     );

//   const isLiked =
//     Boolean(
//       reel?.is_liked ??
//         reelLike?.is_liked ??
//         reelLike?.isLiked ??
//         false
//     );

//   const likesCount =
//     Number(
//       reel?.likes_count ??
//         reelLike?.likes_count ??
//         reelLike?.count ??
//         0
//     );

//   const videoUrl =
//     getMediaUrl(
//       reel?.video_url
//     );

//   const thumbnailUrl =
//     getMediaUrl(
//       reel?.thumbnail_url
//     );

//   // =======================================================
//   // AUTHOR
//   // =======================================================

//   const author =
//     reel?.author ||
//     reel?.user ||
//     reel?.owner ||
//     {};

//   const reelUserId =
//     reel?.user_id ??
//     author?.id ??
//     author?.user_id;

//   const username =
//     author?.username ||
//     reel?.username ||
//     "Unknown";

//   const avatarUrl =
//     getMediaUrl(
//       author?.avatar_url ||
//         author?.avatar ||
//         reel?.avatar_url
//     );

//   // =======================================================
//   // OWN REEL
//   // =======================================================

//   const isOwnReel =
//     currentUserId != null &&
//     reelUserId != null &&
//     String(
//       currentUserId
//     ) ===
//       String(
//         reelUserId
//       );

//   // =======================================================
//   // STATES
//   // =======================================================

//   const [
//     isPlaying,
//     setIsPlaying,
//   ] = useState(false);

//   const [
//     progress,
//     setProgress,
//   ] = useState(0);

//   const [
//     saved,
//     setSaved,
//   ] = useState(
//     Boolean(
//       reel?.is_saved
//     )
//   );

//   const [
//     saving,
//     setSaving,
//   ] = useState(false);

//   const playerRef =
//     useRef(null);

//   // =======================================================
//   // ACTIVE CHANGE
//   // =======================================================

//   useEffect(() => {
//     if (!isActive) {
//       setIsPlaying(false);
//       setProgress(0);
//     }
//   }, [
//     isActive,
//   ]);

//   // =======================================================
//   // SAVED SYNC
//   // =======================================================

//   useEffect(() => {
//     setSaved(
//       Boolean(
//         reel?.is_saved
//       )
//     );
//   }, [
//     reel?.is_saved,
//   ]);

//   // =======================================================
//   // PLAYING
//   // =======================================================

//   const handlePlayingChange =
//     useCallback(
//       (playing) => {
//         setIsPlaying(
//           Boolean(playing)
//         );
//       },
//       []
//     );

//   // =======================================================
//   // PROGRESS
//   // =======================================================

//   const handleProgress =
//     useCallback(
//       (value) => {
//         setProgress(
//           value
//         );
//       },
//       []
//     );

//   // =======================================================
//   // VIDEO PRESS
//   // =======================================================

//   const handleVideoPress =
//     useCallback(() => {
//       if (!isActive) {
//         return;
//       }

//       const player =
//         playerRef.current;

//       if (!player) {
//         console.log(
//           "PLAYER REF NOT READY"
//         );

//         return;
//       }

//       if (isPlaying) {
//         player.pause();
//       } else {
//         player.play();
//       }
//     }, [
//       isActive,
//       isPlaying,
//     ]);

//   // =======================================================
//   // LIKE
//   // =======================================================

//   const handleLike =
//     useCallback(() => {
//       if (!reelId) {
//         return;
//       }

//       if (isLiked) {
//         dispatch(
//           unlikeTarget({
//             targetType: "reel",
//             targetId: reelId,
//           })
//         );

//         return;
//       }

//       dispatch(
//         likeTarget({
//           targetType: "reel",
//           targetId: reelId,
//         })
//       );
//     }, [
//       dispatch,
//       reelId,
//       isLiked,
//     ]);

//   // =======================================================
//   // SAVE
//   // =======================================================

//   const handleSave =
//     useCallback(
//       async () => {
//         if (
//           !reelId ||
//           saving
//         ) {
//           return;
//         }

//         try {
//           setSaving(true);

//           if (saved) {
//             await dispatch(
//               unsaveReel(
//                 reelId
//               )
//             ).unwrap();

//             setSaved(false);
//           } else {
//             await dispatch(
//               saveReel(
//                 reelId
//               )
//             ).unwrap();

//             setSaved(true);
//           }
//         } catch (error) {
//           console.log(
//             "SAVE / UNSAVE REEL ERROR =>",
//             error
//           );
//         } finally {
//           setSaving(false);
//         }
//       },
//       [
//         dispatch,
//         reelId,
//         saved,
//         saving,
//       ]
//     );

//   // =======================================================
//   // COMMENTS
//   // =======================================================

//   const handleComments =
//     useCallback(() => {
//       console.log(
//         "COMMENTS =>",
//         reelId
//       );
//     }, [
//       reelId,
//     ]);

//   // =======================================================
//   // SHARE
//   // =======================================================

//   const handleShare =
//     useCallback(() => {
//       console.log(
//         "SHARE REEL =>",
//         reelId
//       );
//     }, [
//       reelId,
//     ]);

//   // =======================================================
//   // MORE
//   // =======================================================

//   const handleMore =
//     useCallback(() => {
//       console.log(
//         "MORE REEL =>",
//         reelId
//       );
//     }, [
//       reelId,
//     ]);

//   // =======================================================
//   // RENDER
//   // =======================================================

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           width:
//             screenWidth,

//           height:
//             reelHeight,
//         },
//       ]}
//     >
//       {/* =================================================
//           FULL SCREEN VIDEO
//       ================================================= */}

//       <View
//         style={
//           styles.videoContainer
//         }
//       >
//         {/* THUMBNAIL */}

//         {thumbnailUrl ? (
//           <Image
//             source={{
//               uri: thumbnailUrl,
//             }}
//             style={
//               StyleSheet.absoluteFillObject
//             }
//             resizeMode="cover"
//           />
//         ) : null}

//         {/* ACTIVE VIDEO */}

//         {isActive &&
//         videoUrl ? (
//           <ActiveReelVideo
//             ref={playerRef}
//             videoUrl={videoUrl}
//             reelId={reelId}
//             isActive={isActive}
//             onPlayingChange={
//               handlePlayingChange
//             }
//             onProgress={
//               handleProgress
//             }
//           />
//         ) : null}

//         {/* VIDEO TAP */}

//         {isActive ? (
//           <Pressable
//             style={
//               StyleSheet.absoluteFillObject
//             }
//             onPress={
//               handleVideoPress
//             }
//           >
//             {!isPlaying ? (
//               <View
//                 pointerEvents="none"
//                 style={
//                   styles.playOverlay
//                 }
//               >
//                 <View
//                   style={
//                     styles.playCircle
//                   }
//                 >
//                   <Ionicons
//                     name="play"
//                     size={34}
//                     color="#fff"
//                   />
//                 </View>
//               </View>
//             ) : null}
//           </Pressable>
//         ) : null}
//       </View>

//       {/* =================================================
//           RIGHT ACTIONS
//       ================================================= */}

//       <View
//         style={
//           styles.rightActions
//         }
//       >
//         {/* LIKE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleLike
//           }
//         >
//           <Ionicons
//             name={
//               isLiked
//                 ? "heart"
//                 : "heart-outline"
//             }
//             size={30}
//             color={
//               isLiked
//                 ? "#ff3040"
//                 : "#fff"
//             }
//           />

//           <Text
//             style={
//               styles.actionText
//             }
//           >
//             {likesCount}
//           </Text>
//         </Pressable>

//         {/* COMMENTS */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleComments
//           }
//         >
//           <Ionicons
//             name="chatbubble-outline"
//             size={29}
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.actionText
//             }
//           >
//             {reel?.comments_count ??
//               0}
//           </Text>
//         </Pressable>

//         {/* SHARE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleShare
//           }
//         >
//           <Ionicons
//             name="paper-plane-outline"
//             size={29}
//             color="#fff"
//           />

//           <Text
//             style={
//               styles.actionText
//             }
//           >
//             {reel?.share_count ??
//               0}
//           </Text>
//         </Pressable>

//         {/* SAVE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleSave
//           }
//           disabled={
//             saving
//           }
//         >
//           <Ionicons
//             name={
//               saved
//                 ? "bookmark"
//                 : "bookmark-outline"
//             }
//             size={30}
//             color="#fff"
//           />
//         </Pressable>

//         {/* MORE */}

//         <Pressable
//           style={
//             styles.actionButton
//           }
//           onPress={
//             handleMore
//           }
//         >
//           <Ionicons
//             name="ellipsis-horizontal"
//             size={30}
//             color="#fff"
//           />
//         </Pressable>
//       </View>

//       {/* =================================================
//           USER INFO — fixed position, same on every reel.
//           This is its OWN absolutely-positioned block (not
//           nested inside the caption block), so caption/music
//           length can never push it up or down.
//       ================================================= */}

//       <View
//         style={
//           styles.userInfoRow
//         }
//       >
//         {avatarUrl ? (
//           <Image
//             source={{
//               uri: avatarUrl,
//             }}
//             style={
//               styles.avatar
//             }
//           />
//         ) : (
//           <View
//             style={
//               styles.avatarPlaceholder
//             }
//           >
//             <Ionicons
//               name="person"
//               size={20}
//               color="#aaa"
//             />
//           </View>
//         )}

//         <Text
//           style={
//             styles.username
//           }
//           numberOfLines={1}
//         >
//           {username}
//         </Text>

//         {!isOwnReel ? (
//           <Pressable
//             style={
//               styles.follow
//             }
//             onPress={() =>
//               console.log(
//                 "FOLLOW =>",
//                 reelUserId
//               )
//             }
//           >
//             <Text
//               style={
//                 styles.followText
//               }
//             >
//               Follow
//             </Text>
//           </Pressable>
//         ) : null}
//       </View>

//       {/* =================================================
//           CAPTION / MUSIC — its own block, anchored closer
//           to the bottom edge. It grows upward independently
//           and never touches userInfoRow's position above it.
//       ================================================= */}

//       <View
//         style={
//           styles.captionArea
//         }
//       >
//         {/* CAPTION */}

//         {reel?.caption ? (
//           <Text
//             style={
//               styles.caption
//             }
//             numberOfLines={3}
//           >
//             {reel.caption}
//           </Text>
//         ) : null}

//         {/* MUSIC */}

//         {reel?.music ? (
//           <View
//             style={
//               styles.musicRow
//             }
//           >
//             <Ionicons
//               name="musical-notes"
//               size={16}
//               color="#fff"
//             />

//             <Text
//               style={
//                 styles.musicText
//               }
//               numberOfLines={1}
//             >
//               {reel.music?.title ||
//                 "Original audio"}
//             </Text>
//           </View>
//         ) : null}
//       </View>

//       {/* =================================================
//           PROGRESS BAR
//       ================================================= */}

//       <View
//         pointerEvents="none"
//         style={
//           styles.progressContainer
//         }
//       >
//         <View
//           style={[
//             styles.progress,
//             {
//               width:
//                 `${progress * 100}%`,
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// }


// // =========================================================
// // STYLES
// // =========================================================

// const styles =
//   StyleSheet.create({
//     // =====================================================
//     // ROOT
//     // =====================================================

//     container: {
//       backgroundColor: "#000",
//       position: "relative",
//       overflow: "hidden",
//       margin: 0,
//       padding: 0,
//     },

//     // =====================================================
//     // VIDEO
//     // =====================================================

//     videoContainer: {
//       ...StyleSheet.absoluteFillObject,
//       backgroundColor: "#000",
//       overflow: "hidden",
//     },

//     videoPlaceholder: {
//       ...StyleSheet.absoluteFillObject,
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#000",
//     },

//     // =====================================================
//     // PLAY
//     // =====================================================

//     playOverlay: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     playCircle: {
//       width: 68,
//       height: 68,
//       borderRadius: 34,
//       backgroundColor:
//         "rgba(0,0,0,0.55)",
//       alignItems: "center",
//       justifyContent: "center",
//       paddingLeft: 4,
//     },

//     // =====================================================
//     // RIGHT ACTIONS
//     // =====================================================

//     rightActions: {
//       position: "absolute",
//       right: 12,
//       bottom: 88,
//       alignItems: "center",
//       zIndex: 20,
//       elevation: 20,
//     },

//     actionButton: {
//       alignItems: "center",
//       justifyContent: "center",
//       marginBottom: 20,
//     },

//     actionText: {
//       color: "#fff",
//       fontSize: 12,
//       marginTop: 4,
//       fontWeight: "600",
//     },

//     // =====================================================
//     // USER INFO ROW — FIXED, identical bottom offset on
//     // every single reel, no matter what.
//     // =====================================================

//     userInfoRow: {
//       position: "absolute",
//       left: 14,
//       right: 78,
//       bottom: 80,
//       flexDirection: "row",
//       alignItems: "center",
//       zIndex: 20,
//       elevation: 20,
//     },

//     // =====================================================
//     // CAPTION / MUSIC AREA — separate block, anchored lower,
//     // never affects userInfoRow's position.
//     // =====================================================

//     captionArea: {
//       position: "absolute",
//       left: 14,
//       right: 78,
//       bottom: 26,
//       zIndex: 20,
//       elevation: 20,
//     },

//     avatar: {
//       width: 38,
//       height: 38,
//       borderRadius: 19,
//       marginRight: 9,
//     },

//     avatarPlaceholder: {
//       width: 38,
//       height: 38,
//       borderRadius: 19,
//       backgroundColor: "#222",
//       alignItems: "center",
//       justifyContent: "center",
//       marginRight: 9,
//     },

//     username: {
//       color: "#fff",
//       fontSize: 15,
//       fontWeight: "700",
//       maxWidth: 130,
//     },

//     follow: {
//       marginLeft: 10,
//       paddingHorizontal: 10,
//       paddingVertical: 5,
//       borderWidth: 1,
//       borderColor: "#fff",
//       borderRadius: 5,
//     },

//     followText: {
//       color: "#fff",
//       fontSize: 12,
//       fontWeight: "600",
//     },

//     caption: {
//       color: "#fff",
//       fontSize: 14,
//       lineHeight: 19,
//       marginBottom: 8,
//     },

//     musicRow: {
//       flexDirection: "row",
//       alignItems: "center",
//       maxWidth: "90%",
//     },

//     musicText: {
//       color: "#fff",
//       fontSize: 13,
//       marginLeft: 6,
//     },

//     // =====================================================
//     // PROGRESS
//     // =====================================================

//     progressContainer: {
//       position: "absolute",
//       left: 0,
//       right: 0,
//       bottom: 0,
//       height: 2,
//       backgroundColor:
//         "rgba(255,255,255,0.25)",
//       zIndex: 50,
//     },

//     progress: {
//       height: "100%",
//       backgroundColor: "#fff",
//     },
//   });

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  likeTarget,
  unlikeTarget,
} from "../../redux/likeSlice";

import {
  saveReel,
  unsaveReel,
} from "../../redux/savedSlice";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import {
  getMediaUrl,
} from "../../utils/media";

import { useRouter } from "expo-router";

// =========================================================
// ONLY ADDED FOR COMMENTS
// =========================================================

import CommentsSheet from "../comments/CommentsSheet";

// =========================================================
// ACTIVE REEL VIDEO
// =========================================================

const ActiveReelVideo =
  forwardRef(
    (
      {
        videoUrl,
        reelId,
        isActive,
        onPlayingChange,
        onProgress,
      },
      ref
    ) => {
      const player =
        useVideoPlayer(
          videoUrl,
          (player) => {
            player.loop = true;
            player.muted = false;
          }
        );

      const playerRef =
        useRef(player);

      // ===================================================
      // IMPERATIVE CONTROLS
      // ===================================================

      useImperativeHandle(
        ref,
        () => ({
          play: () => {
            try {
              playerRef.current?.play();
            } catch (error) {
              console.log(
                "PLAY ERROR =>",
                error
              );
            }
          },

          pause: () => {
            try {
              playerRef.current?.pause();
            } catch (error) {
              console.log(
                "PAUSE ERROR =>",
                error
              );
            }
          },

          toggle: () => {
            try {
              if (
                playerRef.current
                  ?.playing
              ) {
                playerRef.current.pause();
              } else {
                playerRef.current.play();
              }
            } catch (error) {
              console.log(
                "TOGGLE ERROR =>",
                error
              );
            }
          },

          isPlaying: () => {
            return Boolean(
              playerRef.current
                ?.playing
            );
          },
        }),
        []
      );

      // ===================================================
      // AUTO PLAY / PAUSE
      // ===================================================

      useEffect(() => {
        const currentPlayer =
          playerRef.current;

        if (!currentPlayer) {
          return;
        }

        if (!isActive) {
          try {
            currentPlayer.pause();
          } catch (error) {
            console.log(
              "INACTIVE PAUSE ERROR =>",
              error
            );
          }

          onPlayingChange?.(
            false
          );

          return;
        }

        try {
          currentPlayer.play();

          onPlayingChange?.(
            true
          );

          console.log(
            "▶️ AUTO PLAY REEL =>",
            reelId
          );
        } catch (error) {
          console.log(
            "AUTO PLAY ERROR =>",
            error
          );
        }
      }, [
        isActive,
        reelId,
        onPlayingChange,
      ]);

      // ===================================================
      // PLAYING CHANGE
      // ===================================================

      useEffect(() => {
        const currentPlayer =
          playerRef.current;

        if (!currentPlayer) {
          return;
        }

        const subscription =
          currentPlayer.addListener(
            "playingChange",
            (event) => {
              onPlayingChange?.(
                Boolean(
                  event?.isPlaying
                )
              );
            }
          );

        return () => {
          subscription?.remove?.();
        };
      }, [
        onPlayingChange,
      ]);

      // ===================================================
      // TIME UPDATE
      // ===================================================

      useEffect(() => {
        const currentPlayer =
          playerRef.current;

        if (!currentPlayer) {
          return;
        }

        const subscription =
          currentPlayer.addListener(
            "timeUpdate",
            (event) => {
              const currentTime =
                Number(
                  event?.currentTime ||
                    0
                );

              const duration =
                Number(
                  event?.duration ||
                    0
                );

              let progress = 0;

              if (
                duration > 0
              ) {
                progress =
                  currentTime /
                  duration;
              }

              onProgress?.(
                Math.max(
                  0,
                  Math.min(
                    1,
                    progress
                  )
                )
              );
            }
          );

        return () => {
          subscription?.remove?.();
        };
      }, [
        onProgress,
      ]);

      // ===================================================
      // NO VIDEO
      // ===================================================

      if (!videoUrl) {
        return (
          <View
            style={
              styles.videoPlaceholder
            }
          >
            <Ionicons
              name="videocam-off-outline"
              size={40}
              color="#777"
            />
          </View>
        );
      }

      // ===================================================
      // VIDEO
      // ===================================================

      return (
        <VideoView
          player={
            playerRef.current
          }
          style={
            StyleSheet.absoluteFillObject
          }
          contentFit="cover"
          nativeControls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
          surfaceType="textureView"
        />
      );
    }
  );


// =========================================================
// REEL ITEM
// =========================================================

export default function ReelItem({
  reel,
  isActive,
  reelHeight,
}) {
  const dispatch =
    useDispatch();

    const router = useRouter();

  const {
    width: screenWidth,
  } = useWindowDimensions();

  // =======================================================
  // CURRENT USER
  // =======================================================

  const currentUserId =
    useSelector(
      (state) =>
        state.auth?.user?.id
    );

  // =======================================================
  // REEL DATA
  // =======================================================

  const reelId =
    reel?.id;

  const reelLike =
    useSelector(
      (state) =>
        state.likes?.likes?.[
          `reel_${reelId}`
        ]
    );

  const isLiked =
    Boolean(
      reel?.is_liked ??
        reelLike?.is_liked ??
        reelLike?.isLiked ??
        false
    );

  const likesCount =
    Number(
      reel?.likes_count ??
        reelLike?.likes_count ??
        reelLike?.count ??
        0
    );

  const videoUrl =
    getMediaUrl(
      reel?.video_url
    );

  const thumbnailUrl =
    getMediaUrl(
      reel?.thumbnail_url
    );

  // =======================================================
  // AUTHOR
  // =======================================================

  const author =
    reel?.author ||
    reel?.user ||
    reel?.owner ||
    {};

  const reelUserId =
    reel?.user_id ??
    author?.id ??
    author?.user_id;

  const username =
    author?.username ||
    reel?.username ||
    "Unknown";

  const avatarUrl =
    getMediaUrl(
      author?.avatar_url ||
        author?.avatar ||
        reel?.avatar_url
    );

  // =======================================================
  // OWN REEL
  // =======================================================

  const isOwnReel =
    currentUserId != null &&
    reelUserId != null &&
    String(
      currentUserId
    ) ===
      String(
        reelUserId
      );

  // =======================================================
  // STATES
  // =======================================================

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    saved,
    setSaved,
  ] = useState(
    Boolean(
      reel?.is_saved
    )
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const playerRef =
    useRef(null);

  // =======================================================
  // ONLY ADDED FOR COMMENTS
  // =======================================================

  const [
    commentsVisible,
    setCommentsVisible,
  ] = useState(false);

  // =======================================================
  // ACTIVE CHANGE
  // =======================================================

  useEffect(() => {
    if (!isActive) {
      setIsPlaying(false);
      setProgress(0);
    }
  }, [
    isActive,
  ]);

  // =======================================================
  // SAVED SYNC
  // =======================================================

  useEffect(() => {
    setSaved(
      Boolean(
        reel?.is_saved
      )
    );
  }, [
    reel?.is_saved,
  ]);

  // =======================================================
  // PLAYING
  // =======================================================

  const handlePlayingChange =
    useCallback(
      (playing) => {
        setIsPlaying(
          Boolean(playing)
        );
      },
      []
    );

  // =======================================================
  // PROGRESS
  // =======================================================

  const handleProgress =
    useCallback(
      (value) => {
        setProgress(
          value
        );
      },
      []
    );

  // =======================================================
  // VIDEO PRESS
  // =======================================================

  const handleVideoPress =
    useCallback(() => {
      if (!isActive) {
        return;
      }

      const player =
        playerRef.current;

      if (!player) {
        console.log(
          "PLAYER REF NOT READY"
        );

        return;
      }

      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    }, [
      isActive,
      isPlaying,
    ]);

  // =======================================================
  // LIKE
  // =======================================================

  const handleLike =
    useCallback(() => {
      if (!reelId) {
        return;
      }

      if (isLiked) {
        dispatch(
          unlikeTarget({
            targetType: "reel",
            targetId: reelId,
          })
        );

        return;
      }

      dispatch(
        likeTarget({
          targetType: "reel",
          targetId: reelId,
        })
      );
    }, [
      dispatch,
      reelId,
      isLiked,
    ]);

  // =======================================================
  // SAVE
  // =======================================================

  const handleSave =
    useCallback(
      async () => {
        if (
          !reelId ||
          saving
        ) {
          return;
        }

        try {
          setSaving(true);

          if (saved) {
            await dispatch(
              unsaveReel(
                reelId
              )
            ).unwrap();

            setSaved(false);
          } else {
            await dispatch(
              saveReel(
                reelId
              )
            ).unwrap();

            setSaved(true);
          }
        } catch (error) {
          console.log(
            "SAVE / UNSAVE REEL ERROR =>",
            error
          );
        } finally {
          setSaving(false);
        }
      },
      [
        dispatch,
        reelId,
        saved,
        saving,
      ]
    );

  // =======================================================
  // COMMENTS
  // =======================================================

  const handleComments =
    useCallback(() => {
      if (!reelId) {
        console.log(
          "❌ REEL ID NOT FOUND"
        );

        return;
      }

      console.log(
        "💬 OPEN REEL COMMENTS =>",
        reelId
      );

      setCommentsVisible(
        true
      );
    }, [
      reelId,
    ]);

  // =======================================================
  // CLOSE COMMENTS
  // =======================================================

  const handleCloseComments =
    useCallback(() => {
      setCommentsVisible(
        false
      );
    }, []);

  // =======================================================
  // SHARE
  // =======================================================

  const handleShare =
    useCallback(() => {
      console.log(
        "SHARE REEL =>",
        reelId
      );
    }, [
      reelId,
    ]);

  // =======================================================
  // MORE
  // =======================================================

  const handleMore =
    useCallback(() => {
      console.log(
        "MORE REEL =>",
        reelId
      );
    }, [
      reelId,
    ]);

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <View
      style={[
        styles.container,
        {
          width:
            screenWidth,

          height:
            reelHeight,
        },
      ]}
    >
      {/* =================================================
          FULL SCREEN VIDEO
      ================================================= */}

      <View
        style={
          styles.videoContainer
        }
      >
        {/* THUMBNAIL */}

        {thumbnailUrl ? (
          <Image
            source={{
              uri: thumbnailUrl,
            }}
            style={
              StyleSheet.absoluteFillObject
            }
            resizeMode="cover"
          />
        ) : null}

        {/* ACTIVE VIDEO */}

        {isActive &&
        videoUrl ? (
          <ActiveReelVideo
            ref={playerRef}
            videoUrl={videoUrl}
            reelId={reelId}
            isActive={isActive}
            onPlayingChange={
              handlePlayingChange
            }
            onProgress={
              handleProgress
            }
          />
        ) : null}

        {/* VIDEO TAP */}

        {isActive ? (
          <Pressable
            style={
              StyleSheet.absoluteFillObject
            }
            onPress={
              handleVideoPress
            }
          >
            {!isPlaying ? (
              <View
                pointerEvents="none"
                style={
                  styles.playOverlay
                }
              >
                <View
                  style={
                    styles.playCircle
                  }
                >
                  <Ionicons
                    name="play"
                    size={34}
                    color="#fff"
                  />
                </View>
              </View>
            ) : null}
          </Pressable>
        ) : null}
      </View>

      {/* =================================================
          RIGHT ACTIONS
      ================================================= */}

      <View
        style={
          styles.rightActions
        }
      >
        {/* LIKE */}

        <Pressable
          style={
            styles.actionButton
          }
          onPress={
            handleLike
          }
        >
          <Ionicons
            name={
              isLiked
                ? "heart"
                : "heart-outline"
            }
            size={30}
            color={
              isLiked
                ? "#ff3040"
                : "#fff"
            }
          />

          <Text
            style={
              styles.actionText
            }
          >
            {likesCount}
          </Text>
        </Pressable>

        {/* COMMENTS */}

        <Pressable
          style={
            styles.actionButton
          }
          onPress={
            handleComments
          }
        >
          <Ionicons
            name="chatbubble-outline"
            size={29}
            color="#fff"
          />

          <Text
            style={
              styles.actionText
            }
          >
            {reel?.comments_count ??
              0}
          </Text>
        </Pressable>

        {/* SHARE */}

        <Pressable
          style={
            styles.actionButton
          }
          onPress={
            handleShare
          }
        >
          <Ionicons
            name="paper-plane-outline"
            size={29}
            color="#fff"
          />

          <Text
            style={
              styles.actionText
            }
          >
            {reel?.share_count ??
              0}
          </Text>
        </Pressable>

        {/* SAVE */}

        <Pressable
          style={
            styles.actionButton
          }
          onPress={
            handleSave
          }
          disabled={
            saving
          }
        >
          <Ionicons
            name={
              saved
                ? "bookmark"
                : "bookmark-outline"
            }
            size={30}
            color="#fff"
          />
        </Pressable>

        {/* MORE */}

        <Pressable
          style={
            styles.actionButton
          }
          onPress={
            handleMore
          }
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={30}
            color="#fff"
          />
        </Pressable>
      </View>

      {/* =================================================
          USER INFO
      ================================================= */}

      <View
        style={
          styles.userInfoRow
        }
      >
        {avatarUrl ? (
          <Image
            source={{
              uri: avatarUrl,
            }}
            style={
              styles.avatar
            }
          />
        ) : (
          <View
            style={
              styles.avatarPlaceholder
            }
          >
            <Ionicons
              name="person"
              size={20}
              color="#aaa"
            />
          </View>
        )}

       <Pressable
  onPress={() => {
    if (!reelUserId) {
      console.log(
        "❌ REEL USER ID NOT FOUND"
      );
      return;
    }

    console.log(
      "===================================="
    );
    console.log(
      "🎬 REEL USERNAME PRESSED"
    );
    console.log(
      "REEL USER ID =>",
      reelUserId
    );
    console.log(
      "CURRENT USER ID =>",
      currentUserId
    );
    console.log(
      "IS OWN REEL =>",
      isOwnReel
    );
    console.log(
      "USERNAME =>",
      username
    );
    console.log(
      "===================================="
    );

    if (isOwnReel) {
      router.push("/profile");
    } else {
      router.push({
        pathname:
          "/profile-screens/user-profile",
        params: {
          userId:
            String(reelUserId),
        },
      });
    }
  }}
  style={{
    maxWidth: 130,
  }}
>
  <Text
    style={
      styles.username
    }
    numberOfLines={1}
  >
    {username}
  </Text>
</Pressable>

        {!isOwnReel ? (
          <Pressable
            style={
              styles.follow
            }
            onPress={() =>
              console.log(
                "FOLLOW =>",
                reelUserId
              )
            }
          >
            <Text
              style={
                styles.followText
              }
            >
              Follow
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* =================================================
          CAPTION / MUSIC
      ================================================= */}

      <View
        style={
          styles.captionArea
        }
      >
        {/* CAPTION */}

        {reel?.caption ? (
          <Text
            style={
              styles.caption
            }
            numberOfLines={3}
          >
            {reel.caption}
          </Text>
        ) : null}

        {/* MUSIC */}

        {reel?.music ? (
          <View
            style={
              styles.musicRow
            }
          >
            <Ionicons
              name="musical-notes"
              size={16}
              color="#fff"
            />

            <Text
              style={
                styles.musicText
              }
              numberOfLines={1}
            >
              {reel.music?.title ||
                "Original audio"}
            </Text>
          </View>
        ) : null}
      </View>

      {/* =================================================
          PROGRESS BAR
      ================================================= */}

      <View
        pointerEvents="none"
        style={
          styles.progressContainer
        }
      >
        <View
          style={[
            styles.progress,
            {
              width:
                `${progress * 100}%`,
            },
          ]}
        />
      </View>

      {/* =================================================
          COMMENTS SHEET
      ================================================= */}

      <CommentsSheet
        visible={
          commentsVisible
        }
        reelId={
          reelId
        }
        onClose={
          handleCloseComments
        }
      />
    </View>
  );
}


// =========================================================
// STYLES
// =========================================================

const styles =
  StyleSheet.create({
    // =====================================================
    // ROOT
    // =====================================================

    container: {
      backgroundColor: "#000",
      position: "relative",
      overflow: "hidden",
      margin: 0,
      padding: 0,
    },

    // =====================================================
    // VIDEO
    // =====================================================

    videoContainer: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "#000",
      overflow: "hidden",
    },

    videoPlaceholder: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000",
    },

    // =====================================================
    // PLAY
    // =====================================================

    playOverlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    playCircle: {
      width: 68,
      height: 68,
      borderRadius: 34,
      backgroundColor:
        "rgba(0,0,0,0.55)",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 4,
    },

    // =====================================================
    // RIGHT ACTIONS
    // =====================================================

    rightActions: {
      position: "absolute",
      right: 12,
      bottom: 88,
      alignItems: "center",
      zIndex: 20,
      elevation: 20,
    },

    actionButton: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },

    actionText: {
      color: "#fff",
      fontSize: 12,
      marginTop: 4,
      fontWeight: "600",
    },

    // =====================================================
    // USER INFO ROW
    // =====================================================

    userInfoRow: {
      position: "absolute",
      left: 14,
      right: 78,
      bottom: 80,
      flexDirection: "row",
      alignItems: "center",
      zIndex: 20,
      elevation: 20,
    },

    // =====================================================
    // CAPTION / MUSIC AREA
    // =====================================================

    captionArea: {
      position: "absolute",
      left: 14,
      right: 78,
      bottom: 26,
      zIndex: 20,
      elevation: 20,
    },

    avatar: {
      width: 38,
      height: 38,
      borderRadius: 19,
      marginRight: 9,
    },

    avatarPlaceholder: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: "#222",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 9,
    },

    username: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      maxWidth: 130,
    },

    follow: {
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: "#fff",
      borderRadius: 5,
    },

    followText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },

    caption: {
      color: "#fff",
      fontSize: 14,
      lineHeight: 19,
      marginBottom: 8,
    },

    musicRow: {
      flexDirection: "row",
      alignItems: "center",
      maxWidth: "90%",
    },

    musicText: {
      color: "#fff",
      fontSize: 13,
      marginLeft: 6,
    },

    // =====================================================
    // PROGRESS
    // =====================================================

    progressContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 2,
      backgroundColor:
        "rgba(255,255,255,0.25)",
      zIndex: 50,
    },

    progress: {
      height: "100%",
      backgroundColor: "#fff",
    },
  });