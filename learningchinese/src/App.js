import './App.css';
import React, { useState } from 'react'
import Home from './Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () =>{
  return (
<Router>

{/*content outside switch always shows!*/}

{/*all jsx elements must have a parent element*/}

  <Routes>
    <Route path = "/">
      <Home />
    </Route>

  </Routes>
</Router>  

  );
}








export default App;
