import "./login.scss";

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
import MainLayout from "../../components/layout/mainlayout";
import { useApi } from "../../context/ApiContext";

const Login = ({}) => {
  const Api = useApi();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = async () => {
    console.log("onlogin");

    if (!email) {
      toast("Please enter your email.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await Api.loginViaEmail(email);
      console.log("res", res);
      if (res.status != 201) {
        toast(res.errorDetail.response.data.message);
      } else {
        toast("Please check your mail inbox.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (ex) {
      console.log(ex);
      toast("Failed to login, please try again after refresh.");
    }
    setIsLoading(false);
  };

  return (
    <MainLayout w="100vw" h="100vh" overflowY={"auto"}>
      <Flex w={"100%"} h="100%" justifyContent={"center"} alignItems="center">
        <Stack
          filter={"drop-shadow(0 0 0.75rem #3333)"}
          w={"40%"}
          maxW="400px"
          minW={"300px"}
          p={10}
          bg="white"
          gap={4}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText textAlign={"left"}>
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <Button
            colorScheme="teal"
            isLoading={isLoading}
            variant="solid"
            onClick={onLogin}
          >
            Login via Email
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
};

export default Login;
