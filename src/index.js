const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

const route = require('./routes');
const db=require('./config/db');

const app = express();
const port = 8800;



// connect db
//db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// routes init
route(app);

// request : chứa thông tin mà ứng dụng phía client yêu cầu lên sever
// response : trả về client cái gì
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// var mysql=require('mysql2');
// var con=mysql.createConnection({
//   host:"localhost",
//   user:"root",
//   password:"123456789",
//   database:"custormer"
// });
// con.connect(function(err){
//   if(err) throw err;
//   var sql="SELECT * FROM customer";
//   con.query(sql, function(err, results){
//     if(err) throw err;
//     console.log(results)
//   })

//  });
// app.get('/', (req, res) => {
//   var sql="SELECT * FROM login";
//   con.query(sql, function(err, results){
//         if(err) throw err;
//         res.send(results);
//       })
// })
