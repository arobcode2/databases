var mysql = require('mysql');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var con = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: "student"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  myQuery(`USE chat`).then(() => console.log('connected to chat')).catch(err => {throw err});
});

var myQuery = function(queryStr) {
  return new Promise( ( resolve, reject ) => {
    con.query( queryStr, (err, rows) => {
      if (err) {
        return reject(err);
      } 
      resolve(rows);
    })
  })
}

module.exports = {con, myQuery}
