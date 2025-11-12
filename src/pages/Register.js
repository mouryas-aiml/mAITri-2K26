import React, { useState } from 'react';
import './Pages.css';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    usn: '',
    branch: '',
    year: '',
    password: '',
    confirmPassword: ''
  });

  const branchOptions = [
    'AI&ML, CSE, ISE, CS&BS, CS&DS',
    'ECE, EEE, EIE, ETE, ECE(VLSI)',
    'Aeronautical, Civil, Mechanical, IEM',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    
    // Validate password strength
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    try {
      // Create Firebase Authentication account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      const user = userCredential.user;
      console.log('User account created:', user.uid);
      
      // Store user data in Firestore with the user's UID as document ID
      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        usn: formData.usn,
        branch: formData.branch,
        year: formData.year,
        userType: 'student',
        timestamp: new Date(),
        status: 'pending'
      });
      
      // Also add to registrations collection for admin tracking
      await addDoc(collection(db, 'registrations'), {
        userId: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        usn: formData.usn,
        branch: formData.branch,
        year: formData.year,
        timestamp: new Date(),
        status: 'pending'
      });
      
      console.log('User data saved to Firestore');
      alert('Registration successful! You can now login with your email and password.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        usn: '',
        branch: '',
        year: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error during registration: ', error);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please use a different email or try logging in.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Register for mAITri 2K26</h1>
        <p className="page-subtitle">Join us for an unforgettable experience</p>

        <div className="registration-container">
          <div className="registration-form-container">
            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="usn">USN (University Seat Number) *</label>
                <input
                  type="text"
                  id="usn"
                  name="usn"
                  value={formData.usn}
                  onChange={handleChange}
                  required
                  placeholder="Enter your USN"
                />
              </div>

              <div className="form-group">
                <label htmlFor="branch">Branch *</label>
                <select
                  id="branch"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch</option>
                  {branchOptions.map((branch, index) => (
                    <option key={index} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="year">Year of Study *</label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  placeholder="Enter a secure password (min 6 characters)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                  placeholder="Re-enter your password"
                />
              </div>

              <button type="submit" className="submit-button">Complete Registration</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
