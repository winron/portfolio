import { useState } from "react";
import styled from "styled-components";
import { Container, SectionSubtitle, Card } from "../styles/shared";
import { PROJECTS_DATA } from "../constants";
import historyImage from "../assets/bindify/history.png";
import loginImage from "../assets/bindify/login.png";
import shortcutsImage from "../assets/bindify/shortcuts.png";
import GithubIcon from "../assets/github.svg?react";

const ProjectsSection = styled.section`
  padding: 120px 40px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.name === 'light' 
    ? 'linear-gradient(135deg, rgba(88, 129, 87, 0.08) 0%, rgba(58, 90, 64, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(58, 90, 64, 0.25) 0%, rgba(52, 78, 65, 0.3) 100%)'
  };
`;

const ProjectCard = styled(Card)`
  max-width: 800px;
  width: 100%;
  padding: 0;
  overflow: hidden;

  &:hover {
    transform: none;
    box-shadow: ${({ theme }) => theme.component.boxShadow};
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
`;

const ProjectImage = styled.img<{ $isActive: boolean; $index: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  transition: opacity 0.6s ease-in-out;
  z-index: ${({ $index }) => $index};
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.component.background};
  border: 2px solid ${({ theme }) => theme.component.border};
  color: ${({ theme }) => theme.color};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  font-size: 1.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const LeftButton = styled(NavigationButton)`
  left: 1rem;
`;

const RightButton = styled(NavigationButton)`
  right: 1rem;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
`;

const ProjectTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.component.background};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin: 0;
`;

const GithubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.component.background};
  border: 2px solid ${({ theme }) => theme.component.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-decoration: none;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.background};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProjectDescription = styled.p`
  padding: 2rem;
  color: ${({ theme }) => theme.color};
  line-height: 1.6;
  font-size: 1.1rem;
  margin: 0;
`;

const Projects = () => {
	const project = PROJECTS_DATA[0];
	const images = [loginImage, shortcutsImage, historyImage];
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	return (
		<ProjectsSection id="projects">
			<Container>
				<SectionSubtitle>Projects</SectionSubtitle>
				<ProjectCard>
					<ImageSection>
						{images.map((image, index) => (
							<ProjectImage
								key={index}
								src={image}
								alt={`${project.title} ${index + 1}`}
								$isActive={index === currentIndex}
								$index={index}
							/>
						))}
						<LeftButton onClick={goToPrevious} aria-label="Previous image">
							‹
						</LeftButton>
						<RightButton onClick={goToNext} aria-label="Next image">
							›
						</RightButton>
						<TitleContainer>
							<ProjectTitle>{project.title}</ProjectTitle>
							{project.githubUrl && (
								<GithubButton
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`View ${project.title} on GitHub`}
								>
									<GithubIcon />
								</GithubButton>
							)}
						</TitleContainer>
					</ImageSection>
					<ProjectDescription>
						{project.description}
					</ProjectDescription>
				</ProjectCard>
			</Container>
		</ProjectsSection>
	);
};

export default Projects;
