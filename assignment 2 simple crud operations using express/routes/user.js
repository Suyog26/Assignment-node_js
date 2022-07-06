const express=require("express");
const router=express.Router();
const { v4: uuidv4 } = require('uuid');

let users =[]


router.get("/",(req,res)=>{
    console.log(users);
    res.status(200).send(users)
})

router.post("/",(req,res)=>{
    
    const user=req.body;
    users.push({...user,id:uuidv4()})
    res.status(200).send(`user with the ${user.firstname} added to the database `)
})

router.get("/:id",(req,res)=>{
    const { id }=req.params;
    const founduser=users.find((user)=>user.id===id)
    res.send(founduser)
})

router.delete("/:id",(req,res)=>{
    const { id }=req.params;
    users=users.filter((user)=>user.id != id);
    res.status(200).send(`user with ${id} deleted from the database `)
})

router.patch("/:id",(req,res)=>{
    const { id }=req.params;
    const { firstname , Secondname , age }= req.body;
    const user=users.find((user)=> user.id === id);

    if(firstname){
        user.firstname=firstname;
    }
    if(Secondname){
        user.Secondname=Secondname;
    }
    if(age){
        user.age=age;
    }
    res.send(`user with the ${id} updated `)
})

module.exports=router