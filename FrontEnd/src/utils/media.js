import { BASE_URL } from "./api";

export const getMediaUrl = (url) => {
  if (!url) return null;

  return url.startsWith("http")
    ? url
    : `${BASE_URL}${url}`;
};