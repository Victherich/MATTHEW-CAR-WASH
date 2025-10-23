


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // adjust path as needed
import Swal from 'sweetalert2';

// --- Light Theme Colors for Profile ---
const lightProfileColors = {
  pageBackground: '#F0F2F5',      // Very light gray for the overall page background
  cardBackground: '#FFFFFF',      // Pure white for the profile card
  cardBorder: '#E0E6ED',          // Soft light gray for card border
  mainText: '#0CC1E0',            // Dark gray for general text
  secondaryText: '#666666',        // Medium gray for secondary info
  accent: '#0CC1E0',              // A pleasant blue for highlights and active elements
  accentHover: '#3A7DCF',         // Darker blue for hover states
  avatarBackground: '#DDE6F0',    // Light gray-blue for avatar background
  avatarText: '#0CC1E0',          // Accent blue for avatar text (initials)
  inputBackground: '#F8FAFC',     // Off-white for input fields
  inputBorder: '#CBD5E1',         // Light gray for input borders
  inputTextColor: '#333333',      // Dark gray for input text
  inputFocusBorder: '#4A90E2',    // Accent blue for input focus border
  buttonText: '#FFFFFF',          // White text on buttons
  cancelButtonBackground: '#9DA6B2', // Soft gray for cancel button
  cancelButtonHover: '#7F8C9A',     // Darker gray for cancel hover
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${lightProfileColors.pageBackground}; /* Light background */
  display: flex;
  // align-items: center;
  justify-content: center;
  color: ${lightProfileColors.mainText}; /* Main text color */
  padding: 2rem;
  width: 100%;

  @media(max-width:428px){
    padding:1rem;
  }
`;

const Card = styled.div`

  border-radius: 1rem;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  text-align: center;


`;

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem; /* Added margin for spacing */
`;

const Avatar = styled.div`
  background-color: #0CC1E0; /* Light gray-blue avatar background */
  color: #FFDE59; /* Accent blue for avatar text */
  font-weight: bold;
  border-radius: 9999px;
  width: 60px; /* Slightly larger avatar */
  height: 60px; /* Slightly larger avatar */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem; /* Larger font for initials */
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05); /* Subtle shadow */
`;

const Heading = styled.h2`
  font-size: 2rem; /* Slightly larger heading */
  color: ${lightProfileColors.mainText}; /* Main text color */
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  color: ${lightProfileColors.secondaryText}; /* Secondary text color */
  margin: 0.25rem 0;
  font-size: 1rem; /* Slightly larger font size */
`;

const Highlight = styled.span`
  color: ${lightProfileColors.accent}; /* Accent color for highlights */
  font-weight: 600;
  margin-right: 0.3rem; /* Spacing after highlight */
`;

const PhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem; /* Increased gap */
  margin-top: 1rem; /* Added margin-top */
`;

const EditInput = styled.input`
  padding: 0.5rem 0.8rem; /* Increased padding */
  border-radius: 0.5rem;
  border: 1px solid ${lightProfileColors.inputBorder}; /* Light input border */
  background: ${lightProfileColors.inputBackground}; /* Off-white input background */
  color: ${lightProfileColors.inputTextColor}; /* Dark input text */
  font-size: 0.95rem; /* Slightly larger font */
  width: 180px; /* Fixed width for consistency */

  &:focus {
    border-color: ${lightProfileColors.inputFocusBorder}; /* Accent blue on focus */
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2); /* Subtle focus ring */
  }
`;

const EditButton = styled.button`
  background: ${(props) => (props.cancel ? lightProfileColors.cancelButtonBackground : lightProfileColors.accent)}; /* Dynamic background for Save/Cancel */
  color: ${lightProfileColors.buttonText}; /* White text for buttons */
  border: none;
  padding: 0.5rem 1rem; /* Increased padding */
  border-radius: 6px;
  font-size: 0.9rem; /* Slightly larger font */
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => (props.cancel ? lightProfileColors.cancelButtonHover : lightProfileColors.accentHover)}; /* Dynamic hover background */
  }
`;

const AdminProfile = () => {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch phone number from Firestore if available
        const docRef = doc(db, 'admins', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPhone(docSnap.data().phone || '');
        }
      } else {
        setUser(null); // Clear user if not authenticated
        setPhone('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhoneSave = async () => {
    if (!user) return; // Ensure user is logged in
    
    Swal.fire({
      title: "Saving...",
      text: "Updating your phone number...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await updateDoc(doc(db, 'admins', user.uid), {
        phone: phone,
      });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Phone number updated successfully.',
        timer: 1500,
        showConfirmButton: false,
      });

      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Error updating phone:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update phone number. Please try again.',
      });
    }
  };

  if (!user) {
    // Show a loading state or a message if user is not logged in
    return (
      <PageContainer>
        <Card>
          <Heading style={{ color: lightProfileColors.mainText }}>Loading Profile...</Heading>
          <Text style={{ color: lightProfileColors.secondaryText }}>Please ensure you are logged in.</Text>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <AvatarWrap>
          <Avatar>{user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}</Avatar> {/* Fallback to email initial */}
        </AvatarWrap>

        <Heading>{user.displayName || 'Admin User'}</Heading> {/* Default display name */}
        <Text><Highlight>Email:</Highlight> {user.email}</Text>

        <PhoneWrapper>
          <Highlight>Phone:</Highlight>
          {isEditing ? (
            <>
              <EditInput
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number" // Added placeholder
              />
              <EditButton onClick={handlePhoneSave}>Save</EditButton>
              <EditButton cancel onClick={() => setIsEditing(false)}>Cancel</EditButton> {/* Added 'cancel' prop */}
            </>
          ) : (
            <>
              <Text style={{ margin: 0 }}>{phone || 'Not Provided'}</Text>
              <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            </>
          )}
        </PhoneWrapper>

        <Text style={{ marginTop: '1rem' }}> {/* Added margin to separate from phone */}
            <Highlight>Joined:</Highlight> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleString() : 'N/A'}
        </Text>
      </Card>
    </PageContainer>
  );
};

export default AdminProfile;
