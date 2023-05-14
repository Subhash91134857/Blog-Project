import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";



import Router from "./Routes/routes.js";
import Connection from "./Database/db.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(
    express.urlencoded({ extended: true })
);

app.use(express.json());

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', Router)

const PORT = process.env.PORT||8000;

app.listen(PORT, () => {
    console.log(`Server is running successfully on ${PORT}`);
})

const URL = process.env.DATABASE_URL;
Connection(URL);

