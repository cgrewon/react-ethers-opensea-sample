import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/mainlayout";
import { Box, Text, HStack } from "@chakra-ui/react";
import Header from "../../components/header/header";

import ArtistProfileMainContainer from "../../components/artist/profile_main_container";
import NFTListView from "../../components/artist/nft_list_view";
import OSApi from "../../opensea/api";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function AristNFTView({}) {
  const { address } = useAuth();
  const [offset, setOffset] = useState(0);
  const [limmit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  const [assets, setAssets] = useState([]);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [owners, setOwners] = useState(0);

  useEffect(() => {
    if (address) {
      (async () => {
        await loadData(address);
        await getTotalNFTs(address, 0);
      })();
    }
  }, [address]);

  const getTotalNFTs = async (owner, offset = 0) => {
    try {
      const res = await OSApi.getCollectionsOfOwner(owner, offset);
      if (res.status == 200 && res.data) {
        if (offset == 0) {
          setTotalNFTs(res.data.length);
        } else {
          setTotalNFTs(totalNFTs + res.data.length);
        }

        if (res.data.length >= 300) {
          setTimeout(() => {
            getTotalNFTs(owner, offset + 1);
          }, 2000);
        }
      }
    } catch (ex) {
      console.log("Ex at getTotalNFTs", ex);
    }
  };

  const loadData = async (owner) => {
    setLoading(true);
    try {
      const res = await OSApi.getAssetsOfOwner(owner, offset, limmit);
      if (res.status == 200) {
        if (offset > 0) {
          let newData = [...assets, ...res.data.assets];
          setAssets(newData);
        } else {
          setAssets(res.data.assets);
        }
      } else {
        console.log("Status is not 200", res);
      }
    } catch (ex) {
      toast("Failed to loading, please try again.");
    }
    setLoading(false);
  };

  return (
    <MainLayout>
      <Header />
      <ArtistProfileMainContainer>
        <HStack justifyContent={"center"} w="100vw" mt={3} gap={2}>
          <Box mx={2}>
            <Text color="gray.500" fontSize={"md"}>
              NFTS
            </Text>
            <Text fontWeight={"bold"} fontSize="md">
              {totalNFTs}
            </Text>
          </Box>
          <Box mx={2}>
            <Text color="gray.500" fontSize={"md"}>
              OWNERS
            </Text>
            <Text fontWeight={"bold"} fontSize="md">
              {owners}
            </Text>
          </Box>
        </HStack>
        <Box mx={3}>
          <NFTListView
            title="ITEMS Activity"
            cols={{ base: 2, md: 4, lg: 6 }}
            assets={assets}
          />
        </Box>
      </ArtistProfileMainContainer>
      <ToastContainer
        autoClose={false}
        theme="dark"
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </MainLayout>
  );
}
