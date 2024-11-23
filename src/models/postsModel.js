import conectarAoBanco from "../config/dbConfig.js";

const conecction = await conectarAoBanco(process.env.STRING_CONEXAO);

export default async function getEveryPosts(){
    const db = conecction.db("imersao-instabytes");
    const collection = db.collection("posts");
    return collection.find().toArray();
}
