
import mongoose from "mongoose";
import { category } from "../models/category";

export const CategorySchema: mongoose.Schema = new mongoose.Schema<category>({
    C_name: {
        type: String,
         required: true, 
         unique: true},
}, {timestamps: true});

const CategoryCollection = mongoose.model<category>('category',CategorySchema);
export default CategoryCollection;