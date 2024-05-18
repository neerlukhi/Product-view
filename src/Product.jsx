import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './product.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineStock } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FaStar } from 'react-icons/fa6';

const Product = () => {

    // const { id } = useParams();

    const [sidebar, setsidebar] = useState([])
    const [data, setdata] = useState(null)
    const [cat, setcat] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/products/categories')
            .then((response) => setsidebar(response.data))
    }, []);

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=100&skip=0')
            .then((res) => setdata(res.data.products))
    }, []);
    console.log(data);

    function category(v) {
        var result = data.filter((val) => {
            return v == val.category;
        })

        setcat(result)
    }

    console.log(cat)

    if (data != null) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 p-0">
                        <div className="main d-flex">
                            <div className="">
                                <div className="sidebar">
                                    <NavLink to="/" className='nav-link sideLink' onClick={() => setcat()}>All Product</NavLink>
                                    {
                                        sidebar.map((item, index) => {
                                            return (
                                                <>
                                                    <NavLink className='nav-link sideLink' key={index} onClick={() => category(item)}>{item}</NavLink>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row col-10 p-0 m-0 card-main">
                        {
                            cat == null ? data.map((item, index) => (
                                <>
                                    <div className="col-lg-4 col-md-6 p-0">
                                        <Card>
                                            <Link to={`/details/${item.id}`}>
                                                <Card.Img variant='top' src={item.thumbnail} loading='lazy' />
                                                <CardBody>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                    <CardTitle className='text-dark'>{item.title} </CardTitle>
                                                    <h6 class="rating bg-white text-success d-flex align-items-center"> {item.rating} <FaStar className='ms-2' /></h6>
                                                    </div>
                                                    {/* <CardText>{item.description}</CardText> */}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className='mb-0' style={{ color: 'green', fontWeight: 'bold' }}>Price : ${item.price}</p>
                                                        <span className='text-black' style={{ fontWeight: 'normal' }}>{item.discountPercentage}%off</span>
                                                        {/* <span className='stock'><AiOutlineStock/> {item.stock}</span> */}
                                                        <a href='/' className='btn btn-primary'>Add to cart</a>
                                                    </div>
                                                </CardBody>
                                            </Link>
                                        </Card>
                                    </div>

                                </>
                            )) : cat.map((item, index) => (
                                <>
                                    <div className="col-lg-4 col-md-6 p-0">
                                        <Card>
                                            <Link to={`/details/${item.id}`}>
                                                <Card.Img variant='top' src={item.thumbnail} loading='lazy' />
                                                <CardBody>
                                                    <CardTitle className='text-dark' style={{ fontSize: '16px', textTransform: 'capitalize' }}>{item.title} </CardTitle>
                                                    {/* <CardText>{item.description}</CardText> */}
                                                    <div className="d-flex justify-content-between ">
                                                        <p style={{ color: 'green', fontWeight: 'bold' }}>Price : ${item.price}</p>
                                                        <span className='text-black' style={{ fontWeight: 'normal' }}>{item.discountPercentage}%off</span>
                                                        {/* <span className='stock'><AiOutlineStock/> {item.stock}</span> */}
                                                        <a href="" className='btn btn-primary'>Add to cart</a>
                                                    </div>
                                                </CardBody>
                                            </Link>
                                        </Card>
                                    </div>

                                </>
                            ))
                        }
                        {/* <nav aria-label="..." className='justify-content-center'>
                        < Stack spacing={5} className='m-auto my-5' >
                            <Pagination color='primary' size='large' />
                        </Stack>
                    </nav> */}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                {/* <h1>loading data........</h1> */}
                <div className="data d-flex justify-content-center align-items-center">
                    <span className='loader'></span>
                </div>
            </>
        )
    }
}

export default Product;