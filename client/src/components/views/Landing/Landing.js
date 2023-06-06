import React from 'react';
import styled from 'styled-components';
import Layout from '../../Layout/Layout';

const Landing = () => {
  return (
    <Layout>
      <Container>
        <h1>Landing Page</h1>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Landing;
