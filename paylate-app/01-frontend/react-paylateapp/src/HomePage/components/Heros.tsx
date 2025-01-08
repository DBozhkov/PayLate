import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heros = () => {

    const { authState } = useOktaAuth();
    return (
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                        <img
                            src="https://pangea-network.com/wp-content/uploads/2024/06/Maritime-Shipping-An-Economical-Choice-for-Heavy-Items.jpg"
                            alt="Image description"
                            className="w-100" 
                            style={{ height: '400px', objectFit: 'cover' }} 
                        />
                    </div>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>We can order any product you want!</h1>
                            <p className='lead'>
                                We work with many big e-commerce retailers, and use our affiliate
                                services to be able to buy the desired products for you and deliver them to your doorstep.
                            </p>
                            {authState?.isAuthenticated ? 
                                <Link type="button" className="btn main-color btn-lg text-white" to='partners'>
                                    Check our partners! 
                                </Link> 
                                : 
                                <Link className='btn main-color btn-lg text-white' to='/login'>
                                    Sign up
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>You can check our shop too!</h1>
                            <p className='lead'>
                                We even have our own online shop, where you can find many great
                                items ranging from dairy products by our local farm
                                to handmade decorations and also many more!
                            </p>
                            {authState?.isAuthenticated ? 
                                <Link type="button" className="btn main-color btn-lg text-white" to='shop'>
                                    Shop 
                                </Link> 
                                : 
                                <Link className='btn main-color btn-lg text-white' to='/login'>
                                    Sign up
                                </Link>
                            }
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <img
                            src="https://cdn.24.co.za/files/Cms/General/d/3864/fea3196d6875474aadfd80b2815f4a2b.jpeg"
                            alt="Image description"
                            className="w-100" 
                            style={{ height: '400px', objectFit: 'cover' }} 
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Heros */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <img
                            src="https://pangea-network.com/wp-content/uploads/2024/06/Maritime-Shipping-An-Economical-Choice-for-Heavy-Items.jpg"
                            alt="Image description"
                            className="w-100" // Image width will fill the parent container
                            style={{ height: '400px', objectFit: 'cover' }} // Set fixed height for consistency
                        />
                        <div className='mt-2'>
                            <h1>What have you been reading?</h1>
                            <p className='lead'>
                                The library team would love to know what you have been reading.
                                Whether it is to learn a new skill or grow within one,
                                we will be able to provide the top content for you!
                            </p>
                            {authState?.isAuthenticated ? 
                                <Link type="button" className="btn main-color btn-lg text-white" to='search'>
                                    Explore top books 
                                </Link> 
                                : 
                                <Link className='btn main-color btn-lg text-white' to='/login'>
                                    Sign up
                                </Link>
                            }
                        </div>
                    </div>
                    <div className='m-2'>
                        <img
                            src="https://pangea-network.com/wp-content/uploads/2024/06/Conclusion-Shipping-Large-Items-Overseas.jpg"
                            alt="Image description"
                            className="w-100" // Image width will fill the parent container
                            style={{ height: '300px', objectFit: 'cover' }} // Set fixed height for consistency
                        />
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try to check in daily as our collection is always changing!
                                We work nonstop to provide the most accurate book selection possible
                                for our Luv 2 Read students! We are diligent about our book selection
                                and our books are always going to be our
                                top priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
