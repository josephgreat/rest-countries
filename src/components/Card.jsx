import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Card({
  flag,
  country,
  population,
  region,
  capital,
  bg,
  color,
  shadow
}) {
   let {countrySelected} = useParams();
   let navigate = useNavigate();
   let renderCountryDetail = () => {
    countrySelected = country.toLowerCase();
    navigate(`/country-detail/${countrySelected}`)
   }
  return (
    <Box
      as={"article"}
      w={{ base: "80%", sm: "43%", md: "30%", lg: "23%", xl: "21%", '2xl': "13%"}}
      mx={{ base: "auto" }}
      minW={{base: "15em", lg: "20em", '2xl': "18em"}}
      bg={bg}
      color={color}
      my={{ base: "1.5rem" }}
      borderRadius="lg"
      onClick={renderCountryDetail}
      cursor="pointer"
      boxShadow={shadow}
      fontSize={{'2xl': "1.3em"}}
      _hover={{
        transform: "scale(1.03)"
      }}
      transition={"transform .3s linear"}
    >
      <Box borderTopRadius="lg" h="10rem" overflow="hidden">
        <Img loading="lazy" srcSet={flag.png ? flag.png : flag.svg} h="100%" alt={`${country}'s flag`} zIndex={"1"} w="100%" />
      </Box>
      <Box p={{ base: "1.5rem", '2xl': "1.8em" }} lineHeight="1.6em">
        <Heading as="h3" fontSize="1.2rem" fontWeight="800" mb=".7rem">
          {country}
        </Heading>
        <Text as="p">
          <Text as="span" fontWeight={"600"}>
            Population: {" "}
          </Text>
          {population.toLocaleString("en-US")}
        </Text>
        <Text as="p" >
          <Text as="span" fontWeight={"600"}>
            Region:
          </Text>{" "}
          {region}
        </Text>
        <Text as="p">
          <Text as="span" fontWeight={"600"}>
            Capital:
          </Text>{" "}
          {capital}
        </Text>
      </Box>
    </Box>
  );
}
