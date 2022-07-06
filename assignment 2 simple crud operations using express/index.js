const express =require("express");
const bodyParser =require("body-Parser");
const router=require("./routes/user");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.status(200).send("welcome to the world of happiness")
})

app.use("/user",router)
app.listen(PORT,()=>console.log("server is listening"))
