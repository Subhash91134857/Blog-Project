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


// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static("client/build"));
// }


const PORT =8000;

app.listen(PORT, () => {
    console.log(`Server is running successfully on ${PORT}`);
})
const Username = process.env.DB_USERNAME;
const Password = process.env.DB_PASSWORD;

const URL =`mongodb+srv://${Username}:${Password}@cluster0.rl5ofk6.mongodb.net/`

Connection(URL);

