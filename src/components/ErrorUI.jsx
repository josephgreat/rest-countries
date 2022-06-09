import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'

export default function ErrorUI({errorMessage, errorType}) {
    let refresh = () =>  window.location.reload()
    let checkErrorType = () => {
        if(errorType === "typeerror") return (
            <>
                <Text as="p">Try Refreshing the page</Text>
                <Button  onClick={refresh} >Refresh</Button>
            </>
        )
    }
  return (
    <Box>
        <Text>Opps, an error just occured</Text>
        {checkErrorType()}
    </Box>
  )
}
