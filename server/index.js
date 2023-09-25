import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors' // for cross request ouside from our server
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'

const config = require('../config.js');
const app = express();

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(cors())
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use('/posts', postRoutes);

const CONNECTION_URL = config.mongoURL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => console.log(`server running at port: ${PORT}`)))
    .catch((error) => console.log(error.message));
