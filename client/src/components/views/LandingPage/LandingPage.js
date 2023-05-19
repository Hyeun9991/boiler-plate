import React from 'react';
import styled from 'styled-components';

function LandingPage() {
  return (
    <Container>
      <Title>Landing Page</Title>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 2rem;
`;

export default LandingPage;
