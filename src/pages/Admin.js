import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as XLSX from 'xlsx';
import './Pages.css';

function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' or 'volunteers'
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  
  // Admin credentials (in production, use environment variables or Firebase Auth)
  const ADMIN_USERNAME = 'Mr Mourya';
  const ADMIN_PASSWORD = 'Mourya@190405';

  // Helper function to determine if a registration is confirmed/approved
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchRegistrations();
      fetchVolunteers();
    } else {
      alert('Invalid credentials! Please try again.');
    }
  };

  // Fetch all volunteers from Firestore
  const fetchVolunteers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'volunteers'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setVolunteers(data);
      console.log(`Fetched ${data.length} volunteers`);
    } catch (err) {
      console.error('Error fetching volunteers:', err);
    }
  };

  // Create new volunteer
  const handleCreateVolunteer = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create Firebase Auth account for volunteer
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        volunteerForm.email,
        volunteerForm.password
      );
      
      // Save volunteer details to Firestore
      await addDoc(collection(db, 'volunteers'), {
        uid: userCredential.user.uid,
        name: volunteerForm.name,
        email: volunteerForm.email,
        phone: volunteerForm.phone,
        role: 'volunteer',
        createdAt: new Date(),
        createdBy: 'admin'
      });
      
      alert(`✅ Volunteer account created successfully!\n\nEmail: ${volunteerForm.email}\nPassword: ${volunteerForm.password}\n\nPlease share these credentials with the volunteer.`);
      
      // Reset form and refresh list
      setVolunteerForm({ name: '', email: '', password: '', phone: '' });
      setShowVolunteerForm(false);
      fetchVolunteers();
    } catch (error) {
      console.error('Error creating volunteer:', error);
      let errorMessage = 'Failed to create volunteer account.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete volunteer
  const handleDeleteVolunteer = async (volunteerId) => {
    if (!window.confirm('Are you sure you want to delete this volunteer?')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'volunteers', volunteerId));
      alert('✅ Volunteer deleted successfully!');
      fetchVolunteers();
    } catch (error) {
      console.error('Error deleting volunteer:', error);
      alert('❌ Failed to delete volunteer.');
    }
  };

  // Clear all emergency alerts
  const handleClearEmergencyAlerts = async () => {
    if (!window.confirm('⚠️ Are you sure you want to delete ALL emergency alerts? This cannot be undone!')) {
      return;
    }
    
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'emergencyAlerts'));
      const deletePromises = [];
      querySnapshot.forEach((document) => {
        deletePromises.push(deleteDoc(doc(db, 'emergencyAlerts', document.id)));
      });
      
      await Promise.all(deletePromises);
      alert(`✅ Successfully deleted ${deletePromises.length} emergency alerts!`);
    } catch (error) {
      console.error('Error clearing emergency alerts:', error);
      alert('❌ Failed to clear emergency alerts.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all registrations from Firestore
  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'registrations'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
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
      console.log('Admin - Status distribution:', statusCounts);
      
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('Failed to fetch registrations. Please check your permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Approve registration
  const handleApproveRegistration = async (registrationId, userId) => {
    try {
      // Update registration status
      await updateDoc(doc(db, 'registrations', registrationId), {
        status: 'approved',
        approvedAt: new Date(),
        approvedBy: 'admin'
      });
      
      // Update user status if userId exists
      if (userId) {
        await updateDoc(doc(db, 'users', userId), {
          status: 'approved',
          approvedAt: new Date()
        });
      }
      
      console.log('✅ Registration approved successfully!');
      fetchRegistrations(); // Refresh the list
    } catch (error) {
      console.error('Error approving registration:', error);
      alert('❌ Failed to approve registration.');
    }
  };

  // Reject registration
  const handleRejectRegistration = async (registrationId, userId) => {
    const reason = window.prompt('Please enter the reason for rejection (optional):');
    if (reason === null) return; // User cancelled
    
    try {
      // Update registration status
      await updateDoc(doc(db, 'registrations', registrationId), {
        status: 'rejected',
        rejectedAt: new Date(),
        rejectedBy: 'admin',
        rejectionReason: reason || 'No reason provided'
      });
      
      // Update user status if userId exists
      if (userId) {
        await updateDoc(doc(db, 'users', userId), {
          status: 'rejected',
          rejectedAt: new Date(),
          rejectionReason: reason || 'No reason provided'
        });
      }
      
      alert('✅ Registration rejected successfully!');
      fetchRegistrations(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting registration:', error);
      alert('❌ Failed to reject registration.');
    }
  };

  // Approve all pending registrations
  const handleApproveAll = async () => {
    const pendingRegistrations = registrations.filter(r => r.status === 'pending');
    
    if (pendingRegistrations.length === 0) {
      alert('No pending registrations to approve!');
      return;
    }

    if (!window.confirm(`Are you sure you want to approve all ${pendingRegistrations.length} pending registrations?`)) {
      return;
    }

    setLoading(true);
    try {
      const updatePromises = [];
      
      // Update all pending registrations
      pendingRegistrations.forEach(reg => {
        updatePromises.push(
          updateDoc(doc(db, 'registrations', reg.id), {
            status: 'approved',
            approvedAt: new Date(),
            approvedBy: 'admin'
          })
        );
        
        // Update user status if userId exists
        if (reg.userId) {
          updatePromises.push(
            updateDoc(doc(db, 'users', reg.userId), {
              status: 'approved',
              approvedAt: new Date()
            })
          );
        }
      });
      
      await Promise.all(updatePromises);
      alert(`✅ Successfully approved ${pendingRegistrations.length} registrations!`);
      fetchRegistrations(); // Refresh the list
    } catch (error) {
      console.error('Error approving all registrations:', error);
      alert('❌ Failed to approve all registrations. Some may have been processed.');
    } finally {
      setLoading(false);
    }
  };

  // Export registrations to Excel
  const exportToExcel = () => {
    if (registrations.length === 0) {
      alert('No registrations to export!');
      return;
    }

    // Prepare data for Excel
    const excelData = registrations.map((reg, index) => ({
      'S.No': index + 1,
      'Full Name': reg.fullName || '',
      'Email': reg.email || '',
      'Phone': reg.phone || '',
      'USN': reg.usn || '',
      'Branch': reg.branch || '',
      'Year of Study': reg.year || '',
      'Events Interested': Array.isArray(reg.events) ? reg.events.join(', ') : 'None',
      'Status': reg.status || 'pending',
      'Registration Date': reg.timestamp ? new Date(reg.timestamp.seconds * 1000).toLocaleString() : '',
      'Approval Date': reg.approvedAt ? new Date(reg.approvedAt.seconds * 1000).toLocaleString() : '',
      'Rejection Date': reg.rejectedAt ? new Date(reg.rejectedAt.seconds * 1000).toLocaleString() : '',
      'Rejection Reason': reg.rejectionReason || '',
      'User ID': reg.userId || reg.uid || reg.id
    }));

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Auto-size columns
    const maxWidth = 50;
    const columnWidths = Object.keys(excelData[0] || {}).map(key => ({
      wch: Math.min(
        Math.max(
          key.length,
          ...excelData.map(row => String(row[key] || '').length)
        ),
        maxWidth
      )
    }));
    worksheet['!cols'] = columnWidths;

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `mAITri_2K26_Registrations_${date}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
    console.log(`Exported ${registrations.length} registrations to ${filename}`);
  };

  useEffect(() => {
    // Don't auto-fetch on mount, require login first
  }, []);

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="page-content">
          <h1 className="page-title">Admin Login</h1>
          <p className="page-subtitle">Enter admin credentials to access dashboard</p>
          
          <div className="admin-login-container">
            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  required
                  placeholder="Enter admin username"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  required
                  placeholder="Enter admin password"
                />
              </div>
              
              <button type="submit" className="submit-button">
                🔐 Login as Admin
              </button>
              
              <div className="admin-note">
                <p>Contact admin for credentials</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage registrations and volunteers</p>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            📋 Registrations
          </button>
          <button 
            className={`tab-button ${activeTab === 'volunteers' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteers')}
          >
            🤝 Volunteers
          </button>
        </div>

        <div className="admin-container">
          {activeTab === 'registrations' && (
            <>
              <div className="admin-stats">
                <div className="stat-card">
                  <h3>Total Registrations</h3>
                  <p className="stat-number">{registrations.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Pending</h3>
                  <p className="stat-number">
                    {registrations.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="stat-card">
              <h3>Confirmed</h3>
              <p className="stat-number">
                {registrations.filter(isConfirmed).length}
              </p>
            </div>
          </div>

          <div className="admin-actions">
            <button 
              onClick={handleApproveAll} 
              className="action-button approve-all-button"
              disabled={loading || registrations.filter(r => r.status === 'pending').length === 0}
            >
              ✅ Approve All ({registrations.filter(r => r.status === 'pending').length})
            </button>
            <button 
              onClick={fetchRegistrations} 
              className="action-button refresh-button"
              disabled={loading}
            >
              {loading ? '🔄 Loading...' : '🔄 Refresh Data'}
            </button>
            <button 
              onClick={exportToExcel} 
              className="action-button export-button"
              disabled={loading || registrations.length === 0}
            >
              📊 Export to Excel
            </button>
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="registrations-table-container">
            <h2>Registrations List</h2>
            {loading ? (
              <p>Loading registrations...</p>
            ) : registrations.length === 0 ? (
              <p>No registrations found.</p>
            ) : (
              <div className="table-responsive">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Branch</th>
                      <th>Year</th>
                      <th>Events</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr key={reg.id}>
                        <td>{index + 1}</td>
                        <td>{reg.fullName}</td>
                        <td>{reg.email}</td>
                        <td>{reg.phone}</td>
                        <td>{reg.branch || 'N/A'}</td>
                        <td>{reg.year || 'N/A'}</td>
                        <td>
                          {Array.isArray(reg.events) && reg.events.length > 0
                            ? reg.events.join(', ')
                            : 'None'}
                        </td>
                        <td>
                          {reg.status === 'pending' ? (
                            <div className="status-actions">
                              <button 
                                className="approve-btn"
                                onClick={() => handleApproveRegistration(reg.id, reg.userId)}
                              >
                                Approve
                              </button>
                              <button 
                                className="reject-btn"
                                onClick={() => handleRejectRegistration(reg.id, reg.userId)}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className={`status-badge status-${getDisplayStatus(reg)}`}>
                              {getDisplayStatus(reg)}
                            </span>
                          )}
                        </td>
                        <td>
                          {reg.timestamp
                            ? new Date(reg.timestamp.seconds * 1000).toLocaleDateString()
                            : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Volunteers Tab */}
      {activeTab === 'volunteers' && (
        <>
          <div className="admin-stats">
            <div className="stat-card">
              <h3>Total Volunteers</h3>
              <p className="stat-number">{volunteers.length}</p>
            </div>
            <div className="stat-card">
              <h3>Active</h3>
              <p className="stat-number">{volunteers.length}</p>
            </div>
          </div>

          <div className="admin-actions">
            <button 
              onClick={() => setShowVolunteerForm(!showVolunteerForm)} 
              className="action-button export-button"
            >
              {showVolunteerForm ? '❌ Cancel' : '➕ Create Volunteer'}
            </button>
            <button 
              onClick={fetchVolunteers} 
              className="action-button refresh-button"
            >
              🔄 Refresh
            </button>
            <button 
              onClick={handleClearEmergencyAlerts} 
              className="action-button delete-button"
              disabled={loading}
            >
              🗑️ Clear All Emergency Alerts
            </button>
          </div>

          {/* Volunteer Creation Form */}
          {showVolunteerForm && (
            <div className="volunteer-form-container">
              <h3>Create New Volunteer Account</h3>
              <form onSubmit={handleCreateVolunteer} className="volunteer-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                      required
                      placeholder="Enter volunteer name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                      required
                      placeholder="volunteer@example.com"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Password *</label>
                    <input
                      type="text"
                      value={volunteerForm.password}
                      onChange={(e) => setVolunteerForm({...volunteerForm, password: e.target.value})}
                      required
                      placeholder="Min 6 characters"
                      minLength="6"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                      placeholder="Contact number"
                    />
                  </div>
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Creating...' : '✅ Create Volunteer Account'}
                </button>
              </form>
            </div>
          )}

          {/* Volunteers List */}
          <div className="volunteers-table-container">
            <h2>Volunteers List</h2>
            {volunteers.length === 0 ? (
              <p>No volunteers found. Create one to get started.</p>
            ) : (
              <div className="table-responsive">
                <table className="registrations-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((vol, index) => (
                      <tr key={vol.id}>
                        <td>{index + 1}</td>
                        <td>{vol.name}</td>
                        <td>{vol.email}</td>
                        <td>{vol.phone || 'N/A'}</td>
                        <td>
                          {vol.createdAt
                            ? new Date(vol.createdAt.seconds * 1000).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td>
                          <button 
                            onClick={() => handleDeleteVolunteer(vol.id)}
                            className="delete-button"
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
