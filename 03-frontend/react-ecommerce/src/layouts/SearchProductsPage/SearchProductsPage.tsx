import { useEffect, useState } from 'react';
import ProductModel from '../../models/ProductModel';
import { SpinnerLoading } from '../Utils/SpinnerLoading';
import { SearchProduct } from './components/SearchProduct';
import { Pagination } from '../Utils/Pagination';

export const SearchProductsPage = () => {

    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://localhost:8080/api/products";

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${productsPerPage}`;
            }
            else {
                url = baseUrl + searchUrl;
            }
            const response = await fetch(url);

            // guard clause
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            const responseJson = await response.json(); // tranforms it into JSON.

            const responseData = responseJson._embedded.products;

            setTotalAmountOfProducts(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);
            const loadedProducts: ProductModel[] = [];

            for (const key in responseData) {
                loadedProducts.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    seller: responseData[key].seller,
                    description: responseData[key].description,
                    quantities: responseData[key].quantities,
                    quantityAvailable: responseData[key].quantityAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,

                });
            }

            setProducts(loadedProducts);
            setIsLoading(false);
        };
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);

        })
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

    if (isLoading) {
        return (
            <SpinnerLoading />

        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        }
        else {
            setSearchUrl(`/search/findByTitleContaining?title = ${search} &page=0&size= ${productsPerPage}`)
        }
    }

    const indexOfLastProduct: number = currentPage * productsPerPage;
    const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
    let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ?
        productsPerPage * currentPage : totalAmountOfProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search'
                                    placeholder='Search' aria-labelledby='Search'
                                    onChange={e => setSearch(e.target.value)} />
                                <button className='btn btn-outline-success' 
                                onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4' >
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    Category
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Furniture
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Books
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Electronics
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Fashion
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Groceries
                                        </a>
                                    </li>

                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Health and Skincare Products
                                        </a>
                                    </li>

                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Kitchen and Household Items
                                        </a>
                                    </li>

                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Sports Products
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* {totalAmountOfProducts > 0 ? */}
                    {/* <> */}
                    <div className='mt-3'>
                        <h5>Number of results:({totalAmountOfProducts}) </h5>
                    </div>
                    <p>
                        {indexOfFirstProduct + 1} to {lastItem} of {totalAmountOfProducts} items:
                    </p>
                    {products.map(product => (

                        <SearchProduct product={product} key={product.id} />
                    ))}
                    {/* </>
                    :
                    <div className='m-5'>
                            <h3>
                                Can't find what you are looking for?
                            </h3>
                            <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                                href='#'>Library Services</a>
                        </div>
                    } */}

                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );

}