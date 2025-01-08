// import { useEffect, useState } from "react";
// import { SearchBook } from "./components/SearchProduct";
// import { Spinner } from "../Utils/Spinner";
// import { Pagination } from "../Utils/Pagination";
// import ProductModel from "../models/ProductModel";

// export const SearchBooksPage = () => {

//     const [books, setBooks] = useState<ProductModel[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [httpError, setHttpError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage] = useState(7);
//     const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [search, setSearch] = useState('');
//     const [searchUrl, setSearchUrl] = useState('');
//     const [categorySelection, setCategorySelection] = useState('Product category');

//     useEffect(() => {
//         const fetchProducts = () => {
//             const baseUrl: string = `${process.env.REACT_APP_API}/csv/olxProducts`;
    
//             let url: string = '';
    
//             if (searchUrl === '') {
//                 url = `${baseUrl}?page=${currentPage - 1}&size=${productsPerPage}`;
//             } else {
//                 let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
//                 url = baseUrl + searchWithPage;
//             }
    
//             fetch(url)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Something went wrong while fetching products!');
//                     }
//                     return response.json();
//                 })
//                 .then((responseJson) => {
                    
//                     const loadedProducts = responseJson.map((product: any) => ({
//                         category: product.Category || '',
//                         title: product.Title || '',
//                         price: product.Price || '',
//                         imgUrl: product['Image URL'] || '',
//                         productDetails: product['Product Details'] || '',
//                         authorName: product['Author Name'] || '',
//                         authorProfileLink: product['Author Profile Link'] || '',
//                         authorLastSeen: product['Author Last Seen'] || '',
//                     }));
    
//                     setBooks(loadedProducts);
//                     setTotalAmountOfProducts(responseJson.length); // Adjust if pagination info is available
//                     setIsLoading(false);
//                 })
//                 .catch((error) => {
//                     setIsLoading(false);
//                     setHttpError(error.message);
//                 });
//         };
    
//         fetchProducts();
    
//         window.scrollTo(0, 0);
//     }, [currentPage, searchUrl]);

//     if (isLoading) {
//         return (
//             <Spinner />
//         )
//     }

//     if (httpError) {
//         return (
//             <div className="container m-5">
//                 <div>{httpError}</div>
//             </div>
//         )
//     }

//     const searchHandleChange = () => {
//         setCurrentPage(1);
//         if (search === '') {
//             setSearchUrl('');
//         } else {
//             setSearchUrl(`/search/findByProcutNameContaining?procutName=${search} & page=<pageNumber>&size=${productsPerPage}`);
//         }
//         setCategorySelection('Product category');
//     }

//     const categoryField = (value: string) => {
//         setCurrentPage(1);
//         if (
//             value.toLowerCase() === 'fe' ||
//             value.toLowerCase() === 'be' ||
//             value.toLowerCase() === 'data' ||
//             value.toLowerCase() === 'devops'
//         ) {
//             setCategorySelection(value);
//             setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`);
//         } else {
//             setCategorySelection('All');
//             setSearchUrl(`?page=<pageNumber>&size=${productsPerPage}`);
//         }
//     }

//     const indexOfLastBook: number = currentPage * productsPerPage;
//     const indexOfFirstBook: number = indexOfLastBook - productsPerPage;
//     let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ?
//         productsPerPage * currentPage : totalAmountOfProducts;

//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//     return (
//         <div>
//             <div className="container">
//                 <div className="row mt-5">
//                     <div className="col-6">
//                         <div className="d-flex">
//                             <input className="form-control me-2" type="search"
//                                 placeholder="Search" aria-labelledby="Search"
//                                 onChange={e => setSearch(e.target.value)} />
//                             <button className="btn btn-outline-success"
//                                 onClick={() => searchHandleChange()}>
//                                 Search
//                             </button>
//                         </div>
//                     </div>
//                     <div className="col-4">
//                         <div className="dropdown">
//                             <button className="btn btn-secondary dropdown-toggle"
//                                 id="dropdownMenuButton1" data-bs-toggle="dropdown"
//                                 aria-expanded="false">
//                                 {categorySelection}
//                             </button>
//                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                                 <li onClick={() => categoryField('All')}>
//                                     <a className="dropdown-item" href="#">
//                                         All
//                                     </a>
//                                 </li>
//                                 <li onClick={() => categoryField('FE')}>
//                                     <a className="dropdown-item" href="#">
//                                         Front End
//                                     </a>
//                                 </li>
//                                 <li onClick={() => categoryField('BE')}>
//                                     <a className="dropdown-item" href="#">
//                                         Back End
//                                     </a>
//                                 </li>
//                                 <li onClick={() => categoryField('Data')}>
//                                     <a className="dropdown-item" href="#">
//                                         Data
//                                     </a>
//                                 </li>
//                                 <li onClick={() => categoryField('DevOps')}>
//                                     <a className="dropdown-item" href="#">
//                                         DevOps
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     {totalAmountOfProducts > 0 ?
//                         <>
//                             <div className="mt-3">
//                                 <h5>Number of results: ({totalAmountOfProducts})</h5>
//                             </div>
//                             <div>
//                                 {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfProducts} items:
//                             </div>
//                             {books.map(book => (
//                                 <SearchProduct product={product} key={product.id} />
//                             ))}
//                         </>
//                         :
//                         <div className="m-5">
//                             <h3>
//                                 Can't find what you're looking for!
//                             </h3>
//                             <a type="button" className="btn main-color btn-md-px-4 me-md-2 fw-bold text-white"
//                                 href="#">Library Services</a>
//                         </div>
//                     }
//                     {totalPages > 1 &&
//                         <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }