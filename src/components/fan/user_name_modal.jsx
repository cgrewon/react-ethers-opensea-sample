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
  Input,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useApi } from "../../context/ApiContext";
import { ToastContainer, toast } from "react-toastify";

export default function UserNameModal({ isOpen, onClose }) {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const { user, storeUser } = useAuth();
  const Api = useApi();

  useEffect(()=>{
    if(user) {
      setValue(user.username)
    }
  }, [user])
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const onUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await Api.updateUserProfile(user.id, value);
      console.log({ res });
      if(res.status == 200) {
        storeUser(res.data)
        onClose()
      } else{
        toast('Failed to update user name, please try again after refresh.')
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
        <ModalHeader>EDIT USERNAME</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Enter user name..."
            size="md"
            value={value}
            variant="flushed"
            onChange={handleInputChange}
          />
          <HStack justify={"flex-start"} my={3}>
            <Button
              variant="outline"
              colorScheme="cyan"
              isLoading={loading}
              onClick={() => onUpdateProfile()}
            >
              SAVE CHANGES
            </Button>
            <Button
              variant="outline"
              disabled={loading}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
      <ToastContainer
        theme="dark"
        autoClose={false}
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </Modal>
  );
}
