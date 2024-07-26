import { useEffect, useState } from "react";
import ProductModel from "../../models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import LatestReviews from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";


export const ProductCheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewsLeft, setIsReviewsleft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Loans Count state
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // Is Book Check Out?
    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingProductCheckedOut, setIsLoadingProductCheckedOut] = useState(true);


    const productId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchProduct = async () => {
            const baseUrl: string = `http://localhost:8080/api/products/${productId}`;

            const response = await fetch(baseUrl);

            // guard clause
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }


            const responseJson = await response.json();

            const loadedProduct: ProductModel = {
                id: responseJson.id,
                title: responseJson.title,
                seller: responseJson.seller,
                description: responseJson.description,
                quantities: responseJson.quantities,
                quantityAvailable: responseJson.quantityAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            setProduct(loadedProduct);
            setIsLoading(false);
        };
        fetchProduct().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);

        })

    }, [isCheckedOut]);

    useEffect(() => {
        const fetchProductReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByProductId?productid=${productId}`;

            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];

            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    product_id: responseData[key].product_id,
                    reviewDescription: responseData[key].reviewDescription,
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };
        fetchProductReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewsLeft]);

    useEffect(() => {

        const fetchUserReviewProduct = async () => {

            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/product/?productId=${productId}`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) {
                    throw new Error('Something went Wrong');
                }
                const userReviewResponseJson = await userReview.json();

                setIsReviewsleft(userReviewResponseJson);
            }

            setIsLoadingUserReview(false);

        }

        fetchUserReviewProduct().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        })
    }, [authState]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/products/secure/currentloans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState, isCheckedOut]);
    useEffect(() => {
        const fetchUserCheckedOutProduct = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/products/secure/ischeckedout/byuser/?productId= ${productId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const productCheckedOut = await fetch(url, requestOptions);
                if (!productCheckedOut.ok) {
                    throw new Error('Something went Wrong!');
                }
                const productCheckedOutResponseJson = await productCheckedOut.json();
                setIsCheckedOut(productCheckedOutResponseJson);
            }
            setIsLoadingProductCheckedOut(false);
        }
        fetchUserCheckedOutProduct().catch((error: any) => {
            setIsLoadingProductCheckedOut(false);
            setHttpError(error.message);
        })
    }, [authState]);
    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingProductCheckedOut || isLoadingUserReview) {
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
    async function checkoutProduct() {
        const url = `http://localhost:8080/api/products/secure/checkout/?productId=${product?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error('Something went wrong!');
        }

        setIsCheckedOut(true);
    }


    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {product?.img ?
                            <img src={product?.img} width='226' height='349' alt='Product' />
                            :
                            <img src={require('./../../Images/BooksImages/Fashion.jpg')} width='226' height='349' alt='Product' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{product?.title}</h2>
                            <h5 className="text-primary">{product?.seller}</h5>
                            <p className="lead">{product?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox product={product} mobile={false} currentLoansCount={currentLoansCount}
                        isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                        checkoutProduct={checkoutProduct} isReviewLeft={isReviewsLeft} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} productId={product?.id} mobile={true} />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {product?.img ?
                        <img src={product?.img} width='226' height='349' alt='Product' />
                        :
                        <img src={require('./../../Images/BooksImages/Fashion.jpg')} width='226' height='349' alt='Product' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{product?.title}</h2>
                        <h5 className="text-primary">{product?.seller}</h5>
                        <p className="lead">{product?.description}</p>
                        <StarsReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox product={product} mobile={false} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} isCheckedOut={isCheckedOut}
                    checkoutProduct={checkoutProduct} isReviewLeft={isReviewsLeft} />
                <hr />
                <LatestReviews reviews={reviews} productId={product?.id} mobile={true} />
            </div>
        </div>
    );
}

