import {getEveryPosts, createPost, update, getPostId} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../service/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getEveryPosts();
    res.status(200).json(posts);
}

export async function findPostId(req, res) {
    const post = await getPostId(req.params.id);
    res.status(200).json(post);
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
        res.status(500).json({message: "Erro ao fazer upload da imagem"});
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descriptionGemini = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl: urlImage,
            description: descriptionGemini,
            alt: req.body.alt
        }

        const updatedPost = await update(id, post);
        res.status(200).json(updatedPost);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: "Erro ao atualizar o post"});
    }
}
    