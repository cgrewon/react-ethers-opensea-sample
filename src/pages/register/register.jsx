import "./register.scss";

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
// import { Api } from "../../services/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import MainLayout from "../../components/layout/mainlayout";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../context/ApiContext";

const Register = ({}) => {
  const navigate = useNavigate();
  const Api = useApi();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [username, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { storeUser, storeToken } = useAuth();

  const onReigster = async () => {
    console.log("onlogin");

    if (!email) {
      toast("Please enter your email.");
      return;
    }

    if (!pwd) {
      toast("Please enter your password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await Api.register(username, email, pwd);
      console.log(res);
      if (res.status != 201) {
        toast(res.errorDetail.response.data.message);
        setIsLoading(false);
      } else {
        console.log("res.data.user: ", res.data.user);
        console.log("res.data.token: ", res.data.token);
        storeUser(res.data.user);
        storeToken(res.data.token);
        setIsLoading(false);
        toast("Please check your mail inbox to activate your account.");
        navigate("/email_confirm");
      }
    } catch (ex) {
      setIsLoading(false);
      console.log(ex);
      toast("Failed to register, please try again.");
    }
  };

  return (
    <MainLayout>
      <Flex w={"100%"} h="100%" justifyContent={"center"} alignItems="center">
        <Stack
          filter={"drop-shadow(0 0 0.75rem #3333)"}
          w={"40%"}
          maxW="400px"
          minW={"320px"}
          p={10}
          bg="white"
          gap={4}
        >
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pwd">Password</FormLabel>
            <Input
              id="pwd"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            onClick={onReigster}
            isLoading={isLoading}
          >
            Sign Up
          </Button>
          <Flex justifyContent={"center"}>
            <Text color="teal" fontSize="sm">
              Don't you have account yet?{" "}
            </Text>
            <Link color="teal.500" fontSize={"sm"} ml={2} href="/login">
              Login
            </Link>
          </Flex>
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

export default Register;
