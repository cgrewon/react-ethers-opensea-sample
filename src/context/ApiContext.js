import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

export const Host = process.env.REACT_APP_API_HOST;

const HttpReq = async (url, method = "GET", token, data) => {
  const headers = { Accept: "application/json" };

  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  try {
    const res = await axios({
      url,
      method: method,
      headers,
      data,
    });
    return res;
  } catch (ex) {
    return {
      status: -500,
      error: "Connection failed, please try again after check your connection.",
      errorDetail: ex,
    };
  }
};

const HttpGet = async (url, token) => {
  return await HttpReq(url, "GET", token);
};

const HttpPost = async (url, token, data) => {
  return await HttpReq(url, "POST", token, data);
};

const HttpPatch = async (url, token, data) => {
  return await HttpReq(url, "PATCH", token, data);
};

const HttpDelete = async (url, token, data) => {
  return await HttpReq(url, "DELETE", token, data);
};


export function ApiConfig() {
  const { address, authtoken } = useAuth();

  const getETHUSD = async () => {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

    const resEthUsd = await HttpGet(url);

    if (
      resEthUsd &&
      resEthUsd.status === 200 &&
      resEthUsd.data &&
      resEthUsd.data.ethereum &&
      resEthUsd.data.ethereum.usd
    ) {
      return resEthUsd.data.ethereum.usd;
    } else {
      console.log("Failed to get the rate for eth to usd.");
      return null;
    }
  };

  const loginViaEmail = async (email) => {
    const url = `${Host}api/user/auth/magic/login_req`;

    const data = { email };

    return await HttpPost(url, null, data);
  };
  const register = async (username, email, pwd) => {
    const url = `${Host}api/user/auth/register`;

    const data = {
      username: username,
      email: email,
      password: pwd,
      role: "artist",
    };

    return await HttpPost(url, null, { user: data });
  };
  const magicLogin = async (code) => {
    const url = `${Host}api/user/auth/magic/login`;

    const data = {
      code: code,
    };

    return await HttpPost(url, null, data);
  };
  const sendConfirmEmail = async (userId) => {
    const url = `${Host}api/user/auth/confirm/email`;

    const data = {
      userId,
    };

    return await HttpPost(url, null, data);
  };
  const checkToken = async (authtoken) => {
    const url = `${Host}api/user/auth/token/check`;

    return await HttpPost(url, authtoken, {});
  };
  const addWallet = async (wallet, address) => {
    const url = `${Host}api/user-wallet/create`;

    const data = {
      wallet,
      address,
    };

    return await HttpPost(url, authtoken, data);
  };

  const createFollowing = async (user_id, artist_id) => {
    const url = `${Host}api/fan/create`;
    const data = {
      user_id,
      artist_id,
    };
    return await HttpPost(url, authtoken, data);
  };

  const getNumberFans = async (artist_id) => {
    const url = `${Host}api/fan/number_fans/${artist_id}`;
    return await HttpGet(url, authtoken);
  };
  const getNumberFollowings = async (fanId) => {
    const url = `${Host}api/fan/number_followings/${fanId}`;

    return await HttpGet(url, authtoken);
  };
  const getFans = async (artist_id, offset = 0, limit = 20) => {
    const url = `${Host}api/fan/fans/${artist_id}/${offset}/${limit}`;

    return await HttpGet(url, authtoken);
  };
  const getFollowings = async (fanId, offset = 0, limit = 20) => {
    const url = `${Host}api/fan/followings/${fanId}/${offset}/${limit}`;
    return await HttpGet(url, authtoken);
  };
  const unfollowing = async (fanId, artistId) => {
    const url = `${Host}api/fan/unfollowing/${fanId}/${artistId}`;
    return await HttpDelete(url, authtoken);
  };
  const updateUserProfile = async (userId, username, bio, avatar) => {
    const url = `${Host}api/user/update/${userId}`;
    const data = {
      username,
      bio,
      avatar,
    };
    return await HttpPatch(url, authtoken, data);
  };

  return {
    getETHUSD,
    loginViaEmail,
    register,
    magicLogin,
    sendConfirmEmail,
    checkToken,
    addWallet,
    createFollowing,
    getNumberFans,
    getNumberFollowings,
    getFans,
    getFollowings,
    unfollowing,
    updateUserProfile,
  };
}

const ApiContext = createContext({
  getETHUSD: undefined,
  loginViaEmail: undefined,
  register: undefined,
  magicLogin: undefined,
  sendConfirmEmail: undefined,
  checkToken: undefined,
  addWallet: undefined,
  createFollowing: undefined,
  getNumberFans: undefined,
  getNumberFollowings: undefined,
  getFans: undefined,
  getFollowings: undefined,
  unfollowing: undefined,
  updateUserProfile: undefined,
});

export const ApiProvider = ({ children }) => {
  const value = ApiConfig();
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
