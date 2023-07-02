const front = document.querySelectorAll('front');
const back = documennt.querySelectorAll('back')

const flip = () => {
    if (front.style.visibility != "hidden") {
        front.style.visibility = "hidden";
        back.style.visibility = "visible";
      } else {
        front.style.visibility = "visible";
        back.style.visibility = "hidden";
      }
      
}
