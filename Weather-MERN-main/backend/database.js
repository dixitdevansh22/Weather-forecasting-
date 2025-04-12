import {MongoClient} from 'mongodb';
import 'dotenv/config';

const uri = process.env.DATABASE_URI;
const dbName = process.env.DATABASE_NAME;
const client = new MongoClient(uri);

export async function insertData(data) 
{
    try {
        await client.connect();
        console.log('connected to database -database.js>insertData');

        let result = await client.db(dbName).collection('Weather').insertOne(data);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        client.close();
        console.log('disconnected from database -database.js>insertData');
    }
}

export async function getAllData() 
{
    let result;
    try {
        await client.connect();
        console.log('connected to database -database.js>getAllData');

        result = await client.db(dbName).collection('Weather').find({}).toArray();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        client.close();
        console.log('disconnected from database -database.js>getAllData');
    }
    return result;
}


// module.exports = {insertData, getAllData};