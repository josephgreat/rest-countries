import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Footer({bg, color}) {
  return (
    <Flex flexDirection={{base: "column", sm: "row"}}  bg={bg} p="1em" lineHeight={"1.7em"} color={color} alignItems="center" justifyContent={{base: "center", sm: "space-around"}}>
        <Text as="p" fontWeight={"600"}>&copy;2022 creations</Text>
        <Text as="p" fontWeight={"600"}><Text as="em" fontWeight={"300"}>Powered by - </Text>emJoeTech</Text>
    </Flex>
  )
}
