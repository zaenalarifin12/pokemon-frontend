"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPokemons, fetchPokemons } from "./../../redux/slices/pokemonSlice";
import Pokemon from "../../components/Pokemon";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { pokemons, myPokemons: mypokemons, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(fetchMyPokemons());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <main className={styles.main} style={{ width: "80%" }}>
      <Tabs>
        <TabList>
          <Tab>Pokemon</Tab>
          <Tab>My Pokemon</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Pokemon pokemons={pokemons} />
          </TabPanel>
          <TabPanel>
            <Pokemon pokemons={mypokemons} type="me" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  );
}
