//main.js
var url = require('url');
const mysql = require('mysql')

const http = require('http');  // 'http' module

const hostname = '127.0.0.1';  // ip for localhost
const PORT = process.env.PORT || 3030;

var dbcon = mysql.createConnection({
     host: "sql.freedb.tech",
     user: "freedb_rootknct",
     password: "hc*tbFRH7cH583w",
     database: "freedb_mysqlwfdb"
});   

var lbrstr_ds='';var vcnctrtrws='';
const server = http.createServer((req,res) => {
   res.statusCode = 200; 
   res.setHeader('Content-Type','text/plain');  
   res.setHeader('Access-Control-Allow-Origin','*');
   

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    /* Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true); */
  
  var reqprsr = url.parse(req.url,true); 
  if (reqprsr.query.flag == "cnncttrtrv"){     
     lbrstr_ds='';vcnctrtrws='';
     console.log("reading query flag - validated")
     dbcon.connect(function (err) {
     if(err) throw err;
     dbcon.query("select * from emptable_tst1",function (err,result,fields) {
       if (err) throw err;
       console.log("result set length->"+ result.length);
          for(ic=0;ic<result.length;ic++)
            lbrstr_ds = lbrstr_ds + JSON.stringify(result[ic])+ ',';
     lbrstr_ds = lbrstr_ds.substr(0,lbrstr_ds.length - 1);
     res.write(vcnctrtrws + '"employee_info":[' + lbrstr_ds +']')
     res.end();  
     })
    })
   }
 })

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
