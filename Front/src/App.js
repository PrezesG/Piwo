import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {checkAdminStatus} from "./Components/api";
import React, {useEffect, useState} from "react";
import {Footer} from "./Components/Footer";
import {Sidebar} from "./Components/SideBar";
import {Header} from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import AdminCreate from "./Components/AdminCreate";
import Home from "./Components/HomePage";
import AccountDetails from "./Components/AccountDetail";
import AdminDelete from './Components/AdminDelete';
import AdminUsers from "./Components/AdminUsers";
import BeerComments from "./Components/BeerComments";
import UserFavorites from "./Components/UserFavorites";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAdminStatus()
          .then(isAdmin => setIsAdmin(isAdmin))
    }
  }, []);
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header/>
          <Sidebar/>
          <main className="flex-grow overflow-y-auto max-h-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/my-account" element={<AccountDetails />} />
              <Route path="/favorite" element={<UserFavorites />} />
              <Route path="/comments/:beerId" element={<BeerComments/>} />
              {isAdmin ? <Route path="/admin" element={<Admin/>}/> : <Route path="/" element={<Home/>}/>}
              {isAdmin ? <Route path="/admin/create" element={<AdminCreate/>}/> : <Route path="/" element={<Home/>}/>}
              {isAdmin ? <Route path="/admin/delete" element={<AdminDelete/>}/> : <Route path="/" element={<Home/>}/>}
              {isAdmin ? <Route path="/admin/users" element={<AdminUsers/>}/> : <Route path="/" element={<Home/>}/>}


            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
  );
}

export default App;
