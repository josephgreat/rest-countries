import { Container, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';

// const bg 
function App() {
  const bg = useColorModeValue("hsl(0, 0%, 100%)", "hsl(209, 23%, 22%)");
  const color = useColorModeValue("hsl(200, 15%, 8%)", "hsl(0, 0%, 100%)");
  const shadow = useColorModeValue("0 2px 4px", "0 2px 4px");
  return (
    <Container maxW={"auto"} p="0">
      <Navbar bg={bg} color={color} shadow={shadow} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home bg={bg} color={color} shadow={shadow} />} />
          <Route />
        </Routes>
      </BrowserRouter>
     
      </Container>
  );
}

export default App;
