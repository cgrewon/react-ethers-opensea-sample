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
  Avatar,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import S3FileUpload from "react-s3";
import { ToastContainer, toast } from "react-toastify";

const s3Config = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  dirName: process.env.REACT_APP_S3_DIR_NAME ,
  region: process.env.REACT_APP_S3_REGION ,
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY ,
  secretAccessKey: process.env.REACT_APP_S3_SECRET ,
};

export default function UserAvatarModal({
  isOpen,
  onClose,
  onSave,
  defAvatar,
}) {
  const [image, setImage] = useState();
  const [imgFile, setImgFile] = useState();

  const onUpload = async () => {
    if (!imgFile) {
      toast("Please pick image.");
      return;
    }

    S3FileUpload.uploadFile(imgFile, s3Config)
      .then((data) => {
        console.log(data.location);
        
      })
      .catch((err) => {
        toast(err.message);
      });
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
        <ModalHeader>EDIT PROFILE IMAGE</ModalHeader>
        <ModalBody>
          <HStack alignItems={"flex-start"}>
            <Avatar
              name="Segun Adebayo"
              w={["70px", "90px"]}
              h={["70px", "90px"]}
              src={image ? image : "https://bit.ly/sage-adebayo"}
              mr={3}
            />
            <Stack>
              <Input
                type={"file"}
                id="fileAvatar"
                border="none"
                mt={5}
                p="0"
                accept="image/png, image/gif, image/jpeg"
                onChange={function () {
                  var file = document.getElementById("fileAvatar").files[0];
                  try {
                    var imgURL = URL.createObjectURL(file);
                    setImage(imgURL);
                    setImgFile(file);
                  } catch (ex) {
                    console.error(ex);
                  }
                }}
              />
              <Text color="gray" fontSize={"sm"}>
                JPG, GIF or PNG, Max size of 800k
              </Text>
            </Stack>
          </HStack>
          <HStack justify={"flex-start"} my={3}>
            <Button
              variant="outline"
              colorScheme="cyan"
              onClick={() => onSave()}
            >
              UPLOAD NOW
            </Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              CANCEL
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
      <ToastContainer
        autoClose={false}
        theme="dark"
        rtl={false}
        style={{ textAlign: "left" }}
      />
    </Modal>
  );
}
