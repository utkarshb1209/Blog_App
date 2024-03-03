import React from 'react';
import './about.css'; 

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <div className="about-content">
        <p>Welcome to our website! We are dedicated to providing...</p>
        <p>Our mission is to...</p>
        <p>What sets us apart:</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
        <p>Contact us for more information!</p>
      </div>
    </div>
  );
}

export default About;
