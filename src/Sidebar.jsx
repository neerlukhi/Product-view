import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-bootstrap';
import './product.css'
import axios from 'axios';

const Sidebar = () => {

  const [sidebar, setSidebar] = useState(null);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then((response) => setSidebar(response.data))
  }, []);

  return (
    <>
      <div className="main d-flex">
        <div className="">
          <div className="sidebar">
            <NavLink aria-current="page" to={`/`} className='active sideLink'>All Product</NavLink>
            {
              sidebar == null
                ?
                ''
                :
                sidebar.map((item, index) => {
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
    </>
  )
}

export default Sidebar;