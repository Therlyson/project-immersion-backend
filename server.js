import express from 'express';
import routes from './src/routes/postsRoutes.js';

const app = express();
app.use(express.static("uploads")) //expor a pasta uploads, dessa forma consegue acessar os arquivos pelo navegador

routes(app)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// function buscarPostsPorId(id) {
//     return posts.findIndex((post) => {
//       return post.id === Number(id);
//     })    ;
// }

// app.get('/posts/:id', (req, res) => {
//     const index = buscarPostsPorId(req.params.id);
//     res.status(200).json(posts[index]);
// });
