import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ManageURLs from './components/ManageURLs/ManageURLs';
import WebsiteURLs from './components/WebsiteURLs/WebsiteURLs';
import Sidebar from './components/Sidebar/Sidebar';
import Configuration from './components/Configuration/Configuration';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage/LoginPage';
import CountryList from './components/CountryList/CountryList';
import "./App.css";
import AddUserForm from './components/AddUserForm/AddUserForm';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { isAdmin, setIsAdmin } = useAuth();

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
        <div className={isAuthenticated ? "content" : "auth_content"}>
          <Routes>
            {/* Redirect to login if not authenticated, otherwise show default route */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/manage-urls" /> : <Navigate to="/login" />
              }
            />
            {/* Protected routes */}
            {isAuthenticated ? (
              <>
                <Route path="/manage-urls" element={<ManageURLs />} />
                <Route path="/analytics" element={<WebsiteURLs />} />
                <Route path="/configuration" element={<Configuration />} />
                <Route path="/see_more" element={<CountryList />} />
                <Route path="/add" element={<AddUserForm />} />
              </>
            ) : (
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
            )}
          </Routes>
        </div>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
