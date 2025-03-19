const express = require('express');
const app = express();
const port = process.env.PORT;
const movieRouter = require("./routers/movie")
const imagePathMiddleware = require('./middlewares/imagePath');
var cors = require('cors')

app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.static('public'));

app.use(express.json());

app.use("/movies", movieRouter)

app.use(imagePathMiddleware);

app.listen(port, () => {
    console.log(`La porta è ${port}`);
});