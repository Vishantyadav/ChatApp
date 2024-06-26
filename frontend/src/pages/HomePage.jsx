import React from 'react'
import { Container, Center, Text, Box,Tabs,Tab, TabPanels, TabList, TabPanel} from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Center
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text color="black" fontSize="4xl" fontFamily="work sans">
          V Chat App
        </Text>
      </Center>

      <Box bg="white" padding={4} w="100%" borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1rem">
    <Tab width='50%'>Login</Tab>
    <Tab width='50%'>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default HomePage