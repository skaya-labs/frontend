import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 16px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} My PWA App. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;