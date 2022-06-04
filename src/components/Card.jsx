import { Box, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";

export default function Card({
  flag,
  country,
  population,
  region,
  capital,
  bg,
  color,
}) {
   
  return (
    <Box
      as={"article"}
      w={{ base: "85%", md: "45%", lg: "23%"}}
      mx={{ base: "auto" }}
      bg={bg}
      color={color}
      my={{ base: "1.5rem" }}
      borderRadius="lg"
    >
      <Box borderTopRadius="lg" h="10rem" overflow="hidden">
        <Img srcSet={flag.png} h="100%" zIndex={"1"} w="100%" />
      </Box>
      <Box p={{ base: "1.5rem" }}>
        <Heading as="h5" fontSize="1.2rem" fontWeight="800" mb=".7rem">
          {country}
        </Heading>
        <Text as="p" fontSize={"0.8735rem"}>
          <Text as="span" fontWeight={"600"}>
            Population: {" "}
          </Text>
          {population.toLocaleString("en-US")}
        </Text>
        <Text as="p" fontSize={"0.8735rem"}>
          <Text as="span" fontWeight={"600"}>
            Region:
          </Text>{" "}
          {region}
        </Text>
        <Text as="p" fontSize={"0.8735rem"}>
          <Text as="span" fontWeight={"600"}>
            Capital:
          </Text>{" "}
          {capital}
        </Text>
      </Box>
    </Box>
  );
}
