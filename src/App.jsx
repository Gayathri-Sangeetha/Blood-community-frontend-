import {BrowserRouter,Routes,Route }from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx';
const App=()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='admin-login' element={<AdminLogin/>}/>
    </Routes>
    </BrowserRouter>);}

export default App
