import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/rooms/:id" element={<Register/>} />

        <Route path="/admin/rooms/:id" element={<AdminRoom/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
