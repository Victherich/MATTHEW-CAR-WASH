
// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import Hero4 from "./Hero4";

// // Image Imports
// import im3 from '../Images3/p2.png';
// import im4 from '../Images3/p3.png';
// import im5 from '../Images3/p4.png';
// import im6 from '../Images3/p5.png';
// import im7 from '../Images3/p6.png';
// import im8 from '../Images3/p7.png';
// import im9 from '../Images3/p8.png';
// import im10 from '../Images3/p9.png';
// import im11 from '../Images3/333.jpg';
// import im12 from '../Images3/p11.jpg';
// import im13 from '../Images3/p12.jpg';
// import im14 from '../Images3/p4.png';

// // --- Animations ---
// const floating = keyframes`
//   0% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
//   50% { transform: translateY(20px) rotate(10deg); opacity: 1; }
//   100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
// `;

// const rotate = keyframes`
//   0% { transform: rotate(0deg); opacity: 0.5; }
//   100% { transform: rotate(360deg); opacity: 0.7; }
// `;

// // --- Styled Components ---
// const GalleryWrapper = styled.div`
//   position: relative;
//   background: rgba(0,0,255,0.1);
//   text-align: center;
//   overflow: hidden;
//   padding-bottom: 80px;
// `;

// const FloatingShape = styled.div`
//   position: absolute;
//   width: ${(props) => props.size || "150px"};
//   height: ${(props) => props.size || "150px"};
//   background: ${(props) => props.bgColor || "rgba(255, 0, 0, 0.3)"};
//   border-radius: ${(props) => (props.circle ? "50%" : "20%")};
//   animation: ${floating} ${(props) => props.duration || "6s"} infinite ease-in-out;
//   z-index: 2;
//   filter: blur(5px);
//   opacity: 0.8;
// `;

// const RotatingElement = styled.div`
//   position: absolute;
//   width: 120px;
//   height: 120px;
//   border: 6px solid rgba(0, 0, 255, 0.3);
//   border-radius: 50%;
//   top: 50%;
//   right: 15%;
//   animation: ${rotate} 15s linear infinite;
//   z-index: 1;
// `;

// const GalleryTitle = styled.h1`
//   font-size: 48px;
//   font-weight: bold;
//   text-transform: uppercase;
//   color: rgba(0, 0, 255, 0.8);
//   margin-bottom: 40px;
//   letter-spacing: 3px;
// `;

// const GalleryGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   grid-auto-rows: 220px;
//   gap: 20px;
//   max-width: 1200px;
//   margin: auto;
// `;

// const GalleryItem = styled.div`
//   position: relative;
//   cursor: pointer;
//   overflow: hidden;
//   border-radius: ${(props) => props.border || "10px"};
//   border: ${(props) => props.border || "2px"} solid #0CC1E0;

//   &:hover img {
//     transform: scale(1.1);
//     filter: brightness(80%);
//   }
// `;

// const GalleryImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.4s ease, filter 0.4s ease;
// `;

// const LightboxOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.9);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 999;
//   overflow: hidden;
// `;

// const LightboxContent = styled.div`
//   position: relative;
//   width: 80%;
//   max-width: 1000px;
// `;

// const LightboxImage = styled.img`
//   width: 100%;
//   height: auto;
//   border-radius: 10px;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 20px;
//   right: 20px;
//   background: white;
//   color: black;
//   border: none;
//   padding: 10px 12px;
//   font-size: 18px;
//   cursor: pointer;
//   border-radius: 50%;
//   transition: 0.3s;
//   z-index: 1000;

//   &:hover {
//     background: red;
//     color: white;
//   }
// `;

// const NavButton = styled.button`
//   position: absolute;
//   top: 50%;
//   ${(props) => (props.left ? "left: 20px;" : "right: 20px;")}
//   background: rgba(255, 255, 255, 0.8);
//   color: black;
//   border: none;
//   padding: 12px 16px;
//   font-size: 20px;
//   cursor: pointer;
//   border-radius: 50%;
//   transform: translateY(-50%);
//   transition: 0.3s;
//   z-index: 1000;

//   &:hover {
//     background: #0CC1E0;
//     color: white;
//   }
// `;

// const Button = styled.button`
//   background: white;
//   color: #0CC1E0;
//   padding: 14px 24px;
//   font-size: 16px;
//   font-weight: bold;
//   border: 2px solid #0CC1E0;
//   border-radius: 6px;
//   cursor: pointer;
//   margin-top: 30px;
//   transition: 0.3s;

//   &:hover {
//     background: #119458;
//     color: white;
//   }
// `;

// // --- Images Array ---
// const images = [
//   { src: im3 }, { src: im4 }, { src: im5 }, { src: im6 },
//   { src: im7 }, { src: im8 }, { src: im9 }, { src: im10 },
//   { src: im11 }, { src: im12 }, { src: im13 }, { src: im14 },
// ];

// const Gallery = () => {
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleImageClick = (index) => setCurrentIndex(index);
//   const closeLightbox = () => setCurrentIndex(null);
//   const showPrev = (e) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
//   };
//   const showNext = (e) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
//   };

//   return (
//     <GalleryWrapper>
//       <Hero4 />
//       {/* <FloatingShape top="5%" left="5%" size="180px" bgColor="rgba(255, 0, 0, 0.4)" circle />
//       <FloatingShape top="80%" left="80%" size="200px" bgColor="rgba(0, 255, 255, 0.3)" />
//       <RotatingElement /> */}

//       <GalleryTitle></GalleryTitle>
//       {/* <p style={{ fontStyle: "italic", marginBottom: "20px", fontWeight: "bold", color: "rgba(0,0,255,0.7)" }}>
//         (Click image to expand)
//       </p> */}

//       <GalleryGrid>
//         {(location.pathname === "/" ? images.slice(0, 3) : images).map((img, index) => (
//           <GalleryItem key={index} onClick={() => handleImageClick(index)}>
//             <GalleryImage src={img.src} alt={`Gallery Image ${index + 1}`} />
//           </GalleryItem>
//         ))}
//       </GalleryGrid>

//       {location.pathname === "/" && (
//         <Button onClick={() => navigate("/gallery")}>Explore More</Button>
//       )}

//       {currentIndex !== null && (
//         <LightboxOverlay onClick={closeLightbox}>
//           <LightboxContent onClick={(e) => e.stopPropagation()}>
//             <LightboxImage src={images[currentIndex].src} alt="Full view" />
//             <CloseButton onClick={closeLightbox}><FaTimes /></CloseButton>
//             <NavButton left onClick={showPrev}><FaArrowLeft /></NavButton>
//             <NavButton onClick={showNext}><FaArrowRight /></NavButton>
//           </LightboxContent>
//         </LightboxOverlay>
//       )}
//     </GalleryWrapper>
//   );
// };

// export default Gallery;



import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Swal from "sweetalert2";
import Hero4 from "./Hero4";

// --- Animations ---
const floating = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(20px) rotate(10deg); opacity: 1; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); opacity: 0.5; }
  100% { transform: rotate(360deg); opacity: 0.7; }
`;

// --- Styled Components ---
const GalleryWrapper = styled.div`
  position: relative;
  background: rgba(0, 0, 255, 0.1);
  text-align: center;
  overflow: hidden;
  padding-bottom: 80px;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 220px;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
  margin-top:50px;
`;

const GalleryItem = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid #0cc1e0;

  &:hover img {
    transform: scale(1.1);
    filter: brightness(80%);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const LightboxContent = styled.div`
  position: relative;
  width: 80%;
  max-width: 1000px;
`;

const LightboxImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  color: black;
  border: none;
  padding: 10px 12px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%;
  transition: 0.3s;
  z-index: 1000;

  &:hover {
    background: red;
    color: white;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 20px;" : "right: 20px;")}
  background: rgba(255, 255, 255, 0.8);
  color: black;
  border: none;
  padding: 12px 16px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  transform: translateY(-50%);
  transition: 0.3s;
  z-index: 1000;

  &:hover {
    background: #0cc1e0;
    color: white;
  }
`;

const Button = styled.button`
  background: white;
  color: #0cc1e0;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #0cc1e0;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 30px;
  transition: 0.3s;

  &:hover {
    background: #119458;
    color: white;
  }
`;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 Fetch images from Firestore
  const fetchImages = async () => {
    setLoading(true);
    // Swal.fire({
    //   title: "Loading Gallery...",
    //   allowOutsideClick: false,
    //   didOpen: () => Swal.showLoading(),
    // });

    try {
      const q = query(collection(db, "uploaded_images2"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(data);
      // Swal.close();
    } catch (error) {
      console.error("Error fetching images:", error);
      // Swal.fire("Error", "Could not load gallery images.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // --- Lightbox Controls ---
  const handleImageClick = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };
  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <GalleryWrapper>
      <Hero4 />


      {loading ? (
        <p style={{ color: "#333" }}>Loading images...</p>
      ) : images.length > 0 ? (
        <>
          <GalleryGrid>
            {(location.pathname === "/" ? images.slice(0, 3) : images).map((img, index) => (
              <GalleryItem key={img.id} onClick={() => handleImageClick(index)}>
                <GalleryImage src={img.url} alt={img.fileName || `Image ${index + 1}`} />
              </GalleryItem>
            ))}
          </GalleryGrid>

          {location.pathname === "/" && (
            <Button onClick={() => navigate("/gallery")}>Explore More</Button>
          )}
        </>
      ) : (
        <p style={{ color: "#333" }}>No images found in the gallery yet.</p>
      )}

      {/* Lightbox */}
      {currentIndex !== null && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxImage
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.fileName || "Full view"}
            />
            <CloseButton onClick={closeLightbox}>
              <FaTimes />
            </CloseButton>
            <NavButton left onClick={showPrev}>
              <FaArrowLeft />
            </NavButton>
            <NavButton onClick={showNext}>
              <FaArrowRight />
            </NavButton>
          </LightboxContent>
        </LightboxOverlay>
      )}
    </GalleryWrapper>
  );
};

export default Gallery;
