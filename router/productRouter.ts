import {Router, Request, Response, raw} from 'express';
import {body, validationResult} from 'express-validator';
import ProductCollection from "../schemas/BProductSchema";
import { product } from '../models/product';

import mongoose from "mongoose";
const productRouter: Router = Router();
// usage : create a prodjuct
  
   //method : POST
  
    productRouter.post('/', [
        body('Pname').not().isEmpty().withMessage('product name is required'),
        body('PimageURL').not().isEmpty().withMessage('image must  for indentify'),
        body('Pprice').not().isEmpty().withMessage('price is must is require'),
        body('QTY').not().isEmpty().withMessage('require must  if have or not '),
            body('CategorySNO').not().isEmpty().withMessage('categorysno is required'),
    ], async (request: Request, response: Response) => {
    
        // let errors = validationResult(request);
        // if (!errors.isEmpty()) { 
        //     return response.status(400).json({errors: errors.array()})
        // }
        try {
           
            let {
                SNO,
                Pname,
                PimageURL,
                Pprice,
                QTY,
                CategorySNO
            } = request.body;
    
          
    
            // insert in  DB
            let newProduct: product ={

              SNO:SNO,
                Pname: Pname,
                PimageURL: PimageURL,
                Pprice: Pprice,
                QTY: QTY,
                CategorySNO:CategorySNO
              
              };
              console.log(newProduct);
            let productCollection = await new ProductCollection(newProduct).save();
            if (productCollection) {
                return response.status(201).json({
                    data: productCollection,
                    msg: " big basket productCreated",
                    status: "OKay it is right"
                });
            }
        } catch (error) {
            return response.status(500).json({
                data: null,
                msg: "Server Error",
                status: "FAILED"
            });
        }
    })
    
    //update productnpm start
      
       //method : PUT
       
   
    // productRouter.put('/:SNO', [
    //     body('Pname').not().isEmpty().withMessage('product name is required'),
    //     body('PimageURL').not().isEmpty().withMessage('image must  for indentify'),
    //     body('Pprice').not().isEmpty().withMessage('price is must is require'),
    //     body('Qty').not().isEmpty().withMessage('require must  if have or not '),
    //         body('CategorySNO').not().isEmpty().withMessage('categorysno is required'),
    // ], 
    productRouter.put('/:SNO', async (request: Request, response: Response) => {
        let {SNO} = request.params;
        // let errors = validationResult(request);
        // if (!errors.isEmpty()) { // validation fail
        //     return response.status(400).json({errors: errors.array()})
        // }
        try {
            // read form data
            let {
                Pname,
                PimageURL,
                Pprice,
                QTY,
                CategorySNO
            } = request.body;
    
            // check  product exist
            let mongoProductSNO = new mongoose.Types.ObjectId(SNO);
            let Bproduct: product | undefined | null = await ProductCollection.findById(mongoProductSNO);
            if (!Bproduct) {
                return response.status(404).json({
                    data: null,
                    msg: 'No contact found',
                    status: "FAILED"
                });
            }
    
            // update the contact
            
                let updatedProduct: product ={
              
                    Pname: Pname,
                    PimageURL: PimageURL,
                    Pprice: Pprice,
                    QTY: QTY,
                    CategorySNO:CategorySNO
                  
                  };
            let uproduct = await ProductCollection.findByIdAndUpdate(mongoProductSNO, {
                $set: updatedProduct
            }, {new: true});
            if (uproduct) {
                return response.status(200).json({
                    data: uproduct,
                    msg: " updated product",
                    status: "OKay"
                })
            }
        } catch (error) {
            if (!mongoose.isValidObjectId(SNO)) {
                return response.status(400).json({
                    data: null,
                    msg: "in-valid contact Id",
                    status: "FAILED"
                });
            }
            return response.status(500).json({
                data: error,
                msg: "Server Error",
                status: "FAILED"
            });
        }
    });
    

    //  usage : get all products
    //    method : GET
      
    
    productRouter.get('/', async (request: Request, response: Response) => {
        try {
            let products: product[] = await ProductCollection.find(); // select * from products
            return response.status(200).json({
                data: products,
                msg: "get data product",
                status: "OKay"
            });
        } catch (error) {
            return response.status(500).json({
                data: null,
                msg: "Server Error",
                status: "FAILED"
            });
        }
    });
    
    
 //get a product
       //method : GET
     
     
       productRouter.get('/', async (request: Request, response: Response) => {
            let {SNO} = request.params;
            try {
                let mongoDBProductSno = new mongoose.Types.ObjectId(SNO);
                let products: product | undefined | null = await ProductCollection.findById(mongoDBProductSno);
                if (!products) {
                    return response.status(404).json({
                        data: null,
                        msg: "Contact is not found",
                        status: "FAILED"
                    });
                }
                return response.status(200).json({
                    data: products,
                    msg: " found data",
                    status: "OK"
                });
            } catch (error) {
                if (!mongoose.isValidObjectId(SNO)) {
                    return response.status(400).json({
                        data: null,
                        msg: "in-valid sno",
                        status: "failes"
                    });
                }
                return response.status(500).json({
                    data: error,
                    msg: "Server Error",
                    status: "FAILED"
                });
            }
        })
        

     // usage  delete product
     //    method : DELETE
     //    params : no-params
    
    productRouter.delete('/:SNO', async (request: Request, response: Response) => {
        let {SNO} = request.params;
        try {
            let mongoDBProductSno = new mongoose.Types.ObjectId(SNO);
            let products: product | undefined | null = await ProductCollection.findById(mongoDBProductSno);
            if (!products) {
                return response.status(404).json({
                    data: null,
                    msg: "product is not found",
                    status: "FAILED"
                });
            }
            // delete the contact
            let dproducts = await ProductCollection.findByIdAndDelete(mongoDBProductSno);
            if (dproducts) {
                return response.status(200).json({
                    data: products,
                    msg: "product is Deleted",
                    status: "OK"
                });
            }
        } catch (error) {
            if (!mongoose.isValidObjectId(SNO)) {
                return response.status(400).json({
                    data: null,
                    msg: "in-valid SNO",
                    status: "FAILED"
                });
            }
            return response.status(500).json({
                data: error,
                msg: "Server Error",
                status: "FAILED"
            });
        }
    })
    
    export default productRouter;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    