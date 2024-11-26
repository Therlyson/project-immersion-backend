import { ObjectId } from "mongodb";
import connectBank from "../config/dbConfig.js";

const conecction = await connectBank(process.env.STRING_CONEXAO);

export async function getEveryPosts(){
    const db = conecction.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function createPost(newPost){
    const db = conecction.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.insertOne(newPost);
}

export async function update(id, newPost){
    const db = conecction.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return collection.updateOne({_id: new ObjectId(objId)}, {$set: newPost});
}
