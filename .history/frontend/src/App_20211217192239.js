import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Register from './components/pages/Auth/Register';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <BrowserRouter>
      <Route path="/register" element={<NavBar/>} />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>

  </BrowserRouter>
  );
}

export default App;
