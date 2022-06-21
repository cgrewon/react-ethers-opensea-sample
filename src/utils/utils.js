
import {getWeb3} from "../context/AuthContext";


export const Utils = {

  Orders:[
    '1st', '2nd', '3rd', '4th','5th','6th', '7th', '8th','9th','10th','11th','12th','13th'
  ],
  shortStr: (str, len = 15) => {
    if (!str) {
      return "";
    }
    let res = str.toString().substring(0, len);
    if(res.length < str.length) {
      return res + '...';
    }
    return res;
  },

  shortAddr: (hash) => {
    if (hash.length < 8) {
      return hash;
    }
    const len = hash.length;
    const shortAccAddress =
      hash.slice(0, 7) + "..." + hash.slice(len - 5, len);

    return shortAccAddress;
  },

  fixedToSignificant:(fval, len=8)=>{
    
    const toFixed = parseFloat(fval+'').toFixed(len);
    let strList = toFixed.split('.');
    
    if (strList.length === 1) {
      return strList;
    } else {

      let digit = '';
      let nonZero = false;

      for (let i = strList[1].length-1; i >= 0; i--) {
        const char = strList[1].substr(i, 1);
        nonZero = nonZero || char !== '0';
        if (char === '0' && !nonZero) {
          continue;
        }
        digit = char + digit;
      }
      
      return digit.length > 0 ? strList[0]+'.'+digit : strList[0];
    }
    
  },
  firstUpper: (str) => {
    if (!str) {
      return str;
    }

    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
  },

  checkMediaType: (urlStr) => {
    const types = new Map([
      ["jpg", "img"],
      ["jpeg", "img"],
      ["gif", "img"],
      ["png", "img"],
      ["mp4", "video"],
      ["mov", "video"],
      ["3gp", "video"],
    ]);
    try {
      const url = new URL(urlStr);
      const extension = url.pathname.split(".")[1];

      return types.get(extension) || "img";
    } catch (ex) {
      return "img";
    }
  },
  ValidImgUrl: (url) => {
    if (url) {
      return url.trim() !== "";
    }
    return false;
  },

  getWalletAddresses: async ()=>{
    
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
     
      if (accounts.length ) {
        window.sessionStorage.setItem('wallet', accounts[0]);
        window.sessionStorage.setItem('wallet_net', networkId);
      }
      
      return accounts;
    } catch (err) {      
      return null;
    }
  },

  isMobile: ()=>{
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  },
  
  getOpenseaNFTUrl:(tokenId, tokenAddr)=>{
    const prefix = process.env.REACT_APP_NETWORK == 'test' ? 'testnets.' : '';
    return `https://${prefix}opensea.io/assets/${tokenAddr}/${tokenId}`;
  },
  

};

export const VColor = {
  blue: "#6D8EB5",
  darkblue: "#557396",
  opacityBlue: "#DFE3ED",
  black: "#000000",
  white: "#FFFFFF",
  opacityWhite: "#C4D2E1",
  gray: "#979797",
  lightGray: "#F4F4F4",
  darkGray: "#666666",
  red: "#B00020",
  lightGreen: "#B4FC9B",
  opacityBlack: "#0003",
  transparent: "#0000",
};
