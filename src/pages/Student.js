import React, { useState, useEffect } from 'react';
import './Pages.css';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Pages.css';

function Student() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [user, setUser] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationData, setLocationData] = useState({
    manualLocation: '',
    gpsLocation: null,
    gpsError: null
  });

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchStudentData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchStudentData = async (uid) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = { id: docSnap.id, ...docSnap.data() };
        setStudentData(userData);
        
        // Check if status changed to approved and show popup
        const lastStatus = localStorage.getItem(`lastStatus_${uid}`);
        if (lastStatus === 'pending' && userData.status === 'approved') {
          alert('🎉 Congratulations! Your registration has been approved by the admin. Welcome to mAITri 2K26!');
        }
        
        // Store current status for next check
        localStorage.setItem(`lastStatus_${uid}`, userData.status);
      } else {
        console.log('No user data found for this user');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyClick = () => {
    // Request GPS permission FIRST before showing modal
    if (navigator.geolocation) {
      // Request GPS location with high accuracy
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // GPS success - set location and show modal
          setLocationData(prev => ({
            ...prev,
            gpsLocation: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            },
            gpsError: null
          }));
          setShowLocationModal(true);
        },
        (error) => {
          console.error('GPS Error:', error);
          // GPS failed - show error and still open modal for manual entry
          setLocationData(prev => ({
            ...prev,
            gpsError: 'Unable to get GPS location. Please enter your location manually.'
          }));
          setShowLocationModal(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      // GPS not supported
      setLocationData(prev => ({
        ...prev,
        gpsError: 'GPS not supported on this device. Please enter your location manually.'
      }));
      setShowLocationModal(true);
    }
  };

  const handleEmergencySubmit = async () => {
    // Validate that manual location is entered
    if (!locationData.manualLocation || locationData.manualLocation.trim() === '') {
      alert('⚠️ Please enter your current location before sending emergency alert!');
      return;
    }

    // Validate that GPS location was captured
    if (!locationData.gpsLocation) {
      alert('⚠️ GPS location is required. Please allow location access and try again.');
      return;
    }

    setEmergencyActive(true);
    setShowLocationModal(false);
    
    try {
      // Save emergency alert to Firebase with complete student details
      await addDoc(collection(db, 'emergencyAlerts'), {
        studentId: user.uid,
        studentName: studentData?.fullName || 'Unknown',
        email: user.email,
        phone: studentData?.phone || 'N/A',
        usn: studentData?.usn || 'N/A',
        manualLocation: locationData.manualLocation.trim(),
        gpsLocation: locationData.gpsLocation,
        timestamp: new Date(),
        status: 'active',
        resolved: false
      });
      
      console.log('Emergency alert saved to Firebase with student details:', {
        name: studentData?.fullName,
        phone: studentData?.phone,
        usn: studentData?.usn,
        location: locationData.manualLocation
      });
      
      alert('🚨 EMERGENCY ALERT SENT!\n\nHelp is on the way. Stay calm.\n\nVolunteers have been notified.\n\nEmergency Helpline: +91 7795009361');
    } catch (error) {
      console.error('Error saving emergency alert:', error);
      alert('Failed to send emergency alert. Please try again or call: +91 7795009361');
    }
    
    // Reset after 5 seconds
    setTimeout(() => {
      setEmergencyActive(false);
      setLocationData({
        manualLocation: '',
        gpsLocation: null,
        gpsError: null
      });
    }, 5000);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Student Dashboard</h1>
          <div className="auth-required">
            <p>⚠️ Please log in to access your student dashboard.</p>
            <a href="/login" className="cta-button">Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-subtitle">Welcome back, {studentData?.fullName || user.email}!</p>

        {/* Registration Status */}
        <div className="registration-status-card">
          <h2>📋 Registration Status</h2>
          <div className="status-info">
            <div className="status-row">
              <span className="status-label">Status:</span>
              <span className={`status-badge status-${studentData?.status || 'pending'}`}>
                {studentData?.status === 'pending' && '⏳ Pending Approval'}
                {studentData?.status === 'approved' && '✅ Approved'}
                {studentData?.status === 'rejected' && '❌ Rejected'}
              </span>
            </div>
            {studentData?.status === 'pending' && (
              <p className="status-message">
                Your registration is under review. You will be notified once it's approved by the admin.
              </p>
            )}
            {studentData?.status === 'approved' && (
              <p className="status-message">
                🎉 Congratulations! Your registration has been approved. You can now participate in all events.
              </p>
            )}
            {studentData?.status === 'rejected' && (
              <div className="status-message">
                <p>Your registration was not approved.</p>
                {studentData?.rejectionReason && (
                  <p><strong>Reason:</strong> {studentData.rejectionReason}</p>
                )}
                <p>Please contact support for more information.</p>
              </div>
            )}
            <div className="student-details">
              <p><strong>Name:</strong> {studentData?.fullName}</p>
              <p><strong>Email:</strong> {studentData?.email}</p>
              <p><strong>Branch:</strong> {studentData?.branch}</p>
              <p><strong>Year:</strong> {studentData?.year}</p>
              <p><strong>USN:</strong> {studentData?.usn}</p>
            </div>
          </div>
        </div>

        {/* Emergency SOS Button */}
        <div className="emergency-section">
          <button 
            className={`emergency-button ${emergencyActive ? 'active' : ''}`}
            onClick={handleEmergencyClick}
            disabled={emergencyActive}
          >
            {emergencyActive ? (
              <>
                <span className="emergency-icon pulse">🚨</span>
                <span>ALERT SENT!</span>
              </>
            ) : (
              <>
                <span>EMERGENCY SOS</span>
              </>
            )}
          </button>
          <p className="emergency-note">
            Press this button in case of emergency. Help will be dispatched immediately.
          </p>
        </div>

        {/* Location Modal */}
        {showLocationModal && (
          <div className="modal-overlay" onClick={() => setShowLocationModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Emergency Location</h2>
              <p className="modal-description">Please provide your current location for emergency response</p>
              
              {locationData.gpsLocation && (
                <div className="gps-info">
                  <p className="gps-success">✓ GPS Location Captured</p>
                  <p className="gps-coords">
                    Lat: {locationData.gpsLocation.latitude.toFixed(6)}, 
                    Long: {locationData.gpsLocation.longitude.toFixed(6)}
                  </p>
                </div>
              )}
              
              {locationData.gpsError && (
                <p className="gps-error">{locationData.gpsError}</p>
              )}
              
              <div className="form-group">
                <label htmlFor="manualLocation">Enter Your Location *</label>
                <input
                  type="text"
                  id="manualLocation"
                  placeholder="e.g., Main Auditorium, Building A, Room 101"
                  value={locationData.manualLocation}
                  onChange={(e) => setLocationData(prev => ({ ...prev, manualLocation: e.target.value }))}
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="modal-button cancel-button" 
                  onClick={() => setShowLocationModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="modal-button submit-button" 
                  onClick={handleEmergencySubmit}
                >
                  Send Emergency Alert
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="student-container">

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <h2>⚡ Quick Actions</h2>
            <div className="action-buttons">
              <a href="/events" className="action-card">
                <span className="action-icon">📅</span>
                <span className="action-title">View Events</span>
              </a>
              <a href="/contact" className="action-card">
                <span className="action-icon">📞</span>
                <span className="action-title">Contact Support</span>
              </a>
              <button 
                onClick={() => auth.signOut()} 
                className="action-card logout-card"
              >
                <span className="action-icon">🚪</span>
                <span className="action-title">Logout</span>
              </button>
            </div>
          </div>

          {/* Important Information */}
          <div className="info-banner">
            <h3>📢 Important Information</h3>
            <ul>
              <li>🎫 Please carry your registration confirmation</li>
              <li>🆔 College ID is mandatory</li>
              <li>⏰ Arrive 30 minutes before event Starts</li>
              <li>📱 Keep your phone charged for emergency contacts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
