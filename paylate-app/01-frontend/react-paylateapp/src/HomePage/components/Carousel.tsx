
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Spinner } from "../../Utils/Spinner";
// import ProductModel from "../../models/ProductModel";
// import { ReturnProduct } from "./ReturnProduct";

// export const Carousel = () => {

//     const[products, setProducts] = useState<ProductModel[]>([]);
//     const[isLoading, setIsLoading] = useState(true);
//     const[httpError, setHttpError] = useState(null);

//     useEffect(() => {
//         console.log("useEffect triggered"); 
//         const fetchProducts = async () => {
//             const baseUrl: string = `${process.env.REACT_APP_API}/csv/olxProducts`;

//             const url: string = `${baseUrl}?page=0&size=9`;

//             console.log("Fetching products from URL:", url); // Log URL to console

//             const response = await fetch(url);

//             if (!response.ok) {
//                 throw new Error('Something went wrong!');
//             }

//             const responseJson = await response.json();

//             console.log(responseJson); 

//             const responseData = responseJson;

//             const loadedProducts: ProductModel[] = [];

//             for (const key in responseData) {
//                 loadedProducts.push({
//                   id: responseData[key].id,
//                   productName: responseData[key]["Title"],  
//                   description: responseData[key]["Product Details"], 
//                   authorName: responseData[key]["Author Name"], 
//                   authorUrl: responseData[key]["Author Profile Link"], 
//                   imgUrl: responseData[key]["Image URL"], 
//                   category: responseData[key]["Category"],  
//                 });
//               }

//             setProducts(loadedProducts);
//             setIsLoading(false);
//         }; 
//         fetchProducts().catch((error: any) => {
//             setIsLoading(false);
//             setHttpError(error.message);
//         })
//     }, []);

//     if (isLoading) {
//         return (
//             <Spinner/>
//         )
//     }

//     if (httpError) {
//         return (
//             <div className="container m-5">
//                 <p>{httpError}</p>
//             </div>
//         )
//     }

//     return (
//         <div className='container mt-5' style={{ height: 550 }}>
//             <div className='homepage-carousel-title'>
//                 <h3>Get the product you want!</h3>
//             </div>
//             <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
//                 d-none d-lg-block' data-bs-interval='false'>

//                 {/* Desktop */}
//                 <div className='carousel-inner'>
//                     <div className='carousel-item active'>
//                         <div className='row d-flex justify-content-center align-items-center'>
//                            {
//                             products.slice(0, 3).map(product => (
//                                 <ReturnProduct product = {product} key = {product.id} />
//                             ))
//                            }
//                         </div>
//                     </div>
//                     <div className='carousel-item'>
//                         <div className='row d-flex justify-content-center align-items-center'>
//                         {
//                             products.slice(3, 6).map(product => (
//                                 <ReturnProduct product = {product} key = {product.id} />
//                             ))
//                         }
//                         </div>
//                     </div>
//                     <div className='carousel-item'>
//                         <div className='row d-flex justify-content-center align-items-center'>
//                         {
//                             products.slice(6, 9).map(product => (
//                                 <ReturnProduct product = {product} key = {product.id} />
//                             ))
//                            }
//                         </div>
//                     </div>
//                     <button className='carousel-control-prev' type='button'
//                         data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
//                         <span className='carousel-control-prev-icon' aria-hidden='true'></span>
//                         <span className='visually-hidden'>Previous</span>
//                     </button>
//                     <button className='carousel-control-next' type='button'
//                         data-bs-target='#carouselExampleControls' data-bs-slide='next'>
//                         <span className='carousel-control-next-icon' aria-hidden='true'></span>
//                         <span className='visually-hidden'>Next</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile */}
//             <div className='d-lg-none mt-3'>
//                 <div className='row d-flex justify-content-center align-items-center'>
//                     <ReturnProduct product={products[3]} key={products[3].id}/>
//                 </div>
//             </div>
//             <div className='homepage-carousel-title mt-3'>
//                 <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
//             </div>
//         </div>
//     );
// }