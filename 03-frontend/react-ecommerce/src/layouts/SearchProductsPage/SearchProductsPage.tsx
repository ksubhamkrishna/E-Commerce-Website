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

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://localhost:8080/api/products";

            const url: string = `${baseUrl}?page=${currentPage - 1}&size=5`;
            const response = await fetch(url);

            // guard clause
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            const responseJson = await response.json(); // tranforms it into JSON.

            const responseData = responseJson._embedded.products;

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

    }, []);

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

    const indexOfLastProduct: number = currentPage * productsPerPage;
    const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
    let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ? productsPerPage * currentPage : totalAmountOfProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>

            <div className='container'
            >
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            <input className='form-control me-2' type='search'
                                placeholder='Search' aria-labelledby='Search' />
                            <button className='btn btn-outline-success'>
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
                <div className='mt-3'>
                    <h5>Number of results:(7) </h5>

                </div>
                <p>
                    1 to5 of 7 items:
                </p>
                {products.map(product => (

                    <SearchProduct product={product} key={product.id} />
                ))}

                {totalPages > 1 &&
                    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                }
            </div>


        </div>
    );

}