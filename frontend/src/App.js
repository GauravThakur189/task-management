import React, { useEffect } from 'react'
import Home from './pages/Home'
import {BrowserRouter,Route,Routes, useNavigate} from 'react-router-dom'
import AllTask from './pages/AllTask'
import ImportantTask from './pages/ImportantTask'
import CompletedTask from './pages/CompletedTask'
import IncompletedTask from './pages/IncompletedTask'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {useDispatch, useSelector} from "react-redux"
import { authActions } from './store/auth'

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

   useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn===false){
      navigate('/signup');
     }
   }, [])
   
  
  return (
    <div className=' bg-gray-900 text-white h-screen p-2 relative'>
     
     
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index element={<AllTask/>}  />
          <Route path='/importantTasks' element={<ImportantTask/>}  />
          <Route path='/completedTasks' element={<CompletedTask/>}  />
          <Route path='/inCompletedTasks' element={<IncompletedTask/>}  />
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>} /> 
        </Routes>
     
    </div>
  )
}

export default App