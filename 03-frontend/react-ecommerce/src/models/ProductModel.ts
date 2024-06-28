class ProductModel {
    id: number;
    title: string;
    seller?: string;
    description?: string;
    quantities?: number;
    quantityAvailable?: number;
    category?: string;
    img?: string;

    constructor(id: number, title: string, seller: string, description: string, quantities: number,
        quantityAvailable: number, category: string, img: string) {
        this.id = id;
        this.title = title;
        this.seller = seller;
        this.description = description;
        this.quantities = quantities;
        this.quantityAvailable =  quantityAvailable;
        this.category = category;
        this.img = img;
    }

}

export default ProductModel;