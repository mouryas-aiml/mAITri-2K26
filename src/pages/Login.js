import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './Pages.css';

function Login() {
  const [loginType, setLoginType] = useState('student'); // 'student', 'volunteer', or 'admin'
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const user = userCredential.user;
      console.log('User logged in:', user.uid);

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        
        // Store user data in localStorage for easy access
        localStorage.setItem('userData', JSON.stringify({
          uid: user.uid,
          ...userData
        }));
        
        alert(`Welcome back, ${userData.fullName}! Logging in as ${loginType}...`);
        
        // Redirect based on login type or user type
        if (loginType === 'admin' || userData.userType === 'admin') {
          navigate('/admin');
        } else if (loginType === 'volunteer' || userData.userType === 'volunteer') {
          navigate('/volunteer');
        } else {
          navigate('/student');
        }
      } else {
        console.log('No user data found in Firestore');
        alert(`Welcome back! Logging in as ${loginType}...`);
        
        // Redirect based on login type
        if (loginType === 'admin') {
          navigate('/admin');
        } else if (loginType === 'volunteer') {
          navigate('/volunteer');
        } else {
          navigate('/student');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content login-page">
        <h1 className="page-title">Login</h1>
        <p className="page-subtitle">Access your mAITri account</p>

        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            {/* Login Type Selection */}
            <div className="login-type-selector">
              <button
                type="button"
                className={`type-button ${loginType === 'student' ? 'active' : ''}`}
                onClick={() => setLoginType('student')}
              >
                <span className="type-icon">🎓</span>
                <span>Student</span>
              </button>
              <button
                type="button"
                className={`type-button ${loginType === 'volunteer' ? 'active' : ''}`}
                onClick={() => setLoginType('volunteer')}
              >
                <span className="type-icon">🤝</span>
                <span>Volunteer</span>
              </button>
              <button
                type="button"
                className={`type-button ${loginType === 'admin' ? 'active' : ''}`}
                onClick={() => setLoginType('admin')}
              >
                <span className="type-icon">👨‍💼</span>
                <span>Admin</span>
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Logging in...' : `Login as ${loginType.charAt(0).toUpperCase() + loginType.slice(1)}`}
            </button>

            <div className="login-divider">
              <span>or</span>
            </div>

            <div className="signup-prompt">
              <p>Don't have an account? <Link to="/register">Register Now</Link></p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
