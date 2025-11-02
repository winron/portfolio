import styled from "styled-components";
import { UI_CONFIG } from "../constants";

// Shared section styling
export const Section = styled.section`
  min-height: 100vh;
  padding: ${UI_CONFIG.sectionPadding};
`;

// Shared centered section styling
export const CenteredSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Shared container styling
export const Container = styled.div`
  max-width: ${UI_CONFIG.maxWidth};
  margin: 0 auto;
`;

// Shared title styling
export const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.color};
`;

// Shared subtitle styling
export const SectionSubtitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.color};
`;

// Shared description styling
export const Description = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  max-width: 600px;
  line-height: 1.6;
`;

// Shared link styling
export const Link = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

// Shared card styling
export const Card = styled.div`
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.component.border};
  background: ${({ theme }) => theme.component.background};
  border-radius: ${UI_CONFIG.borderRadius};
  box-shadow: ${({ theme }) => theme.component.boxShadow};
  transition: transform ${UI_CONFIG.transitionSpeed}, box-shadow ${UI_CONFIG.transitionSpeed};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${UI_CONFIG.boxShadow};
  }
`;

// Shared grid styling
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

// Shared flex column styling
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
