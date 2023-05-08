//main.js
var url = require('url');
const sqlite3 = require('sqlite3')

const http = require('http');  // 'http' module

const hostname = '127.0.0.1';  // ip for localhost
const port = process.env.PORT || 3030;

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve({id: this.lastID })
        }
      })
    })
  }
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}


class Node_connRepository {
  constructor(dao) {
    this.dao = dao    
  }
getAll() {
    return this.dao.all(`SELECT * FROM db_tblbrstr`)
  }
}
var lbrstr_ds='';
const server = http.createServer((req,res) => {
   res.statusCode = 200; 
   res.setHeader('Content-Type','text/plain');  
   res.setHeader('Access-Control-Allow-Origin','*');

  const dao = new AppDAO('./db_dbnodecnnct')
  const nodeConn_Repo = new Node_connRepository(dao)

  
  var reqprsr = url.parse(req.url,true); 
  if (reqprsr.query.flag == "cnncttrtrv"){     
     nodeConn_Repo.getAll()
.then((rowslbrstr)=>{
     lbrstr_ds = '';
     for (var inc=0;inc<rowslbrstr.length;inc++){                  
      lbrstr_ds = lbrstr_ds + '{"name":"' + rowslbrstr[inc].person_name +'","designation":"' + rowslbrstr[inc].title +'"},';     
     }
    lbrstr_ds = lbrstr_ds.substr(0,lbrstr_ds.length - 1);
    
    res.write('"company_desg":[' + lbrstr_ds +']')
     res.end();  
    })

   }
 })
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
