import { Button, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Label({ border, bg, countrySelected , shadow}) {
  const [label, setLabel] = useState("");
  let navigate = useNavigate();
  let renderCountryDetail = () => {
   countrySelected = label.toLowerCase();
   navigate(`/country-detail/${countrySelected}`);
  }
  useEffect(() => {
    let getApi = async () => {
      await fetch(
        `https://restcountries.com/v3.1/alpha/${border.toLowerCase()}`
      )
        .then((res) => res.json())
        .then((data) => setLabel(data[0].name.common));
    };
    getApi();
  });
  return (
    <Link
      py=".2em"
      px=".7em"
      mr={".6em"}
      my=".2em"
      display={"inline-block"}
      bg={bg}
      fontWeight={"300"}
      shadow={shadow}
      _hover={{textDecor: "none", transform: "scale(1.06)"}}
      transition={"transform ease .3s"}
      onClick={renderCountryDetail}
    >
      {label}
    </Link>
  );
}
