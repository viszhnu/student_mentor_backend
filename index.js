const express=require("express");
const app=express();

app.listen(process.env.PORT||3000)

const cors=require("cors");

app.use(cors());
app.use(express.json());

const mongodb=require("mongodb");
const URL="mongodb+srv://vishnu:n3Uf35jUEa!4qEr@cluster0.xfblp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DBname="student_mentor";

app.post("/student", async function(req,res){

    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        await db.collection("students").insertOne(req.body);

        await connection.close();

        return res.json({
            message:"student successfully inserted"
        })
        
    }catch{
        console.log("error in student post");
    }
})

app.get("/students", async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        let answer = await db.collection("students").find().toArray();

        await connection.close();

        return res.json({
            ans:answer
        })
        
    }catch{
        console.log("error in student get");
    }
})

app.get("/student/:id", async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        let answer = await db.collection("students").findOne({_id:mongodb.ObjectID(req.params.id)});

        await connection.close();

        return res.json({
            answer
        })
        
    }catch{
        console.log("error in student get");
    }
})

app.put("/student/:id", async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        let answer = await db.collection("students").updateOne({_id:mongodb.ObjectID(req.params.id)},{$set:req.body});

        await connection.close();

        return res.json({
           message:"student updated"
        })
        
    }catch{
        console.log("error in student updation");
    }
})

app.post("/mentor", async function(req,res){
    console.log("error");
    try{
        
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        await db.collection("mentors").insertOne(req.body);
        
        await connection.close();

        return res.json({
            message:"mentor successfully inserted"
        })
        
    }catch{
      
        console.log("error in mentor post");
    }
})

app.get("/mentors", async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        let answer = await db.collection("mentors").find().toArray();

        await connection.close();

        return res.json({
            answer
        })
        
    }catch{
        console.log("error in mentors get");
    }
})

var mentor=null;
app.get("/mentor/:id", async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        

        let answer = await db.collection("mentors").findOne({_id:mongodb.ObjectID(req.params.id)});
        
        if(answer!==null)
        mentor=answer.students;
        await connection.close();
         
        console.log(mentor);
        return res.json({
            answer
        })
        
    }catch{
        console.log("error in mentor get");
    }
})

app.put("/mentor/:id", async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        console.log(req.body.students);
        req.body.students.map(i=>{
            mentor.push(i)
        })
        req.body.students=mentor;
        let answer = await db.collection("mentors").updateOne({_id:mongodb.ObjectID(req.params.id)},{$set:req.body});

        await connection.close();

        return res.json({
           message:"mentor updated"
        })
        
    }catch{
        console.log("error in mentor updation");
    }
})

app.delete("/student/:id",async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        let answer = await db.collection("students").deleteOne({_id:mongodb.ObjectID(req.params.id)});

        await connection.close();

        return res.json({
           message:"student deleted"
        })
        
    }catch{
        console.log("error in student deletion");
    }
})

app.delete("/mentor/:id",async function(req,res){
    try{
        let connection = await mongodb.connect(URL);

        let db = connection.db(DBname);
        
        let answer = await db.collection("mentors").deleteOne({_id:mongodb.ObjectID(req.params.id)});

        await connection.close();

        return res.json({
           message:"mentor deleted"
        })
        
    }catch{
        console.log("error in mentor deletion");
    }
})