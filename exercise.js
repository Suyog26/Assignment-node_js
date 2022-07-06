// const http = require("http");

const axios = require("axios");
const express =require("express");
const app = express();
const router=require("./Routers/Routers");

app.get("/home/:name",(req,res)=>{
    console.log("hello world")
    res.status(200).send(" welcome to home page ! "+ req.params.name)
})


app.get('/According_ratio/CF', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data
        const array=rawData.map((rawData)=>{
            if (rawData.Case_Fatality_Ratio < 1){
                const {Country_Region,Province_State,Case_Fatality_Ratio}=rawData
                return {Country_Region,Province_State,Case_Fatality_Ratio}
            }else(rawData.Case_Fatality_Ratio="");{
                return 0
            }
        });
        res.status(200).send({ array })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

app.get('/deaths/countrywise', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")
        const { country_name }=req.query;
        const { rawData } = data
        const finalData=rawData.filter((item)=>{
            return item.Country_Region === country_name
        })
       
        .reduce((total,item)=>{
            const a=parseInt(item.Deaths)
            return total+ a
        },0);
        res.status(200).send({ finalData })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})
app.use(router);

app.listen(5000,()=>console.log("server is listening.."));