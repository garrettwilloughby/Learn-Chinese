const initSqlJs = require('sql.js');
src='/dist/sql-wasm.js'


config = {
  locateFile: file => `/Users/garrettwilloughby/Desktop/Personal Projects/Learning Chinese/Learn-Chinese/sql-wasm.wasm`
};

initSqlJs(config).then(function(SQL){
  //Create the database
  const db = new SQL.Database();
  // Run a query without reading the results
  db.run("CREATE TABLE test (col1, col2);");
  // Insert two rows: (1,111) and (2,222)
  db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);

  // Prepare a statement
  const stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
  stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

  // Bind new values
  stmt.bind({$start:1, $end:2});
  while(stmt.step()) { //
    const row = stmt.getAsObject();
    console.log('Here is a row: ' + JSON.stringify(row));
}
});

  // const front = document.querySelectorAll('.front')[0]; //need indexes because style for querySelectorAll is a list
  // const back = document.querySelectorAll('.back')[0];
  // const chinese = document.querySelectorAll('.chinese');
  // const english = document.querySelectorAll('.english');


  // const flip = () => {
  //     if (front.style.display !== "none") {
  //       front.style.display = "none";
  //       back.style.display = "block";
  //     } else {
  //       front.style.display = "block";
  //       back.style.display = "none";
  //     }
  //   }

  //   words = {
  //     Hello: "Ni hao",
  //     Watermelon: "Xigua"
  //   }

  //   data = Object.entries(words);
    
  //   const getRandomTerm = () => {
  //     let randomTerm = data[Math.floor(Math.random() * data.length)]
  //     front.innerHTML = `<p>${randomTerm[0]}</p>`; //note the use of literals
  //     back.innerHTML =  `<p>${randomTerm[1]}</p>`; //replaces content that lives in p with a random term.
  //   }

  //   const nextTerm = () => {
  //     getRandomTerm();
  //   }
