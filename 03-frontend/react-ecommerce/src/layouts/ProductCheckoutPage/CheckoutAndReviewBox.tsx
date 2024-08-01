import { Link } from "react-router-dom";
import ProductModel from "../../models/ProductModel";
import { LeaveAReview } from "../Utils/LeaveAReview";

export const CheckoutAndReviewBox: React.FC<{
    product: ProductModel | undefined, mobile: boolean,
    currentLoansCount: number, isAuthenticated: any, isCheckedOut: boolean,
    checkoutProduct: any, isReviewLeft: boolean, submitReview: any
}> = (props) => {


    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (<button onClick={() => props.checkoutProduct()} className='btn btn-success btn-lg'>Checkout</button>)
            } else if (props.isCheckedOut) {
                return (<p><b>Product checked out. Enjoy</b></p>)
            } else if (!props.isCheckedOut && props.currentLoansCount >= 5) {
                return (<p className="text-danger"> Too many products checked out.</p>)
            }
        }
        return (<Link to={"/login"} className="btn btn-success btn-lg">Sign in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (
                <p>
                    <LeaveAReview submitReview={props.submitReview} />
                </p>)
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (
                <p>
                    <b>Thank you for your Review</b>
                </p>)
        }
        return (
            <div>
                <hr />
                <p>Sign in to be able to leave a review.</p>
            </div>
        )

    }


    return (

        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className="card-body container">
                <div className="mt-3">
                    <p>
                        <b>{props.currentLoansCount} </b>
                        Products Checked Out
                    </p>
                    <hr />
                    {props.product && props.product.quantityAvailable && props.product.quantityAvailable > 0 ?
                        <h4 className='text-success'>
                            Available
                        </h4>
                        : <h4 className="text-danger">
                            Wait List
                        </h4>

                    }
                    <div className="row">
                        <p className="col-6 lead">
                            <b>{props.product?.quantities} </b>
                            quantities
                        </p>
                        <p className="col-6 lead">
                            <b>{props.product?.quantityAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr />
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
                {reviewRender()}
            </div>
        </div>
    );

}