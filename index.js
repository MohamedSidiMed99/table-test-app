require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 5000; 
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


///-------------- connection with mysql -----------
const db = mysql.createConnection({
   user:"root",
   host:"localhost",
   password:"",
   database:"table-app"
});

///-------------------- add Data ---------------

app.post("/addData" , (req , res)=>{
        const newName = req.body.newName;
        const newDate = req.body.newDate;
        const newQuantity = req.body.newQuantity;
        const newDistance = req.body.newDistance;

        if(newName == "" || newDate == null || newQuantity == null || newDistance == null){

        }else{
                db.query("INSERT INTO data (date,name ,Quantity ,Distance) VALUES (?,?,?,?)",[newDate,newName,newQuantity,newDistance], (err,result)=>{
                        if(err){
                                console.log(err);
                        }else{
                                res.send("added");
                        }
                })
        }
      
})

///-------------- fetch data from table data -----------
app.post("/data" , (req ,res)=>{

        const name = req.body.name;
        const select1 = req.body.select1;
        const select2 = req.body.select2;
        db.query('SELECT * FROM data WHERE  name = ? OR name LIKE ? OR    Quantity > ? AND Quantity < ? ',[name,`%${name}%`,select2,select1], (err ,result) =>{
                if(err){
                        console.log(err);
                }else{
                        res.send(result);
                }
                })

        
  
});

///-------------------- Edit Data ---------------

app.post("/editData" , (req , res)=>{
        const id = req.body.id;
        const newName = req.body.newName;
        const newQuantity = req.body.newQuantity;
        const newDistance = req.body.newDistance;

        if(newName == "" || newQuantity == null || newDistance == null){

        }else{
                db.query("UPDATE data SET  name =? ,Quantity =? ,Distance = ? WHERE ID = ? ",[newName,newQuantity,newDistance,id], (err,result)=>{
                        if(err){
                                console.log(err);
                        }else{
                                res.send("Edited");
                        }
                })
        }
      
})

///---------------- delete ------------------

app.post("/delete" , (req , res) =>{
    const id = req.body.id;

    db.query("DELETE FROM data WHERE ID = ?",[id],(err,result)=>{
        if(err){
                console.log(err);
        }else{
                res.send("deleted");
        }
    })
});

///-------------- listen on server 5000 -----------

app.listen(PORT , ()=>console.log(`App running on the port ${PORT} `))


