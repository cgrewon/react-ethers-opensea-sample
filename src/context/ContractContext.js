import React, { createContext, useContext, useEffect } from "react";


import { ERC1155 } from "../config/ERC1155";
import { ERC20 } from "../config/ERC20";
import { ERC721 } from "../config/ERC721";

import {getWeb3} from "./AuthContext";
import { useAuth } from "./AuthContext";
import { useApi } from "./ApiContext";

export const ZERO_ADDR = "0x0000000000000000000000000000000000000000";


export const NFT_TYPE = {
  ERC721: 0,
  ERC1155: 1,
};


export function ContractConfig() {
  
  const { address, getBalance } = useAuth();
  const [web3, setWeb3] = React.useState();  
  const Api = useApi()

  const getNftContract = async (tokenAddr, schema = NFT_TYPE.ERC721) => {
    const _web3 = await getWeb3();

    let cont;
    if (schema == 'ERC721') {
      cont = new _web3.eth.Contract(ERC721, tokenAddr);
    } else if (schema == 'ERC1155') {
      cont = new _web3.eth.Contract(ERC1155, tokenAddr);
    }

    return cont;
  }

  const checkNFTContractValidation = async (schema, tokenAddr, receiver) => {

    const nftCont = await getNftContract(tokenAddr, schema);

    return new Promise((resolve, reject) => {
      nftCont.methods.setApprovalForAll(receiver, true).estimateGas().
        then(gasAmount => {
  
          resolve(gasAmount);
        })
        .catch(error => {
          console.log('error:', error);
          reject(error);
        })
    });

  }


  const getChainLinkETHUSD = async () => {

    return new Promise(async (resolve, reject) => {
      try {
        const res = await Api.getETHUSD();
        if (!res) {
          reject('ETH/USD not fetched using coingecko')
        }
        resolve(parseFloat(res));
      } catch (ex) {
        reject(ex.message)
      }
    })

  }

  const getNFTContract = async (tokenAddr, schemaType) => {
    const _web3 = await getWeb3();

    let abi = null;
    if (schemaType.toLowerCase() == "erc721") {
      abi = ERC721;
    } else if (schemaType.toLowerCase() == "erc1155") {

      abi = ERC1155;
    } else {

      return null;
    }
    const nftContract = new _web3.eth.Contract(
      abi,
      tokenAddr
    );
    return nftContract;
  }

  const checkNFTOwner = async (tokenAddr, schemaType, tokenId, ownerAddr) => {
    const nftContract = await getNFTContract(tokenAddr, schemaType);

    if (!nftContract) {

      return null;
    }
    let res = undefined;

    if (schemaType.toUpperCase() == 'ERC1155') {

      if (ownerAddr != ZERO_ADDR) {

        res = await nftContract.methods.balanceOf(ownerAddr, tokenId).call();
        res = !!res;
      } else {
        res = true;
      }
    } else if (schemaType.toUpperCase() == 'ERC721') {

      res = await nftContract.methods.ownerOf(tokenId).call();

      res = res.toUpperCase() == ownerAddr.toUpperCase();
    } else {
      res = null;
    }

    return res;
  }

  const initContract = async () => {

    try {
      const _web3 = await getWeb3();
      setWeb3(_web3);
    
      return true;
    } catch (ex) {
      return false;
    }
  };


  useEffect(() => {
    (async () => {
      await initContract();      
    })();


    return () => {
      
    }
  }, []);

  return {
    web3,
    checkNFTOwner,
    getChainLinkETHUSD,   
    getNftContract,
    checkNFTContractValidation
  };
}

const contractContext = createContext({
  web3: undefined,    
  checkNFTOwner: undefined,
  getChainLinkETHUSD: undefined,  
  getNftContract: undefined,
  checkNFTContractValidation: undefined,
});

export const ContractProvider = ({ children }) => {
  const value = ContractConfig();
  return (
    <contractContext.Provider value={value}>
      {children}
    </contractContext.Provider>
  );
};

export const useContract = () => useContext(contractContext);
