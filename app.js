const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./career")
const Career = mongoose.model("career");


mongoose.connect("mongodb+srv://sooa_mongo_admin:CbfRdzY1dULYKIiE@sooa-mongo-cluster.lrlq0px.mongodb.net/SOOA_careers_ms?retryWrites=true&w=majority", ()=>{
    console.log("Database is connected");
}
);
app.use(bodyParser.json());

app.post("/career",(req,res) => {
    var newCareer = {
      _id : req.body._id,
      academic_level: req.body.academic_level,
      name: req.body.name,
      SNIES_code: req.body.SNIES_code,
      credits: req.body.credits,
      department: req.body.department,
      faculty: req.body.faculty,
      campus: req.body.campus,
      pensum: req.body.pensum,
    }
    var career = new Career(newCareer)

    career.save().then(() => {
        res.send("La carrera fue creada con exito")
    }).catch((err) => {
        throw err;
    })
})

app.get("/career",(req,res) => {
    Career.find().then((career)=>{
        res.json(career)
    }).catch((err) => {
        throw err;
    })
})

app.get("/career/:id",(req,res) => {

    Career.findById(req.params.id).then((career)=>{
        if(career){
            res.json(career)
        }else{
            res.sendStatus(404);
        }
        
    }).catch((err) => {
        
    })
})

app.delete("/career/:id",(req,res) => {

    Career.findByIdAndDelete(req.params.id).then((career)=>{
        res.send("Carrera eliminada")
    }).catch((err) => {
        throw err;
    })

})

app.put("/career/delete/:id",(req,res) => {
    Career.findById(req.params.id).then((career)=>{
        if(career){
            tam = career.pensum.length;
              for (let i = 0; i < tam; i++) {
                if(career.pensum[i]==req.body.subject){
                    career.pensum.splice(i,1);
                    career.save();
                    break;
                }
              }
        }else{
            res.sendStatus(404);
        }
        res.send("guardado");
    }).catch((err) => {
        throw err;
    })
    
})

app.put("/career/add/:id",(req,res) => {
    Career.findById(req.params.id).then((career)=>{
        if(career){
            career.pensum.push(req.body.subject);
              career.save();
              mensaje="guardado";
        }else{
            res.sendStatus(404);
        }
        res.send("guardado");
    }).catch((err) => {
        throw err;
    })
    
})


app.listen(4445, () => {
    console.log("hola mundo");
})