import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css'
import { BsCart2 } from "react-icons/bs";
import { Nav, Navbar, Container, NavItem } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaBars, FaFacebook, FaGoogle, FaPhone } from 'react-icons/fa6';
import { showOffcanvas } from './slice/cartSlice';
import { useDispatch } from 'react-redux';

const Header = () => {

  const [modalShow, setModalShow] = useState(false);
  const [signIn, setSignIn] = useState(false);


  const dispatch = useDispatch();

  // const searchHandler = (e) => {
  //   setSearch(e.target.value);
  // };

  return (
    <>
      {/* <h1>product view</h1> */}
      <Navbar expand="lg" className="w-100 bg-body-tertiary bg-dark py-3" data-bs-theme="dark">
        <Container>
          <Button variant="white" onClick={() => dispatch(showOffcanvas())} className="d-lg-none my-3">
            <FaBars/>
          </Button>
          <Navbar.Brand > <h1>Shopping App</h1> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-between'>
            <input
              type="search"
              placeholder='Search'
              // value={search}
              // onChange={searchHandler}
              className='search form-control border border-dark bg-dark text-white' />

            <Nav className="main mr-auto align-items-center">
              <NavLink to={`/cart`} className='d-flex align-items-center'> <NavItem className='cart align-items-center'><a className='text-white'>  <BsCart2 /> Cart </a></NavItem> </NavLink>
              <NavItem className='ms-lg-4'><a className='btn btn-primary' onClick={() => setModalShow(true)}>Login in / SignIn</a></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={modalShow}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
      >
        {signIn ? (
          <Modal.Body className='text-dark'>
            <h4 className='text-center'>Sign Up</h4>
            <label>Name</label>
            <TextField id="outlined-basic" className='w-100 my-1' label="Name" variant="outlined" size='small' />
            <label>Mobile Number</label>
            <TextField id="outlined-basic" className='w-100 my-1' label="Mobile" variant="outlined" size='small' />
            <label>Email</label>
            <TextField id="outlined-basic" className='w-100 my-1' label="Email" variant="outlined" size='small' />
            <label>Password</label>
            <TextField id="outlined-basic" className='w-100 my-1 mb-2' label="Password" variant="outlined" size='small' />
            <Button className='w-100' onClick={() => setModalShow(false)}>Sign Up</Button>
            <div className='w-100 mt-4'>
              <h6 className='text-center mb-4'>Also Sign Up With</h6>
              <div className='d-flex justify-content-evenly'>
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <i className="social rounded-circle fa-brands fa-google"></i>
                  <span>Google</span>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <i className="social rounded-circle fa-brands fa-facebook"></i>
                  <span>Facebook</span>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <i className="social rounded-circle fa-solid fa-phone"></i>
                  <span>TrueCaller</span>
                </div>
              </div>
              <h6 className='pt-4 text-center' onClick={() => setSignIn(false)}>Back To <NavLink to="#">Log In</NavLink>?</h6>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body className='text-dark'>
            <h4 className='text-center position-relative'>
              Login
              <IoMdClose className='close' onClick={() => setModalShow(false)} />
            </h4>
            <label>Email / Phone</label>
            <TextField id="outlined-basic" className='w-100 my-1' label="Email or Phone" variant="outlined" size='small' />
            <label>Password</label>
            <TextField id="outlined-basic" className='w-100 my-1 mb-2' label="Password" variant="outlined" size='small' />
            <Button className='w-100' onClick={() => setModalShow(false)}>Log In</Button>
            <div className='d-flex justify-content-end pt-3'>
              <NavLink to="#">Forgot Password?</NavLink>
            </div>
            <div className='w-100 mt-4'>
              <h6 className='text-center mb-4'>Also Login With</h6>
              <div className='d-flex justify-content-evenly'>
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <FaGoogle className='social rounded-circle' />
                  <span>Google</span>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <FaFacebook className='social rounded-circle' />
                  <span>Facebook</span>
                </div>
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <FaPhone className='social rounded-circle' />
                  <span>TrueCaller</span>
                </div>
              </div>
              <h6 className='pt-4 text-center' onClick={() => setSignIn(true)}>Are You New User? <NavLink to="#">Sign Up</NavLink> Here</h6>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  )
}

export default Header;