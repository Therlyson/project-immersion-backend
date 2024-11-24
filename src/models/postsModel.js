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
