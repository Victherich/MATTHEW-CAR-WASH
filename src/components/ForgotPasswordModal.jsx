import React, { useState } from "react";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

// ---------- Styled Components ----------
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background: white;
  color: green;
  padding: 2.5rem;
  border-radius: 1.25rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  border: 1px solid #e5e7eb;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: green;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #222;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  font-size: 1rem;
  margin-bottom: 1.25rem;

  &:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.4);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background-color: #22c55e;
  color: white;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #16a34a;
  }
`;

const CancelButton = styled.button`
  width: 100%;
  margin-top: 0.75rem;
  background: transparent;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;

  &:hover {
    color: #ef4444;
  }
`;

// ---------- Component ----------
export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address.",
        background: "white",
        color: "green",
      });
      return;
    }

    try {
      setLoading(true);

      // ✅ Step 1: Check Firestore for existing user
      const usersRef = collection(db, "admins");
      const q = query(usersRef, where("email", "==", email.trim().toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Email Not Found",
          text: "No account is registered with this email address.",
          background: "white",
          color: "green",
        });
        return;
      }

      // ✅ Step 2: Send the reset email
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Reset Email Sent",
        text: "Please check your inbox and follow the link to reset your password.",
        background: "white",
        color: "green",
      });
      onClose();
    } catch (error) {
      console.error("Error sending reset email:", error);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text:
          error.code === "auth/invalid-email"
            ? "Invalid email format. Please check and try again."
            : "Something went wrong. Please try again later.",
        background: "white",
        color: "green",
      });
    }
  };

  return (
    <Overlay>
      <ModalWrapper>
        <Title>Reset Password</Title>
        <Description>
          Enter your registered email address. We'll send you a password reset link.
        </Description>

        <form onSubmit={handleReset}>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </ModalWrapper>
    </Overlay>
  );
}
