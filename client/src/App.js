import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SmoothScroll from './components/layout/SmoothScroll';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import TrustLogos from './pages/TrustLogos';
import WhyTravel from './pages/WhyTravel';
import PremiumServiceDetail from './pages/PremiumServiceDetail';
import CategoryTours from './pages/CategoryTours';
import ResourceManagers from './admin/pages/ResourceManagers';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SmoothScroll>
          <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
            {/* Drifting Golden Mesh Spheres Background */}
            <div className="ambient-mesh-bg">
              <div className="ambient-sphere sphere-1"></div>
              <div className="ambient-sphere sphere-2"></div>
              <div className="ambient-sphere sphere-3"></div>
            </div>
            
            <Navbar />
            
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/tours" element={<Tours />} />
                <Route path="/tours/category/:categoryName" element={<CategoryTours />} />
                <Route path="/tours/:id" element={<TourDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/services/:id" element={<PremiumServiceDetail />} />
                <Route path="/trust-logos" element={<TrustLogos />} />
                <Route path="/why-travel" element={<WhyTravel />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/resource-managers" element={<ResourceManagers />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </SmoothScroll>
      </AuthProvider>
    </Router>
  );
}

export default App;
