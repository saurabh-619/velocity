import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

import { useAuth } from "@/lib/auth";
import { createSite } from "@/lib/db";
import fetcher from "@/utils/fetcher";

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors } = useForm();

  const { user } = useAuth();
  const toast = useToast();

  const { data } = useSWR("/api/sites", fetcher);

  const onCreateSite = ({ name, url }) => {
    const newSite = {
      name,
      url,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
    };
    createSite(newSite);

    // Adds new value to cache immediately giving feel of realtime
    mutate("/api/sites", { sites: [...data.sites, newSite] }, false); //false tells SWR we are updating sites locally by ourself

    onClose();
    toast({
      title: "Success.",
      description: "We've added your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  const printErrors = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <Button
        id="add-site-modal-button"
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={handleSubmit(onCreateSite, printErrors)}
        >
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                id="site-input"
                placeholder="My site"
                name="name"
                autoFocus={true}
                ref={register({
                  required: "Required",
                })}
              />

              {errors && errors.name && (
                <small style={{ color: "red" }}>*{errors.name.message}</small>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                id="link-input"
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: "Required",
                })}
              />
              {errors && errors.url && (
                <small style={{ color: "red" }}>*{errors.url.message}</small>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              id="create-site-button"
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
