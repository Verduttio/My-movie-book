import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddMovie from "./components/movie/pages/add/AddMovie";
import EditMovie from "./components/movie/pages/edit/EditMovie";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MovieList from "./components/movie/pages/main/MovieList";
import NotFound from "./components/NotFound";
import ViewMovie from "./components/movie/pages/view/ViewMovie";
import Navbar from "./components/movie/pages/home/Navbar";
import Login from "./components/movie/pages/auth/Login";
import Register from "./components/movie/pages/auth/Register";
import Profile from "./components/movie/pages/auth/Profile";
import AdminBoard from "./components/movie/pages/admin/AdminBoard";
import React from "react";
import authService from "./services/authService";

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <div>
          <Routes>
              <Route path='/movies' element={<MovieList/>}/>
              <Route path='/movies/add' element={<AddMovie/>}/>
              <Route path='/movies/edit/:id' element={<EditMovie/>}/>
              <Route path='/movies/:id' element={<ViewMovie/>}/>
              <Route path='*' element={<NotFound/>}/>
              {authService.getCurrentUser() ? (
                  <Route path="/" element={<Navigate replace to="/movies"/>}/>
              ) : (
                  <Route path="/" element={<Navigate replace to="/login"/>}/>
              )}
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/adminBoard" element={<AdminBoard/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
