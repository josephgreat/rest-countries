import {
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Box,
  Spinner,
  useToast,
  Select,
} from "@chakra-ui/react";
import _ from "lodash";
import React, { memo, useEffect, useRef, useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import fetchApi from "../../fetchApi";
import Card from "../Card";

function Home({ bg, color, shadow, bodybg }) {
  const userSearch = useRef("");
  const selectedRegion = useRef("");
  const regionList = ["Africa", "Europe", "Oceania"];
  const toast = useToast();
  const debounce = _.debounce(data => setFilteredData(data), 1000)

  const [apiState, setApiState] = useState({
    loading: false,
    data: [],
    error: { hasError: false, message: "" },
  });
  const [filteredData, setFilteredData] = useState([]);

  const getApi = async () => {
    let data = await fetchApi(
      "all?fields=name,capital,population,region,flags",
      setApiState,
      apiState
    );
    setApiState({ ...apiState, loading: false, data: data });
    setFilteredData(data);
  };

  useEffect(() => {
    getApi();
    return () => {
      window.removeEventListener("load", () => getApi());
    };
  }, []);

  const { loading, data, error } = apiState;

  let renderToast = (result) => {
    toast({
      title: `${result.length} countries found`,
      variant: "solid",
      status: "success",
      isClosable: "true",
      position: "bottom-right",
      duration: 1000,
    });
  };
  const renderCountryRegions = () => {
    if (!data) return regionList;
    else {
      let regionList = [];
      data.map(({ region }) => {
        !regionList.includes(region) && regionList.push(region);
      });
      return regionList;
    }
  };
  const renderCountryCards = () => {
    if (loading || !data)
      return (
        <Box>
          <Spinner />
        </Box>
      );
      else if(error.hasError) return <div>{error.message}</div>
    else {
      return filteredData.map(
        ({ name, flags, capital, population, region }, index) => (
          <Card
            country={name.common}
            flag={flags}
            capital={capital[0]}
            population={population}
            region={region}
            bg={bg}
            shadow={shadow}
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
    debounce(filteredCountries);
    
  };
  const filterByRegion = () => {
    let filteredCountries = data.filter((country) =>
      country.region
        .toLowerCase()
        .includes(selectedRegion.current.value.toLowerCase())
    );
    setFilteredData(filteredCountries);
  };

  return (
    <Container
      color={color}
      fontSize={{ base: "0.8725rem" }}
      maxW={"auto"}
      px={{ base: "1.5rem", lg: "2.5rem" }}
      py="2rem"
    >
      <Flex
        display={{ base: "block", md: "flex" }}
        alignItems={{ lg: "center" }}
        position="sticky"
        top="0"
        py="2"
        bg={bodybg}
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
          icon={<FaChevronDown />}
          mt={{ base: "1.5rem", md: "0" }}
          ml={{ md: "2rem" }}
          bg={bg}
          color={color}
          variant="filled"
          ref={selectedRegion}
          w="16em"
          onChange={filterByRegion}
        >
          {renderCountryRegions().map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex flexDirection={{ base: "column", sm: "row" }} flexWrap="wrap" >
        {renderCountryCards()}
      </Flex>
      {renderToast(filteredData)}
    </Container>
  );
}
export default React.memo(Home);
