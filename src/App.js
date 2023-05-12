import React, { Component } from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import Home from './views/Layout/Home'
import Login from './views/Login/Login'
import { authLogin } from './utils/auth'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div>
         <Router>
             <Switch>
                 <Route path='/' exact render={(props)=>{
                     return <Redirect to='/home/main' exact></Redirect>
                 }}></Route>
                 <Route path='/home'  render={(props)=>{
                     if(!authLogin()){
                        return <Redirect to='/login'></Redirect>
                     }
                     return <Home {...props}></Home>
                 }}></Route>
                 <Route path='/login' render={(props)=>{
                     if(authLogin()){
                        return <Redirect to='/home/main'></Redirect>
                     }
                     return <Login {...props}></Login>
                 }}></Route>
             </Switch>
         </Router>
      </div>
    )
  }
}

