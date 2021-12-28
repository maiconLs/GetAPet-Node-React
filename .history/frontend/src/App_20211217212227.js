import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';

import { UserProvider} from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
    
      <NavBar/>
      <Container>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

        </Routes>
      </Container>
      <Footer/>
  </BrowserRouter>
  );
}

export default App;
