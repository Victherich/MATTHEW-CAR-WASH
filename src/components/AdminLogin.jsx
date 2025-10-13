


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import { onAuthStateChanged } from 'firebase/auth';


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   padding: 2rem;
//   background-color: #111827;
// `;

// const FormWrapper = styled.div`
//   background: linear-gradient(to bottom right, #1f2937, #374151);
//   border: 1px solid #4b5563;
//   border-radius: 16px;
//   padding: 2rem;
//   width: 100%;
//   max-width: 500px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
// `;

// const Title = styled.h2`
//   color: #facc15;
//   text-align: center;
//   margin-bottom: 1.5rem;
//   font-size: 2rem;
// `;

// const Label = styled.label`
//   display: block;
//   font-weight: 600;
//   margin-bottom: 0.5rem;
//   color: #d1d5db;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   background-color: #111827;
//   color: white;
//   border: 2px solid #4b5563;
//   border-radius: 8px;
//   margin-bottom: 1rem;
//   font-size: 1rem;

//   &:focus {
//     border-color: #facc15;
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   background: #facc15;
//   color: #000;
//   padding: 0.75rem;
//   font-size: 1rem;
//   border: none;
//   border-radius: 10px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #fde047;
//   }
// `;

// const RegisterText = styled.p`
//   color: #d1d5db;
//   margin-top: 10px;
//   cursor: pointer;
//   text-align: center;

//   &:hover {
//     text-decoration: underline;
//     color: #facc15;
//   }
// `;

// const AdminLogin = () => {
//   const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [authenticated, setAuthenticated] = useState(false);
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     Swal.fire({
//       title: "Please wait...",
//       text: "Logging in...",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const { email, password } = form;
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       Swal.fire("Success ✅", "Logged in successfully", "success");
//       navigate("/admindashboard");
//     } catch (error) {
//       Swal.fire("Login Failed ❌", error.message, "error");
//     }
//   };


//     useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         setAuthenticated(!!user); // true if user is logged in
//         setLoading(false);
//       });
  
//       return () => unsubscribe(); // Cleanup listener on unmount
//     }, []);


//     if(authenticated){
//       navigate('/admindashboard');
//       return;
//     }





//   return (
//     <Container>
//       <FormWrapper>
//         <Title>Admin Login</Title>
//         <form onSubmit={handleLogin}>
//           <Label>Email</Label>
//           <Input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <Label>Password</Label>
//           <Input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <Button type="submit">Login</Button>
//         </form>
//         <RegisterText onClick={() => navigate("/adminsignup")}>
//           Don't have an account? Register
//         </RegisterText>
//       </FormWrapper>
//     </Container>
//   );
// };

// export default AdminLogin;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure this path is correct
import { onAuthStateChanged } from 'firebase/auth';
import ForgotPasswordModal from "./ForgotPasswordModal";

// --- Light Theme Colors for Login ---
const lightLoginColors = {
  mainBackground: '#F0F2F5',      // Very light gray for the overall page background
  formBackground: '#FFFFFF',      // Pure white for the form wrapper
  formBorder: '#E0E6ED',          // Soft light gray for form border
  titleColor: '#119458',          // A pleasant blue for the title (matches accent from dashboard)
  labelColor: '#119458',          // Muted blue-gray for labels
  inputBackground: '#F8FAFC',     // Off-white for input fields
  inputBorder: '#CBD5E1',         // Light gray for input borders
  inputText: '#333333',           // Dark gray for input text
  inputFocusBorder: '#4A90E2',    // Accent blue for input focus border
  buttonBackground: '#119458',    // Accent blue for buttons
  buttonText: '#FFFFFF',          // White text on button
  buttonHover: '#3A7DCF',         // Darker blue for button hover
  registerText: '#5C6F8D',        // Muted blue-gray for register text
  registerHover: '#4A90E2',       // Accent blue for register text hover
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${lightLoginColors.mainBackground}; /* Light background */
`;

const FormWrapper = styled.div`
  background: ${lightLoginColors.formBackground}; /* White form background */
  border: 1px solid ${lightLoginColors.formBorder}; /* Soft border */
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08); /* Lighter shadow for light mode */
`;

const Title = styled.h2`
  color: ${lightLoginColors.titleColor}; /* Accent blue for title */
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${lightLoginColors.labelColor}; /* Muted label color */
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: ${lightLoginColors.inputBackground}; /* Off-white input background */
  color: ${lightLoginColors.inputText}; /* Dark text color for input */
  border: 2px solid ${lightLoginColors.inputBorder}; /* Light border for input */
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: ${lightLoginColors.inputFocusBorder}; /* Accent blue on focus */
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  background: ${lightLoginColors.buttonBackground}; /* Accent blue button */
  color: ${lightLoginColors.buttonText}; /* White text on button */
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${lightLoginColors.buttonHover}; /* Darker blue on hover */
  }
`;

const RegisterText = styled.p`
  color: ${lightLoginColors.registerText}; /* Muted register text color */
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 0.95rem; /* Slightly smaller for subtlety */

  &:hover {
    text-decoration: underline;
    color: ${lightLoginColors.registerHover}; /* Accent blue on hover */
  }
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
    const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Please wait...",
      text: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const { email, password } = form;
      await signInWithEmailAndPassword(auth, email, password); // No need to store userCredential if not used
      Swal.fire("Success ✅", "Logged in successfully", "success");
      navigate("/admindashboard");
    } catch (error) {
      Swal.fire("Login Failed ❌", error.message, "error");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user); // true if user is logged in
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && authenticated) { // Only redirect if not loading and is authenticated
      navigate('/admindashboard');
    }
  }, [authenticated, loading, navigate]); // Add navigate to dependency array

  // Optional: You might want a loading spinner here if `loading` is true
  if (loading) {
    return (
      <Container style={{ color: lightLoginColors.inputText }}>
        <p>Loading authentication state...</p>
      </Container>
    );
  }

  // No need to render anything if authenticated, as the useEffect will navigate
  if (authenticated) {
    return null;
  }

  return (
    <Container>
      <FormWrapper>
        <Title>Admin Login</Title>
        <form onSubmit={handleLogin}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email" // Added id for better accessibility
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password" // Added id for better accessibility
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Login</Button>
        </form>
   

          <RegisterText onClick={() => setShowForgotPassword(true)}>
          Forgot Password?
        </RegisterText>

      </FormWrapper>

       {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}
    </Container>
  );
};

export default AdminLogin;
