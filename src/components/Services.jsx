// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import p2 from '../Images3/p3.png'
// import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import BookingModal from "./BookingModal"; // make sure this file exists

// const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_STRIPE_KEY"); // Replace with your actual key

// const float = keyframes`
//   0% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0); }
// `;

// const Shape = styled.div`
//   position: absolute;
//   width: ${(props) => props.size || "80px"};
//   height: ${(props) => props.size || "80px"};
//   background: ${(props) => props.color || "#b2f5ea"};
//   transform: rotate(${(props) => props.rotate || "0deg"});
//   opacity: 0.3;
//   z-index: 0;
//   animation: ${float} 6s ease-in-out infinite;
//   border-radius: ${(props) => props.radius || "50%"};
//   top: ${(props) => props.top || "auto"};
//   left: ${(props) => props.left || "auto"};
//   bottom: ${(props) => props.bottom || "auto"};
//   right: ${(props) => props.right || "auto"};
// `;

// const Section = styled.section`
//   background: #f0fdf7;
//   padding: 100px 20px;
//   text-align: center;
//   position: relative;
//   overflow: hidden;
// `;

// const Wrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   position: relative;
//   z-index: 2;
// `;

// const Title = styled.h2`
//   font-size: 38px;
//   font-weight: 800;
//   color: #0c5e36;
//   margin-bottom: 16px;
// `;

// const Description = styled.p`
//   font-size: 17px;
//   font-weight: 500;
//   max-width: 800px;
//   margin: 0 auto 60px;
//   line-height: 1.7;
//   color: #0c5e36;
// `;

// const CardGrid = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 30px;
//   justify-content: center;
// `;

// const Card = styled.div`
//   background: rgba(255, 255, 255, 0.5);
//   padding: 30px 20px;
//   border-radius: 16px;
//   box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
//   width: 320px;
//   transition: all 0.3s ease;
//   border: 2px solid #e0f3ea;

//   &:hover {
//     transform: translateY(-6px);
//     box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7);
//   }
// `;

// const Image = styled.img`
//   width:150px;
//   height:150px;
//   object-fit:cover;
//   border-radius:50%;

// `;

// const ServiceTitle = styled.h3`
//   font-size: 22px;
//   font-weight: bold;
//   color: #0c5e36;
//   margin-bottom: 10px;
// `;

// const ServiceText = styled.p`
//   font-size: 15px;
//   color: #0c5e36;
//   line-height: 1.6;
//   margin-bottom: 15px;
// `;

// const PriceList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0 0 20px 0;
// `;

// const PriceItem = styled.li`
//   font-size: 15px;
//   color: #119458;
//   font-weight: 600;
//   margin-bottom: 6px;
// `;

// const Button = styled.button`
//   background: #119458;
//   color: white;
//   border: none;
//   padding: 10px 22px;
//   font-size: 15px;
//   font-weight: bold;
//   border-radius: 6px;
//   cursor: pointer;

//   &:hover {
//     background: #0e7a45;
//   }
// `;

// const Services = () => {
//   const navigate = useNavigate();

//   const servicesData = [
//   {
//     title: "Car Wash Packages",
//     image: p2,
//     description:
//       "Interior, exterior, and monthly cleaning plans for all vehicle types.",
//     packages: [
//       { name: "One-time wash", price: 15 },
//       { name: "4x/month", price: 50 },
//       { name: "8x/month", price: 80 },
//       { name: "12x/month", price: 100 },
//       { name: "Interior only", price: 25 },
//     ],
//   },
//   {
//     title: "Engine & Tyre Cleaning",
//     image: p2,
//     description:
//       "Complete engine degreasing and tyre change assistance with free wash.",
//     packages: [
//       { name: "Engine & Body", price: 150 },
//       { name: "Tyre Change + Wash", price: 120 },
//     ],
//   },
//   {
//     title: "Home & Office Cleaning",
//     image: p2,
//     description:
//       "Available per hour or via weekly/monthly subscriptions.",
//     packages: [
//       { name: "Per Hour (No Materials)", price: 25 },
//       { name: "Per Hour (With Materials)", price: 35 },
//     ],
//   },
//   {
//     title: "Gardening & Lawn Care",
//     image: p2,
//     description:
//       "Maintenance plans based on your garden size and care frequency.",
//     packages: [
//       { name: "Twice Weekly", price: 100 },
//       { name: "Three Times Weekly", price: 150 },
//       { name: "Daily Care", price: null },
//     ],
//   },
//   {
//     title: "Property Maintenance",
//     image: p2,
//     description:
//       "Routine inspections and fixes tailored to your home or office.",
//     packages: [
//       { name: "4x Monthly Subscription", price: null },
//       { name: "Pricing based on project", price: null },
//     ],
//   },
//   {
//     title: "Handyman Services",
//     image: p2,
//     description:
//       "Electrical, mounting, AC cleaning, and more — with subscriber discounts.",
//     packages: [
//       { name: "Basic Fixes: From", price: 50 },
//       { name: "Full Installation", price: 420 },
//       { name: "Non-subscriber rates apply", price: null },
//     ],
//   },
// ];




//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);

//   const openModal = (service) => {
//     setSelectedService(service);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedService(null);
//   };

//   const handleSuccess = (title, pkg) => {
//     alert(`Booking confirmed for ${title} - ${pkg}`);
//     closeModal()
//   };

//   return (
//     <Section id="services">
//       {/* Background shapes */}
//       <Shape size="200px" color="purple" top="20px" left="10%" />
//       <Shape size="160px" color="blue" top="100px" right="15%" rotate="45deg" />
//       <Shape size="190px" color="pink" bottom="20%" left="8%" />
//       <Shape size="170px" color="red" bottom="100px" right="12%" rotate="-30deg" />
//       <Shape size="150px" color="yellow" top="50%" left="5%" />
//       <Shape size="175px" color="orangered" bottom="15%" left="40%" rotate="20deg" />
//       <Shape size="165px" color="green" top="80px" left="60%" />
//       <Shape size="185px" color="aqua" bottom="50%" right="50%" />
//       <Shape size="185px" color="aqua" bottom="100px" right="5%" />

//       <Wrapper>
//         <Title>Our Service Packages and Pricings</Title>
//         <Description>
//           Premium car wash, cleaning, and maintenance services tailored to your schedule and standards.
//         </Description>

//         <CardGrid>
//           {servicesData.map((service, index) => (
//             <Card key={index}>
//               <Image src={service.image} alt='imagedisplay'/>
//               <ServiceTitle>{service.title}</ServiceTitle>
//               <ServiceText>{service.description}</ServiceText>
//               <PriceList>
//                 {service.packages.map((p, i) => (
//                   <PriceItem key={i}>{p.name} {p.price}</PriceItem>
//                 ))}
//               </PriceList>
//               <Button onClick={() => openModal(service)}>Book Now</Button>
//             </Card>
//           ))}
//         </CardGrid>
//       </Wrapper>

//       <Elements stripe={stripePromise}>
//         <BookingModal
//           open={modalOpen}
//           service={selectedService}
//           onClose={closeModal}
//           onSuccess={handleSuccess}
//         />
//       </Elements>
//     </Section>
//   );
// };

// export default Services;



import React, { useState, useEffect } from "react"; // Import useEffect
import styled, { keyframes } from "styled-components";
import p2 from '../Images3/p3.png'
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BookingModal from "./BookingModal"; // make sure this file exists
import { db } from '../firebaseConfig'; // Import your Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions


const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_STRIPE_KEY"); // Replace with your actual key

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Shape = styled.div`
  position: absolute;
  width: ${(props) => props.size || "80px"};
  height: ${(props) => props.size || "80px"};
  background: ${(props) => props.color || "#b2f5ea"};
  transform: rotate(${(props) => props.rotate || "0deg"});
  opacity: 0.3;
  z-index: 0;
  animation: ${float} 6s ease-in-out infinite;
  border-radius: ${(props) => props.radius || "50%"};
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
  right: ${(props) => props.right || "auto"};
`;

const Section = styled.section`
  background: #f0fdf7;
  padding: 100px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 38px;
  font-weight: 800;
  color: #0c5e36;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 17px;
  font-weight: 500;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.7;
  color: #0c5e36;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 30px 20px;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  width: 320px;
  transition: all 0.3s ease;
  border: 2px solid #e0f3ea;
 

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.7);
  }
`;

const Image = styled.img`
  width:150px;
  height:150px;
  object-fit:cover;
  border-radius:50%;

`;

const ServiceTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #0c5e36;
  margin-bottom: 10px;
`;

const ServiceText = styled.p`
  font-size: 15px;
  color: #0c5e36;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const PriceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
   text-align:left;

`;

const PriceItem = styled.li`
  font-size: 15px;
  // color: #119458;
  color:#444;
  font-weight: 600;
  margin-bottom: 10px;
  background-color:rgb(221, 253, 239);
  padding:5px;
  border-radius:5px;
`;

const Button = styled.button`
  background: #119458;
  color: white;
  border: none;
  padding: 10px 22px;
  font-size: 15px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #0e7a45;
  }
`;

const ServiceDescription = styled.p` /* Styled component for the main service description */
  font-size: 15px;
  color: #0c5e36;
  line-height: 1.6;
  margin-bottom: 15px;
`;


const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #0c5e36;
  margin-top: 50px;
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  color: #E74C3C;
  margin-top: 50px;
`;



const Services = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]); // State to store fetched services
       const [services2, setServices2] = useState([]); // State to store fetched services
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [showBooking, setShowBooking] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Fetch services from Firestore when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollectionRef = collection(db, 'services');
                const querySnapshot = await getDocs(servicesCollectionRef);
                const fetchedServices = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices(fetchedServices);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to load services. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []); // Empty dependency array means this runs once on mount

//     const openBookingPage = (service) => {
    
//   // Save to localStorage
//   localStorage.setItem("selectedService", JSON.stringify(service));
//   navigate('/bookingpage')
// };


    const closeModal = () => {
        setModalOpen(false);
        setSelectedService(null);
    };

    const handleSuccess = (title, pkg) => {
        alert(`Booking confirmed for ${title} - ${pkg}`);
        closeModal();
    };




   // Fetch services from Firestore when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollectionRef = collection(db, 'services2');
                const querySnapshot = await getDocs(servicesCollectionRef);
                const fetchedServices = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setServices2(fetchedServices);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to load services. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []); // Empty dependency array means this runs once on mount



    if (loading) {
        return (
            <Section id="services">
                <Wrapper>
                    <LoadingText>Loading services...</LoadingText>
                </Wrapper>
            </Section>
        );
    }

    if (error) {
        return (
            <Section id="services">
                <Wrapper>
                    <ErrorText>{error}</ErrorText>
                </Wrapper>
            </Section>
        );
    }

    if (services.length === 0) {
      return (
          <Section id="services">
              <Wrapper>
                  <Description>No services available at the moment. Please check back later!</Description>
              </Wrapper>
          </Section>
      );
    }


    return (
        <Section id="services">
            {/* Background shapes */}
            <Shape size="200px" color="purple" top="20px" left="10%" />
            <Shape size="160px" color="blue" top="100px" right="15%" rotate="45deg" />
            <Shape size="190px" color="pink" bottom="20%" left="8%" />
            <Shape size="170px" color="red" bottom="100px" right="12%" rotate="-30deg" />
            <Shape size="150px" color="yellow" top="50%" left="5%" />
            <Shape size="175px" color="orangered" bottom="15%" left="40%" rotate="20deg" />
            <Shape size="165px" color="green" top="80px" left="60%" />
            <Shape size="185px" color="aqua" bottom="50%" right="50%" />
            <Shape size="185px" color="aqua" bottom="100px" right="5%" />

            <Wrapper>
                <Title>Our Service Packages and Pricings</Title>
                <Description>
                    Premium car wash, cleaning, and maintenance services tailored to your schedule and standards.
                </Description>

                <CardGrid>
                    {/* Map over the fetched services instead of hardcoded data */}
                    {services.map((service) => (
                        <Card key={service.id}> {/* Use service.id as key */}
                            {/* Use service.imageUrl if available, fallback to p2 */}
                            <Image src={service.imageUrl || p2} alt={service.title || 'Service Image'} />
                            <ServiceTitle>{service.title || 'Untitled Service'}</ServiceTitle>
                            {/* Display the new description field */}
                            {service.description && <ServiceDescription>{service.description}</ServiceDescription>}
                            <PriceList>
                                {/* Check if packages exist and are an array before mapping */}
                                {service.packages && Array.isArray(service.packages) && service.packages.length > 0 ? (
                                    service.packages.map((p, i) => (
                                        <PriceItem key={i}>
                                            {p.name} {p.price !== null ? `- AED ${p.price}` : ''}
                                        </PriceItem>
                                    ))
                                ) : (
                                    <PriceItem>No packages listed.</PriceItem>
                                )}
                            </PriceList>
                            <Button onClick={() => {setShowBooking(true); setSelectedService(service)}}>Book Now</Button>
                        </Card>
                    ))}
                </CardGrid>

                   <CardGrid style={{marginTop:"50px"}}>
                    {/* Map over the fetched services instead of hardcoded data */}
                    {services2.map((service) => (
                        <Card key={service.id}> {/* Use service.id as key */}
                            {/* Use service.imageUrl if available, fallback to p2 */}
                            <Image src={service.imageUrl || p2} alt={service.title || 'Service Image'} />
                            <ServiceTitle>{service.title || 'Untitled Service'}</ServiceTitle>
                            {/* Display the new description field */}
                            {service.description && <ServiceDescription>{service.description}</ServiceDescription>}
                            <PriceList>
                                {/* Check if packages exist and are an array before mapping */}
                                {service.packages && Array.isArray(service.packages) && service.packages.length > 0 ? (
                                    service.packages.map((p, i) => (
                                        <PriceItem key={i}>
                                            {p.name} {p.price !== null ? `- AED ${p.price}` : ''}
                                        </PriceItem>
                                    ))
                                ) : (
                                    <PriceItem>No packages listed.</PriceItem>
                                )}
                            </PriceList>
                            <Button onClick={()=>navigate('/contactus')}>Contat Us</Button>
                        </Card>
                    ))}
                </CardGrid>
            </Wrapper>

          {showBooking && (
  <BookingModal
    service={selectedService}
    onClose={() => setShowBooking(false)}
    onSuccess={(order) => console.log("Order success:", order)}
  />
)}
        </Section>
    );
};

export default Services;