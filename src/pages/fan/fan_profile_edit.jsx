import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layout/mainlayout";
import {
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  Text,
  IconButton,
  Icon,
} from "@chakra-ui/react";

import { useAuth } from "../../context/AuthContext";
import Header from "../../components/header/header";

import NFTListView from "../../components/artist/nft_list_view";
import FanProfileMainContainer from "../../components/fan/fan_profile_main_container";
import OSApi from "../../opensea/api";
import { ToastContainer, toast } from "react-toastify";
import { FanProfileTabPlaceholder } from "./fan_profile";
import { FaPencilAlt } from "react-icons/fa";
import BIOModal from "../../components/fan/bio_modal";
import UserNameModal from "../../components/fan/user_name_modal";
import UserAvatarModal from "../../components/fan/user_avatar_modal";
import { useApi } from "../../context/ApiContext";

export default function FanProfileEdit({}) {
  const { user, address, authtoken } = useAuth();
  const Api = useApi();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openBIOModal, setOpenBIOModal] = useState(false);
  const [openUserNameModal, setOpenUserNameModal] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limmit, setLimit] = useState(20);

  useEffect(() => {
    if (address) {
      (async () => {
        setLoading(true);
        await loadData(address);
      })();
    }
  }, [address]);

  const onCloseBioModal = () => {
    setOpenBIOModal(false);
  };
  const onCloseUserNameModal = () => {
    setOpenUserNameModal(false);
  };

  const onCamera = () => {
    setOpenAvatarModal(true);
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

  const onUpdateProfile = async ({ username, bio, avatar }) => {
    try {
      const res = await Api.updateUserProfile(user.id, username, bio, avatar);
      console.log({ res });
    } catch (ex) {
      toast(ex.message);
    }
  };
  return (
    <MainLayout>
      <Header />
      <FanProfileMainContainer
        onEdit={() => {}}
        onCamera={onCamera}
        isEditMode={true}
        onUserNameEdit={() => setOpenUserNameModal(true)}
      >
        <Box>
          <HStack mx={5} my={5}>
            <Text color="white" fontSize={"sm"} fontWeight="bold">
              { user ? user.bio : 'BIO'}
            </Text>
            <IconButton
              _focus={{ outline: "none" }}
              variant="solid"
              rounded={"full"}
              size="xs"
              ml={2}
              icon={<Icon w="15px" h="15px" as={FaPencilAlt} color="gray" />}
              onClick={() => {
                setOpenBIOModal(true);
              }}
            />
          </HStack>
          <Text></Text>
        </Box>
        <Box
          id="listContainer"
          minW="100%"
          minH="calc(100vh - 210px)"
          bg={"white"}
          py={2}
          top={"160px"}
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
      <BIOModal
        defBio={user ? user.bio : ""}
        isOpen={openBIOModal}
        onClose={onCloseBioModal}
        onSave={(newBio) => {
          onUpdateProfile({ bio: newBio });
        }}
      />
      <UserNameModal
        defName={user ? user.username : ""}
        isOpen={openUserNameModal}
        onClose={onCloseUserNameModal}
        onSave={(newUserName) => {
          onUpdateProfile({ username: newUserName });
        }}
      />
      <UserAvatarModal
        isOpen={openAvatarModal}
        defAvatar={""}
        onClose={() => {
          setOpenAvatarModal(false);
        }}
        onSave={(avatar) => {
          onUpdateProfile({ avatar });
        }}
      />
      <ToastContainer
        theme="dark"
        autoClose={false}
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </MainLayout>
  );
}
