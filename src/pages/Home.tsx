import styled, { keyframes } from "styled-components";
import { memo, useCallback, useEffect, useState } from "react";
import ProfilePicture from "../components/ProfilePicture";
import ProfileImage from "../assets/profile.png";
import { PERSONAL_INFO, SOCIAL_LINKS, ANIMATION_CONFIG, UI_CONFIG } from "../constants";
import { useScroll } from "../hooks/useScroll";
import { useTypingAnimation } from "../hooks/useTypingAnimation";
import { getPeaceIcon, getSocialIcon } from "../utils/iconMapping";
import Button from "../components/common/Button";

// Typing animation keyframes
const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const HomeSection = styled.section<{ scrollY: number }>`
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 35vh 40px 40px;
  max-width: ${UI_CONFIG.maxWidth};
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  transform: translateY(${({ scrollY }) => -scrollY * ANIMATION_CONFIG.parallaxSpeed}px);
  transition: transform 0.1s ease-out;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HomeTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  line-height: 1.1;
  color: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 3.375rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.8125rem;
  }
`;

const NameHighlight = styled.span`
  color: ${({ theme }) => theme.primary};
  text-shadow: 
    -1px -1px 0 ${({ theme }) => theme.secondary},
    1px -1px 0 ${({ theme }) => theme.secondary},
    -1px 1px 0 ${({ theme }) => theme.secondary},
    1px 1px 0 ${({ theme }) => theme.secondary};
  margin-left: 0.3em;
`;

const HomeDescription = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  max-width: 100%;
  line-height: 1.6;
  white-space: nowrap;
`;

const TypingText = styled.span`
  font-size: 1em;
  white-space: pre;
`;

const Cursor = styled.span`
  animation: ${blink} 1s infinite;
  font-weight: bold;
`;

const WelcomeMessage = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color};
  font-weight: 400;
  line-height: 1.6;
  margin-top: 1rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

const SocialIconsContainer = styled.div<{ scrollY: number }>`
  display: ${({ scrollY }) => scrollY > ANIMATION_CONFIG.scrollThreshold * 2 ? 'none' : 'flex'};
  gap: 1rem;
  margin-top: 4rem;
  transition: all 0.5s ease;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const FixedSocialIcons = styled.div<{ scrollY: number; $isContactVisible: boolean; $isAtBottom: boolean }>`
  display: flex;
  flex-direction: ${({ $isAtBottom }) => $isAtBottom ? 'row' : 'column'};
  gap: 1rem;
  position: fixed;
  top: ${({ $isAtBottom }) => $isAtBottom ? 'auto' : '50%'};
  bottom: ${({ $isAtBottom }) => $isAtBottom ? '20px' : 'auto'};
  left: ${({ $isAtBottom }) => $isAtBottom ? '50%' : '20px'};
  transform: ${({ scrollY, $isAtBottom }) => {
    if (scrollY <= ANIMATION_CONFIG.scrollThreshold * 2) {
      // Slide out to the left when not visible
      return $isAtBottom ? 'translateX(-50%) translateY(100px)' : 'translateY(-50%) translateX(-100px)';
    }
    // Normal position when visible
    return $isAtBottom ? 'translateX(-50%)' : 'translateY(-50%)';
  }};
  background: ${({ theme }) => theme.component.background};
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.component.boxShadow};
  border: ${({ theme }) => theme.component.border};
  z-index: 1000;
  opacity: ${({ scrollY }) => 
    scrollY > ANIMATION_CONFIG.scrollThreshold * 2 ? 0.7 : 0};
  pointer-events: ${({ scrollY }) => 
    scrollY > ANIMATION_CONFIG.scrollThreshold * 2 ? 'auto' : 'none'};
  transition: all 0.5s ease;
  
  &:hover {
    opacity: ${({ scrollY }) => 
      scrollY > ANIMATION_CONFIG.scrollThreshold * 2 ? 1 : 0};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;



const Home = memo(() => {
  const PeaceIconComponent = getPeaceIcon(PERSONAL_INFO.peaceIcon);
  const { displayedTexts, isTyping } = useTypingAnimation(PERSONAL_INFO.homeDescriptions, ANIMATION_CONFIG.typingSpeed);
  const scrollY = useScroll();
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Check if contact section is visible and if we're at the bottom
  useEffect(() => {
    const checkContactVisibility = () => {
      // Check if we're at or near the bottom of the page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isBottom = scrollTop + windowHeight >= documentHeight - 50; // 50px threshold
      setIsAtBottom(isBottom);
      
      // Check if contact section is visible
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsContactVisible(isVisible);
      } else {
        setIsContactVisible(false);
      }
    };

    checkContactVisibility();
    window.addEventListener('scroll', checkContactVisibility);
    window.addEventListener('resize', checkContactVisibility);

    return () => {
      window.removeEventListener('scroll', checkContactVisibility);
      window.removeEventListener('resize', checkContactVisibility);
    };
  }, []);

  // Ensure page starts at top when Home component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSocialClick = useCallback((url: string) => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <>
      <HomeSection id="home" scrollY={scrollY}>
        <ContentContainer>
          <TextContainer>
            <HomeTitle>
              {PERSONAL_INFO.greeting}<NameHighlight>{PERSONAL_INFO.name}</NameHighlight> <PeaceIconComponent style={{ height: "1.25em", width: "1.25em" }} />
            </HomeTitle>
            <HomeDescription>
              <TypingText>
                {displayedTexts.join('    ')}
                {isTyping && <Cursor>|</Cursor>}
              </TypingText>
            </HomeDescription>
            <WelcomeMessage>{PERSONAL_INFO.welcomeMessage}</WelcomeMessage>
            <SocialIconsContainer scrollY={scrollY}>
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
          </TextContainer>
          <ImageContainer>
            <ProfilePicture src={ProfileImage} alt="me!" />
          </ImageContainer>
        </ContentContainer>
      </HomeSection>
      <FixedSocialIcons scrollY={scrollY} $isContactVisible={isContactVisible} $isAtBottom={isAtBottom}>
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
      </FixedSocialIcons>
    </>
  );
});

Home.displayName = 'Home';

export default Home;