import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes); //sets it so that every route in postRoutes starts with /posts, not just localhost:5000/

const CONNECTION_URL = 'mongodb+srv://master:master123@ticketcluster.wa3mo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//connection url will be secured later
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false); //ensures no console warnings

