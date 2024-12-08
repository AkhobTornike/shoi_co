import { User } from "./user";

export interface Review {
    reviewID: number;
    userID: number;
    createDateTime: string;
    stars: number | Float32Array;
    comment: string;
}
