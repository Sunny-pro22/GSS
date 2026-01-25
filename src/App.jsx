
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SinglePageWebsite from './pages/SinglePageWebsite';
import BlogPage from './pages/BlogPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Term';
import ServiceDetailPage from './pages/ServiceDetailPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<SinglePageWebsite />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Add Service Detail Page Route */}
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;