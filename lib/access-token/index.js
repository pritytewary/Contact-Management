// /lib/access-token.js

import cookie from "js-cookie";

const ACCESS_TOKEN_NAME = "access_token";

export const putAccessToken = (token) => {
  const expiresInSec = 60 * 60 * 24; // 24 hours
  const dateInSec = new Date(new Date().getTime() + expiresInSec * 1000);

  // Set the access token into the browser cookie
  cookie.set(ACCESS_TOKEN_NAME, token, { expires: dateInSec });
  console.log("Access token cookie is set");
};

export const getAccessToken = () => {
  // Fetch the access token from the browser cookie
  return cookie.get(ACCESS_TOKEN_NAME);
};

export const removeAccessToken = () => {
  cookie.remove(ACCESS_TOKEN_NAME);
};
