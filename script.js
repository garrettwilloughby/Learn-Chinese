const front = document.querySelectorAll('.front');
const back = document.querySelectorAll('.back');
const flips = document.querySelectorAll('.flip');



const flip = () => {
  for (let i = 0; i < front.length; i++) {
    if (front.style.display !== "none") {
      front.style.display = "none";
      back.style.display = "block";
    } else {
      front.style.display = "block";
      back.style.display = "none";
    }
  }
}

flips.addEventListener('click', flip());

console.log('bye');