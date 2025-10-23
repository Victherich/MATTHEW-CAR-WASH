


// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import PropTypes from "prop-types";
// import { db } from "../firebaseConfig";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { FaArrowDown } from "react-icons/fa";

// // === Styled Components ===
// const Overlay = styled.div`
//   position: fixed;
//   top: 0; left: 0;
//   width: 100vw; height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex; justify-content: center; align-items: center;
//   z-index: 1000;
// `;

// const ModalBox = styled.div`
//   background: white;
//   padding: 30px;
//   border-radius: 12px;
//   width: 90%; max-width: 600px;
//   max-height: 90vh;
//   overflow-y: auto;
//   box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
// `;

// const Title = styled.h2`
//   font-size: 24px;
//   color: #0c5e36;
//   text-align: center;
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 15px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
//   font-size: 14px;
// `;

// const Select = styled.select`
//   padding: 10px;
//   width: 100%;
//   border: 2px solid #ccc;
//   border-radius: 6px;
//   outline: none;
//   margin-bottom: 20px;
// `;

// const Button = styled.button`
//   background: ${(props) => (props.secondary ? "#ccc" : "#119458")};
//   color: ${(props) => (props.secondary ? "#000" : "#fff")};
//   border: none;
//   padding: 10px 22px;
//   font-size: 15px;
//   font-weight: bold;
//   border-radius: 6px;
//   cursor: pointer;
//   &:hover {
//     background: ${(props) => (props.secondary ? "#aaa" : "#0e7a45")};
//   }
// `;

// const Actions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const PayPalBox = styled.div`
//   margin-top: 20px;
//   text-align: center;
// `;

// // === Component ===
// const BookingModal = ({ service, onClose, onSuccess }) => {
//   const [selectedPackage, setSelectedPackage] = useState({});
//   const [showPayPal, setShowPayPal] = useState(false);
//   const paypalRef = useRef(null);
//   const [userData, setUserData] = useState({ name: "", email: "", phone: "" });

//   const extractAmount = (pkg) => {
//     const AED_TO_USD = 0.27;
//     const aedPrice = pkg?.price ? parseFloat(pkg.price) : 50;
//     return parseFloat((aedPrice * AED_TO_USD).toFixed(2));
//   };

//   // === Validate details before opening PayPal ===
//   const handleProceedToPay = () => {
//     if (!selectedPackage?.name) {
//       Swal.fire("Select a Package", "Please choose a package before proceeding.", "warning");
//       return;
//     }

//     if (!userData.name || !userData.email || !userData.phone) {
//       Swal.fire("Missing Details", "Please fill in all user details before payment.", "warning");
//       return;
//     }

//     setShowPayPal(true);
//   };

//   useEffect(() => {
//     if (showPayPal && window.paypal && selectedPackage) {
//       paypalRef.current.innerHTML = "";

//       window.paypal.Buttons({
//         style: { layout: "vertical", color: "gold", shape: "pill", label: "paypal" },
//         createOrder: (data, actions) => {
//           return actions.order.create({
//             purchase_units: [{ amount: { value: extractAmount(selectedPackage).toString() } }],
//           });
//         },
//         onApprove: async (data, actions) => {
//           const details = await actions.order.capture();
//           const orderDetails = {
//             user: userData,
//             serviceTitle: service?.title,
//             selectedPackage,
//             sellerEmail: "matthewcarwashandcleaning20@gmail.com",
//             priceAED: selectedPackage.price,
//             priceUSD: extractAmount(selectedPackage),
//             paymentDetails: details,
//             date: new Date().toISOString(),
//           };

//           await saveOrderToDatabase(orderDetails);
//           await sendOrderEmails(orderDetails);

//           Swal.fire("Success", "Payment successful! Confirmation email sent. Our team shall contact you soon. Thanks", "success");
//           onSuccess && onSuccess(orderDetails);
//           onClose();
//         },
//         onError: (err) => {
//           console.error("PayPal error:", err);
//           Swal.fire("Error", "Payment failed. Try again.", "error");
//         },
//       }).render(paypalRef.current);
//     }
//   }, [showPayPal, selectedPackage]);

//   const saveOrderToDatabase = async (order) => {
//     try {
//       await addDoc(collection(db, "orders"), { ...order, createdAt: serverTimestamp() });
//     } catch (error) {
//       console.error("Error saving order:", error);
//       Swal.fire("Error", "Failed to save order.", "error");
//     }
//   };

//   const sendOrderEmails = async (order) => {
//     try {
//       const response = await fetch(
//         "https://backend-mailer-1.vercel.app/api/matthew_car_wash_order_email_sender",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(order),
//         }
//       );
//       if (!response.ok) throw new Error("Email failed");
//     } catch (err) {
//       console.error("Email error:", err);
//       Swal.fire("Error", "Failed to send confirmation email.", "error");
//     }
//   };

//   if (!service) return null;

//   return (
//     <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <ModalBox>
//         <p secondary onClick={onClose} style={{borderRadius:"50%", textAlign:"right", cursor:"pointer", fontWeight:"bold"}}>X</p>
//         <Title>Select a Package for {service.title}</Title>
// <p><FaArrowDown/>Click Dropdown for more options:<FaArrowDown/></p>
//         <Select onChange={(e) => {setSelectedPackage(service.packages[e.target.value]); setShowPayPal(false);}}>
//           <option >-- Select a Package --</option>
//           {service.packages.map((pkg, i) => (
//             <option key={i} value={i}>
//               {pkg.name} - AED {pkg.price}
//             </option>
//           ))}
//         </Select>

//         <h3 style={{ color: "#119458" }}>Enter Your Details</h3>
//         <Input
//           placeholder="Full Name"
//           value={userData.name}
//           onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//         />
//         <Input
//           placeholder="Email"
//           type="email"
//           value={userData.email}
//           onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//         />
//         <Input
//           placeholder="Phone Number"
//           value={userData.phone}
//           onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
//         />

//         {!showPayPal && (
//           <Actions>
//             <Button onClick={handleProceedToPay}>Proceed to Pay</Button>
//             <Button secondary onClick={onClose}>Cancel</Button>
//           </Actions>
//         )}

//         {showPayPal && (
//           <PayPalBox>
//             <h4>USD {extractAmount(selectedPackage)}</h4>
//             <div ref={paypalRef}></div>
//           </PayPalBox>
//         )}
//       </ModalBox>
//     </Overlay>
//   );
// };

// BookingModal.propTypes = {
//   service: PropTypes.object.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSuccess: PropTypes.func,
// };

// export default BookingModal;





import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { FaArrowDown } from "react-icons/fa";

// === Styled Components ===
const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%; max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #0c5e36;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 10px;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 6px;
  outline: none;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: ${(props) => (props.secondary ? "#ccc" : "#119458")};
  color: ${(props) => (props.secondary ? "#000" : "#fff")};
  border: none;
  padding: 10px 22px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.secondary ? "#aaa" : "#0e7a45")};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const PayPalBox = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const BookingModal = ({ service, onClose, onSuccess }) => {
  const [selectedPackage, setSelectedPackage] = useState({});
  const [showPayPal, setShowPayPal] = useState(false);
  const paypalRef = useRef(null);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const extractAmount = (pkg) => {
    const AED_TO_USD = 0.27;
    const aedPrice = pkg?.price ? parseFloat(pkg.price) : 50;
    return parseFloat((aedPrice * AED_TO_USD).toFixed(2));
  };

  // === Generate 1-hour time slots (8AM → 8PM) ===
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const startHour = 8 + i;
    const endHour = startHour + 1;
    const format = (h) => (h <= 12 ? h : h - 12);
    const ampmStart = startHour < 12 ? "AM" : "PM";
    const ampmEnd = endHour < 12 ? "AM" : "PM";
    return `${format(startHour)} ${ampmStart} - ${format(endHour)} ${ampmEnd}`;
  });

  // === Load booked slots for selected date ===
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      const q = query(collection(db, "orders"), where("selectedDate", "==", selectedDate));
      const snap = await getDocs(q);
      const taken = snap.docs.map((d) => d.data().selectedSlot);
      setBookedSlots(taken);
    };
    fetchBookedSlots();
  }, [selectedDate]);

  const handleProceedToPay = () => {
    if (!selectedPackage?.name)
      return Swal.fire("Select a Package", "Please choose a package first.", "warning");
    if (!userData.name || !userData.email || !userData.phone)
      return Swal.fire("Missing Details", "Please fill in all user details.", "warning");
    if (!selectedDate)
      return Swal.fire("Select Date", "Please select a preferred date.", "warning");
    if (!selectedSlot)
      return Swal.fire("Select Time Slot", "Please choose a time slot.", "warning");

    setShowPayPal(true);
  };

  useEffect(() => {
    if (showPayPal && window.paypal && selectedPackage) {
      paypalRef.current.innerHTML = "";

      window.paypal.Buttons({
        style: { layout: "vertical", color: "gold", shape: "pill", label: "paypal" },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: extractAmount(selectedPackage).toString() } }],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          const orderDetails = {
            user: userData,
            serviceTitle: service?.title,
            selectedPackage,
            selectedDate,
            selectedSlot,
            sellerEmail: "matthewcarwashandcleaning20@gmail.com",
            priceAED: selectedPackage.price,
            priceUSD: extractAmount(selectedPackage),
            paymentDetails: details,
            date: new Date().toISOString(),
          };

          await saveOrderToDatabase(orderDetails);
          await sendOrderEmails(orderDetails);
          Swal.fire("Success", "Booking confirmed! We'll contact you soon, Please check your email for confirmation. Thanks", "success");
          onSuccess && onSuccess(orderDetails);
          onClose();
        },
        onError: (err) => {
          console.error("PayPal error:", err);
          Swal.fire("Error", "Payment failed. Try again.", "error");
        },
      }).render(paypalRef.current);
    }
  }, [showPayPal, selectedPackage]);

  const saveOrderToDatabase = async (order) => {
    try {
      await addDoc(collection(db, "orders"), { ...order, createdAt: serverTimestamp() });
    } catch (error) {
      console.error("Error saving order:", error);
      Swal.fire("Error", "Failed to save order.", "error");
    }
  };

  const sendOrderEmails = async (order) => {
    try {
      const response = await fetch("https://backend-mailer-1.vercel.app/api/matthew_car_wash_order_email_sender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error("Email failed");
    } catch (err) {
      console.error("Email error:", err);
      Swal.fire("Error", "Failed to send confirmation email.", "error");
    }
  };

  if (!service) return null;

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalBox>
        <p onClick={onClose} style={{ borderRadius: "50%", textAlign: "right", cursor: "pointer", fontWeight: "bold" }}>X</p>
        <Title>Select a Package for {service.title}</Title>
        <p><FaArrowDown /> Click Dropdown for more options: <FaArrowDown /></p>

        <Select onChange={(e) => { setSelectedPackage(service.packages[e.target.value]); setShowPayPal(false); }}>
          <option>-- Select a Package --</option>
          {service.packages.map((pkg, i) => (
            <option key={i} value={i}>{pkg.name} - AED {pkg.price}</option>
          ))}
        </Select>

        <h3 style={{ color: "#119458" }}>Select Date & Time</h3>
        <Input type="date" min={new Date().toISOString().split("T")[0]} value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)} />

        {selectedDate && (
          <Select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
            <option value="">-- Select Time Slot --</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot} disabled={bookedSlots.includes(slot)}>
                {slot} {bookedSlots.includes(slot) ? " (Booked)" : ""}
              </option>
            ))}
          </Select>
        )}

        <h3 style={{ color: "#119458" }}>Enter Your Details</h3>
        <Input placeholder="Full Name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
        <Input placeholder="Email" type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <Input placeholder="Phone Number" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />

        {!showPayPal && (
          <Actions>
            <Button onClick={handleProceedToPay}>Proceed to Pay</Button>
            <Button secondary onClick={onClose}>Cancel</Button>
          </Actions>
        )}

        {showPayPal && (
          <PayPalBox>
            <h4>USD {extractAmount(selectedPackage)}</h4>
            <div ref={paypalRef}></div>
          </PayPalBox>
        )}
      </ModalBox>
    </Overlay>
  );
};

BookingModal.propTypes = {
  service: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};

export default BookingModal;
