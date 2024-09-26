// import some dependencies/ packages

//express framework for handling http requests
const express = require('express');
//create an instance of the frame work express
const app = express();
//DBMS 
const mysql = require('mysql2');
//cross origin resourec sharing(formating)
const cors = require('cors');
//Environment variable
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

//connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//check for connection
db.connect((err) => {
    //if no connection = No wedding
    if (err) return console.log('Error connecting to MYsql');
    //if yes connect = wedding
    console.log("connected to mysql as Id: ", db.threadId);
})

//GET Method code goes here
//
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Get method example below

app.get('/data', (req, res) => {
    //retrieve data from database
    db.query('SELECT * FROM patients', (err,results) => {
        if(err){
            console.error(err);
            res.status(500).send('Error retrieveng Data')
        } else{
            // display the patient records to the browser
            res.render('data', {results:results});
        }
    });
});
//
// Retrieve All providers
app.get('/providers', (req, res) => {
    //retrieve data from database
    db.query('SELECT * FROM providers', (err,results) => {
        if(err){
            console.error(err);
            res.status(500).send('Error retrieveng Data')
        } else{
            // display the patient records to the browser
            res.render('providers', {results:results});
        }
    });
});

// Retrieve All patients by first name
app.get('/patient_F_name', (req, res) => {
    //retrieve data from database
    db.query('SELECT first_name FROM patients', (err,results) => {
        if(err){
            console.error(err);
            res.status(500).send('Error retrieveng Data')
        } else{
            // display the patient records to the browser
            res.render('patient_F_name', {results:results});
        }
    });
});

// group all providers by specialty
app.get('/provider_specialty', (req, res) => {
    //retrieve data from database
    db.query('SELECT * FROM providers ORDER BY provider_specialty DESC', (err,results) => {
        if(err){
            console.error(err);
            res.status(500).send('Error retrieveng Data')
        } else{
            // display the patient records to the browser
            res.render('provider_specialty', {results:results});
        }
    });
});



//stop get method code here

//start the server
app.listen(process.env.PORT, () =>{
    console.log(`server listening on port ${process.env.PORT}`);

    // Send a message to the browser
    console.log('Sending message to the browser...')
    app.get('/', (req, res) => {
        res.send('YEY!!! wedding can proceed, the server started successesfully');
    });
});