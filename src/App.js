import './App.css';
import Home from './home';
import Movies from './movies';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
