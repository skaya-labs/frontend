import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 40px;
  
  h1 {
    font-size: 72px;
    color: #197642;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  a {
    display: inline-block;
    background-color: #197642;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    
    &:hover {
      background-color: #0f5730;
    }
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/">Return to Home</Link>
    </NotFoundContainer>
  );
};

export default NotFoundPage;