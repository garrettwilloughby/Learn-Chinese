const front = document.querySelectorAll('.front')[0]; //need indexes because style for querySelectorAll is a list
const back = document.querySelectorAll('.back')[0];
const flips = document.querySelectorAll('.flip');


const flip = () => {
    if (front.style.display !== "none") {
      front.style.display = "none";
      back.style.display = "block";
    } else {
      front.style.display = "block";
      back.style.display = "none";
    }
  }
