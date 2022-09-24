import AddMovie from "./components/movie/pages/add/AddMovie";
import EditMovie from "./components/movie/pages/edit/EditMovie";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MovieList from "./components/movie/pages/main/MovieList";
import NotFound from "./components/NotFound";
import ViewMovie from "./components/movie/pages/view/ViewMovie";
import Main from "./components/movie/pages/auth/Main";

function App() {
  return (
      <Main/>
      // <BrowserRouter>
      //   <div>
      //     <Routes>
      //         <Route path='/movies' element={<MovieList/>}/>
      //         <Route path='/movies/add' element={<AddMovie/>}/>
      //         <Route path='/movies/edit/:id' element={<EditMovie/>}/>
      //         <Route path='/movies/:id' element={<ViewMovie/>}/>
      //         <Route path='*' element={<NotFound/>}/>
      //         <Route path="/" element={<Navigate replace to="/movies"/>}/>
      //     </Routes>
      //   </div>
      // </BrowserRouter>
  );
}

export default App;
