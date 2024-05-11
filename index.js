const { faker, da } = require('@faker-js/faker');
const mysql=require('mysql2')
const express =require('express')
const path =require("path")

const app=express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Mysql@17112001'
  });

 
  // let data =[];
  // let getRandomUser =()=>  {
  //   return [
  //     faker.datatype.uuid(),
  //     faker.internet.userName(),
  //      faker.internet.email(),
      
  //     faker.internet.password(),
     
  //   ];
  // }
  // for(let i=1;i<=100;i++){
  //   data.push(getRandomUser());
  // }
  // try {
  //   let q =`INSERT INTO user(id,username,email,password) VALUES ?`;
  //   connection.query(q,[data],(err,result)=>{
  //       if(err) throw err;
  //       console.log(result);
        

  //   });
    
  // } catch (err) {
  //   console.log(err);
  // }

  app.get("/",(req,res)=>{
    let q ="SELECT count(*) from user";

    try {
      connection.query(q,(err,result)=>{
          if(err) throw err;
          let count= result[0]["count(*)"];
          res.render("Home.ejs",{count});
      });
      
    } catch (err) {
      console.log(err);
    }
  
  })


  app.get("/users",(req,res)=>{
    let q ="SELECT * from user";

    try {
      connection.query(q,(err,result)=>{
          if(err) throw err;
          // let data=result;
          // console.log(data);
          res.render("user.ejs",{result});
      });
      
    } catch (err) {
      console.log(err);
    }
  
  })


  app.get("user/:id/edit",(req,res)=>{
    let { id } = req.params;
    
    try {
      let q =`SELCT * FROM user WHERE id='${id}'`;
      connection.query(q, (err,result)=>{
          if(err) throw err;
          let data=result;
          console.log(data);
          res.render("edit.ejs",{result});
      });
      
    } catch (err) {
      console.log(err);
    }
   
  })

  app.listen("3000",()=>{
    console.log("server is listening")
  })
  
  
  