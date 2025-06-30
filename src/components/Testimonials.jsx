import React, { useState } from "react";
import styled from "styled-components";

// Replace these with your actual images or links
const testimonials = [
  {
    name: "Amina Yusuf",
    role: "Regular Car Wash Client",
    feedback:
      "Always spotless! The monthly plan saves me money, and the team is incredibly polite and professional.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Peter Thompson",
    role: "Homeowner",
    feedback:
      "Their home cleaning service is top-notch. My house has never felt this fresh. I highly recommend them!",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Helen Francis",
    role: "Garden Maintenance Subscriber",
    feedback:
      "They’ve turned my backyard into a paradise! Reliable and consistent — truly worth every naira.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Mark Larry",
    role: "Tyre & Engine Service User",
    feedback:
      "Very efficient tyre replacement and the engine cleaning gave my car a new life. Superb job!",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const CarouselSection = styled.section`
  background: #f0fdf5;
  padding: 80px 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 900;
  color: #0c5e36;
  margin-bottom: 16px;
  text-transform: uppercase;

  @media (max-width: 428px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #119458;
  margin-bottom: 60px;
  font-weight: 500;
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
`;

const CarouselWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  flex-wrap:wrap;
   justify-content:center;

  @media (max-width: 428px) {
    flex-direction: column;
    align-items: center;
   
    gap: 20px;
  }
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  width: 270px;
  margin: 0 10px;
  margin-top:20px;
  
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #119458;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0c5e36;
  margin-bottom: 5px;
`;

const Role = styled.p`
  font-size: 15px;
  color: #4b5563;
  margin-bottom: 15px;
`;

const Feedback = styled.p`
  font-size: 16px;
  color: #4b5563;
  line-height: 1.5;
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <CarouselSection id="testimonials">
      <Title>What Our Clients Say 🧼</Title>
      <Subtitle>
        We pride ourselves on exceptional cleaning, care, and customer satisfaction.
        Here’s what our loyal clients have to say.
      </Subtitle>

      <CarouselWrapper>
        <CarouselTrack
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <ProfileImage src={testimonial.image} alt={testimonial.name} />
              <Name>{testimonial.name}</Name>
              <Role>{testimonial.role}</Role>
              <Feedback>{testimonial.feedback}</Feedback>
            </TestimonialCard>
          ))}
        </CarouselTrack>
      </CarouselWrapper>
    </CarouselSection>
  );
};

export default Testimonials;
