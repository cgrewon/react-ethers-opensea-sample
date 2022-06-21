import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  Stack,
  Button,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FanProfileMainContainer({
  children,
  onEdit,
  isEditMode = false,
  onCamera,
  onUserNameEdit,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  return (
    <Box mt={"80px"} align="left" w="100%" mx="auto" position={"relative"}>
      <Flex justify={"space-between"} alignItems="center" px={3}>
        <HStack>
          <Box position={"relative"}>
            <Avatar
              name={user ? user.username : ""}
              w={["50px", "70px", "90px"]}
              h={["50px", "70px", "90px"]}
              src={user ? user.avatar : ""}
              mr={3}
            />
            {isEditMode && (
              <IconButton
                position="absolute"
                bottom={-1}
                right={1}
                _focus={{ outline: "none" }}
                variant="solid"
                rounded={"full"}
                size="xs"
                ml={2}
                onClick={onCamera}
                icon={<Icon w="15px" h="15px" as={AiFillCamera} color="gray" />}
              />
            )}
          </Box>

          <Stack alignItems={"flex-start"}>
            <Text fontSize={"md"} color="white" textAlign={"center"}>
              {user ? user.username : ""}
              {isEditMode && (
                <IconButton
                  _focus={{ outline: "none" }}
                  variant="solid"
                  rounded={"full"}
                  size="xs"
                  ml={2}
                  icon={
                    <Icon w="15px" h="15px" as={FaPencilAlt} color="gray" />
                  }
                  onClick={onUserNameEdit}
                />
              )}
            </Text>
            <Text fontSize={"sm"} color="white" textAlign={"center"}>
              #{user ? user.id : ""}
            </Text>
          </Stack>
        </HStack>
        <HStack>
          {!isEditMode && (
            <Button
              variant={"outline"}
              colorScheme="teal"
              size={["sm"]}
              fontSize={["xs", "sm"]}
              onClick={onEdit}
            >
              EDIT PROFILE
            </Button>
          )}
          {isEditMode ? (
            <Button
              variant={"outline"}
              colorScheme="teal"
              size={["sm"]}
              fontSize={["xs", "sm"]}
              onClick={onBack}
            >
              Back
            </Button>
          ) : (
            <IconButton
              _focus={{ outline: "none" }}
              size="sm"
              icon={<Icon w="20px" h="20px" as={HiOutlineDotsVertical} />}
            />
          )}
        </HStack>
      </Flex>
      {!isEditMode && (
        <Box px={2} pt={3}>
          <Text color={"white"} fontSize="sm">
            {user && user.bio ? (
              user.bio
            ) : (
              <>
                <Button
                  size="sm"
                  variant={"link"}
                  _focus={{ outline: "none" }}
                  color="white"
                  onClick={onEdit}
                >
                  Edit profile
                </Button>{" "}
                to add your bio here.
              </>
            )}
          </Text>
        </Box>
      )}

      {children}
    </Box>
  );
}
