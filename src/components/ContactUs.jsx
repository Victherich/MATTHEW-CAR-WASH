

import React, { useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import bg from "../Images3/p12.jpg";
import { Context } from "./Context";

// Styled Components
const PageWrapper = styled.div`

  background:rgba(0,0,255,0.1);
`;



const HeroSection = styled.div`
  position: relative;
  background: url(${bg}) center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 150px 20px;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-top: 200px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); /* semi-transparent black overlay */
    z-index: -1;
  }
`;


const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: bold;
  text-transform: uppercase;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  margin-top: 10px;
`;

// Contact Form Section
const FormSection = styled.div`
  // background: #fff;
  padding: 60px 20px;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  // background: #f4f4f4;
  padding: 30px;
  border-radius: 10px;
  // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #0CC1E0;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline:none;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 120px;
  outline:none;
`;

const SubmitButton = styled.button`
  background:#0CC1E0;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;

  &:hover {
    background:gray;
  }
`;

// Contact Page Component
const ContactUs = () => {
  const {say} = useContext(Context)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  Swal.fire({ text: "Please wait..." });
  Swal.showLoading();

  const payload = {
    ...formData,
    recipientEmail: "matthewcarwashandcleaning20@gmail.com",
    websiteName: "Matthew Car wash and Cleaning"
  };

  console.log(payload)

  try {
    // const response = await fetch("http://localhost:3000/api/contact", {
          const response = await fetch("https://backend-mailer-1.vercel.app/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({ text: "✅ Your message has been sent successfully and we shall get back to you soon!", icon:"success" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } else {
      Swal.fire({ text: `❌ Error: ${data.error}` });
    }
  } catch (error) {
    Swal.fire({ text: "❌ Network error, please try again." });
    console.error("Error submitting form:", error);
  }
};



  console.log(say)

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Contact Us</HeroTitle>
        <HeroSubtitle>We’d love to hear from you! Reach out anytime.</HeroSubtitle>
      </HeroSection>

      {/* Contact Form Section */}
      <FormSection>
        <FormContainer>
          <FormTitle>Send Us a Message</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormInput type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <FormInput type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <FormInput type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required />
            <FormTextArea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </form>
        </FormContainer>
      </FormSection>
    </PageWrapper>
  );
};

export default ContactUs;
