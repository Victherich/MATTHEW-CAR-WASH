
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';

// --- Styled Components (Reusing and adapting styles from HostingList for consistency) ---

const Section = styled.section`
  background-color: #f9fafb; /* Light background for the whole section */
  padding: 20px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Professional font */
  min-height: 100vh; /* Ensure it takes full height */
`;

const Title = styled.h2`
  color: #0CC1E0; /* Darker, professional blue/gray for title */
  font-size: 2rem; /* Slightly larger title */
  font-weight: 700; /* Bolder */
  text-align: center;
  margin-bottom: 20px;
  letter-spacing: -0.02em; /* Tighter letter spacing for professionalism */

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem; /* Consistent gap between cards */
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  max-width: 1200px; /* Limit grid width for better appearance */
  margin: 0 auto; /* Center the grid */
`;

const Card = styled.div`
  background-color: #ffffff; /* White card background */
  border: 1px solid #e0e0e0; /* Softer, subtle border */
  padding: 2rem; /* More padding for spaciousness */
  border-radius: 12px; /* Slightly more rounded corners */
  text-align: left; /* Align text to the left within the card */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08); /* More refined shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column; /* Stack content vertically */

  &:hover {
    transform: translateY(-6px); /* More noticeable lift on hover */
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
  }
`;

const CardTitle = styled.h3`
  color: #0CC1E0; /* Darker blue/gray for card titles */
  font-size: 1.6rem; /* Slightly larger card title */
  font-weight: 700;
  margin-bottom: 1.5rem; /* More space below the title */
  text-align: center; /* Center the card title */
  word-break: break-word; /* Ensure long names wrap */
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between; /* Space fields and values */
  align-items: center;
  padding: 0.8rem 0; /* Padding for each row */
  border-bottom: 1px solid #f0f0f0; /* Light border for each row */
  
  &:last-child {
    border-bottom: none; /* No border for the last row */
  }
`;

const DetailLabel = styled.span`
  color: #7f8c8d; /* Muted gray for labels */
  font-weight: 500; /* Slightly bolder for labels */
  font-size: 0.95rem; /* Slightly smaller font for labels */
  flex-shrink: 0; /* Prevent label from shrinking */
  margin-right: 1rem; /* Space between label and value */
`;

const DetailValue = styled.span`
  color: #34495e; /* Darker text for values */
  font-weight: 600; /* Bold for values */
  font-size: 1rem;
  text-align: right; /* Align value to the right */
  word-break: break-word; /* Ensure long values wrap */
`;

const StatusIndicator = styled(DetailValue)`
  color: ${({ status }) => 
    status === 'completed' ? '#27ae60' : // Green for completed
    status === 'pending' ? '#f39c12' :   // Orange for pending
    status === 'failed' ? '#e74c3c' :    // Red for failed
    '#34495e'                            // Default color
  };
  font-weight: 700;
`;

const NoDataMessage = styled.p`
  text-align: center;
  grid-column: 1 / -1; /* Span across all columns */
  color: #7f8c8d;
  font-size: 1.1rem;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

// --- Component ---

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    Swal.fire({
      title: 'Loading Transactions...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      // Create a query to fetch documents from 'transactions' collection
      // Optional: Add orderBy to sort transactions, e.g., by creation date
      const transactionsQuery = query(
        collection(db, 'transactions'),
        orderBy('timestamp', 'desc') // Assuming a 'timestamp' field for sorting
      );
      
      const querySnapshot = await getDocs(transactionsQuery);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
      Swal.close(); // Close loading after successful fetch
    } catch (error) {
      console.error('Error fetching transactions:', error);
      Swal.fire('Error', 'Failed to fetch transactions.', 'error');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Section>
      <Title>All Transactions</Title>
      <Grid>
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <Card key={item.id}>
              {/* Assuming transaction_id or reference is a unique identifier/title for each transaction */}
              <CardTitle>{item.transaction_id?.toUpperCase() || item.reference?.toUpperCase() || 'TRANSACTION'}</CardTitle>
              
              <DetailRow>
                <DetailLabel>Reference:</DetailLabel>
                <DetailValue>{item.reference || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Amount:</DetailLabel>
                <DetailValue>{item.currency === 'NGN' ? '₦' : '$'}{item.amount || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Status:</DetailLabel>
                <StatusIndicator status={item.status}>{item.status?.toUpperCase() || 'N/A'}</StatusIndicator>
              </DetailRow>
            

           

              {/* Timestamp for when the transaction occurred */}
              <DetailRow>
                <DetailLabel>Date:</DetailLabel>
                <DetailValue>{item.timestamp?.toDate().toLocaleString() || 'N/A'}</DetailValue>
              </DetailRow>

              {/* Optional: Add more fields if your transaction data has them, e.g., 'description', 'payment_method' */}
              {item.description && (
                <DetailRow>
                  <DetailLabel>Description:</DetailLabel>
                  <DetailValue>{item.description}</DetailValue>
                </DetailRow>
              )}


                 <DetailRow>
                <DetailLabel>Hosting ID:</DetailLabel>
                <DetailValue>{item.hostingId || 'N/A'}</DetailValue>
              </DetailRow>

               <DetailRow>
                <DetailLabel>Hosting Name:</DetailLabel>
                <DetailValue>{item.hosting_name || 'N/A'}</DetailValue>
              </DetailRow>
            </Card>
          ))
        ) : (
          <NoDataMessage>
            No transactions found.
          </NoDataMessage>
        )}
      </Grid>
    </Section>
  );
};

export default TransactionsList;