import styled from 'styled-components';

const AboutContainer = styled.div`
  h1 {
    color: #197642;
    margin-bottom: 24px;
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 16px;
  }
  
  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 20px;
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <h1>About This App</h1>
      <div className="card">
        <p>This is a custom-built Progressive Web App created using React and Vite without relying on external UI libraries.</p>
        <p>All components are built from scratch to ensure complete control over the design and functionality.</p>
      </div>
    </AboutContainer>
  );
};

export default AboutPage;