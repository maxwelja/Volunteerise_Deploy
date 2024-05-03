import React from 'react';

const OrgBio = ({ organization }) => {
  return (
    <div style={containerStyle}>
      <h2>Organization Name</h2>
      <p><strong>Organization Owner:</strong> {organization.name}</p>
      <p><strong>Location:</strong> {organization.location}</p>
      <p><strong>Email:</strong> {organization.email}</p>
      <p><strong>Phone Number:</strong> {organization.phone}</p>
      <p><strong>Website:</strong> {organization.website}</p>
      <p><strong>About:</strong> {organization.about}</p>
      {/* Add more organization information as needed */}
      <button style={buttonStyle}>Edit Bio</button> {/* Edit Bio button */}
    </div>
  );
};

// Styles
const containerStyle = {
  marginLeft: '40px', // Add margin for space between profile picture and organization info
  marginRight: '40px',
  marginTop: '10px',
  padding: '20px',
  border: '5px solid #AED6ED', // Border color
  borderRadius: '20px', //
  backgroundColor: '#AED6ED', // Blue color
};

const buttonStyle = {
  backgroundColor: '#6B7B8C', // Green color
  color: '#fff', // White text color
  padding: '10px 10px', // Padding
  margin: '10px 0', // Margin bottom
  border: '5px solid #6B7B8C', // Border color
  borderRadius: '5px', // Rounded corners
  cursor: 'pointer', // Cursor style
};

export default OrgBio;
