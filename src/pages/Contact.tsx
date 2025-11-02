import styled from "styled-components";
import { Section, Container, SectionTitle } from "../styles/shared";
import { SOCIAL_LINKS } from "../constants";
import { getSocialIcon } from "../utils/iconMapping";
import Button from "../components/common/Button";
import { useCallback } from "react";

const ContactSection = styled(Section)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
`;

const ContactContent = styled(Container)`
  max-width: 800px;
  width: 100%;
  text-align: left;
`;

const ContactTitle = styled(SectionTitle)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ContactDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  line-height: 2.2;
  text-indent: 2rem;
  user-select: text;
  margin-bottom: 2rem;
  
  .highlight {
    background: ${({ theme }) => theme.primary}20;
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    text-shadow: 0 0 8px ${({ theme }) => theme.primary}40;
  }
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Contact = ({ isContactVisible }: { isContactVisible: boolean }) => {
  const handleSocialClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

	return (
		<ContactSection id="contact">
			<ContactContent>
				<ContactTitle>Let's connect</ContactTitle>
				<ContactDescription>
					I'm always down to learn something new, collaborate on exciting projects, or just talk tech. Whether you have an idea, an opportunity, or some feedback, <span className="highlight">I'd love to hear from you</span>.
				</ContactDescription>
				{isContactVisible && (
					<SocialIconsContainer>
						{SOCIAL_LINKS.map((social) => {
							const IconComponent = getSocialIcon(social.icon);
							return (
								<Button
									key={social.name}
									ButtonIcon={IconComponent}
									onButtonClick={() => handleSocialClick(social.url)}
									ariaLabel={`Visit ${social.name} profile`}
								/>
							);
						})}
					</SocialIconsContainer>
				)}
			</ContactContent>
		</ContactSection>
	);
};

export default Contact;