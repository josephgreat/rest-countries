import { Container, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';

// const bg 
function App() {
  const bg = useColorModeValue("hsl(0, 0%, 100%)", "hsl(209, 23%, 22%)");
  const color = useColorModeValue("hsl(200, 15%, 8%)", "hsl(0, 0%, 100%)");
  const shadow = useColorModeValue("0 2px 4px", "0 2px 4px");
  const [apiState, setApiState] = useState({loading: false, data: [], error: {hasError: false, message: ""}});
  const [filteredData, setFilteredData] = useState([]);
  const fetchApi = async endpoint => {
    try {
      setApiState({loading: true});
      let response = await fetch(`https://restcountries.com/v3.1/${endpoint}`)
      let data;
      if(!response.ok) setApiState({...apiState, error: {hasError: true, message: response.statusText}});
      else data = await response.json(); 
      setApiState({...apiState, loading: false, data: data }); 
      setFilteredData(data)
      
    } catch (error) {
      setApiState({...apiState, error: {hasError: true, message: error.message}})
    }
}

  useEffect(() => {
    window.addEventListener("load", () => fetchApi("all?fields=name,capital,population,region,flags,postalCode,languages,subregion,maps,independent,continents,currencies,coatOfArms,cca2,cca3,area"));
    return () => {
      window.removeEventListener("load", () => fetchApi());
    }
  });
    const {loading, data, error} = apiState;
  return (
    <Container maxW={"auto"} p="0">
      <Navbar bg={bg} color={color} shadow={shadow} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home bg={bg} color={color} data={data} filteredData={filteredData} setFilteredData={setFilteredData} loading={loading} shadow={shadow} />} />
          <Route />
        </Routes>
      </BrowserRouter>
     
      </Container>
  );
}

export default App;
