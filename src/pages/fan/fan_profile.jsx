import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/mainlayout";
import {
  Box,
  Text,
  Stack,
  Icon,
  Flex,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { BsImageFill } from "react-icons/bs";

import { useAuth } from "../../context/AuthContext";
import Header from "../../components/header/header";

import NFTListView from "../../components/artist/nft_list_view";
import FanProfileMainContainer from "../../components/fan/fan_profile_main_container";
import OSApi from "../../opensea/api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function FanProfileTabPlaceholder({
  title,
  subtitle,
  onBrowse,
  isLoading,
}) {
  return (
    <Stack align={"center"} my={3}>
      <Icon as={BsImageFill} color="blackAlpha.600" w={10} h={10} />
      <Text fontSize={["xs", "sm", "md"]} color="blackAlpha.800">
        {title}
      </Text>
      <Text
        fontSize={["xs", "sm", "md"]}
        textAlign={"center"}
        color="blackAlpha.700"
      >
        You can{" "}
        <Button size="md" variant={"link"} color="teal" onClick={onBrowse}>
          {" "}
          browse artists
        </Button>{" "}
        on DemoVerse and {subtitle}
      </Text>
      <Button
        size="sm"
        variant={"outline"}
        colorScheme="cyan"
        isLoading={isLoading}
        onClick={onBrowse}
      >
        BROWSE ARTISTS
      </Button>
    </Stack>
  );
}

export default function FanProfile({}) {
  const { user, address } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limmit, setLimit] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      (async () => {
        setLoading(true);
        await loadData(address);
      })();
    }
  }, [address]);

  const onEdit = async () => {
    navigate("/fan/edit");
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
      <FanProfileMainContainer onEdit={onEdit}>
        <Box
          id="listContainer"
          minW="100%"
          minH="calc(100vh - 210px)"
          bg={"white"}
          py={2}
          top={"130px"}
          zIndex={2}
          position="absolute"
          transition={"all ease 0.3s"}
          filter={"drop-shadow(0 0 0.5rem #e2e2e2)"}
        >
          <Tabs isFitted w={"100%"}>
            <TabList mb="1em">
              <Tab _focus={{ outline: "none" }} fontSize={["xs", "sm", "md"]}>
                COLLECTED({assets.length})
              </Tab>
              <Tab _focus={{ outline: "none" }} fontSize={["xs", "sm", "md"]}>
                FAVORITES({assets.length})
              </Tab>
              <Tab _focus={{ outline: "none" }} fontSize={["xs", "sm", "md"]}>
                MEMBERSHIPS({assets.length})
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {assets.length == 0 && (
                  <FanProfileTabPlaceholder
                    title="You haven't collected any NFTs."
                    subtitle={"become a fan by collecting their membership NFT"}
                    onBrowse={() => {}}
                  />
                )}
                <NFTListView
                  assets={assets}
                  isLoading={loading}
                  title="MEMBERSHIP NFT SUGGESTIONS"
                  showViewAll={false}
                  cols={{ base: 2, md: 2, lg: 4, xl: 6 }}
                />
              </TabPanel>
              <TabPanel>
                {assets.length == 0 && (
                  <FanProfileTabPlaceholder
                    title="You haven't marked any favorite NFTs."
                    subtitle={"select a few membership NFTs that you like."}
                    onBrowse={() => {}}
                  />
                )}
                <NFTListView
                  assets={assets}
                  isLoading={loading}
                  title="ARTIST SSUGGESTIONS"
                  cols={{ base: 2, md: 2, lg: 4, xl: 6 }}
                  showViewAll={false}
                />
              </TabPanel>
              <TabPanel>
                {assets.length == 0 && (
                  <FanProfileTabPlaceholder
                    title="You don't have any active memberships"
                    subtitle={"become a fan of a band that you like"}
                    onBrowse={() => {}}
                  />
                )}
                <NFTListView
                  assets={assets}
                  isLoading={loading}
                  title="FREE CONTENT"
                  cols={{ base: 2, md: 2, lg: 4, xl: 6 }}
                  showViewAll={false}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </FanProfileMainContainer>
      <ToastContainer
        autoClose={false}
        theme="dark"
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </MainLayout>
  );
}
