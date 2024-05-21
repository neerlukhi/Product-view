import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import Header from './Header';
import Product from './components/Product';
import Productdetail from './components/Productdetail';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [searchQuery, setSearch] = useState('');
  const [] = useState()
  return (
    <>
      <Header />
      <Routes>
        <Route path="/"  element={<Product/>} />
        <Route path="/:title" element={<Product/>} />
        <Route path="/details/:id" element={<Productdetail/>} />
        {/* <Route path="/" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
