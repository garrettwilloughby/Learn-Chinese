import './App.css';
import Card from "./Card";
import Nav from "./Navbar";
import Logic from "./Algorithm"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () =>{
  return (
<Router>

{/*content outside switch always shows!*/}
  <Nav />
{/*all jsx elements must have a parent element*/}
  
  <Routes>
    <Route path="/" element={<Card />}></Route>
    <Route path="/Local" element =  {<Logic />}></Route>
  </Routes>
</Router>  

  );
}








export default App;
