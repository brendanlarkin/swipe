import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/Landing';
import RestaurantSelectionPage from './Pages/ResterauntSelection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurant-selection" element={<RestaurantSelectionPage />} />
      </Routes>
    </Router>
  );
}
export default App;
