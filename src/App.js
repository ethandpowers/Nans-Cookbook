import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home';
import NotFound from './pages/NotFound'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>

        <Route path="/signup" element={<Signup />}>
        </Route>

        <Route path="/home" element={<Home />}>
        </Route>

        <Route path="/" element={<Signup />}>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
