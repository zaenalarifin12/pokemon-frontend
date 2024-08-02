"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { fetchPokemonMeById } from "../../../../redux/slices/pokemonSlice";
import apiClient from "../../../../api/axios";

const notifyFailure = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message || "Gagal menangkap, coba lagi!",
  });
};

const notifySuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message || "Success",
  });
};

export default function PokemonDetail({ params }) {
  const { id } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemon.selectedPokemon);
  const status = useSelector((state) => state.pokemon.status);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchPokemonMeById(id));
  }, [dispatch, id]);

  const [name, setName] = useState("");

  const handleCatch = async () => {
    try {
      const { data } = await apiClient.get("/catch/probability");
      if (data.caught) {
        setName("");
        onOpen();
      } else {
        notifyFailure();
      }
    } catch (error) {
      notifyFailure("Terjadi kesalahan, coba lagi.");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        pokemonId: pokemonData?.pokemonId ?? pokemonData.id,
        name: name,
      };
      await apiClient.post("/catch/rename", data);
      notifySuccess();
      onClose();
      router.push("/");
    } catch (error) {
      notifyFailure("Gagal mengubah nama, coba lagi.");
    }
  };

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box bg="white" color="black" p={4} borderRadius="md">
          <Box p={4}>
            <Image
              src={pokemonData?.pictureUrl}
              alt={pokemonData?.name}
              borderRadius="md"
            />
            <Heading mb={4}>{pokemonData?.name}</Heading>
            <Text mb={2}>Type: {pokemonData?.type}</Text>
            <Text mb={2}>Move: {pokemonData?.moves}</Text>

            <Button
              colorScheme="teal"
              size="md"
              onClick={handleCatch}
            >
              Catch
            </Button>
          </Box>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename Your Pokémon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
