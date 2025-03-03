// src/components/Layout/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface SidebarProps {
  items: Array<{
    to: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  isOpen?: boolean;
}

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  background-color: ${props => props.theme.colors.background};
  width: ${props => props.isOpen ? '240px' : '64px'};
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 64px; /* Space for header */
  box-shadow: ${props => props.theme.shadows.small};
  transition: width 0.3s ease;
  overflow-x: hidden;
  z-index: 100;
`;

const NavItem = styled(Link)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  .icon {
    margin-right: ${props => props.isOpen ? props.theme.spacing.md : '0'};
  }
  
  .label {
    display: ${props => props.isOpen ? 'block' : 'none'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen = true }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      {items.map((item, index) => (
        <NavItem key={index} to={item.to} isOpen={isOpen}>
          {item.icon && <span className="icon">{item.icon}</span>}
          <span className="label">{item.label}</span>
        </NavItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;