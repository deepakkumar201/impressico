import mongoose from 'mongoose';

export class DBUtil {

    public static connectToMongoDB(dbUrl: string, dbName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            mongoose.connect(dbUrl, {
                dbName: dbName
            }, (error) => {
                if (!error) {
                    resolve('Successfully Connected to DB.');
                } else {
                    process.exit(0); // stops  express server
                    reject('db Connection Failed');
                }
            })
        });
    }
}