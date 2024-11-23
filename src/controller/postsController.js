import getEveryPosts from "../models/postsModel.js";

export async function listarPosts(req, res) {
    const posts = await getEveryPosts();
    res.status(200).json(posts);
}
