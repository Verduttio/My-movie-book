import AddMovie from "./components/AddMovie";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import NotFound from "./components/NotFound";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
              <Route path='/' element={<MovieList/>}/>
              <Route path='/add' element={<AddMovie/>}/>
              <Route path='/edit/:id' element={<AddMovie/>}/>
              <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
