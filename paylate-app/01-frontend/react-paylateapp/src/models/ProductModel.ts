class ProductModel {
    id: number;
    productName: string;
    authorName?: string;
    authorUrl?: string;
    description?: string;
    category?: string;
    imgUrl?: string;

    constructor (id: number, productName: string, authorName: string, description: string,
         category: string, imgUrl: string, authorUrl: string){
            this.id = id;
            this.productName = productName;
            this.authorName = authorName;
            this.authorUrl = authorUrl;
            this.description = description;
            this.category = category;
            this.imgUrl = imgUrl;
        }
}

export default ProductModel;