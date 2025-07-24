import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Landingpage from './Pages/Landingpage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Textinput from './Pages/Textinput';
import Otppage from './Pages/Otppage';
import Searchexcel from './Pages/Searchexcel';
import VerifyOTP from './Pages/VerifyOTP';
import Forgotpasswordpage from './Pages/Forgotpasswordpage';
import { Workflow } from './Pages/Workflow';

function App() {

  return (
    <>
    <BrowserRouter>
<Routes>
  {/* <Route path="/" element={<Signup/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/landingpage" element={<Landingpage/>}></Route> */}
  <Route path='/' element={<Textinput/>}></Route>
  {/* <Route path="/enterotp" element={<Otppage/>}></Route> */}
  <Route path='/searchwithexcel' element={<Searchexcel/>}></Route>
  {/* <Route path='/resendotp' element={<VerifyOTP/>}></Route>
  <Route path='/forgotpassword' element={<Forgotpasswordpage/>} ></Route> */}
  {/* <Route path="/workflows" element={<Workflow/>}></Route> */}
</Routes>
    </BrowserRouter>
   
    </>
    
  )
}

export default App
