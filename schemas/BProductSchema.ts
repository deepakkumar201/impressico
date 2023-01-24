import mongoose from "mongoose";
import { product } from "../models/product";




export const BProductSchema: mongoose.Schema = new mongoose.Schema<product>({
   
    SNO:{ 
       type:String,
       required:true},
          
    Pname :{
        type: String, 
        required: true},
    PimageURL: {
        type: String, 
        required: true},
   
    Pprice: {
        type: String, 
        required: true},

   QTY :{
    type: String, 
    required: true},
    CategorySNO:{
        type:String,
        required:true
    }
   
  
}, {timestamps: true});



const BProductCollection = mongoose.model<product>('products', BProductSchema);
export default BProductCollection;