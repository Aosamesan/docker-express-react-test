import express from 'express';
import path from 'path';

const app = express();
const apiRouter = express.Router();

apiRouter.get('/message', (req, res) => {
  res.json({
    message: process.env.MESSAGE
  });
});

app.use(express.static(path.resolve('dist', 'front')))
app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'front', 'index.html'));
});

app.listen(process.env.PORT, () => console.log(`Server Start!!! port : ${process.env.PORT}`));