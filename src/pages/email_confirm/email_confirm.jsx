import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Link,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../../components/layout/mainlayout";
import { useApi } from "../../context/ApiContext";

export default function EmailConfirm({}) {
  const Api = useApi();
  const [email, setEmail] = useState("");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onResend = async () => {
    if (!user) {
      toast("Please refresh page and try signup again.");
      navigate();
      return;
    }

    setIsLoading(true);
    try {
      const res = await Api.sendConfirmEmail(user.id);
      if (res.status != 201) {
        toast(res.errorDetail.response.data.message);
      } else {
        toast("Please check your mail inbox.");
        navigate("/");
      }
    } catch (ex) {
      console.log(ex);
      toast("Failed to send confirm email, please try again.");
    }
    setIsLoading(false);
  };

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
            Please confirm your inbox to verify your email.
          </Text>
          <Text color="black" fontSize="md">
            After activate your account, please connect wallets.
          </Text>
          <Button
            colorScheme="teal"
            mx="auto"
            my={10}
            w={"200px"}
            isLoading={isLoading}
            variant="solid"
            onClick={onResend}
          >
            Resend
          </Button>
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
