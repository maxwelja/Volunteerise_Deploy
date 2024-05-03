// ProfilePicture.js

import React from 'react';
import Buttons from './Buttons'; // Import the Buttons component


const ProfilePicture = ({ imageUrl }) => {
  return (
    <div style={containerStyle}>
      <div style={circleStyle}>
        <img src={imageUrl} alt="Profile" style={imageStyle} />
      </div>
      <Buttons /> {/* Include the Buttons component below the profile picture */}
    </div>
  );
};

// Styles
const containerStyle = {
  // display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '20px', // Adjust margin as needed
  marginBottom: '20px',
  marginLeft: '20px',
  //textAlign: 'center', // Center align content

};

const circleStyle = {
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  overflow: 'hidden',
  margin: '0 auto', // Center align horizontally
  border: '5px solid #004AAD', // Border color
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export default ProfilePicture;
