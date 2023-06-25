import { Container, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CountryDetail from './components/pages/CountryDetail';
import Home from './components/pages/Home';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const bg = useColorModeValue("hsl(0, 0%, 100%)", "hsl(209, 23%, 22%)");
  const bodyBg = useColorModeValue("hsl(0, 0%, 95%)", "transparent");
  const color = useColorModeValue("hsl(200, 15%, 8%)", "hsl(0, 0%, 100%)");
  const shadow = useColorModeValue("0 2px 4px hsl(0, 0%, 90%)", "0 2px 5px hsl(209, 23%, 28%)");
  if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
  }
  return (
    <ErrorBoundary>
      <Container maxW={"auto"} p="0" bg={bodyBg}>
      <Navbar bg={bg} color={color} shadow={shadow} />
      <Container maxW={"auto"} p="0" minH="80vh">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home bg={bg} color={color} key="/" shadow={shadow} bodybg={bodyBg} />} />
            <Route path='/country-detail/:countrySelected' key={"/country-detail"} element={<CountryDetail bg={bg} color={color}  shadow={shadow} />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </Container>
     <Footer bg={bg} color={color} />
      </Container>
    </ErrorBoundary>
  );
}

export default App;
