import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  color: #222;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 700;
  color:#0CC1E0;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: 600;
   color:#0CC1E0;
`;

const Text = styled.p`
  margin-bottom: 15px;
`;

export default function PrivacyPolicy() {
  return (
    <Container>
      <Title>MACO Privacy Policy</Title>
<Text>
Effective from: 1/10/25
</Text>
      <Text>
        At MACO (macoexperts.com), we respect your privacy and are committed to
        protecting the personal information you provide when using our website
        and mobile application. This Privacy Policy explains how we collect,
        use, store, and protect your information.
      </Text>

      <SectionTitle>1. Information We Collect</SectionTitle>
      <Text>
        We do <strong>not</strong> require users to create an account. However,
        when you book a service through our website or mobile app, we collect
        the following basic details:
      </Text>
      <ul>
        <li>Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Booking Details</li>
      </ul>

      <SectionTitle>2. How We Use Your Information</SectionTitle>
      <Text>Your information is used strictly for the following purposes:</Text>
      <ul>
        <li>To confirm and manage your bookings</li>
        <li>To contact you regarding your service request</li>
        <li>To improve our services and customer experience</li>
        <li>To ensure accurate communication between you and our team</li>
      </ul>

      <SectionTitle>3. How We Store & Protect Your Data</SectionTitle>
      <Text>
        We take appropriate security measures to protect your information from
        unauthorized access, alteration, disclosure, or destruction. Your data
        is only accessed by authorized MACO personnel for service-related
        purposes.
      </Text>

      <SectionTitle>4. Sharing of Information</SectionTitle>
      <Text>
        MACO does <strong>not sell, rent, or trade</strong> your personal
        information. We only share your details with our internal team members
        responsible for fulfilling your service request.
      </Text>

      <SectionTitle>5. Cookies & Tracking</SectionTitle>
      <Text>
        Our website may use cookies to improve user experience and functionality.
        These cookies do not collect personal data unless voluntarily provided
        through a booking form.
      </Text>

      <SectionTitle>6. Third-Party Services</SectionTitle>
      <Text>
        We may use third-party tools (such as analytics or communication
        services) to improve our platform. These services follow their own
        privacy policies and do not access your personal booking details unless
        necessary for service functionality.
      </Text>

      <SectionTitle>7. Children's Privacy</SectionTitle>
      <Text>
        MACO services are not intended for individuals under 18. We do not
        knowingly collect information from minors.
      </Text>

      <SectionTitle>8. Your Rights</SectionTitle>
      <Text>You have the right to:</Text>
      <ul>
        <li>Request deletion of your data</li>
        <li>Request access to the information we hold about you</li>
        <li>Request correction of inaccurate data</li>
      </ul>
      <Text>
        To make any of these requests, please contact us using the details
        below.
      </Text>

      <SectionTitle>9. Contact Information</SectionTitle>
      <Text>
        <strong>Company:</strong> MACO<br />
        <strong>Website:</strong> macoexperts.com<br />
        <strong>Address:</strong> Royal Class Office No. 493, DIP 1, Dubai<br />
        <strong>Email:</strong> matthewcarwashandcleaning20@gmail.com<br />
        <strong>Phone/WhatsApp:</strong> +971 56 830 7510
      </Text>

      <SectionTitle>10. Updates to This Policy</SectionTitle>
      <Text>
        This Privacy Policy may be updated periodically. Any changes will be
        posted on this page with an updated revision date.
      </Text>

      <Text>
        By using our website or mobile app, you agree to the terms outlined in
        this Privacy Policy.
      </Text>
    </Container>
  );
}
