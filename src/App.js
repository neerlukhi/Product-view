import './App.css';
import { Routes, Route } from "react-router-dom"
// import { useState } from 'react';
import Header from './Header';
import Product from './components/Product';
import Productdetail from './components/Productdetail';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from './components/Wishlist';

function App() {

  // const [searchQuery, setSearch] = useState('');

  return (
    <>
      <Header />
      <ToastContainer/>
      <Routes>
        <Route path="/"  element={<Product/>} />
        <Route path="/:title" element={<Product/>} />
        <Route path="/details/:id" element={<Productdetail/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
      </Routes>
    </>
  );
}

export default App;
