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
} from "@chakra-ui/react"

export function CreateNewChannelButton(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
              <Input placeholder="Enter channel name" />
            </FormControl>

            <FormControl id="channel-description">
              <FormLabel>Channel Description</FormLabel>
              <Input placeholder="Enter channel description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
