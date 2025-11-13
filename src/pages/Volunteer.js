import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Pages.css';

function Volunteer() {
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('emergency'); // 'emergency' or 'registrations'
  const [isVolunteer, setIsVolunteer] = useState(false);
  const navigate = useNavigate();

  // Fetch emergency alerts from Firestore
  const fetchEmergencyAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'emergencyAlerts'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // Sort by timestamp (newest first)
      data.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });
      setEmergencyAlerts(data);
      console.log(`Fetched ${data.length} emergency alerts`);
    } catch (err) {
      console.error('Error fetching emergency alerts:', err);
      setError('Failed to fetch emergency alerts. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch registrations from Firestore
  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'registrations'));
      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          ...docData
        });
      });
      setRegistrations(data);
      console.log(`Fetched ${data.length} registrations`);
      
      // Debug: Log the status values to see what's actually in the database
      const statusCounts = {};
      data.forEach(reg => {
        const status = reg.status || 'undefined';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      console.log('Status distribution:', statusCounts);
      
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('Failed to fetch registrations. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Mark emergency as resolved
  const markAsResolved = async (alertId) => {
    try {
      await updateDoc(doc(db, 'emergencyAlerts', alertId), {
        resolved: true,
        resolvedAt: new Date()
      });
      // Refresh the list
      fetchEmergencyAlerts();
      alert('Emergency marked as resolved!');
    } catch (error) {
      console.error('Error updating emergency:', error);
      alert('Failed to update emergency status.');
    }
  };

  // Toggle student entry/exit status
  const toggleStudentStatus = async (registrationId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'in' ? 'out' : 'in';
      await updateDoc(doc(db, 'registrations', registrationId), {
        entryStatus: newStatus,
        lastStatusUpdate: new Date()
      });
      // Refresh the registrations list
      fetchRegistrations();
      console.log(`Student status updated to: ${newStatus}`);
    } catch (error) {
      console.error('Error updating student status:', error);
      alert('Failed to update student status.');
    }
  };

  // Check volunteer authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if user is a volunteer
        try {
          const q = query(collection(db, 'volunteers'), where('uid', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            setIsVolunteer(true);
            setLoading(false);
          } else {
            // Not a volunteer
            setIsVolunteer(false);
            setLoading(false);
            alert('⚠️ Access Denied! You must be a registered volunteer to access this page.');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking volunteer status:', error);
          setLoading(false);
          navigate('/login');
        }
      } else {
        setLoading(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isVolunteer && activeTab === 'emergency') {
      fetchEmergencyAlerts();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchEmergencyAlerts, 30000);
      return () => clearInterval(interval);
    } else if (isVolunteer && activeTab === 'registrations') {
      fetchRegistrations();
      // Auto-refresh registrations every 30 seconds
      const interval = setInterval(fetchRegistrations, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab, isVolunteer]);

  const openGoogleMaps = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  // Helper function to determine if a registration is confirmed
  const isConfirmed = (registration) => {
    if (!registration.status) return false;
    const status = registration.status.toLowerCase();
    return status === 'confirmed' || 
           status === 'approved' || 
           status === 'accepted' ||
           status.includes('confirm') ||
           status.includes('approv');
  };

  // Helper function to get display status
  const getDisplayStatus = (registration) => {
    if (!registration.status) return 'pending';
    return registration.status.toLowerCase();
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="loading-container">
            <h2>Verifying volunteer access...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!isVolunteer) {
    return null; // Will redirect to login
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Volunteer Portal</h1>
        <p className="page-subtitle">Manage emergency alerts and registrations</p>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'emergency' ? 'active' : ''}`}
            onClick={() => setActiveTab('emergency')}
          >
            🚨 Emergency Alerts
          </button>
          <button
            className={`tab-button ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            📋 Registrations
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading data...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Emergency Alerts Tab */}
        {activeTab === 'emergency' && !loading && (
          <div className="admin-container">
            <div className="admin-stats">
              <div className="stat-card emergency-stat">
                <h3>Active Emergencies</h3>
                <p className="stat-number">{emergencyAlerts.filter(a => !a.resolved).length}</p>
              </div>
              <div className="stat-card">
                <h3>Total Alerts</h3>
                <p className="stat-number">{emergencyAlerts.length}</p>
              </div>
              <div className="stat-card">
                <h3>Resolved</h3>
                <p className="stat-number">{emergencyAlerts.filter(a => a.resolved).length}</p>
              </div>
            </div>

            {emergencyAlerts.length === 0 ? (
              <div className="no-data-message">
                <p>No emergency alerts found.</p>
              </div>
            ) : (
              <div className="emergency-alerts-grid">
                {emergencyAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`emergency-alert-card ${alert.resolved ? 'resolved' : 'active'}`}
                  >
                    <div className="alert-header">
                      <span className={`alert-status ${alert.resolved ? 'resolved' : 'active'}`}>
                        {alert.resolved ? '✓ Resolved' : '🚨 ACTIVE'}
                      </span>
                      <span className="alert-time">
                        {alert.timestamp
                          ? new Date(alert.timestamp.seconds * 1000).toLocaleString()
                          : 'N/A'}
                      </span>
                    </div>

                    <div className="alert-student-info">
                      <h3>{alert.studentName}</h3>
                      <div className="alert-details">
                        <p><strong>Email:</strong> {alert.email}</p>
                        <p><strong>Phone:</strong> {alert.phone}</p>
                        <p><strong>USN:</strong> {alert.usn}</p>
                      </div>
                    </div>

                    <div className="alert-location">
                      <h4>📍 Location</h4>
                      <p className="manual-location">{alert.manualLocation}</p>
                      {alert.gpsLocation && (
                        <div className="gps-location">
                          <p className="gps-coords">
                            GPS: {alert.gpsLocation.latitude.toFixed(6)}, {alert.gpsLocation.longitude.toFixed(6)}
                          </p>
                          <button
                            className="map-button"
                            onClick={() => openGoogleMaps(alert.gpsLocation.latitude, alert.gpsLocation.longitude)}
                          >
                            📍 Open in Google Maps
                          </button>
                        </div>
                      )}
                    </div>

                    {!alert.resolved && (
                      <button
                        className="resolve-button"
                        onClick={() => markAsResolved(alert.id)}
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && !loading && (
          <div className="admin-container">
            <div className="admin-stats">
              <div className="stat-card">
                <h3>Total Registrations</h3>
                <p className="stat-number">{registrations.length}</p>
              </div>
              <div className="stat-card">
                <h3>Confirmed</h3>
                <p className="stat-number">
                  {registrations.filter(isConfirmed).length}
                </p>
              </div>
              <div className="stat-card entry-stat">
                <h3>Students IN</h3>
                <p className="stat-number">
                  {registrations.filter((r) => r.entryStatus === 'in').length}
                </p>
              </div>
              <div className="stat-card exit-stat">
                <h3>Students OUT</h3>
                <p className="stat-number">
                  {registrations.filter((r) => r.entryStatus === 'out' || !r.entryStatus).length}
                </p>
              </div>
            </div>

            {registrations.length === 0 ? (
              <div className="no-data-message">
                <p>No registrations found.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>College</th>
                      <th>Year</th>
                      <th>Events</th>
                      <th>Status</th>
                      <th>Entry Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr key={reg.id}>
                        <td>{index + 1}</td>
                        <td>{reg.fullName}</td>
                        <td>{reg.email}</td>
                        <td>{reg.phone}</td>
                        <td>{reg.college}</td>
                        <td>{reg.year || 'N/A'}</td>
                        <td>
                          {Array.isArray(reg.events) ? reg.events.join(', ') : 'None'}
                        </td>
                        <td>
                          <span className={`status-badge status-${getDisplayStatus(reg)}`}>
                            {getDisplayStatus(reg)}
                          </span>
                        </td>
                        <td>
                          <button
                            className={`entry-status-toggle ${reg.entryStatus === 'in' ? 'status-in' : 'status-out'}`}
                            onClick={() => toggleStudentStatus(reg.id, reg.entryStatus || 'out')}
                            title={`Click to mark as ${reg.entryStatus === 'in' ? 'OUT' : 'IN'}`}
                          >
                            {reg.entryStatus === 'in' ? '🟢 IN' : '🔴 OUT'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Volunteer;
