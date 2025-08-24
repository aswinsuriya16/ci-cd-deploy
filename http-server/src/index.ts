import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();

app.use(express.json());

const prismaClient = new PrismaClient();

app.get("/",async(req,res)=>{
    try {
        const users = await prismaClient.user.findMany();
        const blogs = await prismaClient.blog.findMany();
        return res.json({
            users,blogs
        })
    }
    catch(e) {
        return res.json({
            msg : "Error Fetching"
        })
    }
})

app.post("/add-user",async (req,res)=>{
    const {username,password} = req.body;
    try {
        await prismaClient.user.create({
            data : {
                username : username,
                password : password
            }
        })
        return res.json({
            msg : "User added!"
        })
    }
    catch(e) {
        return res.json({
            msg: "Error adding user to DB"
        })
    }
})

app.post("/add-blog",async(req,res)=>{
    const {title,author} = req.body;
    try {
        await prismaClient.blog.create({
            data : {
                title,author
            }
        })
        return res.json({
            msg : "Blog added!"
        })
    }
    catch(e) {
        return res.json({
            msg : "Error adding blog !"
        })
    }
})


app.listen(3000,()=>{
    console.log("Port running on 3000");
})