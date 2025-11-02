import styled from "styled-components";
import { PERSONAL_INFO } from "../constants";
import { Section, Container, SectionTitle } from "../styles/shared";

const AboutSection = styled(Section)`
  min-height: 50vh;
  margin-top: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.name === 'light' 
    ? 'linear-gradient(135deg, rgba(163, 177, 138, 0.1) 0%, rgba(88, 129, 87, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(52, 78, 65, 0.3) 0%, rgba(88, 129, 87, 0.2) 100%)'
  };
`;

const AboutContent = styled(Container)`
  max-width: 800px;
  width: 100%;
  text-align: left;
`;

const AboutTitle = styled(SectionTitle)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const AboutDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  line-height: 2.2;
  text-indent: 2rem;
  user-select: text;
  
  .highlight {
    background: ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    text-shadow: 0 0 8px ${({ theme }) => theme.primary}40;
  }
`;

const About = () => {
  const description = PERSONAL_INFO.description;
  const highlightStart = description.indexOf('My focus');
  
  const renderDescription = () => {
    if (highlightStart === -1) {
      return description;
    }
    
    const beforeHighlight = description.substring(0, highlightStart);
    const highlightText = description.substring(highlightStart);
    
    return (
      <>
        {beforeHighlight}
        <span className="highlight">{highlightText}</span>
      </>
    );
  };

  return (
    <AboutSection id="about">
      <AboutContent>
        <AboutTitle>About Me</AboutTitle>
        <AboutDescription>{renderDescription()}</AboutDescription>
      </AboutContent>
    </AboutSection>
  );
};

export default About;
