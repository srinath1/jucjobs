import './App.css'
import 'antd/dist/antd.css'
import { Button } from 'antd';
import React,{useEffect} from 'react'
import {getAllJobs,getAllUsers} from './redux/actions/jobActions'
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AppliedJobs from './pages/AppliedJobs';
import Profile from './pages/Profile';
import PostJobs from './pages/PostJobs';
import PostedJobs from './pages/PostedJobs'
import JobsInfo from './pages/JobInfo'
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { useDispatch,useSelector } from 'react-redux'
import EditJob from './pages/EditJob';
import UserInfo from './pages/UserInfo';
function App(){
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllJobs())
        dispatch(getAllUsers())
    
      },[])
    const {loading}=useSelector(state=>state.loaderReducer)
    return <div className="App">
   {loading && (
    <div className="sweet-loading text-center">
    <FadeLoader color="green"  />
    </div>
   )}
    <BrowserRouter>
    <Routes>

    <Route path="/login" exact element={<Login/>}/>
    <Route path="/register" exact element={<Register/>}/>
        <Route path="/" exact element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="/appliedjobs" exact element={<ProtectedRoute><AppliedJobs/></ProtectedRoute>}/>
    <Route path="/profile" exact element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    <Route path="/postjobs" exact element={<ProtectedRoute><PostJobs/></ProtectedRoute>}/>
    <Route path="/jobs/:id" exact element={<ProtectedRoute><JobsInfo/></ProtectedRoute>}/>
    <Route path="/editjob/:id" exact element={<ProtectedRoute><EditJob/></ProtectedRoute>}/>
    <Route path="/users/:id" exact element={<ProtectedRoute><UserInfo/></ProtectedRoute>}/>

    
    <Route path="/posted" exact element={<ProtectedRoute><PostedJobs/></ProtectedRoute>}/>


    </Routes>
    </BrowserRouter> 
    </div>

}

export default App


export function ProtectedRoute({children}){
    if(localStorage.getItem('user')){
        return children
    }else{
        return <Navigate to='/login'/>
    }
}
