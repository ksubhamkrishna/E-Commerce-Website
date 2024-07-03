
export const Heros = () => {
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-left'></div>
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>What have you been Purchasing?</h1>
                            <p className='lead'>
                                The Subham's kart team would love to know what you have been Purchasing.
                                Whether it is to buy a thing or ordering ,
                                we will be able to provide the top product for you!
                            </p>
                            {/* {authState?.isAuthenticated ? 
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Explore top books </Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                            }   */}
                            <a className="btn main-color btn-lg text-white" href='#'>Sign up</a>
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate product selection possible
                                for our Subham's kart e-customers We are diligent about our product selection
                                and our products are always going to be our
                                top priority.
                            </p>
                            <a className="btn main-color btn-lg text-white" href='#'>Sign up</a>
                        </div>
                    </div>

                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'></div>
                    </div>

                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'></div>
                        <div className='mt-2'>
                            <h1>What have you been Purchasing?</h1>
                            <p className='lead'>
                                The Subham's Kart team would love to know what you have been purchasing.
                                Whether it is to buy a new product or reorder another,
                                we will be able to provide the top products for you!
                            </p>
                            {/* {authState?.isAuthenticated ? 
                                <Link type='button' className='btn main-color btn-lg text-white'
                                    to='search'>Explore top books</Link>
                                :
                                <Link className='btn main-color btn-lg text-white' to='/login'>Sign up</Link>
                        } */}
                            <a className="btn main-color btn-lg text-white" href='#'>Sign up</a>
                        </div>

                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'></div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate product selection possible
                                for our subham's cart Customers! We are diligent about our product selection
                                and our products are always going to be our
                                top priority.
                            </p>

                        </div>
                        <a className="btn main-color btn-lg text-white" href='#'>Sign up</a>
                    </div>
                </div>
            </div>

        </div>
    );
}