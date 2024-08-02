import {
  Avatar,
  Box,
  Card,
  CardBody,
  Heading,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function Pokemon({ pokemons, type}) {
  return (
    <Box p={4} style={{ width: "100%" }}>
      <Heading mb={4}>Pokémon List</Heading>
      {pokemons?.map((pokemon) => (
        <Box key={pokemon.id} mb={2}>
          <NextLink href={type == "me" ? `/pokemon-me/${pokemon.id}` : `/pokemon/${pokemon.id}`}>
            <Card
              size={"lg"}
              style={{
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer",
              }}
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              <CardBody>
                <Wrap>
                  <WrapItem>
                    <Avatar
                      size="lg"
                      name={pokemon.name}
                      src={pokemon.pictureUrl}
                    />
                  </WrapItem>
                  <Text mt="5" ml="5">
                    {pokemon.name}
                  </Text>
                </Wrap>
              </CardBody>
            </Card>
          </NextLink>
        </Box>
      ))}
    </Box>
  );
}
