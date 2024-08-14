import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {
    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState<string | null>(null);
    const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/products/secure/currentloans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                try {
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) throw new Error('Something went wrong!');
                    const data = await response.json();
                    setShelfCurrentLoans(data);
                } catch (error: any) {
                    setHttpError(error.message);
                }
                setIsLoadingUserLoans(false);
            }
        };

        fetchUserCurrentLoans();
        window.scrollTo(0, 0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return <SpinnerLoading />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }

    async function returnProduct(productId: number){
        const url = `http://localhost:8080/api/products/secure/return/?productId= ${productId}`;
        const requestOptions = {
            method : 'PUT',
            headers:{
            Authorization : `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type' : 'application/json'
        }
    };
    const returnResponse = await fetch(url, requestOptions);
    if(!returnResponse.ok){
        throw new Error('Something went wrong!');
    }
    setCheckout(!checkout);
    }
    return (
        <div>
            {/* Desktop */}
            <div className="d-none d-lg-block mt-2">
                {shelfCurrentLoans.length > 0 ? (
                    <>
                        <h5>Current Loans:</h5>
                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.product.id}>
                                <div className="row mt-3 mb-3">
                                    <div className="col-4 col-md-4 container">
                                        <img
                                            src={shelfCurrentLoan.product?.img || require('./../../../Images/BooksImages/Furniture.jpg')}
                                            width='226'
                                            height='349'
                                            alt='Product'
                                        />
                                    </div>
                                    <div className="card col-3 col-md-3 container d-flex">
                                        <div className="card-body">
                                            <h4 className="mt-3">Loan Options</h4>
                                            {shelfCurrentLoan.daysLeft > 0 && (
                                                <p className="text-secondary">
                                                    Due in {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            )}
                                            {shelfCurrentLoan.daysLeft === 0 && (
                                                <p className="text-success">
                                                    Due Today.
                                                </p>
                                            )}
                                            {shelfCurrentLoan.daysLeft < 0 && (
                                                <p className="text-danger">
                                                    Past due by {shelfCurrentLoan.daysLeft} days.
                                                </p>
                                            )}
                                            <div className="list-group mt-3">
                                                <button
                                                    className="list-group-item list-group-item-action"
                                                    aria-current='true'
                                                    data-bs-toggle='modal'
                                                    data-bs-target={`#modal${shelfCurrentLoan.product.id}`}
                                                >
                                                    Manage Loan
                                                </button>
                                                <Link to='search' className="list-group-item list-group-item-action">
                                                    Search More Products?
                                                </Link>
                                            </div>
                                            <hr />
                                            <p className="mt-3">
                                                Help others find their adventure by reviewing your loan.
                                            </p>
                                            <Link className="btn btn-primary" to={`/checkout/${shelfCurrentLoan.product.id}`}>
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile ={false} returnProduct = {returnProduct}/>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className="mt-3">Currently no loans</h3>
                        <Link className="btn btn-primary" to='search'>
                            Search for a new product
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile */}
            <div className='container d-lg-none mt-2'>
                {shelfCurrentLoans.length > 0 ? (
                    <>
                        <h5 className='mb-3'>Current Loans:</h5>
                        {shelfCurrentLoans.map(shelfCurrentLoan => (
                            <div key={shelfCurrentLoan.product.id}>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <img
                                        src={shelfCurrentLoan.product?.img || require('./../../../Images/BooksImages/Furniture.jpg')}
                                        width='226'
                                        height='349'
                                        alt='Book'
                                    />
                                </div>
                                <div className='card d-flex mt-5 mb-3'>
                                    <div className='card-body container'>
                                        <h4 className='mt-3'>Loan Options</h4>
                                        {shelfCurrentLoan.daysLeft > 0 && (
                                            <p className='text-secondary'>
                                                Due in {shelfCurrentLoan.daysLeft} days.
                                            </p>
                                        )}
                                        {shelfCurrentLoan.daysLeft === 0 && (
                                            <p className='text-success'>
                                                Due Today.
                                            </p>
                                        )}
                                        {shelfCurrentLoan.daysLeft < 0 && (
                                            <p className='text-danger'>
                                                Past due by {shelfCurrentLoan.daysLeft} days.
                                            </p>
                                        )}
                                        <div className='list-group mt-3'>
                                            <button
                                                className='list-group-item list-group-item-action'
                                                aria-current='true'
                                                data-bs-toggle='modal'
                                                data-bs-target={`#mobilemodal${shelfCurrentLoan.product.id}`}
                                            >
                                                Manage Loan
                                            </button>
                                            <Link to='search' className='list-group-item list-group-item-action'>
                                                Search more products?
                                            </Link>
                                        </div>
                                        <hr />
                                        <p className='mt-3'>
                                            Help others find their adventure by reviewing your loan.
                                        </p>
                                        <Link className='btn btn-primary' to={`/checkout/${shelfCurrentLoan.product.id}`}>
                                            Leave a review
                                        </Link>
                                    </div>
                                </div>
                                <hr/>
                                <LoansModal shelfCurrentLoan={shelfCurrentLoan} mobile ={true} returnProduct = {returnProduct}/>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <h3 className='mt-3'>Currently no loans</h3>
                        <Link className='btn btn-primary' to='search'>
                            Search for a new book
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
