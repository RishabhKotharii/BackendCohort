const express = require("express");
const app = express();

var users = [{
    name: "John",
    kidneys: [{
        healthy: false,
    },{
        healthy: false,
    },{
        healthy:true,
        
    }]
}];

app.use(express.json());

app.get("/",function(req,res){
    const johnkidneys = users[0].kidneys;
    const numberOfKidneys = johnkidneys.length;
    let numberOfHealthyKidneys = 0;
    for( let i =0;i<johnkidneys.length;i++){
        if(johnkidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        johnkidneys,
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

    
})

app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        message:"Done",
    })
})


app.put("/",function(req,res){
    for( let i=0;i<users[0].kidneys.length;i++){
       
            users[0].kidneys[i].healthy = true;
        
        res.json({
            message:"kidney is updated"
        })
    }
})

app.delete("/",function(req,res){

    const newKidneys = [];
    for( let i=0;i<users[0].kidneys.length;i++){
       
        if(users[0].kidneys[i].healthy ){
            newKidneys.push({
                healthy:true,
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({

        msg:"Unhealthy kidneys are deleted"
    })
})





app.listen(3000);