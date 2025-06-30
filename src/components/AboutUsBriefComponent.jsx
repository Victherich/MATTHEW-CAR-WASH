import React, { useEffect, useRef } from 'react';
import '../CSS/AboutUsBriefComponent.css';
import { useNavigate } from 'react-router-dom';
import { FaRecycle, FaLeaf, FaFlask } from 'react-icons/fa';
import briefImage from '../Images2/dp1.jpeg'; // replace with actual image path
import 'animate.css'; // Import animate.css for animations
import Swal from 'sweetalert2';

const AboutUsBrief = () => {
  const navigate = useNavigate();
  const observer = useRef(null);

  const handleMoreClick = () => {
    navigate('/aboutus'); // Now properly navigates to About Us page
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          if (element.tagName === 'H2') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slower');
          } else if (element.tagName === 'P') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
          } else if (element.tagName === 'BUTTON') {
            element.classList.add('animate__animated', 'animate__slideInRight', 'animate__slow');
          }
          observer.current.unobserve(element);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    const heading = document.querySelector('.about-us-brief-text h2');
    const paragraphs = document.querySelectorAll('.about-us-brief-text p');
    const button = document.querySelector('.more-about-btn');

    if (heading) observer.current.observe(heading);
    paragraphs.forEach(paragraph => {
      if (paragraph) observer.current.observe(paragraph);
    });
    if (button) observer.current.observe(button);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-us-brief-section">
      <div className="about-us-brief-content">
        <div className="about-us-brief-text">
          <h2>🚀 ABOUT MCC</h2>
          <p><strong style={{color:"#119458"}}>Our Vision:</strong>"To create cleaner, safer, and more dignified environments for communities — where families, women, and children can thrive in cleanliness, comfort, and care."</p>
          <p><strong style={{color:"#119458"}}>Our Mission:</strong> "Our mission is to go beyond cleaning — to restore dignity and peace of mind by delivering exceptional car wash and cleaning services, supporting the well-being of women, young ladies, and children, and empowering lives through safety, hygiene, and hope."</p>
     
          <button className="more-about-btn" onClick={handleMoreClick}>
            Learn More
          </button>
        </div>

        <div className="about-us-brief-image">
          {/* Uncomment and use an image if needed */}
          {/* <img src={briefImage} alt="About Us" /> */}
         {/* <div className='name'>
         <p>Glory Robinson</p>
         <p>CEO - The Glory and Children Foundation</p>
         </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUsBrief;
