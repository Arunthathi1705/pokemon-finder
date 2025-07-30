import './PokemonCard.css';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import axios from 'axios';
import leftArrow from '../Assets/left-arrow.png';
import { Card, Stack, Image, Text, SimpleGrid, Pagination, Button } from '@mantine/core';


const PokemonCard = ({ searchedPokemonDetails, onClearSearch }) => {
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=100";

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState();


  const isSmallScreen = useMediaQuery('(max-width: 768px)');


  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log("fetching error", error);
      })
  }, []);

  useEffect(() => {
    if (searchedPokemonDetails) {
      setSelectedPokemon({ name: searchedPokemonDetails.name, url: `https://pokeapi.co/api/v2/pokemon/${searchedPokemonDetails.name}` });
      setPokemonDetails(searchedPokemonDetails);
    }
  }, [searchedPokemonDetails]);

  useEffect(() => {
    if (selectedPokemon && !searchedPokemonDetails) {
      axios.get(selectedPokemon.url)
        .then(response => setPokemonDetails(response.data));
    }
  }, [selectedPokemon, searchedPokemonDetails])

  const pokemonList = data?.results || [];

  const cardPerPage = 10;
  const startIndex = (currentPage - 1) * cardPerPage;
  const endIndex = startIndex + cardPerPage;
  const currentCard = pokemonList.slice(startIndex, endIndex);

  return (
    <div
      style={{
        paddingLeft: selectedPokemon ? (isSmallScreen ? "10px" : "20px") : (isSmallScreen ? "20px" : "100px"),
        paddingRight: selectedPokemon ? (isSmallScreen ? "10px" : "20px") : (isSmallScreen ? "20px" : "100px"),
      }}
    >


      {selectedPokemon === null ? (
        <>
          <Text c="dimmed" ta="center" size='xs' style={{ paddingTop: "5px" }}>
            🔥Discover 1000+ Pokémon with height, types, and abilities — all in one place!
          </Text>
          <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing={40} pt={40} pb={40}>
            {currentCard.map((item) => {
              const parts = item.url.split("/");
              const id = parts[parts.length - 2];
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
              return (
                <div key={id}>
                  <Card className='pokemon-card' shadow="lg" radius={15} padding={isSmallScreen ? "xs" : "md"}
                    style={{ width: isSmallScreen ? "100%" : "auto" }}
                    onClick={() => {
                      setSelectedPokemon(item);
                      onClearSearch();
                    }}>
                    <Stack align='center'>
                      <Image src={imageUrl} w={isSmallScreen ? 70 : 100} h={isSmallScreen ? 70 : 100} />
                      <Text size={isSmallScreen ? "sm" : "1rem"} ta="center" tt="capitalize" fw={800} style={{ color: "#091147ff" }}>{item.name}</Text>
                    </Stack>
                  </Card>
                </div>
              );
            })}
          </SimpleGrid>
          <Pagination total={10} size="xs" radius="xl" color="gray" style={{ display: "flex", justifyContent: "center" }} onChange={setCurrentPage} />
        </>
      ) : (
        <div style={{ display: "flex", gap: isSmallScreen ? "10px" : "24px" }}>
          <div style={{ flex: 2 }}>
            <Text c="dimmed" ta="center" size='xs' style={{ paddingTop: "5px" }}>
              🔥Discover 1000+ Pokémon with height, types, and abilities — all in one place!
            </Text>
            <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }} spacing={20} p={20} pb={40}>
              {currentCard.map((item) => {
                const parts = item.url.split("/");
                const id = parts[parts.length - 2];
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                return (
                  <div key={id}>
                    <Card className='pokemon-card' shadow="lg" radius={15} padding={isSmallScreen ? "xs" : "sm"}
                      style={{ width: isSmallScreen ? "100%" : "auto" }}
                      onClick={() => {
                        setSelectedPokemon(item);
                        onClearSearch();
                      }}>
                      <Stack align='center'>
                        <Image src={imageUrl} w={isSmallScreen ? 50 : 100} h={isSmallScreen ? 50 : 100} />
                        <Text size={isSmallScreen ? "xs" : "1rem"} ta="center" tt="capitalize" fw={800} style={{ color: "#091147ff" }}>{item.name}</Text>
                      </Stack>
                    </Card>
                  </div>
                );
              })}
            </SimpleGrid>
            <Pagination total={10} size="xs" radius="xl" color="gray" style={{ display: "flex", justifyContent: "center" }} onChange={setCurrentPage} />
         </div>

          <div style={{
            flex: 1, paddingTop: "40px",
            paddingLeft: isSmallScreen ? "4px" : "10px",
            paddingRight: isSmallScreen ? "4px" : "10px",
          }}>
            {pokemonDetails && (
              <Card shadow="xl" padding="lg" radius="md" withBorder style={{ background: "linear-gradient(to right, #fdf877ff, #f88258ff)" }}>
                <Button
                  className='backArrow'
                  variant='transparent'
                  style={{ width: "fit-content", padding: 0 }}
                  onClick={() => {
                    setSelectedPokemon(null);
                    setPokemonDetails(null);
                    onClearSearch();
                  }}><Image src={leftArrow} height={30} width={30} /></Button>
                <Text size="xl" fw={700} tt="capitalize">{pokemonDetails.name}</Text>
                <Image
                  src={pokemonDetails.sprites?.other?.['official-artwork']?.front_default}
                  fit="contain"
                  width={150}
                  height={150}
                  alt={pokemonDetails.name}
                />
                <Text>Height: {pokemonDetails.height}</Text>
                <Text fw={600} mt="xs">Types:</Text>
                {pokemonDetails.types?.map((typeObj) => (
                  <Text key={typeObj.type.name}>{typeObj.type.name}</Text>
                ))}
                <Text fw={600} mt="xs">Abilities:</Text>
                {pokemonDetails.abilities?.map((abilityObj) => (
                  <Text key={abilityObj.ability.name}>{abilityObj.ability.name}</Text>
                ))}
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default PokemonCard;
