import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { postRequest } from "src/lib/network/baseRequests"

export function CreateNewChannelButton(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // State for form inputs
  const [channelName, setChannelName] = useState("")
  const [channelDescription, setChannelDescription] = useState("")

  // Mutation for creating a new channel
  const createChannelMutation = useMutation({
    mutationFn: (newChannel: { name: string; description: string }) =>
      postRequest("/chatroom/create", newChannel),
    onSuccess: () => {
      toast({
        title: "Channel created.",
        description: `The channel "${channelName}" has been created.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      onClose()
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating channel.",
        description: error?.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    },
  })

  // Function to handle form submission
  const handleCreateChannel = () => {
    if (!channelName.trim()) {
      toast({
        title: "Channel name is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    createChannelMutation.mutate({
      name: channelName,
      description: channelDescription,
    })
  }

  return (
    <>
      {/* Button to trigger the modal */}
      <Button onClick={onOpen} colorScheme="blue">
        + Create New Channel
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="gray.200">
          <ModalHeader>Create a New Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Form inputs for new chatroom creation */}
            <FormControl id="channel-name" mb={4}>
              <FormLabel>Channel Name</FormLabel>
              <Input
                placeholder="Enter channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </FormControl>

            <FormControl id="channel-description">
              <FormLabel>Channel Description</FormLabel>
              <Input
                placeholder="Enter channel description"
                value={channelDescription}
                onChange={(e) => setChannelDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
              variant="outline"
              color="white"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              color="white"
              isLoading={createChannelMutation.isPending}
              onClick={handleCreateChannel}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
