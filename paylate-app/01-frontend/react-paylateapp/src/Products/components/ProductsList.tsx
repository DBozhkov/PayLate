import React, { useEffect, useState } from 'react';
import ProductModel from '../../models/ProductModel';
import { SingleProduct } from './SingleProduct';
import { Pagination } from "../../Utils/Pagination";
import { Spinner } from '../../Utils/Spinner';
import { useParams } from 'react-router-dom';

export const ProductList: React.FC = () => {
    const { partner } = useParams<{ partner?: string }>();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const endpoint = partner
                    ? `http://localhost:8080/api/${partner}Products?page=${currentPage - 1}&size=${productsPerPage}`
                    : `http://localhost:8080/api/products?page=${currentPage - 1}&size=${productsPerPage}`;
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const responseData = await response.json();

                const loadedProducts = responseData._embedded ? responseData._embedded[`${partner}Products`] : responseData;

                const productList = loadedProducts.map((product: any) => {
                    const id = product._links.self.href.split('/').pop();
                    return new ProductModel(
                        id,
                        product.price,
                        product.productName,
                        product.authorName,
                        product.description,
                        product.quantity,
                        product.category,
                        product.imgUrl,
                        product.authorUrl,
                        product.rating
                    )
                });
                console.log(productList);
                setProducts(productList);
                setTotalProducts(responseData.page.totalElements);
                setTotalPages(responseData.page.totalPages);
                setIsLoading(false);
            } catch (error: any) {
                setIsLoading(false);
                setHttpError(error.message);
            }
        };

        fetchProducts();
    }, [currentPage, productsPerPage]);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <div>{httpError}</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h1 className="display-5 fw-bold mb-4">Products</h1>
                </div>
            </div>
            <div className="row">
                {products.map(product => (
                    <SingleProduct
                        key={product.id}
                        product={product}
                        partner={partner}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            )}
        </div>
    );
};