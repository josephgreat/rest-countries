import {
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Text,
  Button,
  Box,
  Spinner,
  useToast,
  Select,
} from "@chakra-ui/react";
import React, { memo, useRef } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Card from "../Card";

function Home({
  bg,
  color,
  shadow,
  data,
  loading,
  setFilteredData,
  filteredData,
}) {
  const userSearch = useRef("");
  const selectedRegion = useRef("");
  const regionList = ["Africa", "Europe", "Oceania"];
  const toast = useToast();

  let renderToast = (result) => {
    return toast({
      title: `${result} countries found`,
      variant: "solid",
      status: "success",
      isClosable: "true",
      position: "bottom-right",
    });
  };
  const renderCountryRegions = () => {
    if (!data) return regionList;
    else {
      let regionList = [];
      data.map(({region}) => {
        !regionList.includes(region) && regionList.push(region)
      });
      return regionList;
    }
  }
  const renderCountryCards = () => {
    if (loading || !data)
      return (
        <Box>
          <Spinner />
        </Box>
      );
    else {
      renderToast(filteredData.length);
      return filteredData.map(
        ({ name, flags, capital, population, region }, index) => (
          <Card
            country={name.common}
            flag={flags}
            capital={capital[0]}
            population={population}
            region={region}
            bg={bg}
            color={color}
            key={index}
          />
        )
      );
    }
  };

  const filterCountryCards = () => {
    let filteredCountries = data.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(userSearch.current.value.toLowerCase())
    );
    setFilteredData(filteredCountries);
  };
  const filterByRegion = () => {

    let filteredCountries = data.filter((country) =>
      country.region.toLowerCase().includes(selectedRegion.current.value.toLowerCase())
    );
    setFilteredData(filteredCountries);
  };
  return (
    <Container
      color={color}
      fontSize={"0.8725rem"}
      maxW={"auto"}
      px={{ base: "1.5rem", lg: "2.5rem" }}
      py="2rem"
    >
      <Flex
        display={{ base: "block", md: "flex" }}
        alignItems={{ lg: "center" }}
      >
        <InputGroup bg={bg} borderRadius="lg" w={{ base: "100%", md: "40%" }}>
          <InputLeftAddon
            bg="transparent"
            w="3rem"
            border="none"
            as={FaSearch}
          />
          <Input
            type={"search"}
            border="none"
            placeholder="Search for a country..."
            ref={userSearch}
            onChange={filterCountryCards}
          />
        </InputGroup>
        <Select
          placeholder="Filter by Region"
          fontSize={"0.8725rem"}
          fontWeight="300"
          icon={ <FaChevronDown /> }
          mt={{ base: "2.5rem", md: "0" }}
          ml={{ md: "2rem" }}
          bg={bg}
          color={color}
          variant="filled"
          ref={selectedRegion}
          w="18em"
          onChange={filterByRegion}
        >
          {renderCountryRegions().map((region, index) => (
            <option key={index} value={region}>{region}</option>
          ))}
        </Select>
    
      </Flex>
      <Text as="p"></Text>
      <Flex flexDirection={{ base: "column", md: "row" }} flexWrap="wrap">
        {renderCountryCards()}
      </Flex>
    </Container>
  );
}
export default memo(Home);
