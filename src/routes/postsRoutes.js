import express from "express";
import multer from "multer";
import { listPosts, createNewPost, uploadImage, updatePost, findPostId} from "../controller/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({ //código pronto para o multer funcionar no windows, lembrar de criar a pasta uploads tbm
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json()); //entender e converter estrutura em json
    app.use(cors(corsOptions));

    app.get('/posts', listPosts);

    app.get('/posts/:id', findPostId);

    app.post('/posts', createNewPost);

    app.post('/upload', upload.single("imagem"), uploadImage);

    app.put('/posts/:id', updatePost);
};

export default routes;
