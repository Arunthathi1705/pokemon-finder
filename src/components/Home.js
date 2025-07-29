import axios from 'axios';
import { useState, useEffect } from 'react';
import { AppShell, AppShellHeader, Image, Flex, Autocomplete, AppShellMain } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import pokemon from '../Assets/pokemon.png';
import PokemonCard from './PokemonCard';


const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonNames, setPokemonNames] = useState([]);
  const [searchedPokemonDetails, setSearchedPokemonDetails] = useState(null);

  const isInvalidSearch =
    searchTerm.trim() !== '' &&
    !pokemonNames.some((p) => p.name.toLowerCase() === searchTerm.toLowerCase());


  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((res) => setPokemonNames(res.data.results))
      .catch((err) => console.error("Error fetching names", err));
  }, []);


  const handleSearch = (val) => {
    const match = pokemonNames.find(
      (p) => p.name.toLowerCase() === val.toLowerCase()
    );

    if (match) {
      axios.get(match.url)
        .then((res) => setSearchedPokemonDetails(res.data))
        .catch(() => alert("Error fetching Pokémon details"));
    } else {
      alert("No Pokémon found with that name");
    }
  };


  const handleClear = () => {
    setSearchTerm('');
    setSearchedPokemonDetails(null);
  };


  return (
    <div>
      <AppShell>
        <AppShellHeader
          height={80}
          style={{ background: 'linear-gradient(to bottom , #eb5119ff,#FFEA79)' }} >
          <Flex align="center" justify="space-between" h="100%" px="lg">
            <Image src={pokemon} fit="contain" h={60} w={200} />
            <Autocomplete
              placeholder="Search Pokémon"
              leftSection={<IconSearch size={16} />}
              rightSection={
                searchTerm && (
                  <IconX
                    size={16}
                    style={{ cursor: 'pointer' }}
                    onClick={handleClear}
                  />
                )
              }
              value={searchTerm}
              onChange={setSearchTerm}
              onOptionSubmit={(val) => {
                setSearchTerm(val);
                handleSearch(val);
              }}
              data={pokemonNames.map((p) => p.name)}
              style={{ width: '200px' }}
              nothingFound="No match"
              withinPortal
              radius="xl"
              searchable
              error={isInvalidSearch ? 'Pokémon not found' : false}
              spellCheck={false}
            />
          </Flex>
        </AppShellHeader>
        <AppShellMain pt={80}>
          <PokemonCard
            searchedPokemonDetails={searchedPokemonDetails}
            onClearSearch={() => {
              setSearchTerm('');
              setSearchedPokemonDetails(null);
            }}
          />
        </AppShellMain>
      </AppShell>
    </div>
  )
}
export default Home;




