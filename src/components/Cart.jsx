import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MdDelete, MdFavorite } from "react-icons/md";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { Removeitem , inc , dec } from '../slice/cartSlice';
import '../product.css'

const Cart = () => {

    const data = useSelector((state) => state.cart.carts);
    const checkout = useSelector((state) => state.cart.grandTotal)
    console.log('datas', data)

    const dispatch = useDispatch()

    return (
        <>
            <section className="h-100 gradient-custom">
                <div className='d-flex'>
                    <div className="container">
                        <div className="d-flex py-2">
                            <NavLink className="nav-link" to='/'>Home</NavLink>&nbsp;/ Cart
                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Cart - {data.length} items</h5>
                                </div>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <>
                                                <div className="card-body">
                                                    {/* <!-- Single item --> */}
                                                    <div className="row">
                                                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                            {/* <!-- Image --> */}

                                                            <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                <img
                                                                    src={item.thumbnail}
                                                                    className="w-100"
                                                                    alt="Blue Jeans Jacket"
                                                                />
                                                                {/* <a href="#">
                                                                    <div className="mask" style={{ backgroundColor: '#fbfbfb33' }}>click</div>
                                                                </a> */}
                                                            </div>

                                                            {/* <!-- Image --> */}
                                                        </div>

                                                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                            {/* <!-- Data --> */}
                                                            <p><strong>{item.title}</strong></p>
                                                            <p className='text-capitalize fw-medium'>{item.category}</p>
                                                            {/* <p>Size: M</p> */}
                                                            <h6 className=' fw-semibold '>
                                                                {item.discountPercentage}%off
                                                            </h6>
                                                            <div className="d-flex mt-4">
                                                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm me-1 mb-2" data-mdb-tooltip-init
                                                                    title="Remove item"
                                                                    onClick={() => dispatch(Removeitem(index))}
                                                                >
                                                                    <MdDelete style={{ width: '20px', height: '20px' }} />
                                                                </button>
                                                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-sm mb-2 " data-mdb-tooltip-init
                                                                    title="Move to the wish list">
                                                                    <MdFavorite style={{ width: '20px', height: '20px' }} />
                                                                </button>
                                                            </div>
                                                            {/* <!-- Data --> */}
                                                        </div>

                                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                            {/* <!-- Quantity --> */}
                                                            <div className="d-flex mb-4 align-items-center" style={{ maxWidth: '250px', height: '40px' }}>
                                                                <button className='btn btn-primary px-3 me-2' onClick={() => dispatch(dec(index))}>
                                                                    <FaMinus />
                                                                </button>

                                                                {/* <div  className="form-outline">
                                                                    <input id="form1" min="0" name="quantity" value="1" type="number" className="form-control" />
                                                                </div> */}
                                                                <div data-mdb-input-init className="form-outline">
                                                                    {/* <label className="form-label" for="form1">{item.qty}</label> */}
                                                                    <span>{item.qty}</span>
                                                                </div>

                                                                <button className="btn btn-primary px-3 ms-2" onClick={() => dispatch(inc(index))}>
                                                                    <FaPlus />
                                                                </button>
                                                            </div>
                                                            {/* <!-- Quantity --> */}

                                                            {/* <!-- Price --> */}
                                                            <p className="text-start text-md-center">
                                                                <strong>${item.price}</strong>
                                                            </p>
                                                            {/* <!-- Price --> */}
                                                        </div>
                                                    </div>
                                                    {/* <!-- Single item --> */}

                                                    <hr className="my-4" />
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="card mb-4">
                                <div className="card-body">
                                    <p><strong>Expected shipping delivery</strong></p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body">
                                    <p><strong>We accept</strong></p>
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard" />
                                    <img className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.webp"
                                        alt="PayPal acceptance mark" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>${checkout ? checkout.toFixed(2) : 0}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>Gratis</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span><strong>${checkout ? checkout.toFixed(2) : 0}</strong></span>
                                        </li>
                                    </ul>

                                    <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">
                                        Go to checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart