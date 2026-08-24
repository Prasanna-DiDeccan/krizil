import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  PanResponder,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  createStory,
} from "../../src/redux/storySlice";

import {
  selectGlobalUser,
} from "../../src/store/profileSelectors";

import * as MediaLibrary from "expo-media-library";

const {
  width,
  height,
} = Dimensions.get("window");

export default function StoryEditor() {
  const params = useLocalSearchParams();

  const dispatch = useDispatch();

  const user = useSelector(
    selectGlobalUser
  );

  const {
    uri,
    type,
    fileName,
    mimeType,
  } = params;

  // =====================================================
  // STATE
  // =====================================================

  const [
    caption,
    setCaption,
  ] = useState("");

  const [
    textItems,
    setTextItems,
  ] = useState([]);

  const [
    activeTextId,
    setActiveTextId,
  ] = useState(null);

  const [
    textEditorVisible,
    setTextEditorVisible,
  ] = useState(false);

  const [
    textValue,
    setTextValue,
  ] = useState("");

  const [
    stickerModalVisible,
    setStickerModalVisible,
  ] = useState(false);

  const [
    stickers,
    setStickers,
  ] = useState([]);

  const [
    activeStickerId,
    setActiveStickerId,
  ] = useState(null);

  const [
    captionVisible,
    setCaptionVisible,
  ] = useState(false);

  const [
    drawMode,
    setDrawMode,
  ] = useState(false);

  const [
    drawingLines,
    setDrawingLines,
  ] = useState([]);

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    downloading,
    setDownloading,
  ] = useState(false);

  const [
    selectedTextColor,
    setSelectedTextColor,
  ] = useState("#fff");

  // =====================================================
  // VIDEO
  // =====================================================

  const player = useVideoPlayer(
    type === "video"
      ? uri
      : null,
    (player) => {
      if (type === "video") {
        player.loop = true;
        player.play();
      }
    }
  );

  // =====================================================
  // VALIDATE MEDIA
  // =====================================================

  useEffect(() => {
    if (!uri) {
      Alert.alert(
        "Error",
        "No media selected.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    }
  }, [uri]);

  // =====================================================
  // TEXT ID
  // =====================================================

  const generateId = () =>
    `${Date.now()}-${Math.random()}`;

  // =====================================================
  // ADD TEXT
  // =====================================================

  const handleText = () => {
    setTextValue("");
    setActiveTextId(null);
    setTextEditorVisible(true);
  };

  // =====================================================
  // SAVE TEXT
  // =====================================================

  const saveText = () => {
    const value = textValue.trim();

    if (!value) {
      setTextEditorVisible(false);
      return;
    }

    if (activeTextId) {
      setTextItems((current) =>
        current.map((item) =>
          item.id === activeTextId
            ? {
                ...item,
                text: value,
                color: selectedTextColor,
              }
            : item
        )
      );
    } else {
      const newText = {
        id: generateId(),
        text: value,
        x: width / 2 - 100,
        y: height * 0.42,
        color: selectedTextColor,
        fontSize: 30,
      };

      setTextItems((current) => [
        ...current,
        newText,
      ]);
    }

    setTextEditorVisible(false);
    setActiveTextId(null);
    setTextValue("");
  };

  // =====================================================
  // EDIT EXISTING TEXT
  // =====================================================

  const editText = (item) => {
    setActiveTextId(item.id);
    setTextValue(item.text);

    setSelectedTextColor(
      item.color || "#fff"
    );

    setTextEditorVisible(true);
  };

  // =====================================================
  // DELETE TEXT
  // =====================================================

  const deleteText = (id) => {
    setTextItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

    if (activeTextId === id) {
      setActiveTextId(null);
    }
  };

  // =====================================================
  // TEXT DRAG
  // =====================================================

  const createTextPanResponder = (item) => {
    let startX = item.x;
    let startY = item.y;

    return PanResponder.create({
      onStartShouldSetPanResponder:
        () => true,

      onPanResponderGrant: () => {
        setActiveTextId(item.id);

        startX = item.x;
        startY = item.y;
      },

      onPanResponderMove: (
        event,
        gesture
      ) => {
        setTextItems((current) =>
          current.map((text) =>
            text.id === item.id
              ? {
                  ...text,
                  x:
                    startX +
                    gesture.dx,
                  y:
                    startY +
                    gesture.dy,
                }
              : text
          )
        );
      },

      onPanResponderRelease: () => {},
    });
  };

  // =====================================================
  // STICKERS
  // =====================================================

  const stickerList = [
    "❤️",
    "😂",
    "😍",
    "🔥",
    "✨",
    "🥰",
    "😎",
    "😭",
    "🤣",
    "💯",
    "🎉",
    "👏",
    "🙌",
    "💖",
    "🌸",
    "⭐",
    "☀️",
    "🌈",
    "🍕",
    "🎵",
  ];

  const addSticker = (emoji) => {
    const newSticker = {
      id: generateId(),
      emoji,
      x: width / 2 - 25,
      y: height * 0.42,
      size: 55,
    };

    setStickers((current) => [
      ...current,
      newSticker,
    ]);

    setStickerModalVisible(false);
  };

  // =====================================================
  // STICKER DRAG
  // =====================================================

  const createStickerPanResponder = (item) => {
    let startX = item.x;
    let startY = item.y;

    return PanResponder.create({
      onStartShouldSetPanResponder:
        () => true,

      onPanResponderGrant: () => {
        setActiveStickerId(item.id);

        startX = item.x;
        startY = item.y;
      },

      onPanResponderMove: (
        event,
        gesture
      ) => {
        setStickers((current) =>
          current.map((sticker) =>
            sticker.id === item.id
              ? {
                  ...sticker,
                  x:
                    startX +
                    gesture.dx,
                  y:
                    startY +
                    gesture.dy,
                }
              : sticker
          )
        );
      },

      onPanResponderRelease: () => {},
    });
  };

  // =====================================================
  // DELETE STICKER
  // =====================================================

  const deleteSticker = (id) => {
    setStickers((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  };

  // =====================================================
  // CAPTION
  // =====================================================

  const handleCaption = () => {
    setCaptionVisible(
      (current) => !current
    );
  };

  // =====================================================
  // DRAW
  // =====================================================

  const handleDraw = () => {
    setDrawMode(
      (current) => !current
    );
  };

  // =====================================================
  // DRAW TOUCH
  // =====================================================

  const drawResponder =
    PanResponder.create({
      onStartShouldSetPanResponder:
        () => drawMode,

      onPanResponderGrant: (event) => {
        if (!drawMode) return;

        const {
          locationX,
          locationY,
        } = event.nativeEvent;

        setDrawingLines(
          (current) => [
            ...current,
            [
              {
                x: locationX,
                y: locationY,
              },
            ],
          ]
        );
      },

      onPanResponderMove: (event) => {
        if (!drawMode) return;

        const {
          locationX,
          locationY,
        } = event.nativeEvent;

        setDrawingLines((current) => {
          if (!current.length) {
            return current;
          }

          const copy = [...current];

          const last =
            copy.length - 1;

          copy[last] = [
            ...copy[last],
            {
              x: locationX,
              y: locationY,
            },
          ];

          return copy;
        });
      },

      onPanResponderRelease: () => {},
    });

  // =====================================================
  // CLEAR DRAWING
  // =====================================================

  const clearDrawing = () => {
    setDrawingLines([]);
  };

  // =====================================================
  // DOWNLOAD STORY MEDIA
  // =====================================================

  const downloadStory = async () => {
    if (!uri) return;

    try {
      setDownloading(true);

      const permission =
        await MediaLibrary.requestPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow photo library access."
        );

        return;
      }

      const asset =
        await MediaLibrary.createAssetAsync(
          uri
        );

      await MediaLibrary.createAlbumAsync(
        "Krizil",
        asset,
        false
      ).catch(() => {});

      Alert.alert(
        "Saved",
        "Media saved to your gallery."
      );
    } catch (error) {
      console.log(
        "DOWNLOAD STORY ERROR =>",
        error
      );

      Alert.alert(
        "Download failed",
        "Unable to save media."
      );
    } finally {
      setDownloading(false);
    }
  };

  // =====================================================
  // UPLOAD STORY
  // =====================================================

  const handleShareStory = async () => {
    if (!uri || uploading) {
      return;
    }

    try {
      setUploading(true);

      console.log(
        "===================================="
      );

      console.log(
        "CREATING STORY..."
      );

      console.log(
        "URI =>",
        uri
      );

      console.log(
        "TYPE =>",
        type
      );

      console.log(
        "FILENAME =>",
        fileName
      );

      console.log(
        "MIMETYPE =>",
        mimeType
      );

      console.log(
        "===================================="
      );

      const result = await dispatch(
        createStory({
          file: {
            uri,

            fileName:
              fileName ||
              `story-${Date.now()}`,

            mimeType:
              mimeType ||
              (
                type === "video"
                  ? "video/mp4"
                  : "image/jpeg"
              ),
          },

          caption:
            caption.trim() ||
            undefined,
        })
      );

      // =================================================
      // SUCCESS
      // =================================================

      if (
        createStory.fulfilled.match(
          result
        )
      ) {
        console.log(
          "STORY UPLOAD SUCCESS"
        );

        console.log(
          "REDIRECTING TO HOME..."
        );

        /*
         * IMPORTANT
         *
         * Do NOT use:
         *
         * router.back()
         * router.dismissAll()
         *
         * We directly replace the current
         * screen with the Home tab.
         */

        router.replace("/(tabs)");

        return;
      }

      // =================================================
      // FAILED
      // =================================================

      console.log(
        "STORY UPLOAD FAILED =>",
        result
      );

      const error =
        result.payload ||
        "Unable to create story.";

      Alert.alert(
        "Upload failed",
        typeof error === "string"
          ? error
          : "Unable to create story."
      );
    } catch (error) {
      console.log(
        "CREATE STORY ERROR =>",
        error
      );

      Alert.alert(
        "Error",
        "Something went wrong while uploading the story."
      );
    } finally {
      setUploading(false);
    }
  };

  // =====================================================
  // RENDER MEDIA
  // =====================================================

  const renderMedia = () => {
    if (!uri) {
      return null;
    }

    if (type === "video") {
      return (
        <VideoView
          player={player}
          style={styles.media}
          contentFit="contain"
          nativeControls={false}
        />
      );
    }

    return (
      <Image
        source={{
          uri,
        }}
        style={styles.media}
        resizeMode="contain"
      />
    );
  };

  // =====================================================
  // RENDER DRAWINGS
  // =====================================================

  const renderDrawings = () => {
    return drawingLines.map(
      (line, lineIndex) => (
        <View
          key={`line-${lineIndex}`}
          pointerEvents="none"
          style={
            StyleSheet.absoluteFill
          }
        >
          {line.map(
            (point, pointIndex) => (
              <View
                key={`${lineIndex}-${pointIndex}`}
                style={[
                  styles.drawPoint,
                  {
                    left:
                      point.x - 4,
                    top:
                      point.y - 4,
                  },
                ]}
              />
            )
          )}
        </View>
      )
    );
  };

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <View style={styles.container}>

      {/* MEDIA */}

      {renderMedia()}

      {/* DRAW TOUCH AREA */}

      <View
        pointerEvents={
          drawMode
            ? "auto"
            : "none"
        }
        style={
          StyleSheet.absoluteFill
        }
        {...drawResponder.panHandlers}
      />

      {/* TOP OVERLAY */}

      <View
        pointerEvents="none"
        style={styles.topOverlay}
      />

      {/* TOP BAR */}

      <SafeAreaView
        edges={["top"]}
        style={styles.topSafe}
      >
        <View style={styles.topBar}>

          {/* CLOSE */}

          <TouchableOpacity
            style={styles.topButton}
            onPress={() =>
              router.back()
            }
          >
            <Ionicons
              name="close"
              size={29}
              color="#fff"
            />
          </TouchableOpacity>

          {/* TOOLS */}

          <View style={styles.topTools}>

            {/* DOWNLOAD */}

            <TouchableOpacity
              style={styles.topButton}
              onPress={
                downloadStory
              }
              disabled={downloading}
            >
              <Ionicons
                name="download-outline"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>

            {/* TEXT */}

            <TouchableOpacity
              style={styles.topButton}
              onPress={handleText}
            >
              <Ionicons
                name="text"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>

            {/* DRAW */}

            <TouchableOpacity
              style={[
                styles.topButton,
                drawMode &&
                  styles.activeTool,
              ]}
              onPress={handleDraw}
            >
              <Ionicons
                name="pencil"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>

            {/* STICKER */}

            <TouchableOpacity
              style={styles.topButton}
              onPress={() =>
                setStickerModalVisible(
                  true
                )
              }
            >
              <Ionicons
                name="happy-outline"
                size={25}
                color="#fff"
              />
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>

      {/* DRAGGABLE TEXT */}

      {textItems.map((item) => {
        const pan =
          createTextPanResponder(
            item
          );

        return (
          <View
            key={item.id}
            {...pan.panHandlers}
            style={[
              styles.draggableText,
              {
                left: item.x,
                top: item.y,
              },
              activeTextId ===
                item.id &&
                styles.selectedItem,
            ]}
          >
            <Pressable
              onPress={() =>
                editText(item)
              }
              onLongPress={() =>
                deleteText(item.id)
              }
            >
              <Text
                style={[
                  styles.overlayText,
                  {
                    color:
                      item.color,
                    fontSize:
                      item.fontSize,
                  },
                ]}
              >
                {item.text}
              </Text>
            </Pressable>
          </View>
        );
      })}

      {/* DRAGGABLE STICKERS */}

      {stickers.map((item) => {
        const pan =
          createStickerPanResponder(
            item
          );

        return (
          <View
            key={item.id}
            {...pan.panHandlers}
            style={[
              styles.draggableSticker,
              {
                left: item.x,
                top: item.y,
              },
              activeStickerId ===
                item.id &&
                styles.selectedItem,
            ]}
          >
            <Pressable
              onLongPress={() =>
                deleteSticker(
                  item.id
                )
              }
            >
              <Text
                style={{
                  fontSize:
                    item.size,
                }}
              >
                {item.emoji}
              </Text>
            </Pressable>
          </View>
        );
      })}

      {/* DRAWING */}

      {renderDrawings()}

      {/* TEXT EDITOR */}

      {textEditorVisible && (
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
          style={
            styles.textEditorOverlay
          }
        >
          <SafeAreaView
            style={
              styles.textEditorContent
            }
          >

            <TouchableOpacity
              style={
                styles.textEditorClose
              }
              onPress={() =>
                setTextEditorVisible(
                  false
                )
              }
            >
              <Ionicons
                name="close"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>

            <TextInput
              autoFocus
              value={textValue}
              onChangeText={
                setTextValue
              }
              placeholder="Type something..."
              placeholderTextColor="#aaa"
              style={[
                styles.textEditorInput,
                {
                  color:
                    selectedTextColor,
                },
              ]}
              multiline
            />

            <View
              style={
                styles.colorRow
              }
            >
              {[
                "#fff",
                "#000",
                "#ff3040",
                "#00ff88",
                "#00bfff",
                "#ffff00",
                "#ff69b4",
              ].map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() =>
                    setSelectedTextColor(
                      color
                    )
                  }
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor:
                        color,
                    },
                    selectedTextColor ===
                      color &&
                      styles.selectedColor,
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={
                styles.doneButton
              }
              onPress={saveText}
            >
              <Text
                style={
                  styles.doneButtonText
                }
              >
                Done
              </Text>
            </TouchableOpacity>

          </SafeAreaView>
        </KeyboardAvoidingView>
      )}

      {/* STICKER MODAL */}

      <Modal
        visible={
          stickerModalVisible
        }
        transparent
        animationType="slide"
        onRequestClose={() =>
          setStickerModalVisible(
            false
          )
        }
      >
        <View
          style={
            styles.stickerModalBackdrop
          }
        >
          <View
            style={
              styles.stickerModal
            }
          >

            <View
              style={
                styles.stickerHeader
              }
            >
              <Text
                style={
                  styles.stickerTitle
                }
              >
                Stickers
              </Text>

              <TouchableOpacity
                onPress={() =>
                  setStickerModalVisible(
                    false
                  )
                }
              >
                <Ionicons
                  name="close"
                  size={27}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View
                style={
                  styles.stickerGrid
                }
              >
                {stickerList.map(
                  (emoji) => (
                    <TouchableOpacity
                      key={emoji}
                      style={
                        styles.stickerOption
                      }
                      onPress={() =>
                        addSticker(
                          emoji
                        )
                      }
                    >
                      <Text
                        style={{
                          fontSize: 42,
                        }}
                      >
                        {emoji}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </ScrollView>

          </View>
        </View>
      </Modal>

      {/* CAPTION */}

      {captionVisible && (
        <View
          style={
            styles.captionEditor
          }
        >
          <Ionicons
            name="chatbubble-outline"
            size={21}
            color="#777"
          />

          <TextInput
            autoFocus
            value={caption}
            onChangeText={
              setCaption
            }
            placeholder="Add a caption..."
            placeholderTextColor="#888"
            style={
              styles.captionInput
            }
          />

          <TouchableOpacity
            onPress={() =>
              setCaptionVisible(
                false
              )
            }
          >
            <Ionicons
              name="checkmark"
              size={25}
              color="#111"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* BOTTOM */}

      <View
        style={styles.bottomArea}
      >

        {!captionVisible && (
          <TouchableOpacity
            style={
              styles.captionButton
            }
            onPress={
              handleCaption
            }
          >
            <Ionicons
              name="chatbubble-outline"
              size={21}
              color="#fff"
            />

            <Text
              style={
                styles.captionButtonText
              }
            >
              Add caption
            </Text>
          </TouchableOpacity>
        )}

        <View
          style={
            styles.bottomButtons
          }
        >

          {/* YOUR STORY */}

          <TouchableOpacity
            style={
              styles.yourStoryButton
            }
            onPress={
              handleShareStory
            }
            disabled={uploading}
          >
            <View
              style={
                styles.storyAvatarBorder
              }
            >
              {user?.avatar_url ? (
                <Image
                  source={{
                    uri:
                      user.avatar_url,
                  }}
                  style={
                    styles.storyAvatar
                  }
                />
              ) : (
                <View
                  style={
                    styles.storyAvatarPlaceholder
                  }
                >
                  <Ionicons
                    name="person"
                    size={19}
                    color="#fff"
                  />
                </View>
              )}
            </View>

            <Text
              style={
                styles.yourStoryText
              }
            >
              {uploading
                ? "Sharing..."
                : "Your story"}
            </Text>
          </TouchableOpacity>

          {/* NEXT */}

          <TouchableOpacity
            style={
              styles.nextButton
            }
            onPress={
              handleShareStory
            }
            disabled={uploading}
          >
            <Text
              style={
                styles.nextText
              }
            >
              {uploading
                ? "Sharing..."
                : "Next"}
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
    },

    media: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width,
      height,
    },

    topOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 150,
      backgroundColor:
        "rgba(0,0,0,0.30)",
    },

    topSafe: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    },

    topBar: {
      height: 58,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
    },

    topTools: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    topButton: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        "rgba(0,0,0,0.35)",
    },

    activeTool: {
      backgroundColor:
        "rgba(255,255,255,0.30)",
    },

    draggableText: {
      position: "absolute",
      zIndex: 40,
      padding: 5,
    },

    selectedItem: {
      borderWidth: 1,
      borderColor:
        "rgba(255,255,255,0.5)",
    },

    overlayText: {
      fontWeight: "700",
      textAlign: "center",
      textShadowColor:
        "rgba(0,0,0,0.8)",
      textShadowOffset: {
        width: 1,
        height: 1,
      },
      textShadowRadius: 5,
    },

    textEditorOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor:
        "rgba(0,0,0,0.88)",
      zIndex: 100,
    },

    textEditorContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },

    textEditorClose: {
      position: "absolute",
      top: 20,
      right: 15,
      width: 45,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
    },

    textEditorInput: {
      width: "100%",
      minHeight: 100,
      maxHeight: 250,
      fontSize: 32,
      fontWeight: "700",
      textAlign: "center",
    },

    colorRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 25,
      gap: 12,
    },

    colorCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 2,
      borderColor:
        "rgba(255,255,255,0.4)",
    },

    selectedColor: {
      borderColor: "#fff",
      borderWidth: 3,
    },

    doneButton: {
      marginTop: 30,
      paddingHorizontal: 28,
      paddingVertical: 11,
      borderRadius: 22,
      backgroundColor: "#fff",
    },

    doneButtonText: {
      color: "#000",
      fontSize: 16,
      fontWeight: "700",
    },

    draggableSticker: {
      position: "absolute",
      zIndex: 45,
      padding: 5,
    },

    stickerModalBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor:
        "rgba(0,0,0,0.55)",
    },

    stickerModal: {
      maxHeight:
        height * 0.48,
      backgroundColor: "#171717",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingBottom: 25,
    },

    stickerHeader: {
      height: 60,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
      borderBottomWidth: 1,
      borderBottomColor:
        "#292929",
    },

    stickerTitle: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },

    stickerGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 15,
    },

    stickerOption: {
      width: "20%",
      height: 65,
      justifyContent: "center",
      alignItems: "center",
    },

    drawPoint: {
      position: "absolute",
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#fff",
    },

    captionEditor: {
      position: "absolute",
      left: 14,
      right: 14,
      bottom: 95,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      zIndex: 70,
    },

    captionInput: {
      flex: 1,
      marginLeft: 10,
      color: "#111",
      fontSize: 15,
    },

    captionButton: {
      alignSelf: "flex-start",
      height: 40,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor:
        "rgba(0,0,0,0.45)",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },

    captionButtonText: {
      color: "#fff",
      marginLeft: 8,
      fontSize: 14,
      fontWeight: "600",
    },

    bottomArea: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 14,
      paddingBottom: 20,
      paddingTop: 35,
      backgroundColor:
        "rgba(0,0,0,0.38)",
      zIndex: 60,
    },

    bottomButtons: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent:
        "space-between",
    },

    yourStoryButton: {
      height: 54,
      paddingHorizontal: 14,
      borderRadius: 27,
      backgroundColor:
        "rgba(255,255,255,0.18)",
      flexDirection: "row",
      alignItems: "center",
    },

    storyAvatarBorder: {
      width: 38,
      height: 38,
      borderRadius: 19,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },

    storyAvatar: {
      width: 34,
      height: 34,
      borderRadius: 17,
    },

    storyAvatarPlaceholder: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: "#444",
      justifyContent: "center",
      alignItems: "center",
    },

    yourStoryText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "700",
      marginLeft: 8,
    },

    nextButton: {
      height: 54,
      paddingHorizontal: 18,
      borderRadius: 27,
      backgroundColor:
        "rgba(255,255,255,0.18)",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    nextText: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "700",
      marginRight: 3,
    },
  });