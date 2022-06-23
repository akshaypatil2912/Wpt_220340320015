
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');


app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



 var result;


let books=[{id:101,name:"english",price:550}];

const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'test',
	port:3306
});


// -----------------blur event----------------
app.get('/book', function (req, res) {
    console.log("reading input ");
	let bookid=req.query.bookid;
        console.log("reading input " + bookid);
		
    	
		let output={status:false,bookdetail:{}};


		connection.query("select * from book where bookid = ?", [bookid], (err, res1) => {
			if (err) {
				result = err;
				console.log("trouble " + err);
			} else if(res1.length>0) {
				console.log("ENtered if block")
				result = res1;
				output.status=true;
			output.bookdetail=result[0];
				console.log("success" + result[0].bookname)
			}
			
			
			res.send(output);
		});


		});


// -----------------update event----------------

app.get('/bookupdate', function (req, res) {
    console.log("reading input ");
	let bookid=req.query.bookid;
	let bookname=req.query.bookname;
	let price=req.query.price;
        console.log("reading input " + bookid);
        console.log("reading input " + bookname);
        console.log("reading input " + price);
		
    	
		let output={status:false};


		connection.query('update book set bookname = ? where bookid = ?', [bookname,bookid], (err, res1) => {
			console.log("Cant read")
			
			if (err) {
				
			} else if(res1.affectedRows>0) {
				console.log("Entered if block")
				
				output.status=true;
		
				console.log("success" + output.status)
			}
			else{
				console.log("cant update")
			}
			
			
			res.send(output);
		});


		});

app.listen(8081, function () {
    console.log("server listening at port 8081...");
});