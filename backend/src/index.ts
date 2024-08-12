import app from "./app.js"
import { connectToDatabse } from "./db/connection.js"


const PORT = process.env.PORT || 5000
connectToDatabse()
    .then(()=>{
        app.listen(5000, () => console.log("Server open & connected to database"))

    })
    .catch((err)=> console.log(err));
    