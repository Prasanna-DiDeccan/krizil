import { createSelector } from "@reduxjs/toolkit";

// =====================================================
// PROFILE
// =====================================================

export const selectProfile = (state) =>
  state.profile.profileData;

// =====================================================
// INDIVIDUAL VALUES
// =====================================================

export const selectUserId = (state) =>
  state.profile.profileData?.id || null;

export const selectUsername = (state) =>
  state.profile.profileData?.username || "";

export const selectFullName = (state) =>
  state.profile.profileData?.full_name || "";

export const selectAvatarUrl = (state) =>
  state.profile.profileData?.avatar_url || null;

export const selectBio = (state) =>
  state.profile.profileData?.bio || "";

// =====================================================
// GLOBAL USER
// =====================================================
// Use this everywhere in the app when you need:
// id, username, full_name, avatar_url, bio
// =====================================================

export const selectGlobalUser = createSelector(
  [selectProfile],

  (profile) => ({
    id: profile?.id || null,
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    avatar_url: profile?.avatar_url || null,
    bio: profile?.bio || "",
  })
);