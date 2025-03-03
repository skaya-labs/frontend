import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    lightText: string;
  };
  typography: {
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
    fontWeight: {
      medium: string;
    };
  };
  breakpoints?: {
    sm: string;
  };
}

const getVariantStyles = (variant: ButtonVariant, theme: Theme) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary};
        color: ${theme.colors.lightText};
        border: none;
        &:hover {
          background-color: ${theme.colors.primary}e6;
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.lightText};
        border: none;
        &:hover {
          background-color: ${theme.colors.secondary}e6;
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background-color: ${theme.colors.primary}1a;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary};
        border: none;
        &:hover {
          background-color: ${theme.colors.primary}1a;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize, theme: Theme) => {
  switch (size) {
    case 'small':
      return css`
        padding: 6px 16px;
        font-size: ${theme.typography.fontSize.small};
      `;
    case 'large':
      return css`
        padding: 12px 24px;
        font-size: ${theme.typography.fontSize.large};
      `;
    case 'medium':
    default:
      return css`
        padding: 8px 20px;
        font-size: ${theme.typography.fontSize.medium};
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => getVariantStyles(props.variant || 'primary', props.theme as Theme)}
  ${props => getSizeStyles(props.size || 'medium', props.theme as Theme)}
  
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  
  ${props => props.theme.breakpoints && css`
    @media (max-width: ${props.theme.breakpoints.sm}) {
      padding: 8px 16px;
    }
  `}
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const StartIconWrapper = styled(IconWrapper)`
  margin-right: 8px;
`;

const EndIconWrapper = styled(IconWrapper)`
  margin-left: 8px;
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  ...props 
}) => {
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      fullWidth={fullWidth} 
      {...props}
    >
      {startIcon && <StartIconWrapper>{startIcon}</StartIconWrapper>}
      {children}
      {endIcon && <EndIconWrapper>{endIcon}</EndIconWrapper>}
    </StyledButton>
  );
};

export default Button;