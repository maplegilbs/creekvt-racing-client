import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/navbar-section/NavigationBar';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" />
        <Route path="/flows" />
      </Routes>
    </Router>
  );
};
export default App;
