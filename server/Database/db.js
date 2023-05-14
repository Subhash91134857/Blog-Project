import mongoose from "mongoose"
const Connection = async (URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser:true });
        console.log("Connected Successfully");
    } catch (error) {
        console.log("Error while connecting to database",error);
    }
}

export default Connection;