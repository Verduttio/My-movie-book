import AddMovie from "./components/AddMovie";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import NotFound from "./components/NotFound";
import ViewMovie from "./components/ViewMovie";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
              <Route path='/movies' element={<MovieList/>}/>
              <Route path='/movies/add' element={<AddMovie/>}/>
              <Route path='/movies/edit/:id' element={<AddMovie/>}/>
              <Route path='/movies/:id' element={<ViewMovie/>}/>
              <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
