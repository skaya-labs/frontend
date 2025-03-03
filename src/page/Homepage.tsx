import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Card from '../components/Layout/common/card/index';
import Button from '../components/Layout/common/Button/index';
const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const HomePage: React.FC = () => {
  const headerLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
  ];
  
  const sidebarItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/profile', label: 'Profile' },
    { to: '/settings', label: 'Settings' },
  ];
  
  return (
    <Layout
      title="My PWA"
      headerLinks={headerLinks}
      sidebarItems={sidebarItems}
    >
      <h1>Home Page</h1>
      <p>Welcome to your custom PWA frontend!</p>
      
      <HomeContainer>
        <Card elevation={2}>
          <h2>Getting Started</h2>
          <p>Build your own components from scratch!</p>
          <Button>Learn More</Button>
        </Card>
        
        <Card elevation={2}>
          <h2>Custom Design</h2>
          <p>Fully customizable design system</p>
          <Button variant="outlined">Customize</Button>
        </Card>
        
        <Card elevation={2}>
          <h2>No Dependencies</h2>
          <p>Built without external UI libraries</p>
          <Button variant="secondary">Explore</Button>
        </Card>
      </HomeContainer>
    </Layout>
  );
};

export default HomePage;