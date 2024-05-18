import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

const Productdetail = () => {

    var { id } = useParams()

    const [data, setdata] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/products/' + id)
            .then(res => setdata(res.data));
    }, [id])


    console.log(data)

    if (data != null) {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to={'/'}>Home</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to={'/'}>Product</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{data.title}</li>
                    </ol>
                </nav>
                {/* <NavLink className="nav-link" to="/">Home </NavLink>
                <NavLink className="nav-link" to={'/'}>Product</NavLink> */}

                <h1>{data.brand}</h1>
                <h2>{data.category}</h2>
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