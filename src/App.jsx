import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigationbar from './components/NavigationBar';
import Home from './pages/Home';
import Makanan from './pages/Makanan.jsx';
import Minuman from './pages/Minuman.jsx';
import Appetizer from './pages/Appetizer.Jsx';

function App() {
  return (
    <Router>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appetizer" element={<Appetizer />} />
        <Route path="/makanan" element={<Makanan />} />
        <Route path="/minuman" element={<Minuman />} />
      </Routes>
    </Router>
  );
}

export default App;
