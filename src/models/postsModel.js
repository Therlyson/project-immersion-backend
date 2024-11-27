import { ObjectId } from "mongodb";
import connectBank from "../config/dbConfig.js";

const connection = await connectBank(process.env.STRING_CONEXAO);

export async function getEveryPosts(){
    const db = connection.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function getPostId(id){
    const db = connection.db("imersao-instabytes");
    const collection = db.collection("posts");
    return await collection.findOne({ _id: new ObjectId(String(id)) });
}

export async function createPost(newPost){
    const db = connection.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function update(id, newPost){
    const db = connection.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objId)}, {$set: newPost});
}
