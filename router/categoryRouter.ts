import {Router, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import CategoryCollection from "../schemas/PCategorySchema";

import mongoose from "mongoose";

import { category } from '../models/category';
//url : http://127.0.0.1:9000/products/...........
const categoryRouter: Router = Router();

//post mapping
categoryRouter.post('/', [
    body('C_name').not().isEmpty().withMessage('Name is required')
], async (request: Request, response: Response) => {

//     let errors = validationResult(request);
//     if (!errors.isEmpty()) { 
//         return response.status(400).json({errors: errors.array()})
//    // validation failed
   // }

    try {
        let {C_name} = request.body;

        let category = await CategoryCollection.findOne({name: C_name});
        if (category) {
            return response.status(400).json({
                data: null,
                msg: ' category exists',
                status: "FAILED"
            });
        }
        // create a group
        let dcategory = await new CategoryCollection({C_name}).save();
        if (dcategory) {
            return response.status(201).json({
                data: dcategory,
                msg: 'category created',
                status: "OKay done"
            });
        }
    } catch (error) {
        return response.status(500).json({
            data: null,
            msg: "Server Error",
            status: "FAILED"
        });
    }
});

//get 
categoryRouter.get('/', async (request: Request, response: Response) => {
    try {
        let categories: category[] = await CategoryCollection.find();
        return response.status(200).json({
            data: categories,
            msg: "",
            status: "OK"
        })
    } catch (error) {
        return response.status(500).json({
            data: error,
            msg: "Server Error",
            status: "FAILED"
        });
    }
});


 //get single by id 
categoryRouter.get('/:categorySno', async (request: Request, response: Response) => {
    let {categorySno} = request.params;
    try {
        let mongoCategoriSno = new mongoose.Types.ObjectId(categorySno);
        let categories: category | undefined | null = await CategoryCollection.findById(mongoCategoriSno);
        if (!categories) {
            return response.status(404).json({
                data: null,
                msg: "it have no category",
                status: "FAILED"
            });
        }
        return response.status(200).json({
            data: categories,
            msg: "",
            status: "OK"
        })
    } catch (error) {
        if (!mongoose.isValidObjectId(categorySno)) {
            return response.status(400).json({
                data: null,
                msg: "invalid category sno",
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


export default categoryRouter;