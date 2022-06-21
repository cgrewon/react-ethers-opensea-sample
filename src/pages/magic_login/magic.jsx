import React, { useEffect, useCallback } from "react";
import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import Banner1 from "../../assets/music.jpeg";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useApi } from "../../context/ApiContext";

const Magic = ({}) => {
  const navigate = useNavigate();
  const Api = useApi();
  const { storeUser, storeToken } = useAuth();

  const { code } = useParams();

  const gotoRoot = () => {
    navigate("/");
  };
  const loginWithCode = async () => {
    if (!code) {
      gotoRoot();
      return;
    }

    try {
      const res = await Api.magicLogin(code);
      console.log({ res });
      if (res.status != 201) {
        toast("Invalid link.");
        gotoRoot();
      } else {
        storeUser(res.data.user);
        storeToken(res.data.token);
        navigate("/");
      }
    } catch (ex) {
      console.log("Exception at Magic : ", ex);
      toast("Failed to login via email, please try again.");
    }
  };

  useEffect(() => {
    if (code) {
      loginWithCode();
    }
  }, [code]);

  return (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems="center">
      <Box>
        <Spinner color="red.500" size={"lg"} />
        <Text size={"md"} color="black">
          Please wait for a moment...
        </Text>
      </Box>
      <ToastContainer
        autoClose={false}
        theme="dark"
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </Flex>
  );
};

export default Magic;
