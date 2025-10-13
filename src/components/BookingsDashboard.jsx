
// // src/pages/BookingsDashboard.jsx
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   getDocs,
//   updateDoc,
//   doc,
//   orderBy,
//   query,
// } from "firebase/firestore";
// import Swal from "sweetalert2";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// // === Styled Components ===
// const Container = styled.div`
//   padding: 40px 5px;
//   min-height: 100vh;
//   background: #f7f9f8;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h2`
//   color: #0c5e36;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const SearchBar = styled.input`
//   padding: 10px 15px;
//   width: 100%;
//   max-width: 500px;
//   border: 2px solid #119458;
//   border-radius: 6px;
//   outline: none;
//   font-size: 16px;
//   margin-bottom: 30px;
// `;

// // const TableContainer = styled.div`

// // `


// // const BookingsTable = styled.table`
// //   width: 100%;
// //   max-width: 1100px;
// //   border-collapse: collapse;
// //   background: white;
// //   border-radius: 8px;
// //   overflow: hidden;
// // `;

// // Make table scrollable horizontally on smaller screens
// const TableContainer = styled.div`
//   width: 100%;
//   max-width: 1100px;
//   overflow-x: auto;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

//   /* Add a scrollbar on small devices */
//   @media (max-width: 768px) {
//     border: 1px solid #ddd;
//   }

//   /* Optional: style the scrollbar (modern browsers) */
//   &::-webkit-scrollbar {
//     height: 8px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #119458;
//     border-radius: 4px;
//   }

//   &::-webkit-scrollbar-track {
//     background: #f1f1f1;
//   }
// `;

// const BookingsTable = styled.table`
//   width: 100%;
//   min-width: 900px; /* Ensures horizontal scroll if content exceeds screen */
//   border-collapse: collapse;
//   background: white;
//   border-radius: 8px;
//   overflow: hidden;

//   th, td {
//     white-space: nowrap; /* Prevent text wrapping for better scrolling */
//   }
// `;



// const Thead = styled.thead`
//   background: #119458;
//   color: white;
// `;

// const Th = styled.th`
//   padding: 12px 10px;
//   text-align: left;
// `;

// const Td = styled.td`
//   padding: 12px 10px;
//   border-bottom: 1px solid #ddd;
// `;

// const StatusSelect = styled.select`
//   padding: 6px 8px;
//   border-radius: 6px;
//   border: 1px solid #ccc;
//   outline: none;
// `;

// const StatusBadge = styled.span`
//   padding: 3px 5px;
//   border-radius: 6px;
//   font-weight: bold;
//   font-size:0.6rem;
//   color: white;
//   background-color: ${(props) => {
//     switch (props.status) {
//       case "IN PROGRESS":
//         return "#f0ad4e";
//       case "COMPLETED":
//         return "#5cb85c";
//       case "CANCELLED":
//         return "#d9534f";
//       default:
//         return "#777";
//     }
//   }};
// `;

// // === Component ===
// const BookingsDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredBookings, setFilteredBookings] = useState([]);

//   // Fetch bookings from Firestore
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//           status: doc.data().status || "PENDING",
//         }));
//         setBookings(data);
//         setFilteredBookings(data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//         Swal.fire("Error", "Failed to fetch bookings from database", "error");
//       }
//     };

//     fetchBookings();
//   }, []);

//   // Search filtering
//   useEffect(() => {
//     const filtered = bookings.filter((b) => {
//       const term = search.toLowerCase();
//       return (
//         b?.user?.name?.toLowerCase().includes(term) ||
//         b?.user?.email?.toLowerCase().includes(term) ||
//         b?.serviceTitle?.toLowerCase().includes(term)
//       );
//     });
//     setFilteredBookings(filtered);
//   }, [search, bookings]);

//   // Update status
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await updateDoc(doc(db, "orders", id), { status: newStatus });
//       setBookings((prev) =>
//         prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
//       );
//       Swal.fire("Updated!", `Booking marked as ${newStatus}.`, "success");
//     } catch (error) {
//       console.error("Error updating status:", error);
//       Swal.fire("Error", "Failed to update booking status.", "error");
//     }
//   };

//   return (
//     <Container>
//       <Title>All Bookings</Title>
//       <SearchBar
//         type="text"
//         placeholder="Search by name, email, or service..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
// <p><FaArrowLeft/> SCROLL <FaArrowRight/></p>
//     <TableContainer>
//               <BookingsTable>
//         <Thead>
//           <tr>
//             <Th>Customer</Th>
//             <Th>Email</Th>
//             <Th>Phone</Th>
//             <Th>Service</Th>
//             <Th>Package</Th>
//             <Th>Price (AED)</Th>
//             <Th>Status</Th>
//             <Th>Action</Th>
//           </tr>
//         </Thead>
//         <tbody>
//           {filteredBookings.length === 0 ? (
//             <tr>
//               <Td colSpan="8" style={{ textAlign: "center", padding: "30px" }}>
//                 No bookings found.
//               </Td>
//             </tr>
//           ) : (
//             filteredBookings.map((b) => (
//               <tr key={b.id}>
//                 <Td>{b?.user?.name}</Td>
//                 <Td>{b?.user?.email}</Td>
//                 <Td>{b?.user?.phone}</Td>
//                 <Td>{b?.serviceTitle}</Td>
//                 <Td>{b?.selectedPackage?.name}</Td>
//                 <Td>{b?.priceAED}</Td>
//                 <Td>
//                   <StatusBadge status={b.status}>{b.status}</StatusBadge>
//                 </Td>
//                 <Td>
//                   <StatusSelect
//                     value={b.status}
//                     onChange={(e) =>
//                       handleStatusChange(b.id, e.target.value)
//                     }
//                   >
//                     <option value="PENDING">PENDING</option>
//                     <option value="IN PROGRESS">IN PROGRESS</option>
//                     <option value="COMPLETED">COMPLETED</option>
//                     <option value="CANCELLED">CANCELLED</option>
//                   </StatusSelect>
//                 </Td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </BookingsTable>
//     </TableContainer>
//     </Container>
//   );
// };

// export default BookingsDashboard;





// src/pages/BookingsDashboard.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { FaCalendarAlt } from "react-icons/fa";

// === Styled Components ===
const Container = styled.div`
  padding: 40px 10px;
  min-height: 100vh;
  background: #f7f9f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #0c5e36;
  margin-bottom: 20px;
  text-align: center;
`;

const SearchBar = styled.input`
  padding: 10px 15px;
  width: 100%;
  max-width: 500px;
  border: 2px solid #119458;
  border-radius: 6px;
  outline: none;
  font-size: 16px;
  margin-bottom: 30px;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1100px;
`;

const BookingCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: 0.2s ease;
  border-left: 6px solid ${(props) =>
    props.status === "COMPLETED"
      ? "#5cb85c"
      : props.status === "IN PROGRESS"
      ? "#f0ad4e"
      : props.status === "CANCELLED"
      ? "#d9534f"
      : "#777"};

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomerName = styled.h3`
  color: #0c5e36;
  font-size: 1.1rem;
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.7rem;
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "IN PROGRESS":
        return "#f0ad4e";
      case "COMPLETED":
        return "#5cb85c";
      case "CANCELLED":
        return "#d9534f";
      default:
        return "#777";
    }
  }};
`;

const CardBody = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
  line-height: 1.6;
`;

const Label = styled.span`
  font-weight: bold;
  color: #0c5e36;
`;

const StatusSelect = styled.select`
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  margin-top: 10px;
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  margin-top: 50px;
  color: #666;
  font-size: 1.1rem;
`;

// === Component ===
const BookingsDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const booking = doc.data();
          return {
            id: doc.id,
            ...booking,
            status: booking.status || "PENDING",
            createdAt: booking.createdAt?.toDate
              ? booking.createdAt.toDate()
              : booking.createdAt,
          };
        });
        setBookings(data);
        setFilteredBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        Swal.fire("Error", "Failed to fetch bookings from database", "error");
      }
    };

    fetchBookings();
  }, []);

  // Search filtering
  useEffect(() => {
    const term = search.toLowerCase();
    const filtered = bookings.filter((b) => {
      return (
        b?.user?.name?.toLowerCase().includes(term) ||
        b?.user?.email?.toLowerCase().includes(term) ||
        b?.serviceTitle?.toLowerCase().includes(term)
      );
    });
    setFilteredBookings(filtered);
  }, [search, bookings]);

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", id), { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      Swal.fire("Updated!", `Booking marked as ${newStatus}.`, "success");
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire("Error", "Failed to update booking status.", "error");
    }
  };

  return (
    <Container>
      <Title>All Bookings</Title>
      <SearchBar
        type="text"
        placeholder="Search by name, email, or service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBookings.length === 0 ? (
        <EmptyState>No bookings found.</EmptyState>
      ) : (
        <CardsGrid>
          {filteredBookings.map((b) => (
            <BookingCard key={b.id} status={b.status}>
              <CardHeader>
                <CustomerName>{b?.user?.name || "Unknown"}</CustomerName>
                <StatusBadge status={b.status}>{b.status}</StatusBadge>
              </CardHeader>
              <CardBody>
                <p>
                  <Label>Email:</Label> {b?.user?.email}
                </p>
                <p>
                  <Label>Phone:</Label> {b?.user?.phone || "N/A"}
                </p>
                <p>
                  <Label>Service:</Label> {b?.serviceTitle}
                </p>
                <p>
                  <Label>Package:</Label> {b?.selectedPackage?.name || "N/A"}
                </p>
                <p>
                  <Label>Price (AED):</Label> {b?.priceAED}
                </p>
                <p>
                  <Label>
                    <FaCalendarAlt style={{ marginRight: "6px" }} />
                    Booking Date:
                  </Label>{" "}
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>

                <StatusSelect
                  value={b.status}
                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </StatusSelect>
              </CardBody>
            </BookingCard>
          ))}
        </CardsGrid>
      )}
    </Container>
  );
};

export default BookingsDashboard;

