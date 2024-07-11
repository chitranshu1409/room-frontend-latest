import './App.css';
import {BrowserRouter, Routes,Route, NavLink,useParams} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Authentication from './Pages/Authentication';
import Joinroom from './Pages/Joinroom';
import Createroom from './Pages/Createroom';
import Room from './Pages/Room';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Authentication' element={<Authentication/>}/>
        <Route path='/joinroom' >
          <Route path='' element={<Joinroom/>}/>
          
          <Route path=':roomId/:username/:email' element={<Room/>}/>
          
        </Route>
        <Route path='/createroom'>
        <Route path='' element={<Createroom/>}/>

        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
