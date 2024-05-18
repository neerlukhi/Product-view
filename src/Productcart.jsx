import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './product.css'
import { NavLink } from 'react-bootstrap';

const Productcart = () => {

  const { title } = useParams();

  const [data, setdata] = useState(null)
  const [rec, setrec] = useState(null)

  // const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then((response) => setrec(response.data))
  }, []);

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((res) => setdata(res.data.products))
  }, [title]);
  console.log(data);

  function cart(v) {
    var result = data.filter((val) => {
      return v == val;
    })

    setrec(result)
  }

  return (
    <>
      <div className="main d-flex">
        <div className="">
          <div className="sidebar">
            <NavLink aria-current="page" to={`/`} className='active sideLink'>All Product</NavLink>
            {
              rec == null
                ?
                ''
                :
                rec.map((item, index) => {
                  return (
                    <>
                      <NavLink to={`/${item}`} key={index} className='sideLink'>{item}</NavLink>
                    </>
                  )
                })
            }
          </div>
        </div>
      </div>
      {data != null ? (
        <h1>Loading data...</h1>
      ) : (
        <ul>
          {
          data.map((item, index) => (
            <li key={index}>
              <h1>{item.brand}</h1>
            </li>
          ))
          }
        </ul>
      )}
    </>
  )

  // return (
  //   <>
  //     <div className="main d-flex">
  //       <div className="">
  //         <div className="sidebar">
  //           <NavLink aria-current="page" to={`/`} className='active sideLink'>All Product</NavLink>
  //           {
  //             sidebar == null
  //               ?
  //               ''
  //               :
  //               sidebar.map((item, index) => {
  //                 return (
  //                   <>
  //                     <NavLink to={`/${item}`} key={index} className='sideLink'>{item}</NavLink>
  //                   </>
  //                 )
  //               })
  //           }
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // )
}

export default Productcart;