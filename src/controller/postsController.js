import {getEveryPosts, createPost} from "../models/postsModel.js";
import fs from "fs";

export async function listPosts(req, res) {
    const posts = await getEveryPosts();
    res.status(200).json(posts);
}

export async function createNewPost(req, res) {
    const newPost = req.body;
    try{
        const post = await createPost(newPost);
        res.status(201).json(post);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: "Erro ao inserir o post"});
    }
}

export async function uploadImage(req, res) {
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const post = await createPost(newPost);
        const imageUpdated = `uploads/${post.insertedId}.png`; //mudando nome de cada imagem para ser o id
        fs.renameSync(req.file.path, imageUpdated);
        res.status(201).json(post);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: "Erro ao inserir o post"});
    }
}
