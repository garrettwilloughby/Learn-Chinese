//check if user's browser supports some instance of IndexedDB.
const indexedDB = 
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

//opens a TermsDatabase upon opening browser. Creates database if does not exist already. 
const request = indexedDB.open("TermsDatabase", 1);

//if browser is unable to open databsae.
request.onerror = function(event){
  console.error("Error occured with IndexedDB");
  console.error(event);
};


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
