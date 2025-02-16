import { useOktaAuth } from "@okta/okta-react";
import ProductModel from "../../models/ProductModel";
import { Spinner } from "../../Utils/Spinner";
import ReviewModel from "../../models/ReviewModel";
import { Stars } from "../../Utils/Stars";
import ReviewRequestModel from "../../models/ReviewRequestModel";
import { CheckoutReview } from "../../CheckoutReview/CheckoutReview";
import { LatestReviews } from "../../Reviews/LatestReviews";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductDetails = () => {
    const { partner, productId } = useParams<{ partner?: string, productId: string }>();
    const { authState } = useOktaAuth();

    const [product, setProduct] = useState<ProductModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    const [isCheckedOut, setIsCheckedOut] = useState(false);
    const [isLoadingProductCheckedOut, setIsLoadingProductCheckedOut] = useState(true);

    const [displayError, setDisplayError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const endpoint = partner
                    ? `${process.env.REACT_APP_API}/${partner}Products/${productId}`
                    : `${process.env.REACT_APP_API}/products/${productId}`;
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseData = await response.json();
                console.log(responseData);
                const loadedProduct = (() => {
                    const id = responseData._links.self.href.split('/').pop();
                    return new ProductModel(
                        id,
                        responseData.price,
                        responseData.productName,
                        responseData.authorName,
                        responseData.description,
                        responseData.quantity,
                        responseData.category,
                        responseData.imgUrl,
                        responseData.authorUrl,
                        responseData.rating
                    );
                })();
                setProduct(loadedProduct);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchProduct();
        console.log(`Product:${product}`);
    }, [partner, productId]);

    useEffect(() => {
        const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByProductId?productId=${productId}`;

        console.log(`Review url: ${reviewUrl}`);

        fetch(reviewUrl)
            .then((responseReviews) => {
                console.log(`Review response: ${responseReviews.status}`);
                if (!responseReviews.ok) {
                    throw new Error('Something went wrong!');
                }
                return responseReviews.json();
            })
            .then((responseJsonReviews) => {
                const responseData = responseJsonReviews._embedded.reviews;
                const loadedReviews: ReviewModel[] = [];
                let weightedStarReviews: number = 0;

                console.log(`Review response data: ${JSON.stringify(responseData)}`);

                for (const key in responseData) {
                    loadedReviews.push({
                        id: responseData[key].id,
                        userEmail: responseData[key].userEmail,
                        date: responseData[key].date,
                        rating: responseData[key].rating,
                        product_id: responseData[key].product_id,
                        reviewDescription: responseData[key].reviewDescription,
                    });
                    weightedStarReviews += responseData[key].rating;
                }

                if (loadedReviews.length > 0) {
                    const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                    setTotalStars(Number(round));
                }

                setReviews(loadedReviews);
            })
            .catch((error: any) => {
                console.error(`Error fetching reviews: ${error.message}`);
                setIsLoading(false);
                setHttpError(error.message);
            })
            .finally(() => {
                setIsLoadingReview(false);
            });
    }, [productId, isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewProduct = async () => {
            if (authState && authState.isAuthenticated) {
                try {
                    const url = `${process.env.REACT_APP_API}/reviews/secure/user/product?productId=${productId}`;
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    };
                    const userReview = await fetch(url, requestOptions);
                    if (!userReview.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const userReviewResponseJson = await userReview.json();
                    setIsReviewLeft(userReviewResponseJson);
                    setIsLoadingUserReview(false);
                } catch (error: any) {
                    setIsLoadingUserReview(false);
                    setHttpError(error.message);
                }
            }
        };

        fetchUserReviewProduct();
    }, [authState, productId]);

    if (isLoading || isLoadingReview || isLoadingUserReview) {
        return (
            <Spinner />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    async function checkoutProduct() {
        const url = `${process.env.REACT_APP_API}/products/secure/checkout?productId=${productId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            console.log(checkoutResponse);
            setDisplayError(true);
            throw new Error('Something went wrong!');
        }
        setDisplayError(false);
        setIsCheckedOut(true);
    }

    async function addToCart() {
        const url = `${process.env.REACT_APP_API}/cart/add?productId=${productId}`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const cartResponse = await fetch(url, requestOptions);
        if (!cartResponse.ok) {
            console.log(cartResponse);
            setDisplayError(true);
            throw new Error('Something went wrong!');
        }
        setDisplayError(false);
        alert('Product added to cart');
    }

    async function submitReview(starinput: number, reviewDescription: string) {

        if (!product) {
            console.error("Product is not loaded yet.");
            return;
        }

        console.log(product);

        const reviewRequestModel = new ReviewRequestModel(starinput, product.id, reviewDescription);
        const url = `${process.env.REACT_APP_API}/reviews/secure?partner=${partner}`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };
        try {
            const returnResponse = await fetch(url, requestOptions);
            if (!returnResponse.ok) {
                throw new Error('Something went wrong!');
            }
            setIsReviewLeft(true);
        } catch (error) {
            console.error("Error submitting review:", error);
            throw error;
        }
    }

    return (
        <div>
            <div className="container d-none d-lg-block">
                {displayError && <div className="alert alert-danger mt-3" role='alert'>
                    Please pay outstanding fees and/or return late book(s);
                </div>
                }
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {
                            product?.imgUrl ?
                                <img src={product?.imgUrl} width='226' height='349' alt='Book' />
                                :
                                <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                    height='349' alt='Book' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{product?.productName}</h2>
                            <h5 className="text-primary">{product?.authorName}</h5>
                            <p className="lead">{product?.description}</p>
                            <Stars rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutReview product={product} mobile={false} isAuthenticated={authState?.isAuthenticated}
                        isCheckedOut={isCheckedOut} checkoutProduct={checkoutProduct}
                        isReviewLeft={isReviewLeft} submitReview={submitReview} partner={partner || ''} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} productId={product?.id} mobile={false} />
            </div>
            <div className="container d-lg-none mt-5">
                {displayError && <div className="alert alert-danger mt-3" role='alert'>
                    Please pay outstanding fees and/or return late book(s);
                </div>
                }
                <div className="d-flex justify-content-center align-items-center">
                    {
                        product?.imgUrl ?
                            <img src={product?.imgUrl} width='226' height='349' alt='Book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226'
                                height='349' alt='Book' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{product?.productName}</h2>
                        <h5 className="text-primary">{product?.authorName}</h5>
                        <p className="lead">{product?.description}</p>
                        <Stars rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutReview product={product} mobile={true} isAuthenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut} checkoutProduct={checkoutProduct}
                    isReviewLeft={isReviewLeft} submitReview={submitReview} partner={partner || ''} />
                <hr />
                {<LatestReviews reviews={reviews} productId={product?.id} mobile={false} />}
            </div>
        </div>
    )
};