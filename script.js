
import initSqlJs from 'sql.js';

const SQL = await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: file => `https://sql.js.org/dist/${file}`
});

const db = new SQL.Database();

const createDatabase = () => {
  let sqlstr = 'CREATE TABLE terms(id INTEGER PRIMARY KEY, ENGLISH, CHINESE)';
  db.run(sqlstr);
};

createDatabase();

const front = document.querySelectorAll('.front')[0]; //need indexes because style for querySelectorAll is a list
const back = document.querySelectorAll('.back')[0];
const chinese = document.querySelectorAll('.chinese');
const english = document.querySelectorAll('.english');


const flip = () => {
    if (front.style.display !== "none") {
      front.style.display = "none";
      back.style.display = "block";
    } else {
      front.style.display = "block";
      back.style.display = "none";
    }
  }

  words = {
    Hello: "Ni hao",
    Watermelon: "Xigua"
  }

  data = Object.entries(words);
  
  const getRandomTerm = () => {
    let randomTerm = data[Math.floor(Math.random() * data.length)]
    front.innerHTML = `<p>${randomTerm[0]}</p>`; //note the use of literals
    back.innerHTML =  `<p>${randomTerm[1]}</p>`; //replaces content that lives in p with a random term.
  }

  const nextTerm = () => {
    getRandomTerm();
  }
