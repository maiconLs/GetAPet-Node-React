import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';

import { UserProvider} from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import Profile from './components/pages/User/profile';

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <NavBar/>
      <ToastContainer autoClose={3000}/>
      <Container>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />

        </Routes>
      </Container>
      <Footer/>
    </UserProvider>
  </BrowserRouter>
  );
}

export default App;
