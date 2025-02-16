import { Link } from "react-router-dom"
import ProductModel from "../models/ProductModel"
import { LeaveReview } from "../Utils/LeaveReview"

export const CheckoutReview: React.FC<{
    product: ProductModel | undefined, mobile: boolean,
    isAuthenticated: any, isCheckedOut: boolean
    checkoutProduct: any, isReviewLeft: boolean, 
    submitReview: any, partner: string }> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut) {
                return (<button onClick={() => props.checkoutProduct()} className="btn btn-success btn-lg">Checkout</button>)
            } else if (props.isCheckedOut) {
                return (<div><b>Product checked out. Enjoy!</b></div>)
            } else if (!props.isCheckedOut) {
                return (<div className="text-danger">Too many products checked out.</div>)
            }
        }
        return (<Link to={'/login'} className="btn btn-success btn-lg">Sign in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (
                <div>
                    <LeaveReview submitReview={props.submitReview} partner={props.partner}/>
                </div>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (
                <div>
                    <b>
                        Thank you for your review!
                    </b>
                </div>
            )
        }
        return (
            <div>
                <hr />
                <div>
                    Sign in to be able to leave a review.
                </div>
            </div>
        )
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    {props.product && props.product.quantity && props.product.quantity > 0 ?
                        <h4 className="text-success">
                            Available
                        </h4>
                        :
                        <h4 className="text-danger">
                            Wait List
                        </h4>
                    }
                    <div className="row">
                        <div className="col-6 lead">
                            <b>{props.product?.quantity} </b>
                            copies
                        </div>
                        <div className="col-6 lead">
                            <b>{props.product?.quantity} </b>
                            available
                        </div>
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
    )
}