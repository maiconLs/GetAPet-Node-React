import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/rooms/new" element={<login/>} />
        <Route path="/rooms/:id" element={<regi/>} />

        <Route path="/admin/rooms/:id" element={<AdminRoom/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
