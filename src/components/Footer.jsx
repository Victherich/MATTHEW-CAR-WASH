import React, { useState } from "react";
import styled from "styled-components";
import logo from "../Images3/logo.jpeg"; // Make sure the path to the logo is correct
import caccert from '../Images2/caccert.jpeg'
import CacCert from "./CacCert";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// Styled Components
const FooterContainer = styled.footer`
   background: #0CC1E0;
  color: white;
  padding: 40px 20px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

const FooterLogo = styled.img`
  width: 80px;
  border-radius:50%;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const FooterTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const FooterText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: white;
  // width:80%;
  text-align:center;

  strong{
  color:#FFDE59;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;

  & a {
    font-size: 24px;
    color: white;
    transition: color 0.3s;

    &:hover {
      color: #f9a825;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;

  font-weight:bold;

  & a {
    color: white;
    font-size: 16px;
    transition: color 0.3s;
    &:hover {
      color: #f9a825;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #e0e0e0;
  margin-top: 20px;
`;

// Footer Component
const Footer = () => {
  const [isVisible, setIsVisible]=useState(false);

  return (
    <FooterContainer>
     <CacCert
     isVisible={isVisible}
     setIsVisible={setIsVisible}
     />
      {/* Logo */}
      <FooterLogo src={logo} alt="MACO" /><br/>
      
      {/* <FooterLogo style={{width:"50px", cursor:"pointer"}} src={caccert} alt='caccert' onClick={()=>setIsVisible(true)}/>
      <p style={{fontSize:"0.7rem", fontStyle:"italic"}}>RN8343245</p> */}
      {/* Title */}
      <FooterTitle>MACO</FooterTitle>

      <FooterText>
        <strong>Address: </strong>Royal class office number 493, DIP 1 
      </FooterText>

         <FooterText>
        <strong>Email: </strong>matthewcarwashandcleaning20@gmail.com
      </FooterText>

         <FooterText>
        <strong>Phone: </strong>+971568307510
      </FooterText>

      {/* Description */}
     <FooterText>
  Our mission is to deliver reliable, affordable, and high-quality car wash, home cleaning, and maintenance services that make everyday life easier, cleaner, and more convenient for our clients.
</FooterText>


     <SocialLinks>
    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
      <FaFacebookF />
    </a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
      <FaTwitter />
    </a>
    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
      <FaInstagram />
    </a>
    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin />
    </a>
  </SocialLinks>

      {/* Footer Links */}
      <FooterLinks>
      <a href="/">Home</a>
        <a href="/aboutus">About Us</a>
        {/* <a href="/services">Services</a> */}
        <a href="/gallery">Gallery</a>
  
        <a href="/blogs">Blogs</a>
        <a href="/contactus">Contact Us</a>
        <a href='/privacypolicy'>Privacy Policy</a>
      </FooterLinks>

      {/* Copyright */}
      <Copyright>&copy; 2025 MACO. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
