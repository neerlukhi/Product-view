import './App.css';
import Sidebar from './Sidebar';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Productcart from './Productcart';
import Product from './Product';
import Productdetail from './Productdetail';

function App() {

  const [] = useState()
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Product/>} />
        <Route path="/details/:id" element={<Productdetail/>} />
        {/* <Route path="/" element={} /> */}
      </Routes>
    </>
  );
}

export default App;
