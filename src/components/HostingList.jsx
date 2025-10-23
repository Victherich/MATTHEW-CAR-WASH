

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { db } from '../firebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import Swal from 'sweetalert2';

// const Section = styled.section`
//   background-color: #f9fafb;
//   padding: 5rem 1.5rem;
// `;

// const Title = styled.h2`
//   color: #4f46e5;
//   font-size: 2rem;
//   font-weight: bold;
//   text-align: center;
//   margin-bottom: 4rem;

//   @media (min-width: 768px) {
//     font-size: 2.5rem;
//   }
// `;

// const Grid = styled.div`
//   display: grid;
//   gap: 2.5rem;
//   grid-template-columns: 1fr;

//   @media (min-width: 640px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const Card = styled.div`
//   background-color: #ffffff;
//   border: 1px solid #e5e7eb;
//   padding: 1.5rem;
//   border-radius: 1rem;
//   text-align: center;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-4px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
//   }
// `;

// const CardTitle = styled.h3`
//   color: #4f46e5;
//   font-size: 1.5rem;
//   font-weight: 700;
//   margin-bottom: 1rem;
// `;

// const Detail = styled.p`
//   color: #374151;
//   font-size: 1rem;
//   margin-bottom: 0.5rem;
// `;

// const HostingList = () => {
//   const [hostings, setHostings] = useState([]);

//   const fetchHostings = async () => {
//     Swal.fire({
//       title: 'Loading...',
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const querySnapshot = await getDocs(collection(db, 'hostings'));
//       const data = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setHostings(data);
//     } catch (error) {
//       console.error('Error fetching hostings:', error);
//       Swal.fire('Error', 'Failed to fetch hostings.', 'error');
//     } finally {
//       Swal.close();
//     }
//   };

//   useEffect(() => {
//     fetchHostings();
//   }, []);

//   return (
//     <Section>
//       <Title >All Hosting Plans</Title>
//       <Grid>
//         {hostings.map((item) => (
//           <Card key={item.id}>
//             <CardTitle>{item.hosting_name?.toUpperCase()}</CardTitle>
//             <Detail><strong>Amount:</strong> {item.base_currency === 'NGN' ? '₦' : '$'}{item.amount}</Detail>
//             <Detail><strong>Duration:</strong> {item.duration}</Detail>
//             <Detail><strong>Status:</strong> {item.status}</Detail>
//             <Detail><strong>Start:</strong> {item.start_date?.toDate().toLocaleDateString()}</Detail>
//             <Detail><strong>Expires:</strong> {item.expiry_date?.toDate().toLocaleDateString()}</Detail>
//           </Card>
//         ))}
//       </Grid>
//     </Section>
//   );
// };

// export default HostingList;


import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc,
  updateDoc, addDoc, getFirestore } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';
import PaystackPop from "@paystack/inline-js";
// import { PaystackPop } from '@paystack/inline-js';

// --- Styled Components ---

const Section = styled.section`
  background-color: #F0F2F5; /* Light background for the whole section */
  padding: 20px 25px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Professional font */
`;

const Title = styled.h2`
  color: #0CC1E0; /* Darker, professional blue/gray for title */
  font-size: 2rem; /* Slightly larger title */
  font-weight: 700; /* Bolder */
  text-align: center;
  margin-bottom: 30px;
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

const Button =styled.button`
padding:10px;
background-color:#0CC1E0;
color:white;
cursor:pointer;
border:none;
border-radius:5px;

&:hover{
background-color:gray;
}

`

// --- Component ---

const HostingList = () => {
  const [hostings, setHostings] = useState([]);
   const [user, setUser] = useState(null);
  //  console.log(user.email)

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          // Fetch phone number from Firestore if available
          // const docRef = doc(db, 'admins', currentUser.uid);
          // const docSnap = await getDoc(docRef);
          // if (docSnap.exists()) {
          //   setPhone(docSnap.data().phone || '');
          // }
        } else {
          setUser(null); // Clear user if not authenticated
          // setPhone('');
        }
      });
  
      return () => unsubscribe();
    }, []);




  // 1️⃣ fetch hostings
 const fetchHostings = ()=>{
    (async () => {
     Swal.fire({
  title: 'Loading...',
  allowOutsideClick: false,
  didOpen: (modalElement) => {
    Swal.showLoading(); // only show loading once modal is mounted
  },
});

      try {
        const qs = await getDocs(collection(db, 'hostings'));
        setHostings(qs.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch {
        Swal.fire('Error', 'Could not fetch plans.', 'error');
      } finally {
        Swal.close();
      }
    })();
  };

     useEffect(() => {
      fetchHostings();
  }, []);

  // 2️⃣ handle renewal launch
  const renew = (item) => {
    const amountKobo = item.renewal_amount * 100;
    const paystack = new PaystackPop();
    paystack.newTransaction({
        key: "pk_live_afb3375b9a770a5a332904dcf1a26e77c2a5f170", 
      //  key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4", 
      email: user.email,
      amount: amountKobo,
      metadata: { hostingId: item.id },
      onSuccess: async (tx) => await handlePaymentSuccess(item, tx),
      onCancel: () => Swal.fire('Cancelled', 'Payment cancelled.', 'info'),
      onError: (e) => Swal.fire('Error', e.message, 'error'),
    });
  };

  // 3️⃣ on successful payment
//   const handlePaymentSuccess = async (item, tx) => {
//     Swal.fire({
//   title: 'Please wait...',
//   allowOutsideClick: false,
//   didOpen: (modalElement) => {
//     Swal.showLoading(); // only show loading once modal is mounted
//   },
// });

//     // 3.2 → extend expiry, save transaction, and notify
//     const itemRef = doc(db, 'hostings', item.id);
//     const newExpiry = item.expiry_date.toDate();
//     newExpiry.setFullYear(newExpiry.getFullYear() + 1);
//     await updateDoc(itemRef, { expiry_date: newExpiry });



//     const txn = {
//       hostingId: item.id,
//       reference: tx.reference,
//       amount: item.renewal_amount,
//       currency: item.base_currency,
//       description:'hosting renewal',
//       hosting_name:item.hosting_name,
//       status: 'success',
//       timestamp: new Date()
//     };
//     await addDoc(collection(db, 'transactions'), txn);

//     Swal.fire('Success', 'Renewal successful! Your hosting has been extended.', 'success');
//     fetchHostings();
//   };

// 3️⃣ on successful payment
// const handlePaymentSuccess = async (item, tx) => {
//   Swal.fire({
//     title: 'Please wait...',
//     allowOutsideClick: false,
//     didOpen: (modalElement) => {
//       Swal.showLoading(); // only show loading once modal is mounted
//     },
//   });

//   try { // Added try-catch for better error handling during update
//     // 3.2 → extend expiry, save transaction, and notify
//     const itemRef = doc(db, 'hostings', item.id);

//     // Calculate new expiry date
//     const currentExpiry = item.expiry_date.toDate();
//     let newExpiry = new Date(currentExpiry); // Create a new Date object to avoid mutating the original
//     newExpiry.setFullYear(newExpiry.getFullYear() + 1);

//     // If the old expiry date was in the past (meaning it was expired),
//     // set the new expiry to be from *today* + 1 year,
//     // otherwise, extend from the existing future expiry.
//     // This prevents renewals from always starting from the original expiry point
//     // if the user renews very late.
//     const now = new Date();
//     now.setHours(0, 0, 0, 0); // Normalize 'now' to start of today for comparison

//     if (currentExpiry.setHours(0,0,0,0) < now) { // If original expiry was in the past
//         const todayPlusOneYear = new Date();
//         todayPlusOneYear.setFullYear(todayPlusOneYear.getFullYear() + 1);
//         todayPlusOneYear.setHours(0,0,0,0); // Normalize
//         newExpiry = todayPlusOneYear;
//     } else {
//         // If current expiry is in the future, extend from that date
//         newExpiry.setFullYear(newExpiry.getFullYear() + 1);
//     }


//     // Update the hosting document
//     await updateDoc(itemRef, {
//       expiry_date: newExpiry,
//       status: 'active' // <--- ADD THIS LINE: Set status back to 'active'
//     });

//     const txn = {
//       hostingId: item.id,
//       reference: tx.reference,
//       amount: item.renewal_amount,
//       currency: item.base_currency,
//       description: 'hosting renewal',
//       hosting_name: item.hosting_name,
//       status: 'success', // This is for the transaction status, not hosting status
//       timestamp: new Date()
//     };
//     await addDoc(collection(db, 'transactions'), txn);

//     Swal.fire('Success', 'Renewal successful! Your hosting has been extended.', 'success');
//     fetchHostings(); // Assuming this refreshes the hosting list in your UI
//   } catch (error) {
//     console.error("Error during payment success processing:", error);
//     Swal.fire('Error', 'There was an issue processing your renewal. Please contact support.', 'error');
//   }
// };


// 3️⃣ on successful payment
const handlePaymentSuccess = async (item, tx) => {
  Swal.fire({
    title: 'Please wait...',
    allowOutsideClick: false,
    didOpen: (modalElement) => {
      Swal.showLoading(); // only show loading once modal is mounted
    },
  });

  try {
    const itemRef = doc(db, 'hostings', item.id);

    // Normalize current date to start of today for comparison
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Get the current expiry date from the item, normalized to start of day
    const currentExpiryFromDB = item.expiry_date.toDate();
    currentExpiryFromDB.setHours(0, 0, 0, 0);

    let baseDateForRenewal;

    // Determine the base date from which to extend the hosting
    if (currentExpiryFromDB < now) {
      // If the current expiry date from DB is in the past,
      // base the renewal on today's date.
      baseDateForRenewal = new Date(now); // Use a new instance of 'now'
    } else {
      // If the current expiry date from DB is in the future,
      // base the renewal on that future expiry date.
      baseDateForRenewal = new Date(currentExpiryFromDB); // Use a new instance of currentExpiryFromDB
    }

    // Now, add exactly one year to the determined base date
    baseDateForRenewal.setFullYear(baseDateForRenewal.getFullYear() + 1);
    
    // The result is our final newExpiry date
    const newExpiry = baseDateForRenewal;

    // Update the hosting document
    await updateDoc(itemRef, {
      expiry_date: newExpiry,
      status: 'active' // Set status back to 'active'
    });

    const txn = {
      hostingId: item.id,
      reference: tx.reference,
      amount: item.renewal_amount,
      currency: item.base_currency,
      description: 'hosting renewal',
      hosting_name: item.hosting_name,
      status: 'success', // This is for the transaction status, not hosting status
      timestamp: new Date()
    };
    await addDoc(collection(db, 'transactions'), txn);

      Swal.fire({
      title: 'Success',
      text: 'Renewal successful! Your hosting has been extended.',
      icon: 'success',
      timer: 1500, // Auto-close after 1.5 seconds
      showConfirmButton: false // No need for a confirm button if it auto-closes
    }).then(() => {
      // This 'then' block executes *after* the Swal alert has closed
      // (either by timer or user click, though here it's timer-based)
      fetchHostings(); // Call fetchHostings ONLY after the alert has completed its display
    });// Assuming this refreshes the hosting list in your UI

    
  } catch (error) {
    console.error("Error during payment success processing:", error);
    Swal.fire('Error', 'There was an issue processing your renewal. Please contact support.', 'error');
  }
};



  return (
    <Section>
      <Title>All Hosting Plans</Title>
      <Grid>
        {hostings.length > 0 ? (
          hostings.map((item) => (
            <Card key={item.id}>
              <CardTitle>{item.hosting_name?.toUpperCase() || 'N/A'}</CardTitle>
              
              

              <DetailRow>
                <DetailLabel>Duration:</DetailLabel>
                <DetailValue>{item.duration || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue>{item.status || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Start Date:</DetailLabel>
                <DetailValue>{item.start_date?.toDate().toLocaleDateString() || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Expires On:</DetailLabel>
                <DetailValue>{item.expiry_date?.toDate().toLocaleDateString() || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Amount:</DetailLabel>
                <DetailValue>{item.base_currency === 'NGN' ? '₦' : '$'}{item.amount || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow>
                <DetailLabel>Renewal Amount:</DetailLabel>
                <DetailValue>{item.base_currency === 'NGN' ? '₦' : '$'}{item.renewal_amount || 'N/A'}</DetailValue>
              </DetailRow>

              <DetailRow style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start"}}>
                <DetailLabel>Features:</DetailLabel>
                {item.features?.map((f)=>(
                  <DetailValue>
                    {f}
                    </DetailValue>
                ))}
                
                
              </DetailRow>

              <DetailRow style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-start"}}>
                <DetailLabel>Addons:</DetailLabel>
                {item.addons?.map((f)=>(
                  <DetailValue>
                    {f}
                    </DetailValue>
                ))}
                
                
              </DetailRow>

              <Button onClick={()=>renew(item)}>Renew hosting</Button>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#7f8c8d', fontSize: '1.1rem' }}>
            No hosting plans available.
          </p>
        )}
      </Grid>
    </Section>
  );
};

export default HostingList;
