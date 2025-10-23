

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';
import VariableServiceForm from './VariableServiceForm'; // Import the ServiceForm component

// --- Light Theme Colors (Consistent with Admin Dashboard) ---
const adminThemeColors = {
  mainBackground: '#F5F7FA',       // Very light blue-gray for the overall dashboard
  cardBackground: '#FFFFFF',       // Pure white for card backgrounds
  cardBorder: '#E0E6ED',           // Soft light gray for borders
  mainText: '#333333',             // Soft dark gray for general text
  secondaryText: '#666666',         // Medium gray for secondary text
  accent: '#0CC1E0',               // A pleasant, not-too-bright blue for accents
  accentHover: '#3A7DCF',          // Darker blue for hover states
  danger: '#E74C3C',               // Red for delete actions
  dangerHover: '#C0392B',          // Darker red for delete hover
  headerColor: '#0CC1E0',          // Darker title color
};

// --- Styled Components ---

const PageContainer = styled.div`
  background-color: ${adminThemeColors.mainBackground};
  min-height: 100vh;
  padding: 3rem 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: ${adminThemeColors.mainText};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  color: ${adminThemeColors.headerColor};
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const AddButton = styled.button`
  background-color: ${adminThemeColors.accent};
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${adminThemeColors.accentHover};
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background-color: ${adminThemeColors.cardBackground};
  border: 1px solid ${adminThemeColors.cardBorder};
  padding: 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardTitle = styled.h3`
  color: ${adminThemeColors.mainText};
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  line-height: 1.3;
  text-align: center; /* Center the service title */
`;

const ServiceItemList = styled.ul`
  list-style: none; /* Remove default bullets */
  padding: 0;
  margin: 0;
  flex-grow: 1; /* Allow list to take available space */
`;

const ServiceItem = styled.li`
  display: flex;
  align-items: flex-start; /* Align checkmark and text at the top */
  font-size: 0.95rem;
  color: ${adminThemeColors.secondaryText};
  margin-bottom: 0.6rem;
  line-height: 1.5;

  &:before {
    content: '✔'; /* Custom checkmark */
    color: ${adminThemeColors.accent};
    margin-right: 0.8rem;
    font-weight: bold;
    flex-shrink: 0; /* Prevent checkmark from shrinking */
  }
`;

const Description = styled.p`
  display: flex;
  align-items: flex-start; /* Align checkmark and text at the top */
  font-size: 0.95rem;
  color: ${adminThemeColors.secondaryText};
  margin-bottom: 0.6rem;
  line-height: 1.5;

 
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  gap: 0.8rem;
  margin-top: 1.5rem; /* More space above actions */
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  background-color: ${(props) =>
    props.danger ? adminThemeColors.danger : adminThemeColors.accent};
  color: #ffffff;

  &:hover {
    background-color: ${(props) =>
      props.danger ? adminThemeColors.dangerHover : adminThemeColors.accentHover};
    transform: translateY(-1px);
  }
`;

const NoServicesMessage = styled.p`
  text-align: center;
  grid-column: 1 / -1; /* Span across all columns */
  color: ${adminThemeColors.secondaryText};
  font-size: 1.1rem;
  padding: 2rem;
  background-color: ${adminThemeColors.cardBackground};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;


const SectionImage = styled.div`
  width: 100%;

  

  img {
    width: 100%;
    height: auto; /* Allow height to adjust naturally */
    max-height: 400px; /* Optional: Limit max height for consistency */
    object-fit: cover; /* Ensure image covers the area */
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// --- ManageServices Component ---

const ManageVariableServices = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null); // Holds service data if editing


  console.log(services)

  const fetchServices = async () => {
    Swal.fire({
      title: 'Loading Services...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // Order by 'createdAt' if you add a timestamp when creating services
      const q = query(collection(db, 'services2'), orderBy('createdAt', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to JS Date if necessary
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : doc.data().createdAt,
      }));
      setServices(data);
      Swal.close();
    } catch (error) {
      console.error('Error fetching services:', error);
      Swal.fire('Error', 'Failed to fetch services.', 'error');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []); // Run once on component mount

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
    window.scrollTo(0, 0); // Scroll to top for form visibility
  };

  const handleDelete = async (serviceId, serviceTitle) => {
    Swal.fire({
      title: `Are you sure you want to delete "${serviceTitle}"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: adminThemeColors.danger,
      cancelButtonColor: adminThemeColors.secondaryText,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
        try {
          await deleteDoc(doc(db, 'services', serviceId));
          Swal.fire(
            'Deleted!',
            `"${serviceTitle}" has been deleted.`,
            'success'
          );
          fetchServices(); // Re-fetch services to update the list
        } catch (error) {
          console.error('Error deleting service:', error);
          Swal.fire('Error', `Failed to delete "${serviceTitle}".`, 'error');
        }
      }
    });
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(null); // Clear editing service data
    fetchServices(); // Re-fetch services to ensure list is updated after save/cancel
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>{showForm ? (editingService ? 'Edit Service' : 'Create New Service') : 'Manage Variable Services'}</Title>
        {!showForm && (
          <AddButton onClick={() => setShowForm(true)}>
            + Add New Service
          </AddButton>
        )}
      </HeaderContainer>

      {showForm ? (
        <VariableServiceForm initialData={editingService} onSave={handleFormClose} onCancel={handleFormClose} />
      ) : (
        <ServiceGrid>
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service.id}>
                <CardTitle>{service.title || 'Untitled Service'}</CardTitle>
                <SectionImage>
                {/* Use the imageUrl from Firestore for the service */}
                <img src={service.imageUrl} alt={service.title} />
              </SectionImage>

              <Description style={{fontWeight:"bold"}}>{service?.description}</Description>
                <ServiceItemList>

                  {service.packages && service.packages.length > 0 ? (
                    service.packages.map((p, index) => (
                      <ServiceItem key={index}>{p.name} - AED {p.price}</ServiceItem>
                    ))
                  ) : (
                    <ServiceItem>No items listed.</ServiceItem>
                  )}
                </ServiceItemList>
                <CardActions>
                  <ActionButton onClick={() => handleEdit(service)}>Edit</ActionButton>
                  <ActionButton danger onClick={() => handleDelete(service.id, service.title)}>Delete</ActionButton>
                </CardActions>
              </ServiceCard>
            ))
          ) : (
            <NoServicesMessage>No services found. Click "Add New Service" to create one!</NoServicesMessage>
          )}
        </ServiceGrid>
      )}
    </PageContainer>
  );
};

export default ManageVariableServices;













