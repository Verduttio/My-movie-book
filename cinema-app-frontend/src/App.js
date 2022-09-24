import AddMovie from "./components/movie/pages/add/AddMovie";
import EditMovie from "./components/movie/pages/edit/EditMovie";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MovieList from "./components/movie/pages/main/MovieList";
import NotFound from "./components/NotFound";
import ViewMovie from "./components/movie/pages/view/ViewMovie";
import Home from "./components/movie/pages/home/Home";
import Login from "./components/movie/pages/auth/Login";
import Register from "./components/movie/pages/auth/Register";
import Profile from "./components/movie/pages/auth/Profile";
import React from "react";

function App() {
  return (
      <BrowserRouter>
        <Home/>
        <div>
          <Routes>
              <Route path='/movies' element={<MovieList/>}/>
              <Route path='/movies/add' element={<AddMovie/>}/>
              <Route path='/movies/edit/:id' element={<EditMovie/>}/>
              <Route path='/movies/:id' element={<ViewMovie/>}/>
              <Route path='*' element={<NotFound/>}/>
              {/*<Route path="/" element={<Navigate replace to="/movies"/>}/>*/}
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
