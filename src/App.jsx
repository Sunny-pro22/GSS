import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Services from './Pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Term';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
          
          {!isLoading && (
            <>
              <CustomCursor />
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
