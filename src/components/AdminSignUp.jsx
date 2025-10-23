

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Adjust the path as needed

// --- Light Theme Colors for Signup ---
const lightSignupColors = {
  mainBackground: '#F0F2F5',      // Very light gray for the overall page background
  formBackground: '#FFFFFF',      // Pure white for the form wrapper
  formBorder: '#E0E6ED',          // Soft light gray for form border
  titleColor: '#0CC1E0',          // A pleasant blue for the title (matches accent from dashboard)
  labelColor: '#5C6F8D',          // Muted blue-gray for labels
  inputBackground: '#F8FAFC',     // Off-white for input fields
  inputBorder: '#CBD5E1',         // Light gray for input borders
  inputText: '#333333',           // Dark gray for input text
  inputFocusBorder: '#4A90E2',    // Accent blue for input focus border
  inputPlaceholder: '#9DA6B2',    // Soft gray for placeholder text
  buttonBackground: '#0CC1E0',    // Accent blue for buttons
  buttonText: '#FFFFFF',          // White text on button
  buttonHover: '#3A7DCF',         // Darker blue for button hover
  linkText: '#5C6F8D',            // Muted blue-gray for link text
  linkHover: '#0CC1E0',           // Accent blue for link text hover
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${lightSignupColors.mainBackground}; /* Light background */
  color: ${lightSignupColors.mainText}; /* Main text color */
  width:100%;

  @media(max-width:428px){
      padding:1rem; /* Adjusted for consistency, previously 5px */
  }
`;

const FormWrapper = styled.div`
  // background: ${lightSignupColors.formBackground}; /* White form background */
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  // box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08); /* Lighter shadow for light mode */
  // border: 1px solid ${lightSignupColors.formBorder}; /* Soft border */

  @media(max-width:428px){
      padding:1.5rem 1rem; /* Adjusted for better mobile padding, previously 50px 10px */
  }
`;

const Title = styled.h2`
  color: ${lightSignupColors.titleColor}; /* Accent blue for title */
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem; /* Consistent font size */
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${lightSignupColors.labelColor}; /* Muted label color */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: ${lightSignupColors.inputBackground}; /* Off-white input background */
  color: ${lightSignupColors.inputText}; /* Dark text color for input */
  border: 1px solid ${lightSignupColors.inputBorder}; /* Light border for input */
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: ${lightSignupColors.inputFocusBorder}; /* Accent blue on focus */
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2); /* Subtle focus ring */
  }

  &::placeholder {
    color: ${lightSignupColors.inputPlaceholder}; /* Soft gray for placeholder */
  }
`;

const Button = styled.button`
  width: 100%;
  background: ${lightSignupColors.buttonBackground}; /* Accent blue button */
  color: ${lightSignupColors.buttonText}; /* White text on button */
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease; /* Ensure transition is smooth */

  &:hover {
    background: ${lightSignupColors.buttonHover}; /* Darker blue on hover */
  }
`;

const LinkText = styled.p`
  margin-top: 15px; /* Increased margin for separation */
  cursor: pointer;
  color: ${lightSignupColors.linkText}; /* Muted link text color */
  text-align: center;
  font-size: 0.95rem; /* Slightly smaller for subtlety */

  &:hover {
    text-decoration: underline;
    color: ${lightSignupColors.linkHover}; /* Accent blue on hover */
  }
`;

const AdminSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email !== form.confirmEmail) {
      return Swal.fire("Error", "Emails do not match", "error");
    }

    if (form.password !== form.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match", "error");
    }

    Swal.fire({
      title: "Please wait...",
      text: "Creating account...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const { name, email, phone, password } = form;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "admins", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        createdAt: new Date(),
      });

      Swal.fire("Success 🎉", "Account created successfully", "success");
      navigate("/adminlogin");

      setForm({ // Clear form fields on successful registration
        name: "",
        email: "",
        confirmEmail: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      Swal.fire("Error ❌", err.message, "error");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register Admin</Title>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            name="name" 
            type="text" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Enter full name" 
            required 
          />

          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />

          <Label htmlFor="confirmEmail">Confirm Email</Label>
          <Input
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            value={form.confirmEmail}
            onChange={handleChange}
            placeholder="Confirm email address"
            required
          />

          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" // Use type="tel" for phone numbers
            value={form.phone} 
            onChange={handleChange} 
            placeholder="Enter phone number" 
            required 
          />

          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />

          <Button type="submit">Create Account</Button>
          <LinkText onClick={() => navigate("/adminlogin")}>
            Already have an account? Login
          </LinkText>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default AdminSignup;
