"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useAmoy } from "../contexts/AmoyContext";

const AddNetworkModal = () => {
  const {
    isMetaMaskInstalled,
    addPolygonAmoyNetwork,
    isNetworkModalOpen,
    toggleNetworkModal,
  } = useAmoy();

  return (
    <Modal isOpen={isNetworkModalOpen} onClose={toggleNetworkModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isMetaMaskInstalled()
            ? "Add Polygon Amoy Network"
            : "MetaMask Required"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {isMetaMaskInstalled() ? (
              <>
                <Text mb={4}>
                  You need to add the Polygon Amoy Network to use this feature.
                  Click here to add.
                </Text>
                <Button onClick={addPolygonAmoyNetwork} colorScheme="teal">
                  Add Amoy Network to MetaMask
                </Button>
              </>
            ) : (
              <>
                <Text mb={4}>
                  You need to install MetaMask to use this feature. Once
                  installed, return to this page and refresh.
                </Text>
                <Button
                  colorScheme="blue"
                  as="a"
                  href="https://metamask.io/download.html"
                  target="_blank"
                >
                  Install MetaMask
                </Button>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddNetworkModal;