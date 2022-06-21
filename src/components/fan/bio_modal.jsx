import React, { useEffect, useState } from "react";
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useApi } from "../../context/ApiContext";
import { ToastContainer, toast } from "react-toastify";

export default function BIOModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const { user, storeUser } = useAuth();
  const Api = useApi();

  const [bio, setBio] = useState();

  useEffect(() => {
    if (user) {
      setBio(user.bio);
    }
  }, [user]);
  
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setBio(inputValue);
  };

  const onUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await Api.updateUserProfile(user.id, undefined, bio);
      console.log({ res });
      if (res.status == 200) {
        storeUser(res.data);
        onClose();
      } else {
        toast("Failed to update user name, please try again after refresh.");
      }
    } catch (ex) {
      toast(ex.message);
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} overflow={"none"}>
      <ModalOverlay overflow={"none"} />
      <ModalContent
        minW={{ base: "100vw", lg: "50vw" }}
        h={{ base: "100vh", lg: "50%" }}
        mt={{ base: 0, md: "80px" }}
        overflow={"none"}
      >
        <ModalHeader>EDIT BIO</ModalHeader>
        <ModalBody>
          <Textarea
            placeholder="Enter your BIO..."
            minH={"50%"}
            value={bio}
            onChange={handleInputChange}
          />
          <HStack justify={"flex-start"} my={3}>
            <Button
              variant="outline"
              colorScheme="cyan"
              isLoading={loading}
              onClick={onUpdateProfile}
            >
              SAVE CHANGES
            </Button>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              disabled={loading}
            >
              Close
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
