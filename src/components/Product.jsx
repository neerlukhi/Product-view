import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../product.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { hideOffcanvas , Addtocart} from '../slice/cartSlice';

const Product = () => {

    const { title } = useParams();

    const [sidebar, setsidebar] = useState([])
    const [data, setdata] = useState(null)
    const [cat, setcat] = useState(null);

    const dispatch = useDispatch()

    const OffcanvasVisible = useSelector((state) => state.cart.isVisible);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/category-list`)
            .then((response) => setsidebar(response.data))
    }, []);

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=194&skip=0')
            .then((res) => setdata(res.data.products))
    }, []);
    console.log(data);

    function category(v) {
        var result = data.filter((val) => {
            return v == val.category;
        })

        setcat(result)
        dispatch(hideOffcanvas());// Close the offcanvas when a category is selected
    }

    console.log(cat)

    if (data != null) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 p-0 d-none d-lg-block">
                        <div className="main d-flex">
                            <div className="">
                                <div className="sidebar">
                                    <NavLink to={`/${title}`} className='nav-link sideLink' onClick={() => setcat()}>All Product</NavLink>
                                    {
                                        sidebar.map((item, index) => {
                                            return (
                                                <>
                                                    <Link to={`/${item}`} className='nav-link sideLink' key={index} onClick={() => { category(item) }}>{item}</Link>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-lg-none">
                        {/* <Button variant="" onClick={() => setShow(true)}>
                        <FaBars/>
                    </Button> */}
                        <Offcanvas show={OffcanvasVisible} onHide={() => dispatch(hideOffcanvas())} responsive="lg">
                            <OffcanvasHeader closeButton>
                                <OffcanvasTitle>Categories</OffcanvasTitle>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <NavLink to={`/${title}`} className='nav-link sideLink' onClick={() => { setcat(); dispatch(hideOffcanvas()); }}>All Product</NavLink>
                                {sidebar.map((item, index) => (
                                    <Link to={`/${item}`} className='nav-link sideLink' key={index} onClick={() => category(item)}>{item}</Link>
                                ))}
                            </OffcanvasBody>
                        </Offcanvas>
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
                                                        <h6 class="rating bg-white text-success d-flex align-items-center"> {item.rating} <FaStar className='ms-1' /></h6>
                                                    </div>
                                                    {/* <CardText>{item.description}</CardText> */}
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className='mb-0' style={{ color: 'green', fontWeight: 'bold' }}>Price : ${item.price}</p>
                                                        <span className='text-black' style={{ fontWeight: 'normal' }}>{item.discountPercentage}%off</span>
                                                        {/* <span className='stock'><AiOutlineStock/> {item.stock}</span> */}
                                                        <Button className='btn btn-primary' onClick={() => dispatch(Addtocart(item))}>Add to cart</Button>
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
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className='p-price' style={{ color: 'green', fontWeight: 'bold' }}><span>Price : ${item.price}</span></p>
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