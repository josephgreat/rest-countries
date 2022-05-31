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
  Button
} from "@chakra-ui/react";
import React from "react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Home({ bg, color, shadow }) {
  const regionList = ["Africa", "America", "Asia", "Europe", "Oceania"];
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
        justifyContent={{ md: "space-between" }}
        alignItems={{ lg: "center" }}
      >
        <InputGroup bg={bg}>
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
          />
        </InputGroup>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton fontSize={"0.8725rem"} fontWeight="300" as={Button} alignItems="center" rightIcon={<FaChevronDown />} mt="2.5rem" bg={bg} p="1em" w="16em" textAlign={"left"} justifyContent="space-between">
                <Text as="span">Filter by Region</Text>
              </MenuButton>

              <MenuList bg={bg} border="none"  >
                {regionList.map((region) => (
                  <MenuItem>{region}</MenuItem>
                ))}
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </Container>
  );
}
