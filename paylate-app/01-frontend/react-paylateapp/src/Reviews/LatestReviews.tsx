import { Link } from "react-router-dom";
import ReviewModel from "../models/ReviewModel";
import { Review } from "./Review";

export const LatestReviews: React.FC<{
    reviews: ReviewModel[], productId: number | undefined, mobile: boolean
}> = (props) => {

    return (
        <div className={props.mobile ? 'mt-3' : 'row mt-5'}>
            <div className={props.mobile ? '' : 'col-sm-2 col-md-2'}>
                <h2>Latest Reviews: </h2>
            </div>
            <div className="col-sm-10 col-md-10">
                {props.reviews.length > 0 ?
                    <>
                        {props.reviews.slice(0, 3).map(eachReview => (
                            <Review review={eachReview} key={eachReview.id || eachReview.userEmail}></Review>
                        ))}

                        <div className="m-3">
                            <Link type="button" className="btn main-color btn-md text-white"
                                to={`/reviewlist/${props.productId}`}>
                                Reach all reviews.
                            </Link>
                        </div>
                    </>
                    :
                    <div className="m-3">
                        <p className="lead">
                            Currently no reviews for this product!
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}