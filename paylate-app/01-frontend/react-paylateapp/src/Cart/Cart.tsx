import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Spinner } from "../Utils/Spinner";
import ProductModel from "../models/ProductModel";

export const Cart = () => {
    const { authState } = useOktaAuth();
    const [cartItems, setCartItems] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (authState && authState.isAuthenticated) {
                try {
                    const url = `${process.env.REACT_APP_API}/cart`;
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    };
                    const response = await fetch(url, requestOptions);
                    if (!response.ok) {
                        throw new Error('Something went wrong!');
                    }
                    const responseData = await response.json();
                    setCartItems(responseData);
                    setIsLoading(false);
                } catch (error) {
                    setIsLoading(false);
                    console.error("Error fetching cart items:", error);
                }
            }
        };

        fetchCartItems();
    }, [authState]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-5">
            <h2>Your Cart</h2>
            <div className="row">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item) => (
                        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                            <div className="card">
                                <img
                                    src={item.imgUrl || require('./../../Images/BooksImages/book-luv2code-1000.png')}
                                    className="card-img-top"
                                    alt={item.productName}
                                    height="233"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.productName}</h5>
                                    <p className="card-text">{item.authorName}</p>
                                    <p className="card-text">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};