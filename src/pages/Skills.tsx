import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import styled from "styled-components";
import { SKILLS_DATA } from "../constants";
import { getSkillIcon } from "../utils/skillIcons";
import { Section, Container, SectionTitle } from "../styles/shared";



// Use the expand.svg from assets
const expandSvg = '/src/assets/expand.svg';

// Scoring system for slot machine
const SCORING_RULES = {
  THREE_IDENTICAL: 50,      // All 3 are identical skills
  THREE_SAME_CATEGORY: 20,  // All 3 are same skillset (core, libs, tools)
  TWO_IDENTICAL: 5          // At least 2 are same skills
} as const;

// Calculate score based on the three skills at the profit line
function calculateScore(skills: { readonly name: string; readonly icon: string; readonly docs: string; readonly category: number }[]): number {
  if (skills.length !== 3) return 0;
  
  const [skill1, skill2, skill3] = skills;
  
  // Check for three identical skills
  if (skill1.name === skill2.name && skill2.name === skill3.name) {
    return SCORING_RULES.THREE_IDENTICAL;
  }
  
  // Check for three same category
  if (skill1.category === skill2.category && skill2.category === skill3.category) {
    return SCORING_RULES.THREE_SAME_CATEGORY;
  }
  
  // Check for at least two identical skills
  if (skill1.name === skill2.name || skill1.name === skill3.name || skill2.name === skill3.name) {
    return SCORING_RULES.TWO_IDENTICAL;
  }
  
  return 0;
}

// Simple X icon component - memoized for performance
const CloseIcon = memo(() => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
));


const SkillsSection = styled(Section)`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: auto;
  padding: 160px 40px 120px;
`;

const SkillsContent = styled(Container)`
  max-width: 800px;
  width: 100%;
  text-align: left;
`;

const SkillsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SkillsTitle = styled(SectionTitle)`
  font-size: 2.5rem;
  margin: 0;
`;

const ExpandButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary}20;
    transform: scale(1.05);
  }
  
  img {
    width: 20px;
    height: 20px;
    filter: ${({ theme }) => theme.name === 'dark' ? 'invert(1)' : 'none'};
  }
`;

const CarouselSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 70px;
  height: 210px;
  flex-shrink: 0;
  position: relative;
`;

const ProfitLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.name === 'dark' ? '#ffffff' : '#000000'};
  z-index: 10;
  pointer-events: none;
`;

const VerticalScrollContainer = styled.div`
  height: 210px;
  overflow: hidden;
  position: relative;
  padding: 0;
  
  /* Hide scrollbar completely */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const ScrollableContent = styled.div<{ $scrollPosition: number }>`
  display: flex;
  flex-direction: column;
  transform: translateY(${({ $scrollPosition }) => -$scrollPosition}px);
`;

const SkillCard = styled.div`
  width: 100%;
  height: 70px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.component.border};
  border-radius: 0;
  font-weight: 400;
  font-size: 1rem;
  color: ${({ theme }) => theme.color};
  transition: none;
  padding: 0;
  margin: 0;
`;

const SkillIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 3rem;
    height: 3rem;
  }
`;


// Modal styles
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(10px);
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.component.background};
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ModalTitle = styled(SectionTitle)`
  font-size: 2rem;
  margin: 0;
`;

const HelpButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.component.border};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color};
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${({ theme }) => theme.primary}20;
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }
`;

const TooltipContainer = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.component.background};
  border: 1px solid ${({ theme }) => theme.component.border};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.component.boxShadow};
  z-index: 10001;
  min-width: 280px;
  max-width: 320px;
  opacity: ${({ $isVisible }) => $isVisible ? 1 : 0};
  visibility: ${({ $isVisible }) => $isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${({ $isVisible }) => $isVisible ? 'auto' : 'none'};
`;

const TooltipTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.color};
`;

const TooltipList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TooltipItem = styled.li`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color};
  line-height: 1.5;
  
  strong {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary}20;
  }
`;

// Accordion styles
const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div`
  border: 1px solid ${({ theme }) => theme.component.border};
  border-radius: 8px;
  overflow: hidden;
`;

const AccordionHeader = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.background};
  border: none;
  padding: 1rem;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary}10;
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => $isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  border-top: 1px solid ${({ theme }) => theme.name === 'dark' ? '#A3B18A' : '#DBD7CD'};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
`;

const SkillItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.background};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.component.border};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.color};
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
    color: ${({ theme }) => theme.primary};
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

const SkillItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const SkillItemName = styled.span`
  font-size: 1rem;
  color: inherit;
  font-weight: 400;
`;

const CarouselsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.component.background};
  border-radius: 16px;
  backdrop-filter: blur(20px);
  border: ${({ theme }) => theme.component.border};
  box-shadow: ${({ theme }) => theme.component.boxShadow};
  padding: 1rem;
`;

const SpinButton = styled.button<{ $disabled: boolean }>`
  background: ${({ theme, $disabled }) => $disabled ? theme.component.background : theme.primary};
  color: ${({ $disabled }) => $disabled ? '#666' : 'white'};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
  min-width: 240px;
  opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
  
  &:hover {
    background: ${({ theme, $disabled }) => $disabled ? theme.component.background : theme.primary}dd;
    transform: ${({ $disabled }) => $disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ $disabled }) => $disabled ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.2)'};
  }
  
  &:active {
    transform: ${({ $disabled }) => $disabled ? 'none' : 'translateY(0)'};
  }
`;


// Accordion component
interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = memo(({ title, isOpen, onToggle, children }) => (
  <AccordionItem>
    <AccordionHeader $isOpen={isOpen} onClick={onToggle}>
      {title}
      <span>{isOpen ? '−' : '+'}</span>
    </AccordionHeader>
    <AccordionContent $isOpen={isOpen}>
      {children}
    </AccordionContent>
  </AccordionItem>
));

// Modal component with carousels
interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allSkills: readonly { readonly name: string; readonly icon: string; readonly docs: string; readonly category: number }[];
  onSpin: () => void;
  isSpinning: boolean;
  onScore: (score: number) => void;
  getSkillsAtProfitLine: (scrollPositions: number[]) => { readonly name: string; readonly icon: string; readonly docs: string; readonly category: number }[];
}

const SkillsModal: React.FC<SkillsModalProps> = memo(({ 
  isOpen, 
  onClose, 
  allSkills,
  onSpin,
  isSpinning,
  onScore,
  getSkillsAtProfitLine
}) => {
  const scrollPositionsRef = useRef<number[]>([0, 0, 0]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleOverlayClick = () => {
    onClose();
    setShowTooltip(false);
  };

  // Handle scroll position changes from carousels - individual callbacks for stability
  const handleScrollPositionChange0 = useCallback((position: number) => {
    scrollPositionsRef.current[0] = position;
  }, []);

  const handleScrollPositionChange1 = useCallback((position: number) => {
    scrollPositionsRef.current[1] = position;
  }, []);

  const handleScrollPositionChange2 = useCallback((position: number) => {
    scrollPositionsRef.current[2] = position;
  }, []);


  const handleSpin = () => {
    onSpin();
    
    // Calculate score after spin animation completes
    setTimeout(() => {
      // Get the current scroll positions at the end of the animation using ref
      const finalScrollPositions = scrollPositionsRef.current;
      const skillsAtLine = getSkillsAtProfitLine(finalScrollPositions);
      const score = calculateScore(skillsAtLine);
      
      // Console log the three elements for tracking
      console.log('🎰 Slot Machine Spin Results:');
      console.log('Element 1:', skillsAtLine[0]?.name, '(Category:', skillsAtLine[0]?.category, ')');
      console.log('Element 2:', skillsAtLine[1]?.name, '(Category:', skillsAtLine[1]?.category, ')');
      console.log('Element 3:', skillsAtLine[2]?.name, '(Category:', skillsAtLine[2]?.category, ')');
      console.log('Score:', score, 'coins');
      console.log('---');
      
      if (score > 0) {
        onScore(score);
      }
    }, 3000); // Wait for spin animation to complete
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent onClick={handleContentClick}>
        <ModalHeader>
          <TitleContainer>
            <ModalTitle>Slots</ModalTitle>
            <HelpButton
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(!showTooltip);
              }}
              aria-label="Show rules"
            >
              ?
              <TooltipContainer $isVisible={showTooltip} onClick={(e) => e.stopPropagation()}>
                <TooltipTitle>How to Win</TooltipTitle>
                <TooltipList>
                  <TooltipItem>
                    <strong>Three Identical Skills:</strong> {SCORING_RULES.THREE_IDENTICAL} coins
                  </TooltipItem>
                  <TooltipItem>
                    <strong>Three Same Category:</strong> {SCORING_RULES.THREE_SAME_CATEGORY} coins
                  </TooltipItem>
                  <TooltipItem>
                    <strong>Two Identical Skills:</strong> {SCORING_RULES.TWO_IDENTICAL} coins
                  </TooltipItem>
                </TooltipList>
              </TooltipContainer>
            </HelpButton>
          </TitleContainer>
          <CloseButton onClick={handleCloseClick}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        
        <CarouselsRow>
          <SlotMachineCarousel 
            allSkills={allSkills}
            isSpinning={isSpinning}
            carouselIndex={0}
            onScrollPositionChange={handleScrollPositionChange0}
          />
          <SlotMachineCarousel 
            allSkills={allSkills}
            isSpinning={isSpinning}
            carouselIndex={1}
            onScrollPositionChange={handleScrollPositionChange1}
          />
          <SlotMachineCarousel 
            allSkills={allSkills}
            isSpinning={isSpinning}
            carouselIndex={2}
            onScrollPositionChange={handleScrollPositionChange2}
          />
        </CarouselsRow>
        
            <SpinButton onClick={handleSpin} disabled={isSpinning} $disabled={isSpinning}>
              SPIN
            </SpinButton>
      </ModalContent>
    </ModalOverlay>
  );
});

// Slot machine carousel component
interface SlotMachineCarouselProps {
  allSkills: readonly { readonly name: string; readonly icon: string; readonly docs: string; readonly category: number }[];
  isSpinning: boolean;
  carouselIndex: number;
  onScrollPositionChange?: (position: number) => void;
}

const SlotMachineCarousel: React.FC<SlotMachineCarouselProps> = memo(({ 
  allSkills, 
  isSpinning,
  carouselIndex,
  onScrollPositionChange
}) => {
  // Skills are already duplicated from linked list
  const infiniteSkills = allSkills;
  const cardHeight = 70; // Height of each card
  // Use half the total cards since we have duplicated data
  const originalCardsCount = infiniteSkills.length / 2;
  const loopHeight = originalCardsCount * cardHeight;
  
  // Initialize with different random positions for each carousel
  const [scrollPosition, setScrollPosition] = useState(() => {
    // Use carouselIndex as seed for different random values
    const seed = carouselIndex * 1000 + Date.now();
    const random = Math.sin(seed) * 10000;
    return Math.abs(random) % loopHeight;
  });
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    if (isSpinning) {
      const startTime = Date.now();
      const duration = 3000; // 3 seconds
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function: starts fast, slows down at the end
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        // Calculate scroll speed: fast at start, slow at end (5x faster)
        const maxSpeed = 100; // pixels per frame (was 20, now 5x faster)
        const currentSpeed = maxSpeed * (1 - easeOutCubic);
        
        setScrollPosition(prev => {
          const newPosition = prev + currentSpeed;
          // Use modulo to create infinite loop based on original cards height
          return newPosition % loopHeight;
        });
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete - snap to profit line with smooth transition
          const cardHeight = 70;
          const visibleHeight = 210; // 3 cards visible
          const profitLineOffset = visibleHeight / 2; // 105px from top
          
          // Calculate the nearest card position that centers a skill on the profit line
          const currentPos = scrollPosition;
          // Find which card should be centered on the profit line
          const cardIndexAtProfitLine = Math.round((currentPos + profitLineOffset) / cardHeight);
          // Position the card so its center (middle) is at the profit line
          const targetPosition = cardIndexAtProfitLine * cardHeight - profitLineOffset;
          
          // Ensure the position is within bounds
          const snappedPosition = ((targetPosition % loopHeight) + loopHeight) % loopHeight;
          
          // Smooth transition to snapped position
          const snapDuration = 200; // 200ms snap animation
          const snapStartTime = Date.now();
          
          const snapAnimate = () => {
            const snapElapsed = Date.now() - snapStartTime;
            const snapProgress = Math.min(snapElapsed / snapDuration, 1);
            
            // Easing function for smooth snap
            const easeOutQuart = 1 - Math.pow(1 - snapProgress, 4);
            
            // Interpolate between current and snapped position
            const currentPosition = scrollPosition;
            const interpolatedPosition = currentPosition + (snappedPosition - currentPosition) * easeOutQuart;
            
            setScrollPosition(interpolatedPosition);
            
            if (snapProgress < 1) {
              animationRef.current = requestAnimationFrame(snapAnimate);
            } else {
              // Final snap complete
              setScrollPosition(snappedPosition);
            }
          };
          
          animationRef.current = requestAnimationFrame(snapAnimate);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, loopHeight]);

  // Notify parent of scroll position changes
  useEffect(() => {
    if (onScrollPositionChange) {
      onScrollPositionChange(scrollPosition);
    }
  }, [scrollPosition, onScrollPositionChange]);

  return (
    <CarouselSection>
      <ProfitLine />
      <VerticalScrollContainer>
        <ScrollableContent $scrollPosition={scrollPosition}>
          {infiniteSkills.map((skill, skillIndex) => {
            const IconComponent = getSkillIcon(skill.icon);
            return (
              <SkillCard key={`${skill.name}-${skillIndex}`}>
                {IconComponent && (
                  <SkillIcon>
                    <IconComponent />
                  </SkillIcon>
                )}
              </SkillCard>
            );
          })}
        </ScrollableContent>
      </VerticalScrollContainer>
    </CarouselSection>
  );
});

interface SkillsProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onSpin: () => void;
  isSpinning: boolean;
  onScore: (score: number) => void;
}

const Skills: React.FC<SkillsProps> = memo(({ isModalOpen, setIsModalOpen, onSpin, isSpinning, onScore }) => {
  const { core, libs, tools } = SKILLS_DATA;
  const [openAccordion, setOpenAccordion] = useState<string | null>('core');
  
  // Create simple array from all skills
  const allSkillsArray = [...core, ...libs, ...tools];

  // Disable body scroll when modal is open and add blur class
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  // Create infinite array for slot machine (duplicate for seamless looping)
  const allSkills = [...allSkillsArray, ...allSkillsArray];

  // Get skills at the profit line (middle of each carousel)
  const getSkillsAtProfitLine = (scrollPositions: number[]): { readonly name: string; readonly icon: string; readonly docs: string; readonly category: number }[] => {
    const originalCardsCount = allSkillsArray.length; // Use original array length
    const cardHeight = 70; // Height of each card (matches SlotMachineCarousel)
    const visibleHeight = 210; // Height of visible area (3 cards * 70px)
    const profitLineOffset = visibleHeight / 2; // Middle of the visible area (105px from top)
    
    const skillsAtLine: { readonly name: string; readonly icon: string; readonly docs: string; readonly category: number }[] = [];
    
    // For each carousel, calculate which skill is at the profit line
    for (let i = 0; i < 3; i++) {
      const scrollPosition = scrollPositions[i];
      
      // Calculate which skill index is at the profit line (center of visible area)
      const skillIndex = Math.floor((scrollPosition + profitLineOffset) / cardHeight) % originalCardsCount;
      
      skillsAtLine.push(allSkillsArray[skillIndex]);
    }
    
    return skillsAtLine;
  };

  const toggleAccordion = useCallback((title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  }, [openAccordion]);

  const renderSkills = useCallback((skills: readonly { readonly name: string; readonly icon: string; readonly docs: string }[]) => (
    <SkillsGrid>
      {skills.map((skill) => {
        const IconComponent = getSkillIcon(skill.icon);
        return (
          <SkillItem key={skill.name} href={skill.docs} target="_blank" rel="noopener noreferrer">
            {IconComponent && (
              <SkillItemIcon>
                <IconComponent />
              </SkillItemIcon>
            )}
            <SkillItemName>{skill.name}</SkillItemName>
          </SkillItem>
        );
      })}
    </SkillsGrid>
  ), []);

  return (
    <SkillsSection id="skills">
      <SkillsContent>
        <SkillsHeader>
          <SkillsTitle>My Skills</SkillsTitle>
          <ExpandButton onClick={() => setIsModalOpen(true)}>
            <img src={expandSvg} alt="Expand" width="20" height="20" />
          </ExpandButton>
        </SkillsHeader>
        
        <AccordionContainer>
          <Accordion
            title="Core"
            isOpen={openAccordion === 'core'}
            onToggle={() => toggleAccordion('core')}
          >
            {renderSkills(core)}
          </Accordion>
          
          <Accordion
            title="Libs"
            isOpen={openAccordion === 'libs'}
            onToggle={() => toggleAccordion('libs')}
          >
            {renderSkills(libs)}
          </Accordion>
          
          <Accordion
            title="Tools"
            isOpen={openAccordion === 'tools'}
            onToggle={() => toggleAccordion('tools')}
          >
            {renderSkills(tools)}
          </Accordion>
        </AccordionContainer>
      </SkillsContent>
      
      <SkillsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allSkills={allSkills}
        onSpin={onSpin}
        isSpinning={isSpinning}
        onScore={onScore}
        getSkillsAtProfitLine={getSkillsAtProfitLine}
      />
    </SkillsSection>
  );
});

export default Skills;