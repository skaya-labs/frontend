import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  headerLinks: Array<{ to: string; label: string }>;
  sidebarItems: Array<{ to: string; label: string; icon?: React.ReactNode }>;
  title: string;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main<{ sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${props => props.sidebarOpen ? '240px' : '64px'};
  padding: ${props => props.theme.spacing.lg};
  transition: margin-left 0.3s ease;
`;

const Layout: React.FC<LayoutProps> = ({
  children,
  headerLinks,
  sidebarItems,
  title,
}) => {
  const [sidebarOpen] = useState(true);


  return (
    <LayoutContainer>
      <Header title={title} links={headerLinks} />
      <Sidebar items={sidebarItems} isOpen={sidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen}>
        {children}
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;