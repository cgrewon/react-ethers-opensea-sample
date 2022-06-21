import { Wallet } from "ethers";
import React, { createContext, useContext } from "react";
import Web3 from "web3";
import { useApi } from "./ApiContext";
// import { Api } from "../services/API";

export const WalletType = {
  MetaMask: "metamask",
  Coinbase: "coinbase",
  Alpha: "alpha",
};

export const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    // window.addEventListener("load", async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();

        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      const web3 = window.web3;

      resolve(web3);
    } else {
      reject(new Error("web3 is not allowed"));
    }
  });
};

export const TokenKey = "t_k";
export const UserKey = "u_k";
export const BalanceKey = "bal_k_ctxt";

function useAuthConfig() {
  // const savedToken = window.sessionStorage.getItem(TokenKey);
  // let savedUser = window.sessionStorage.getItem(UserKey);
  // let savedWallet = window.sessionStorage.getItem("wallet");
  // let savedWalletNet = window.sessionStorage.getItem("wallet_net");
  // savedUser = savedUser ? JSON.parse(savedUser) : undefined;

  // console.log({ savedUser })
  const Api  = useApi()
  const [user, setUser] = React.useState();
  const [authtoken, setAuthToken] = React.useState();
  const [selWallet, setSelWallet] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState();
  const [shortAddr, setShortAddr] = React.useState();
  const [balance, setBalance] = React.useState();
  const [requireSignup, setRequireSignup] = React.useState(false);

  const [isRightNet, setIsRightNet] = React.useState(undefined);

  const storeToken = (val) => {
    setAuthToken(val);
    window.sessionStorage.setItem(TokenKey, val);
  };

  const storeUser = (obj) => {
    setUser(obj);
    console.log("user string : ", JSON.stringify(obj));
    window.sessionStorage.setItem(UserKey, JSON.stringify(obj));
  };

  const storeBalance = (val) => {
    setBalance(val);
    window.sessionStorage.setItem(BalanceKey, val);
  };

  const disConnectMetamask = async () => {
    clear();
  };

  const connectMetamask = async () => {
    setSelWallet(WalletType.MetaMask);
    try {
      setLoading(true);
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setSelWallet(WalletType.MetaMask);
        window.sessionStorage.setItem("wallet", accounts[0]);
        window.sessionStorage.setItem("wallet_net", WalletType.MetaMask);

        const shortAccAddress =
          accounts[0].slice(0, 4) + ". . ." + accounts[0].slice(38, 42);
        setShortAddr(shortAccAddress);

        try {
          const resAddWallet = await Api.addWallet(
            WalletType.MetaMask,
            accounts[0]
          );
          console.log("resAddWallet : ", { resAddWallet });
          const res = await Api.checkToken(authtoken);
          console.log("checkToken Result : ", { res });
          if (res && res.data) {
            storeUser(res.data.user);
            storeToken(res.data.token);
          }
        } catch (ex) {
          console.log("ex: ", ex);
        }

        return await checkNetwork();
      } else {
        setLoading(false);
        return undefined;
      }
    } catch (err) {
      setLoading(false);
      return err;
    }
  };

  const clear = () => {
    setAddress(undefined);
    setBalance(undefined);
    setShortAddr(undefined);
    setSelWallet(undefined);
    setUser(undefined);
    setAuthToken(undefined);
    localStorage.clear();
    sessionStorage.clear();
  };

  async function checkNetwork() {
    const web3 = await getWeb3();
    const chainInfo = await getNetwork(web3);
    if (!chainInfo) {
      setIsRightNet(false);
      return;
    }

    const isLive = process.env.REACT_APP_NETWORK == "live";

    const _isRightNet =
      (isLive && chainInfo.ChainId == 1) || (!isLive && chainInfo.ChainId == 4);

    setIsRightNet(_isRightNet);
    return;
  }

  const getNetWorkChangeMessage = () => {
    if (!isRightNet) {
      const mode =
        process.env.REACT_APP_NETWORK === "live"
          ? "Mainnet"
          : "Rinkeby Testnet";
      // const mode = 'Mainnet';
      const msg = `You are not in right network, please change network to ${mode}`;
      return msg;
    } else {
      return null;
    }
  };

  async function getNetwork(web3) {
    const chainID = await web3.eth.net.getId();
    const chainInfo = getNetworkName(chainID);

    return chainInfo;
  }

  function getNetworkName(chainID) {
    //ChainType is an interface that has a chainId and chainName.

    const network = [
      { ChainId: 1, ChainName: "Ethereum Mainnet", symbol: "ETH" },
      { ChainId: 3, ChainName: "Ropsten Testnet", symbol: "ETH" },
      { ChainId: 4, ChainName: "Ethereum Rinkeby", symbol: "ETH" },
      { ChainId: 56, ChainName: "Binance Smart Chain", symbol: "BNB" },
      { ChainId: 97, ChainName: "Binance Smart Chain Testnet", symbol: "BNB" },
      { ChainId: 42, ChainName: "Kovan Testnet", symbol: "ETH" },
      { ChainId: 80001, ChainName: "Polygon Mumbai Testnet", symbol: "MATIC" },
      { ChainId: 137, ChainName: "Polygon Mainnet", symbol: "MATIC" },
    ];

    return network.find((i) => i.ChainId === chainID);
  }

  const accountsChanged = (accounts) => {
    if (accounts.length === 0) {
      clear();
    } else {
      setAddress(accounts[0]);
      window.sessionStorage.setItem("wallet", accounts[0]);
    }
  };

  const getBalance = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      setAddress(accounts[0]);
      const val = await web3.eth.getBalance(accounts[0]);

      const balance = web3.utils.fromWei(val);
      storeBalance(parseFloat(balance).toFixed(4));
    } catch (ex) {
      console.log("while getBalance: ex => address: " + address, " ex:", ex);
    }
  };

  const signOut = () => {
    clear();
  };

  React.useEffect(() => {
    const addr = window.sessionStorage.getItem("wallet");
    if (addr) {
      connectMetamask();
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        if (address) {
          await getBalance();
          await checkNetwork();
        } else {
          clear();
        }
      } catch (ex) {
        console.log("error before clean :", ex);
        clear();
      }
    })();
  }, [address]);

  const onChainChanged = async (chainId) => {
    await getBalance();
    await checkNetwork();
  };

  const onEthMessage = async (message) => {};

  const onDisconnect = async (error) => {
    alert("disconnect");
  };

  const onConnect = async (connectInfo) => {
    // alert('onConnect :  ' + JSON.stringify(connectInfo, null, 2))
  };

  const initData = () => {
    const savedToken = window.sessionStorage.getItem(TokenKey);
    let savedUser = window.sessionStorage.getItem(UserKey);
    let savedWallet = window.sessionStorage.getItem("wallet");
    let savedWalletNet = window.sessionStorage.getItem("wallet_net");
    savedUser = JSON.parse(savedUser);
    setUser(savedUser);
    console.log("setauth token: ", savedToken);
    setAuthToken(savedToken);
    setAddress(savedWallet);
    setSelWallet(savedWalletNet);
  };

  React.useEffect(() => {
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", accountsChanged);
      window.ethereum.on("accountsChanged", accountsChanged);

      window.ethereum.removeListener("connect", onConnect);
      window.ethereum.on("connect", onConnect);

      window.ethereum.removeListener("disconnect", onDisconnect);
      window.ethereum.on("disconnect", onDisconnect);

      window.ethereum.removeListener("chainChanged", onChainChanged);
      window.ethereum.on("chainChanged", onChainChanged);

      window.ethereum.removeListener("message", onEthMessage);
      window.ethereum.on("message", onEthMessage);
    }

    if (selWallet === WalletType.MetaMask) {
      connectMetamask();
    }

    initData();

    return () => {};
  }, []);

  return {
    user,
    authtoken,
    selWallet,
    loading,
    address,
    shortAddr,
    connectMetamask,
    disConnectMetamask,
    balance,
    storeUser,
    storeToken,
    requireSignup,
    setRequireSignup,
    isRightNet,
    getNetWorkChangeMessage,
    getBalance,
    signOut,
  };
}

const authUserContext = createContext({
  user: undefined,
  authtoken: undefined,
  selWallet: undefined,
  loading: false,
  address: undefined,
  shortAddr: undefined,
  connectMetamask: undefined,
  disConnectMetamask: undefined,
  storeUser: undefined,
  storeToken: undefined,
  requireSignup: undefined,
  setRequireSignup: undefined,
  isRightNet: undefined,
  getNetWorkChangeMessage: undefined,
  signOut: undefined,
});

export const AuthUserProvider = ({ children }) => {
  const value = useAuthConfig();

  return (
    <authUserContext.Provider value={value}>
      {children}
    </authUserContext.Provider>
  );
};

export const useAuth = () => useContext(authUserContext);
