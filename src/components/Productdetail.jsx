import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";
import { useParams, NavLink } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Addtocart } from "../slice/cartSlice";
// import { ToastContainer, toast } from 'react-toastify';


const Productdetail = () => {

    var { id } = useParams()

    const [data, setdata] = useState(null);

    const [image, setImage] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(id)
        axios.get('https://dummyjson.com/products/' + id)
            .then(res => setdata(res.data));
    }, [id])

    const imageHandle = (imageUrl) => {
        setImage(imageUrl);
    };

    const shareHandle = (data) => {
        if (navigator.share) {
            navigator.share({
                title: data.title,
                url: window.location.href,
                text: data.description,
            });
        } else {
            alert('Sharing is not supported in your browser.');
        }
    }

    console.log(data)

    if (data != null) {
        return (
            <>
                <div className="container">
                    <nav aria-label="breadcrumb" className="pt-2">
                        <ol class="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to={'/'} className='text-dark' >Home</NavLink></li>
                            <li className="breadcrumb-item"><NavLink to={'/'} className='text-dark'>Product</NavLink></li>
                            <li className="breadcrumb-item active" aria-current="page"><a className="text-dark">{data.title}</a></li>
                        </ol>
                    </nav>
                    {/* <h1>{data.brand}</h1>
                <h2>{data.category}</h2> */}
                    <div className='row'>
                        <div className='col col-sm-2'>
                            {
                                data?.images.map((item, index) => (
                                    <>
                                        <NavLink key={index} className="imageColumn">
                                            <img
                                                onClick={() => imageHandle(item)}
                                                alt="Product"
                                                src={item}
                                                width="80%"
                                                height="80px"
                                                style={{ objectFit: "cover", marginBottom: "10px" }}
                                            />
                                        </NavLink>
                                    </>
                                ))
                            }
                        </div >
                        <div className='col col-sm-4'>
                            <img
                                width="450px"
                                height="390px"
                                src={image ? image : data?.thumbnail}
                                style={{ objectFit: "cover" }}
                                alt={data?.title}
                            />
                            <div className='d-flex my-3 gap-3'>
                                <button className="btn btn-success">
                                    <i className="fa-solid fa-heart"></i> ADD TO WISHLIST
                                </button>
                                <button className="btn btn-primary" onClick={() => dispatch(Addtocart(data))}>
                                    <i className="fa-solid fa-cart-shopping"></i> ADD TO CART
                                </button>
                            </div>
                        </div>
                        <div className='col col-sm-6'>
                            <div className='d-flex justify-content-between'>
                                <h6 className='text-capitalize
                                '>{data?.category}</h6>
                                <h6
                                    className='text-muted'
                                    title='Share'
                                    style={{ cursor: "pointer" }}
                                    onClick={() => shareHandle(data)}
                                >
                                    <FaShare/> Share
                                </h6>
                            </div>
                            <h2>{data?.title}</h2>
                            <p>{data?.description}</p>
                            <div className="d-flex">
                                <h6
                                    className='rating'
                                    style={{
                                        backgroundColor:
                                            data?.rating > 4
                                                ? "green"
                                                : data?.rating > 3
                                                    ? "red"
                                                    : data?.rating > 2
                                                        ? "orange"
                                                        : "",
                                    }}
                                >
                                    {data?.rating} <FaStar />
                                </h6>
                                <span className="stock ms-3 "> <AiOutlineStock /> {data.stock}</span>
                            </div>
                            <div className='d-flex justify-center align-center'>
                                <h3>${data?.price}</h3>&nbsp;
                                <span className='pt-1 ml-5 text-success'>{data?.discountPercentage}% Off</span>
                            </div>
                            {/* <h6 className='text-muted'>{data?.stock} Pcs Available In Stock</h6> */}
                            <p className="text-right">
                                Our shopping website makes online shopping faster, easier, and more
                                rewarding than ever. Our clean, modern interface allows you to quickly
                                filter and find exactly what you're looking for. We partner with thousands
                                of top retailers and brands to bring you the latest styles and products at
                                competitive prices. Check back daily for new deals and discounts to get the
                                items you love for less. With our shopping website, online shopping is a pleasure,
                                not a chore. Spend less time searching and more time enjoying easy, seamless purchases
                                shipped straight to your door. Join millions who have made us their go-to online shopping destination.
                            </p>
                        </div>
                    </div>
                    {/* <div className='my-5'>
                    <ToastContainer gutter={50} position='top-center' toastOptions={{ duration: 3000 }} />
                </div> */}
                </div>
            </>
        )
    }
    else {
        return (
            <>
                {/* <h1>data loading....</h1> */}
                <div className="data d-flex justify-content-center align-items-center">
                    <span className='loader'></span>
                </div>
            </>
        )
    }

}

export default Productdetail;