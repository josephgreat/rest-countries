import { Button, Flex, Heading, Link, useColorMode } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaLightbulb } from "react-icons/fa";

export default function Navbar({ bg, color, shadow }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      py="1.5em"
      justifyContent={"space-between"}
      px={{ base: "1.5rem", lg: "2.5rem" }}
      alignItems="center"
      bg={bg}
      color={color}
      w="100%"
      shadow={shadow}
    >
      <Heading as="h2" fontSize={{ base: "1rem", lg: "1.2rem" }}>
        <Link href="/" fontWeight={"600"} _hover={{textTransform: "none", opacity: ".7"}} transition="opacity ease .3s">Where in the world?</Link>
      </Heading>
      <Button
        bg="transparent"
        fontSize={{ base: "0.8725rem", lg: "1rem" }}
        p="0"
        _hover={{ boxShadow: "none" }}
        leftIcon={colorMode === "light" ? <FaMoon /> : <FaLightbulb />}
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </Flex>
  );
}
