export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    frontImage: string;
    backImage: string;
    manequenImage: string;
    category: string;
    reviewsIDs: number[];
    sizes: string[];
    colors: string[];
    isDiscounted: boolean;
    discount: number;
    uploadDate: Date;
}
