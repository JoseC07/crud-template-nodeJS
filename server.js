// setup
const express = require("express");
// call express
const app = express();

//Body-parser is part of the 'express middleware' that reads a form's input (coming
//from the front end) and stores it as a json object accessible through request.body.
const bodyParser = require("body-parser");
const { request } = require("http");


// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const fake_database = [
  {
    id: 1,
    name: 'Mike',
    age: 20
  },
  {
    id: 2,
    name: 'Josh',
    age: 27
  }
];

app.get("/", (request, response) => {
  response.json(fake_database);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


//grab user data from request.body 
// make a new user object to make sure we only grab relevant information
// add user object to the fake_database

//express post - (uri,function)
app.post('/user/new', (request,response) =>{
    //get name and age from request.body (using object destructing)
    const { name, age } = request.body;


    // generate an id for the fake_databse
    const id = fake_database.length + 1;

    const newUser = {
        id,
        name,
        age,
    };

    fake_database.push(newUser);
    
    response.json({success: true});

});

app.get('/user/:id', (request, response) => {
    const { id } = request.params;
    console.log("did this work")
    const userObj = fake_database.find((fake_User) => fake_User.id === +id);

    response.json(userObj);
});

app.put('/user/update/name', (request, response) =>{

    const { id, name } = request.body;

    
    fake_database.forEach(user =>{
        if(user.id === +id){
            user.name = name;
            console.log(user.name);
        }
    });
    

    response.json({success: true});

});


app.delete('/user/delete/:id', (request,response) => {
    const { id } = request.params;

    const userIndex = fake_database.findIndex((user) => user.id === +id);
    console.log(fake_database[userIndex]);
    
    fake_database.splice(userIndex,1);
    console.log(fake_database[userIndex]);
   
    response.json({success: true});
});
