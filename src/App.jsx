import {BrowserRouter,Routes,Route }from 'react-router-dom'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ButtonPage from './pages/ButtonPage.jsx';
import DonarPage from './pages/DonarPage.jsx';
import DonateDetails from './pages/DonateDetails.jsx';
import RequesterPage from './pages/RequesterPage.jsx';
import RequesterDetails from './pages/RequesterDetails.jsx';
const App=()=>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='admin-login' element={<AdminLogin/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
      <Route path='/button-page' element={<ButtonPage/>}/>
      <Route path='/donar-dashboard' element={<DonarPage/>}/>
      <Route path='/donation-details' element={<DonateDetails/>}/>
      <Route path='/requester-dashboard' element={<RequesterPage/>}/>
      <Route path="/requester-details/:donorEmail" element={<RequesterDetails />} />

    </Routes>
    </BrowserRouter>);}

export default App
