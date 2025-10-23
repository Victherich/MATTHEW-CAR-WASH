
// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import heroVideo from "../Images3/h1.mp4";
// import heroVideo2 from "../Images3/h2.mp4";
// import heroVideo1 from "../Images3/h3.mp4";
// import heroVideo3 from "../Images3/h4.mp4";
// import heroVideo4 from "../Images3/h1.mp4";
// import herobg from '../Images3/333.jpg'

// // Styled Components
// // const HeroContainer = styled.section`
// //   position: relative;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   height: 100vh;
// //   text-align: center;
// //   overflow: hidden;
// //   background-image:url(${herobg});
// //   background-size:cover;
// //   background-position:center;
// //   padding-top:60px;

// //   video {
// //     position: absolute;
// //     top: 0;
// //     left: 0;
// //     width: 100%;
// //     height: 100%;
// //     object-fit: cover;
// //   }
// // `;


// const HeroContainer = styled.section`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   text-align: center;
//   overflow: hidden;
//   background-image: url(${herobg});
//   background-size: cover;
//   background-position: center;
//   padding-top: 60px;

//   &::before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.2); /* Adjust opacity here */
//     z-index: 1;
//   }

//   video {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     z-index: 0;
//   }

//   > * {
//     position: relative;
//     z-index: 2;
//   }
// `;


// // Text Container
// const HeroText = styled.div`
//   position: absolute;
//   z-index: 2;
//   text-align: center;
// `;

// const HeroTitle = styled.h1`
//   font-size: 4rem;
//   // font-weight: 200;
//   color: white;
//   text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
//   opacity: 0;
//   transform: translateY(50px);
//   animation: ${(props) => (props.isVisible ? "flyInFromBottom 1.5s ease-out forwards" : "none")};
//   //  font-style: italic;
//   // font-family: "Brush Script MT", "Brush Script Std", cursive;

//   @media (max-width: 768px) {
//     font-size: 3rem;
//   }

//   @media (max-width: 428px) {
//     font-size: 2.5rem;
//   }

//   @keyframes flyInFromBottom {
//     from {
//       opacity: 0;
//       transform: translateY(300px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

// const HeroTitle2 = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
//   color: white;
//   text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
//   opacity: 0;
//   transform: translateY(50px);
//   animation: ${(props) => (props.isVisible ? "flyInFromSide 1.5s ease-out forwards" : "none")};

//   @media (max-width: 768px) {
//     font-size: 2.5rem;
//   }

//   @media (max-width: 428px) {
//     font-size: 2rem;
//   }

//   @keyframes flyInFromSide {
//     from {
//       opacity: 0;
//       transform: translatex(500px);
//     }
//     to {
//       opacity: 1;
//       transform: translatex(0);
//     }
//   }
// `;


// const HeroSubtitle = styled.p`
//   font-size: 1.5rem;
//   color: white;
//   text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
//   opacity: 0;
//   transform: translateY(-50px);
//   animation: ${(props) => (props.isVisible ? "flyInFromTop 1s ease-out forwards" : "none")};

//   @media (max-width: 768px) {
//     font-size: 1.2rem;
//   }

//   @media (max-width: 428px) {
//     font-size: 1rem;
//   }

//   @keyframes flyInFromTop {
//     from {
//       opacity: 0;
//       transform: translateY(-300px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

// // Hero Component
// const Hero = () => {
//   const heroRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   // Intersection Observer to detect when the section is in view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.5 }
//     );

//     if (heroRef.current) {
//       observer.observe(heroRef.current);
//     }

//     return () => {
//       if (heroRef.current) observer.unobserve(heroRef.current);
//     };
//   }, []);


//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount((prev) => (prev === 4 ? 0 : prev + 1)); // Reset to 0 after reaching 2
//     }, 6000); // Change every 1 second

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);




//   return (
//     <HeroContainer ref={heroRef}>
//       {count===0&&<video autoPlay muted loop>
//         <source src={heroVideo} type="video/mp4" />
//       </video>}
//       {count===1&&<video autoPlay muted loop>
//         <source src={heroVideo1} type="video/mp4" />
//       </video>}
//       {count===2&&<video autoPlay muted loop>
//         <source src={heroVideo2} type="video/mp4" />
//       </video>}
//       {count===3&&<video autoPlay muted loop>
//         <source src={heroVideo3} type="video/mp4" />
//       </video>}
//       {count===4&&<video autoPlay muted loop>
//         <source src={heroVideo4} type="video/mp4" />
//       </video>}

//       <HeroText>
//         <HeroTitle isVisible={isVisible}>MATTHEW CAR WASH <br/>AND CLEANING [MCC] </HeroTitle>
//         {/* <HeroTitle2 isVisible={isVisible}>AFRICAN JOURNAL OF GENERAL AGRICULTURE</HeroTitle2> */}
        
//         <HeroSubtitle isVisible={isVisible}>"Keeping safe environments"</HeroSubtitle>
    
//       </HeroText>
//     </HeroContainer>
//   );
// };

// export default Hero;






import React, { useContext, useRef } from "react";
import styled from "styled-components";
import heroVideo from "../Images3/media2.mp4";
import heroPoster from "../Images3/333.jpg";
import { Fade, Slide, Zoom, Flip } from "react-awesome-reveal"; // Import all animation components
import { Context } from "./Context";

// Styled Components
const HeroContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;
  background-color: #000;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeroText = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 1rem;
  width: 90%;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  @media (max-width: 428px) {
    font-size: 2rem;
  }
`;

const HeroTitle2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 428px) {
    font-size: 1.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 428px) {
    font-size: 1rem;
  }
`;

// Hero Component
const Hero = () => {
  const heroRef = useRef(null);

  const {state} = useContext(Context);

  console.log(state)

  return (
    <HeroContainer ref={heroRef}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
      >
        <source src={heroVideo} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
      <VideoOverlay />
      <HeroText>
        {/* Using a Flip animation for a dramatic entrance */}
        <Flip triggerOnce={false} duration={2000}>
          <HeroTitle>MACO</HeroTitle>
        </Flip>
        {/* Using a Fade animation for a smooth, subtle effect */}
        <Zoom triggerOnce={false} delay={500} duration={3000}>
          <HeroTitle2>Your all-in-one solution for cars, home cleaning and maintenance</HeroTitle2>
        </Zoom>
        {/* Using a Zoom animation for a strong, impactful effect */}
        <Zoom triggerOnce={false} delay={1000} duration={3000}>
          {/* <HeroSubtitle>Advancing knowledge, fostering innovation, and building a sustainable future for biological sciences.</HeroSubtitle> */}
        </Zoom>
      </HeroText>
    </HeroContainer>
  );
};

export default Hero;