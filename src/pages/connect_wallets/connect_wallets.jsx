import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../../components/layout/mainlayout";
import MetamaskLogo from "../../assets/metamask_logo.png";
import CoinbaseLogo from "../../assets/coinbase.png";
import AlphawalletLogo from "../../assets/alphawallet.png";
import UserRole from "../../utils/role.enum";

export default function ConnectWallets({}) {
  const { user, connectMetamask, address } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onMetamask = async () => {
    setIsLoading(true);
    await connectMetamask();
    setIsLoading(false);
  };

  useEffect(() => {
    console.log({
      address,
      user,
    });
    if (address && user.wallets && user.wallets.length > 0) {
      navigate(user.role == UserRole.Artist ? "/artist" : "fan");
    }
  }, [address, user]);

  return (
    <MainLayout>
      <Flex w={"100%"} h="100%" justifyContent={"center"} alignItems="center">
        <Stack
          w={"60%"}
          minW="300px"
          p={10}
          bg="white"
          gap={4}
          align={"center"}
        >
          <Text color="" fontSize="md">
            Awesome!
          </Text>
          <Text color="black" fontSize="lg">
            Your registration is complete!
          </Text>
          <Text color="" fontSize="md">
            Before you begin your NFT journey need to connect your wallet.
          </Text>

          <Button
            colorScheme="teal"
            mx="auto"
            my={10}
            w={"200px"}
            isLoading={isLoading}
            variant="solid"
            onClick={onMetamask}
          >
            CONNECT WALLET
          </Button>
          <Text color="" fontSize="md" maxW={"300px"}>
            Don't have a wallet yet? We recommend creating one with top NFT
            wallets.
          </Text>
          <Grid
            templateColumns={{ md: "repeat(3, 1fr)", sm: "repeat(1, 1fr)" }}
            gap={10}
            w={"90%"}
          >
            <GridItem>
              <Button
                filter={"drop-shadow(0 0 0.75rem #3333)"}
                w={"100%"}
                _focus={{ outline: "none" }}
                bg="white"
                h={"180px"}
              >
                <Box pb={"20px"}>
                  <Box w={"100%"} h={"120px"} pt={5}>
                    <Image src={MetamaskLogo} w={"80px"} mx="auto" />
                  </Box>

                  <Text color="black">MetaMask</Text>
                </Box>
              </Button>
            </GridItem>
            <GridItem>
              <Button
                filter={"drop-shadow(0 0 0.75rem #3333)"}
                w={"100%"}
                _focus={{ outline: "none" }}
                bg="white"
                h={"180px"}
              >
                <Box pb={"20px"}>
                  <Box w={"100%"} h={"120px"} pt={5}>
                    <Image
                      src={CoinbaseLogo}
                      w={"80px"}
                      borderRadius={"40px"}
                      mx="auto"
                    />
                  </Box>

                  <Text color="black">Coinbase</Text>
                </Box>
              </Button>
            </GridItem>
            <GridItem>
              <Button
                filter={"drop-shadow(0 0 0.75rem #3333)"}
                w={"100%"}
                _focus={{ outline: "none" }}
                bg="white"
                h={"180px"}
              >
                <Box pb={"20px"}>
                  <Box w={"100%"} h={"120px"} pt={5}>
                    <Image src={AlphawalletLogo} w={"80px"} mx="auto" />
                  </Box>

                  <Text color="black">Alpha Wallet</Text>
                </Box>
              </Button>
            </GridItem>
          </Grid>
        </Stack>
      </Flex>

      <ToastContainer
        autoClose={false}
        theme="dark"
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </MainLayout>
  );
}
