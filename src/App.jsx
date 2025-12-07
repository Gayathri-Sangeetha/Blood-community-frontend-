import {BrowserRouter,Routes,Route }from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
const App=()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='admin-login' element={<AdminLogin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>);}

export default App
