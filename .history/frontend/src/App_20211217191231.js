import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>
  </BrowserRouter>
  );
}

export default App;