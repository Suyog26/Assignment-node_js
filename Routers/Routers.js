const express = require("express");
const axios = require("axios");

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
// router.get('/country/', async (req, res) => {
    
//     try {
        
//         const { country_name }=req.query;

//         const { data } = await axios.get("https://coronavirus.m.pipedream.net/")

//         const { rawData } = data

        
//         const finalData=rawData.filter((item)=>{
//             return item.Country_Region === country_name
//         })
       
//         res.status(200).send({ finalData })
//     }
//     catch (error) {
//         res.status(500).send({ error })
//     }

// })


module.exports = router