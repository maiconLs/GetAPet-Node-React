import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container';
import Profile from './components/pages/User/Profile';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDeatails';
import PetDetails from './components/pages/Pet/MyAdoptions';

import { UserProvider} from './context/UserContext';
import { ToastContainer } from 'react-toastify';

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
          <Route path="/pet/mypets" element={<MyPets/>} />
          <Route path="/pet/add" element={<AddPet/>} />
          <Route path="/pet/edit/:id" element={<EditPet/>} />
          <Route path="/pet/myadoptions" element={<MyAdoptions/>} />
          <Route path="/pet/:id" element={<PetDetails/>} />

        </Routes>
      </Container>
      <Footer/>
    </UserProvider>
  </BrowserRouter>
  );
}

export default App;
