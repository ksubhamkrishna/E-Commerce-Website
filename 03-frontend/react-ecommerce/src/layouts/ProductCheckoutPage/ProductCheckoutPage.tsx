import { useState } from "react";
import ProductModel from "../../models/ProductModel";

export const ProductCheckoutPage = () => {

    const [product, setProduct] = useState<ProductModel>();
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split('/')[2];


    return (
        <div>
            <h3>Hi World</h3>
        </div>
    );
}
