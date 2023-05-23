
import express from "express";
import {DBUtil} from "./db/dbUtils";
import dotenv from "dotenv";
import productRouter from "./router/productRouter";
import categoryRouter from "./router/categoryRouter";

const app: express.Application = express();

// configure dotenv
dotenv.config({
    path: './.env'
})

// configure express to read form data
app.use(express.json())

const hostName: string | undefined = process.env.EXPRESS_SERVER_HOST_URL;
const port: string | undefined = process.env.EXPRESS_SERVER_PORT;
const dbUrl: string | undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.DATA_BASE_NAME;

if (dbName && dbUrl) {
    // connect to DB
    DBUtil.connectToMongoDB(dbUrl, dbName).then((dbResponse) => {
        console.log(dbResponse);
    }).catch((error) => {
        console.error(error);
    });
}

app.get('/', async (request: express.Request, response: express.Response) => {
    response.status(200);
    response.json({
        msg: "Welcome to express server NEW"
    })

})

// router configuration
app.use('/products', productRouter);
app.use('/category', categoryRouter);

if (port && hostName) {
    app.listen(Number(port), hostName, () => {
        console.log(`Express server is started at http://${hostName}:${port}`);
    })
}