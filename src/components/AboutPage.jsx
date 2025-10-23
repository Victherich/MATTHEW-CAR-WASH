// import React from "react";
// import styled from "styled-components";
// import { FaHandHoldingHeart, FaUsers, FaBook, FaHandshake, FaGlobe, FaLightbulb, FaUserFriends, FaLandmark, FaPeace, FaComment, FaHandsHelping } from "react-icons/fa";
// import Hero3 from "./Hero3";
// import bg from '../Images/7676.jpg'
// import OperationalModule from "./OperationalModule";
// import InterventionStrategies from "./InterventionStrategies";
// import { useNavigate } from "react-router-dom";

// // Styled Components
// const PageWrapper = styled.div`
//   font-family: "Arial", sans-serif;
//   background: #f9f9f9;
// `;

// const HeroSection = styled.div`
//   background: url("https://source.unsplash.com/1600x900/?charity,helping-hands") center/cover no-repeat;
//   color: white;
//   text-align: center;
//   padding: 120px 20px;
// `;

// const HeroTitle = styled.h1`
//   font-size: 42px;
//   font-weight: bold;
//   text-transform: uppercase;
// `;

// const HeroSubtitle = styled.p`
//   font-size: 18px;
//   margin-top: 10px;
// `;

// const Section = styled.section`
//   padding: 60px 20px;
//   text-align: center;
// `;

// const Section2 = styled.div`
//   padding: 60px 20px;
//   text-align: center;
//   background-image:url(${bg});
// //   background-color:red;
// `;

// const SectionContainer = styled.div`
//   max-width: 900px;
//   margin: auto;
// `;

// const SectionTitle = styled.h2`
//   font-size: 32px;
//   color: rgba(0,0,255,0.5);
//   margin-bottom: 20px;
// `;

// const SectionText = styled.p`
//   font-size: 18px;
//   line-height: 1.6;
//   color: #333;
// `;

// const IconWrapper = styled.div`
//   font-size: 50px;
//   color: rgba(0,0,255,0.5);
//   margin-bottom: 15px;
// `;

// const GridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//   gap: 20px;
//   margin-top: 30px;
// `;

// const GridItem = styled.div`
//   background: #fff;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
//   text-align: center;
// `;

// const Button = styled.button`
//   background: white;
//   color: rgba(0,0,255,0.5);
//   padding: 12px 20px;
//   font-size: 16px;
//   font-weight:bold;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 20px;
//   transition: 0.3s;

//   &:hover {
//     // background: #;
//   }
// `;

// // About Page Component
// const AboutPage = () => {
//     const navigate = useNavigate();
//   return (
//     <PageWrapper>
//       {/* Hero Section */}
//       {/* <HeroSection>
//         <HeroTitle>About Eze Mbionwu Foundation</HeroTitle>
//         <HeroSubtitle>For Community Development & Stability</HeroSubtitle>
//       </HeroSection> */}

//       <Hero3/>

//       {/* About Section */}
//       <Section>
//         <SectionContainer>
//           <IconWrapper>
//             <FaHandHoldingHeart />
//           </IconWrapper>
//           <SectionTitle>Who We Are</SectionTitle>
//           <SectionText style={{textAlign:"left"}}>
//           Eze Mbionwu Foundation for Community Development and Stability, is a community based Non-Governmental Organization registered under part “C” of Corporate Affairs Commission.
// Everybody is designed by God to be a blessing, protector, lifter of soul for someone.
// To me , I always asked God to bless me so that I will in turn bless others.
// <br/><br/>The establishment of the Eze Mbionwu foundation for Community Development and Stability is born out of the desire to contribute effectively, towards touching peoples lives positively in the areas of Health, Education, Technical and Vocational Skill Acquisition, Small and Medium Enterprises also to encourage youth to imbibe and embrace Agriculture as the only panacea to ensure self sufficiency.
// There is no gain saying the fact that Nigeria is blessed with abundant human and material resources but the problem has always been to transform those our potentials into a reality.

// <br/><br/>The youths who constitute about 60% of the entire population has always been at the receiving end. At this junction, it has become imperative to position the  youths especially those of us who are not opportune to go to school to embrace new lease of life.
// Leadership as shepherding, protection for the weak, feeding the hungry and  bandaging the injured. Leadership is also setting examples, empowering people, mentoring people and inspiring people, leadership is also about showing mercy and compassion.
// Taking all these into cognisance, it is imperative to start now to effect these changes according to the former U.N Secretary General Kofi Annan “change is necessary, when one changes it makes a different”. Therefore let us do what we are convinced about”.
// </SectionText>
        
//         </SectionContainer>
//       </Section>

//       {/* Mission & Vision */}
//       <Section2>
//         <GridContainer>
//           <GridItem style={{backgroundColor:"rgba(255,255,255,0.8)"}} >
//             <IconWrapper>
//               <FaLightbulb />
//             </IconWrapper>
//             <SectionTitle>Our Mission</SectionTitle>
//             <SectionText>
//             Those who make a difference in history live life rather than simply watch it, have at least one common characteristics among them they do something.
// Therefore our desire is to operate and adopt a practice that will be generally accepted that will usher in transformation, assistance, empower and develop less-privilege in the society.
//  </SectionText>
//           </GridItem>

//           <GridItem style={{backgroundColor:"rgba(255,255,255,0.8)"}}>
//             <IconWrapper>
//               <FaGlobe />
//             </IconWrapper>
//             <SectionTitle>Our Vision</SectionTitle>
//             <SectionText>
//             To inculcate the word ‘possible’ in the brain of subconscious defence mechanism for the people to believe in themselves and therefore get things done. When these happen will minimize unemployment, hunger and underdevelopment, literacy, social vices which is currently ravaging the country mostly the people in the rural areas will be bought to the barest minimum.  </SectionText>
//           </GridItem>
//         </GridContainer>
//       </Section2>

//       {/* Goals Section */}
//       <Section style={{ background: "#f4f4f4" }}>
//         <SectionTitle>Our Goals</SectionTitle>
//         <GridContainer>
//           <GridItem>
//             <IconWrapper>
//               <FaUsers />
//             </IconWrapper>
//             <SectionText>To contribute effectively our little quota that will usher in a Transformation of an individual person who in turn contribute to the Development of our beloved Country.</SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaUserFriends />
//             </IconWrapper>
//             <SectionText>To assist widows and aged women on income generating activities.</SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaHandshake />
//             </IconWrapper>
//             <SectionText>To adopt a model that will guarantee self sufficiency to the less privileged and physically-challenged.</SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaLandmark />
//             </IconWrapper>
//             <SectionText>To bridge the gap between the government and rural dwellers by facilitating a process for ensuring infrastructural development for communal upliftment.</SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaPeace />
//             </IconWrapper>
//             <SectionText>
//             To facilitate capacity building in the area of conflict prevention and the mediation.  </SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaComment />
//             </IconWrapper>
//             <SectionText>
//         To promote dialogue as means to settling dispute in communities rather than violence which can be experienced in many instances. </SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaHandsHelping />
//             </IconWrapper>
//             <SectionText>
//             To encourage and institute a community help projects for development. </SectionText>
//           </GridItem>

//           <GridItem>
//             <IconWrapper>
//               <FaGlobe />
//             </IconWrapper>
//             <SectionText>
//             To become a model for the country and also promoting understanding among diverse National, Ethnic & Religious groups. </SectionText>
//           </GridItem>
//         </GridContainer>
//       </Section>

//       {/* Intervention Strategies */}
//       {/* <Section>
//         <SectionContainer>
//           <SectionTitle>Our Approach</SectionTitle>
//           <SectionText>
//             We use **advocacy, sponsorships, financing, and partnerships** to achieve our mission.  
//             We also partner with **governmental bodies, NGOs, corporate institutions, and social leaders.**
//           </SectionText>
//         </SectionContainer>
//       </Section> */}
//       <OperationalModule/>

//       <InterventionStrategies/>

//       {/* Call to Action */}
//       <Section style={{ background: "rgba(0,0,255,0.5)", color: "white" }}>
//         <SectionContainer>
//           <SectionTitle style={{color:"white"}}>Join Our Cause</SectionTitle>
//           <SectionText style={{color:"white"}}>Be a part of the change. Your support helps us impact more lives!</SectionText>
//           <Button onClick={()=>navigate('/donate')}>Get Involved</Button>
//         </SectionContainer>
//       </Section>
//     </PageWrapper>
//   );
// };

// export default AboutPage;
import React from "react";
import styled from "styled-components";
import { 
  FaHandHoldingHeart, FaUsers, FaBook, FaHandshake, FaGlobe, 
  FaLightbulb, FaUserFriends, FaLandmark, FaPeace, FaComment, FaHandsHelping 
} from "react-icons/fa";
import Hero3 from "./Hero3";
import bg from '../Images/7676.jpg';
import OperationalModule from "./OperationalModule";
import InterventionStrategies from "./InterventionStrategies";
import { useNavigate } from "react-router-dom";
import logo from '../Images2/logo.jpeg';
import im13 from '../Images3/333.jpg'

// Styled Components
const PageWrapper = styled.div`

  background: #f9f9f9;
`;

// const HeroSection = styled.div`
//   background: url(${im13}) center/cover no-repeat;
//   color: white;
//   text-align: center;
//   padding: 120px 20px;
//   padding-top:200px;
// `;


const HeroSection = styled.div`
  position: relative;
  background: url(${im13}) center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 120px 20px;
  padding-top: 200px;
  z-index: 1;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.2); /* semi-transparent black */
    z-index: -1;
  }
`;


const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
`;


const Section = styled.section`
  padding: 60px 20px;
  text-align: center;
`;

const Section2 = styled.div`
  padding: 60px 20px;
  text-align: center;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
`;

const SectionContainer = styled.div`
  max-width: 900px;
  margin: auto;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  color: #0CC1E0;
  margin-bottom: 20px;
`;

const SectionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #111;
  text-align: left;
`;

const IconWrapper = styled.div`
  font-size: 50px;
  color: #0CC1E0;
  margin-bottom: 15px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
`;

const GridItem = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Button = styled.button`
  background: white;
  color: rgba(0,0,255,0.7);
  padding: 14px 24px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid rgba(0,0,255,0.5);
  border-radius: 6px;
  cursor: pointer;
  margin-top: 30px;
  transition: 0.3s;

  &:hover {
    background: rgba(0,0,255,0.7);
    color: white;
  }
`;

const LogoImg = styled.img`
  width: 80px;
  margin-bottom: 15px;
  border-radius: 12px;
`;

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* Hero */}
      <HeroSection>
    
        <HeroTitle>About Us</HeroTitle>
        <HeroSubtitle>Driven by Excellence. Committed to Clean. Powered by Community.</HeroSubtitle>
      </HeroSection>

      {/* About Section */}
     <Section>
  <SectionContainer>
    <IconWrapper>
      <FaHandHoldingHeart />
    </IconWrapper>
    <SectionTitle>Who We Are</SectionTitle>
    <SectionText>
      At MACO, we are committed to redefining cleanliness and customer service excellence. With a passion for perfection and a heart for service, we deliver professional car wash, home cleaning, and maintenance solutions that leave lasting impressions. We aim to build trust, one clean space at a time.
    </SectionText>
  </SectionContainer>
</Section>

{/* Mission & Vision */}
<Section2>
  <GridContainer>
    <GridItem style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
      <IconWrapper>
        <FaLightbulb />
      </IconWrapper>
      <SectionTitle>Our Mission</SectionTitle>
      <SectionText>
        To provide top-tier, eco-friendly maintenance, cleaning and car care services that enhance everyday life, convenience, and comfort for our customers.
      </SectionText>
    </GridItem>

    <GridItem style={{ backgroundColor: "rgba(255,255,255,0.9)" }}>
      <IconWrapper>
        <FaGlobe />
      </IconWrapper>
      <SectionTitle>Our Vision</SectionTitle>
      <SectionText>
        To become the region’s most trusted name in maintenance, car care and cleaning services—known for quality, reliability, and genuine care.
      </SectionText>
    </GridItem>
  </GridContainer>
</Section2>

{/* Our Goals */}
<Section>
  <SectionTitle>Our Goals</SectionTitle>
  <GridContainer>
    <GridItem>
      <IconWrapper><FaUsers /></IconWrapper>
      <SectionText>Deliver affordable, high-quality cleaning solutions that exceed customer expectations.</SectionText>
    </GridItem>

    <GridItem>
      <IconWrapper><FaUserFriends /></IconWrapper>
      <SectionText>Create meaningful job opportunities and empower local communities through our services.</SectionText>
    </GridItem>

    <GridItem>
      <IconWrapper><FaHandshake /></IconWrapper>
      <SectionText>Build long-lasting relationships with clients through honesty, excellence, and care.</SectionText>
    </GridItem>

    <GridItem>
      <IconWrapper><FaHandsHelping /></IconWrapper>
      <SectionText>Introduce innovative, eco-conscious cleaning methods to protect the environment.</SectionText>
    </GridItem>

    <GridItem>
      <IconWrapper><FaPeace /></IconWrapper>
      <SectionText>Maintain a peaceful, respectful work culture that reflects in every customer interaction.</SectionText>
    </GridItem>

    <GridItem>
      <IconWrapper><FaComment /></IconWrapper>
      <SectionText>Listen to customer feedback and evolve continuously to meet changing needs.</SectionText>
    </GridItem>
  </GridContainer>
</Section>

      {/* Modules */}
      {/* <OperationalModule />
      <InterventionStrategies /> */}

    </PageWrapper>
  );
};

export default AboutPage;




