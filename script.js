
const sqlite3 = require('sqlite3').verbose(); //require extension

let sql;

//connect to database
const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE, (err) =>{
  if (err) return console.error(err.message);
})

//create table
const create = () => {
sql = 'CREATE TABLE terms(id INTEGER PRIMARY KEY, ENGLISH, CHINESE)';
db.run(sql);
}

//drop table
const drop = () => {
db.run("DROP TABLE terms");
}

//Insert data
const insert = (english, chinese) =>{
sql = 'INSERT INTO terms(ENGLISH, CHINESE) VALUES (?, ?)';
  db.run(sql, [english, chinese], (err) => {
    if (err) return console.error(err.message);
  })
}


//Query Data
const query = () => {
sql = 'SELECT * FROM terms';
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);
  rows.forEach((row) => {
    console.log(row);
  });
});
}


//delete data

const deleted = (id) => {
sql = 'DELETE FROM terms WHERE id = ?';
db.run(sql, [id], (err) => {
  if (err) return console.error(err.message);
});
}



//update data
const update = () => {
sql = 'UPDATE terms SET ENGLISH = ? CHINESE = ? WHERE id = ?';
db.run(sql, [english, chinese, id], (err) => {
  if (err) return console.error(err.message);
});
}




// const front = document.querySelectorAll('.front')[0]; //need indexes because style for querySelectorAll is a list
// const back = document.querySelectorAll('.back')[0];
// const flips = document.querySelectorAll('.flip');
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

//   const addTerm = () => {
//     words[english] = chinese
//   }