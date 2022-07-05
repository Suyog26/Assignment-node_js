const express = require("express");
const axios = require("axios");
const { Router } = require("express");

const router = new express.Router();

router.get('/get-all-data', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data
        console.log(rawData);
        res.status(200).send({ rawData })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

router.get('/summary-stats', async (req, res) => {
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


router.get('/countrywise_data', async (req, res) => {
    
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

router.get('/statewise_data', async (req, res) => {
    
    try {
        
        const { state_name  }=req.query;

        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data

        
        const finalData=rawData.find((item)=>{
            return item.Province_State === state_name
        })
       
        res.status(200).send({ finalData })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})


router.get('/Required_data', async (req, res) => {
    try {
        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data
        const responsivedata=rawData.map((rawData)=>{
            const {Country_Region,Province_State,Confirmed,Deaths}=rawData;
            return {Country_Region,Province_State,Confirmed,Deaths}
        })
        res.status(200).send({ responsivedata })
    }
    catch (error) {
        res.status(500).send({ error })
    }

})

router.get("/object_key",async(req,res)=>{
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

router.get("/object_values",async(req,res)=>{
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

router.get("/object_enteries",async(req,res)=>{
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


router.get('/minimum_deaths', async (req, res) => {
    
    try {
        
        const { country_name }=req.query;

        const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

        const { rawData } = data

        
        const finalData=rawData.find((item)=>{
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

router.get('/Reverse_order_data', async (req, res) => {
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



module.exports = router