export const Carousel = () => {
    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late buying" Products.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages/Furniture.jpg')}
                                        width='500'
                                        height='233'
                                        alt="Furniture"
                                    />
                                    <h6 className='mt-2'>Furniture</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages//Books.jpg')}
                                        width='600'
                                        height='233'
                                        alt="book"
                                    />
                                    <h6 className='mt-2'>Books</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages//Electronics.webp')}
                                        width='600'
                                        height='233'
                                        alt="Electronics"
                                    />
                                    <h6 className='mt-2'>Electronics</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages//Fashion.jpg')}
                                        width='600'
                                        height='233'
                                        alt="Fashion"
                                    />
                                    <h6 className='mt-2'>Fashion</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages//Food.webp')}
                                        width='600'
                                        height='233'
                                        alt="Food"
                                    />
                                    <h6 className='mt-2'>Groceries</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages//Health And Skincare.jpg')}
                                        width='600'
                                        height='233'
                                        alt="Health And Skincare"
                                    />
                                    <h6 className='mt-2'>Health and Skincare Products</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages//kitchen-tools.jpg')}
                                        width='600'
                                        height='233'
                                        alt="kitchen-tools"
                                    />
                                    <h6 className='mt-2'>Kitchen And HouseHold Items</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../../Images/BooksImages/Sports.jpg')}
                                        width='600'
                                        height='233'
                                        alt="book"
                                    />
                                    <h6 className='mt-2'>Sports Products</h6>
                                    <p>SubhKart</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                        <img
                            src={require('./../../../../Images/BooksImages//Furniture.jpg')}
                            width='151'
                            height='233'
                            alt="book"
                        />
                        <h6 className='mt-2'>Furniture</h6>
                        <p>SubhKart</p>
                        <a className='btn main-color text-white' href='#'>Reserve</a>
                    </div>
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a className='btn btn-outline-secondary btn-lg' href='#'>View More</a>
            </div>
        </div>
    );
}