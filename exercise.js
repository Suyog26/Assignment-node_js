// const http = require("http");

const axios = require("axios");
const express =require("express");
const app = express();
const router=require("./Routers/Routers");

app.get("/",(req,res)=>{
    console.log("hello wrold")
    res.status(200).send("Home page  ")
})

app.get('/summary-stats', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { summaryStats } = data
        console.log(summaryStats);
        res.status(200).send({ summaryStats })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})


app.get('/country/', async (req, res) => {
    
    try {
        
        const { country_name }=req.query;

        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data

        
        const finalData=rawData.filter((item)=>{
            return item.Country_Region === country_name
        })
       
        res.status(200).send({ finalData })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

app.get('/state/', async (req, res) => {
    
    try {
        
        const { state_name , }=req.query;

        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data

        
        const finalData=rawData.filter((item)=>{
            return item.Province_State === state_name
        })
       
        res.status(200).send({ finalData })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})


app.get('/importantdata', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data
        const responsivedata=rawData.map((rawData)=>{
            const {Province_State,Country_Region,Last_Update,Confirmed,Deaths}=rawData;
            return {Province_State,Country_Region,Last_Update,Confirmed,Deaths}
        })
        res.status(200).send({ responsivedata })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

app.get("/keys",async(req,res)=>{
    try{
        const{data}=await axios.get("https://coronavirus.m.pipedream.net/")

        const {rawData}=data
        const result=Object.keys(data)
        return res.status(200).send({result})
    }
    catch(error){
        res.send(500).send({error})
    };
})

app.get("/values",async(req,res)=>{
    try{
        const{data}=await axios.get("https://coronavirus.m.pipedream.net/")

        const {rawData}=data
        const result=Object.values(data)
        return res.status(200).send({result})
    }
    catch(error){
        res.send(500).send({error})
    };
})

app.get("/enteries",async(req,res)=>{
    try{
        const{data}=await axios.get("https://coronavirus.m.pipedream.net/")

        const {rawData}=data
        const result=Object.entries(rawData)
        return res.status(200).send({result})
    }
    catch(error){
        res.send(500).send({error})
    };
})


app.get('/abc', async (req, res) => {
    
    try {
        
        const { country_name }=req.query;

        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data

        
        const finalData=rawData.filter((item)=>{
            if(item.Deaths<5000 ){
                return item.Country_Region === country_name
            };
        
        })
       
        res.status(200).send({ finalData })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

app.get('/dsa', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data
        const responsivedata=rawData.reverse(()=>{
            const {Country_Region,Last_Update,Confirmed,Deaths}=rawData;
            return {Country_Region,Last_Update,Confirmed,Deaths}
        });
            
        res.status(200).send({ responsivedata })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

app.use(router);

 
app.listen(5000,()=>console.log("server is listening.."));