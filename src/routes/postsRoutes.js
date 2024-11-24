import express from "express";
import multer from "multer";
import { listPosts, createNewPost, uploadImage} from "../controller/postsController.js";

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

    app.get('/posts', listPosts);

    app.post('/posts', createNewPost);

    app.post('/upload', upload.single("imagem"), uploadImage);
};

export default routes;
