import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SignIn from './SignIn';
import SignUp from './signUp';
import NoteList from './NoteList';
import ProtectedRoute from './ProtectedRoute';
import NavBar from './NavBar';
import Profile from './Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const hideNavRoutes = ['/signin', '/signup']; // Routes where NavBar should be hidden

  return (
    <div className="App">
      {!hideNavRoutes.includes(window.location.pathname) && <NavBar user={user} />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
        <Route
          path="/"
          element={
            user ? <NoteList /> : <Navigate to="/signin" />
          }
        />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
