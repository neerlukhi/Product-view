import React from 'react'
import Sidebar from './Sidebar'
import Productcart from './Productcart'

const Home = () => {
    return (
        <>
            <section>
                <div className="Container-fuild">
                    <div className="row g-0">
                        <div className="col-3">
                            <div>
                                {/* <Sidebar /> */}
                            </div>
                        </div>
                        <div className="col-9 mt-2 ">
                            <div className="row g-0">
                                <Productcart />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home