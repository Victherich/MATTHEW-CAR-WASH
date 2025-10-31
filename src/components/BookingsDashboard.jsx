



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
// import { FaCalendarAlt } from "react-icons/fa";

// // === Styled Components ===
// const Container = styled.div`
//   padding: 40px 10px;
//   min-height: 100vh;
//   background: #f7f9f8;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h2`
//   color:#0CC1E0;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// const SearchBar = styled.input`
//   padding: 10px 15px;
//   width: 100%;
//   max-width: 500px;
//   border: 2px solid #0CC1E0;
//   border-radius: 6px;
//   outline: none;
//   font-size: 16px;
//   margin-bottom: 30px;
// `;

// const CardsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 20px;
//   width: 100%;
//   max-width: 1100px;
// `;

// const BookingCard = styled.div`
//   background: white;
//   border-radius: 12px;
//   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
//   padding: 20px;
//   transition: 0.2s ease;
//   border-left: 6px solid ${(props) =>
//     props.status === "COMPLETED"
//       ? "#5cb85c"
//       : props.status === "IN PROGRESS"
//       ? "#f0ad4e"
//       : props.status === "CANCELLED"
//       ? "#d9534f"
//       : "#777"};

//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
//   }
// `;

// const CardHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const CustomerName = styled.h3`
//   color: #0c5e36;
//   font-size: 1.1rem;
//   margin: 0;
// `;

// const StatusBadge = styled.span`
//   padding: 4px 8px;
//   border-radius: 8px;
//   font-weight: bold;
//   font-size: 0.7rem;
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

// const CardBody = styled.div`
//   margin-top: 10px;
//   font-size: 0.9rem;
//   color: #333;
//   line-height: 1.6;
// `;

// const Label = styled.span`
//   font-weight: bold;
//   color: #0c5e36;
// `;

// const StatusSelect = styled.select`
//   padding: 6px 8px;
//   border-radius: 6px;
//   border: 1px solid #ccc;
//   outline: none;
//   margin-top: 10px;
//   width: 100%;
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   margin-top: 50px;
//   color: #666;
//   font-size: 1.1rem;
// `;

// // === Component ===
// const BookingsDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   console.log(bookings)

//   // Fetch bookings from Firestore
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => {
//           const booking = doc.data();
//           return {
//             id: doc.id,
//             ...booking,
//             status: booking.status || "PENDING",
//             createdAt: booking.createdAt?.toDate
//               ? booking.createdAt.toDate()
//               : booking.createdAt,
//           };
//         });
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
//     const term = search.toLowerCase();
//     const filtered = bookings.filter((b) => {
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

//       {filteredBookings.length === 0 ? (
//         <EmptyState>No bookings found.</EmptyState>
//       ) : (
//         <CardsGrid>
//           {filteredBookings.map((b) => (
//             <BookingCard key={b.id} status={b.status}>
//               <CardHeader>
//                 <CustomerName>{b?.user?.name || "Unknown"}</CustomerName>
//                 <StatusBadge status={b.status}>{b.status}</StatusBadge>
//               </CardHeader>
//               <CardBody>
//                 <p>
//                   <Label>Email:</Label> {b?.user?.email}
//                 </p>
//                 <p>
//                   <Label>Phone:</Label> {b?.user?.phone || "N/A"}
//                 </p>
//                 <p>
//                   <Label>Service:</Label> {b?.serviceTitle}
//                 </p>
//                 <p>
//                   <Label>Package:</Label> {b?.selectedPackage?.name || "N/A"}
//                 </p>
//                 <p>
//                   <Label>Price (AED):</Label> {b?.priceAED}
//                 </p>
//                 <p>
//                   <Label>Selected Date:</Label> {b?.selectedDate}
//                 </p>
//                 <p>
//                   <Label>Selected Time slot:</Label> {b?.selectedSlot}
//                 </p>
//                 <p>
//                   <Label>
//                     <FaCalendarAlt style={{ marginRight: "6px" }} />
//                     Booking Date:
//                   </Label>{" "}
//                   {b.createdAt
//                     ? new Date(b.createdAt).toLocaleDateString()
//                     : "Unknown"}
//                 </p>

//                   <p>
//                   <Label>Payment Status: {b?.paymentStatus}</Label>
//                 </p>

//                 <StatusSelect
//                   value={b.status}
//                   onChange={(e) => handleStatusChange(b.id, e.target.value)}
//                 >
//                   <option value="PENDING">PENDING</option>
//                   <option value="IN PROGRESS">IN PROGRESS</option>
//                   <option value="COMPLETED">COMPLETED</option>
//                   <option value="CANCELLED">CANCELLED</option>
//                 </StatusSelect>
//               </CardBody>
//             </BookingCard>
//           ))}
//         </CardsGrid>
//       )}
//     </Container>
//   );
// };

// export default BookingsDashboard;






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
  color:#0CC1E0;
  margin-bottom: 20px;
  text-align: center;
`;

const SearchBar = styled.input`
  padding: 10px 15px;
  width: 100%;
  max-width: 500px;
  border: 2px solid #0CC1E0;
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

const PayButton = styled.button`
  background-color: #0CC1E0;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;
  &:hover {
    background-color: #0aa3c4;
  }
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



// // ✅ Handle payment update with confirmation
// const handleMarkAsPaid = async (id) => {
//   const result = await Swal.fire({
//     title: "Mark as Paid?",
//     text: "Are you sure you want to mark this booking as PAID?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#0CC1E0",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, mark as Paid",
//     cancelButtonText: "Cancel",
//   });

//   if (result.isConfirmed) {
//     try {
//       await updateDoc(doc(db, "orders", id), { paymentStatus: "PAID" });
//       setBookings((prev) =>
//         prev.map((b) =>
//           b.id === id ? { ...b, paymentStatus: "PAID" } : b
//         )
//       );
//       Swal.fire("Success!", "Payment has been marked as PAID.", "success");
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//       Swal.fire("Error", "Failed to update payment status.", "error");
//     }
//   }
// };





// === Handle Booking Status Change ===
const handleStatusChange = async (id, newStatus) => {
  const result = await Swal.fire({
    title: "Confirm Status Change",
    text: `Are you sure you want to change this booking's status to "${newStatus}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0CC1E0",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return; // 🚫 Cancelled

  Swal.fire({text:"Please wait..."});
  Swal.showLoading();

  try {

    // 1️⃣ Update Firestore booking status
    await updateDoc(doc(db, "orders", id), { status: newStatus });

    // 2️⃣ Update local state
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    Swal.fire("Updated!", `Booking marked as ${newStatus}.`, "success");

    // 3️⃣ Send email notification
    const updatedBooking = bookings.find((b) => b.id === id);
    if (updatedBooking) {
      await fetch("https://backend-mailer-1.vercel.app/api/matthew_booking_status_email_sender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedBooking,
          status: newStatus, // ensure latest status
          sellerEmail:"matthewcarwashandcleaning20@gmail.com",
        }),
      });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    Swal.fire("Error", "Failed to update booking status.", "error");
  }
};





// === Handle Payment Mark as Paid ===
const handleMarkAsPaid = async (id) => {
  const result = await Swal.fire({
    title: "Mark as Paid?",
    text: "Are you sure you want to mark this booking as PAID?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#0CC1E0",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, mark as Paid",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return; // 🚫 Cancelled


    Swal.fire({text:"Please wait..."});
  Swal.showLoading();

  try {
    // 1️⃣ Update payment status in Firestore
    await updateDoc(doc(db, "orders", id), { paymentStatus: "PAID" });

    // 2️⃣ Update local state
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, paymentStatus: "PAID" } : b
      )
    );

    Swal.fire("Success!", "Payment has been marked as PAID.", "success");

    // 3️⃣ Send email notification
    const updatedBooking = bookings.find((b) => b.id === id);
    if (updatedBooking) {
      await fetch("https://backend-mailer-1.vercel.app/api/matthew_booking_status_email_sender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedBooking,
          paymentStatus: "PAID",
          sellerEmail: "matthewcarwashandcleaning20@gmail.com",
        }),
      });
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    Swal.fire("Error", "Failed to update payment status.", "error");
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
                <p><Label>Email:</Label> {b?.user?.email}</p>
                <p><Label>Phone:</Label> {b?.user?.phone || "N/A"}</p>
                <p><Label>Service:</Label> {b?.serviceTitle}</p>
                <p><Label>Package:</Label> {b?.selectedPackage?.name || "N/A"}</p>
                <p><Label>Price (AED):</Label> {b?.priceAED}</p>
                <p><Label>Selected Date:</Label> {b?.selectedDate}</p>
                <p><Label>Selected Time Slot:</Label> {b?.selectedSlot}</p>
                <p>
                  <Label>
                    <FaCalendarAlt style={{ marginRight: "6px" }} />
                    Booking Date:
                  </Label>{" "}
                  {b.createdAt
                    ? new Date(b.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>

                <p>
                  <Label>Payment Status:</Label>{" "}
                  <strong
                    style={{
                      color: b.paymentStatus === "PAID" ? "green" : "red",
                    }}
                  >
                    {b.paymentStatus || "NOT YET PAID"}
                  </strong>
                </p>

                {/* ✅ Show button only if NOT PAID */}
                {b.paymentStatus !== "PAID" && (
                  <PayButton onClick={() => handleMarkAsPaid(b.id)}>
                    Mark as Paid
                  </PayButton>
                )}

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
