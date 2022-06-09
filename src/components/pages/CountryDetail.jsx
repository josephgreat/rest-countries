import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Img,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaExternalLinkSquareAlt} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import fetchApi from "../../fetchApi";
import Label from "../Label";

function CountryDetail (props) {
  let {bg, color, shadow} = props;
  const { countrySelected } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState({
    loading: false,
    data: [],
    error: { hasError: false, message: "" },
  });
  let getCountryData = async () => {
      try {
          let data = await fetchApi(
            `name/${countrySelected}?fullText=true`,
            setCountryData,
            countryData
          );
          setCountryData({ ...countryData, loading: false, data: data });
        } catch (error) {
        setCountryData({ ...countryData,  error: {hasError: true, message: error.toString()} });
          
      }
  };
  let { loading, data, error } = countryData;
  useEffect(() => {
    getCountryData();
  }, [countrySelected]);

  let goBack = () => {
    navigate(-1);
  };
  let renderValue = (obj, subkey) => {
    if (typeof obj !== "object") return obj; 
    let keys = Array.isArray(obj) ? obj : Object.keys(obj);
    return keys.map((key, index) => {
      return (
        <span key={index}>
          {Array.isArray(obj) ? key : subkey ? obj[key][subkey] : obj[key]}
          {keys.length > 1 && index !== keys.length ? ", " : ""}
        </span>
      );
    });
  };
  let checkValidity = (data, placeholder) => data ? data : placeholder ? placeholder : "not detected"
  


  if (!data.length || !data || loading){
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
  else if(error.hasError) {
    return (
      <Box>
          <Text>{error.message}</Text>
      </Box>
    ); 
  }
  else{
  const {
    name,
    flags,
    region,
    population,
    currencies,
    subregion,
    languages,
    capital,
    borders,
    continents,
    coatOfArms,
    maps,
    tld,
    latlng,
    timezones,
    area,
    unmember,
    independent
  } = data[0];
 
  return (
    <Container
      textTransform={"capitalize"}
      px={{ base: "1.5em" }}
      py={{ base: "1em"}}
      fontSize={{base: "1em", '2xl': "1.7em"} }
      maxW="auto"
      color={color}
      overflow={"hidden"}
    >
      <Button fontSize={{'2xl': ".9em"}} shadow={shadow} leftIcon={<FaArrowLeft />} bg={bg} onClick={goBack}>
        Back
      </Button>
      <Flex flexDir={{ base: "column", sm: "row" }} my={{ base: "3em" }} w={{lg: "95%", xl: "90%"}} mx="auto" flexWrap={"wrap"} justifyContent={{lg: "flex-start"}}>
        <Box as={motion.div} animate={{left: [-50, 0], opacity: [.3, 1]}} transition={"all linear .3s"} pos="relative" width={{base: "90%", sm: "42%", md: "35%", lg: "20%", xl: "25%"}} mr={{lg: "1%"}} mx={{base: "auto", lg: "unset"}}>
          <Img loading="lazy" src={checkValidity(flags.svg, flags.png)} alt={`${name.common}"s flag`} />
        </Box>
        <Box as={motion.div} mt={{base: "1.5em", lg: "0"}} animate={{scale: [1.1, 1], opacity: [.3, 1]}} transition={"scale, opacity ease .3s"} width={{base: "100%", sm: "90%",lg: "50%", xl: "42%"}} mx={"auto"}  order={{sm: 3, lg: 2}}>
          <Heading as="h4" mb={{ base: ".7em" }}>
            {name.common}
          </Heading>
          <Flex flexDir={{ base: "column", sm: "row" }}  lineHeight="2em" justifyContent={{sm: "space-between"}}>
            <Box mb={{ base: "1em" }} mr={{lg: "3em"}} w={{sm: "47%"}}>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>
                  Native Name: </Text> 
                {checkValidity(renderValue(name.nativeName, "common"))}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>
                  Official Name: </Text> 
                {checkValidity(renderValue(name.official, "common"))}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>population: </Text>
                {checkValidity(population.toLocaleString())}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>land area: </Text>
                {`${checkValidity(area.toLocaleString())} hectares`}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>region: </Text>
                {checkValidity(region)}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>sub region: </Text>
                {checkValidity(subregion)}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>continent: </Text>
                {checkValidity(renderValue(continents))}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>capital: </Text>
                {checkValidity(renderValue(capital))}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>independent: </Text>
                {checkValidity(independent ? "yes" : "no")}
              </Text>
            </Box>
            <Box mb={{ base: "1em" }}  w={{sm: "47%"}}>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>top level domain: </Text>
                <Text as="span" textTransform={"lowercase"}>{renderValue(tld)}</Text>
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>
                  currencies: </Text>
                {checkValidity(renderValue(currencies, "name"))} (
                  {checkValidity(renderValue(currencies, "symbol"))})
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>Lingua Franca: </Text>
                {checkValidity(renderValue(languages))}
              </Text>
             
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>united nations member: </Text>
                {checkValidity(unmember ? "yes" : "no")}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>Time Zone(s): </Text>
                {checkValidity(renderValue(timezones))}
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>latitude: </Text>
                {`${checkValidity(latlng[0])}`}<sup>o</sup>
              </Text>
              <Text as={"p"}>
                <Text as="span" fontWeight={"600"}>longitude: </Text>
                  {checkValidity(latlng[1])}<sup>o</sup>
                </Text>
              <Text as="p">
                <Text as="span" fontWeight={"600"}>Google Map: </Text>
                <Link href={checkValidity(maps.googleMaps)} target="_blank" color={"blue.600"}>{name.common} map <FaExternalLinkSquareAlt /></Link>
              </Text>
            </Box>
          </Flex>
          <Box mb="2.5em">
            <Text as="span" fontWeight={"600"}>Border Countries: </Text>
            {borders ? borders.map((border, index) => (
              <Label border={border} key={index} bg={bg} countrySelected={countrySelected} shadow={shadow} />
            )) : "not detected"}
          </Box>
        </Box>
        <Box w={{base: "75%", sm: "42%",  md: "30%", lg: "20%", xl: "25%"}} animate={{right: [-50, 0], opacity: [.3, 1]}} transition={"all linear .3s"} pos="relative" ml={{lg: "1%"}} mx={{base: "auto", lg: "unset"}} order={{sm: 2, lg: 3}}>
          <Img loading="lazy" src={coatOfArms.svg} alt={`${name.common}"s coat-of-arm`}/> 
          <Text as="p" fontWeight={"600"} textAlign="center">Coat of Arm</Text>
      </Box>
      </Flex>
    </Container>
  );
            }
}

export default React.memo(CountryDetail)