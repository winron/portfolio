import styled from "styled-components";
import { NAVIGATION_SECTIONS, LOCATION_CONFIG, ANIMATION_CONFIG } from "../constants";
import { memo } from "react";
import { useTheme } from "../hooks/useTheme";
import { useScroll } from "../hooks/useScroll";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { scrollToSection } from "../utils/navigation";
import LocationIcon from "../assets/location.svg?react";
import TimeIcon from "../assets/time.svg?react";
import MoonIcon from "../assets/moon.svg?react";
import CoinIcon from "../assets/coin.svg?react";

const NavbarContainer = styled.nav<{ scrollY: number; $isModalOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 20px 40px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10001;
  transition: all 0.2s ease;
  background: transparent;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: start;
`;

const CoinLabel = styled.div<{ $isModalOpen: boolean }>`
  position: relative;
  display: none;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.component.background}40`
  };
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.primary}40`
  };
  user-select: none;
  pointer-events: none;
`;

const CoinIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    height: 1.5rem;
    width: 1.5rem;
    filter: none;
  }
`;

const CoinText = styled.span<{ $isModalOpen: boolean }>`
  font-size: 0.9rem;
  color: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? theme.name === 'dark' ? theme.color : '#ffffff'
      : theme.color
  };
  font-weight: 400;
  font-family: monospace;
`;

const NavLinks = styled.div<{ scrollY: number; $isModalOpen: boolean }>`
  display: flex;
  gap: 60px;
  padding: 20px 40px;
  justify-self: center;
  border-radius: 12px;
  background: ${({ theme, scrollY, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : scrollY > ANIMATION_CONFIG.scrollThreshold 
        ? theme.component.background
        : 'transparent'
  };
  backdrop-filter: ${({ scrollY, $isModalOpen }) => 
    $isModalOpen 
      ? 'none'
      : scrollY > ANIMATION_CONFIG.scrollThreshold ? 'blur(20px)' : 'none'
  };
  box-shadow: ${({ theme, scrollY, $isModalOpen }) => 
    $isModalOpen 
      ? 'none'
      : scrollY > ANIMATION_CONFIG.scrollThreshold 
        ? theme.component.boxShadow
        : 'none'
  };
  opacity: ${({ scrollY, $isModalOpen }) => 
    $isModalOpen 
      ? '0'
      : scrollY > ANIMATION_CONFIG.scrollThreshold ? '0.9' : '1'
  };
  transition: all 0.8s ease;
  
  &:hover {
    opacity: ${({ scrollY, $isModalOpen }) => 
      $isModalOpen 
        ? '0'
        : scrollY > ANIMATION_CONFIG.scrollThreshold ? '1' : '1'
    };
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}10;
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

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: end;
`;

const LocationIndicator = styled.div<{ $isModalOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.component.background}40`
  };
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.primary}40`
  };
  user-select: none;
  pointer-events: ${({ $isModalOpen }) => $isModalOpen ? 'none' : 'auto'};
`;

const LocationText = styled.span<{ $isModalOpen: boolean }>`
  font-size: 0.9rem;
  color: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? theme.name === 'dark' ? theme.color : '#ffffff'
      : theme.color
  };
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TimeIndicator = styled.div<{ $isModalOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.component.background}40`
  };
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.primary}40`
  };
  user-select: none;
  pointer-events: ${({ $isModalOpen }) => $isModalOpen ? 'none' : 'auto'};
`;

const TimeText = styled.span<{ $isModalOpen: boolean }>`
  font-size: 0.9rem;
  color: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? theme.name === 'dark' ? theme.color : '#ffffff'
      : theme.color
  };
  opacity: 0.8;
  font-family: monospace;
`;

const StyledLocationIcon = styled(LocationIcon)<{ $isModalOpen: boolean }>`
  height: 1.25rem;
  width: 1.25rem;
  filter: ${({ $isModalOpen, theme }) => 
    $isModalOpen 
      ? 'brightness(0) invert(1)' 
      : (theme.name === 'dark' ? 'brightness(0) invert(1)' : 'none')
  };
  transition: filter 0.3s ease;
`;

const StyledTimeIcon = styled(TimeIcon)<{ $isModalOpen: boolean }>`
  height: 1.25rem;
  width: 1.25rem;
  filter: ${({ $isModalOpen, theme }) => 
    $isModalOpen 
      ? 'brightness(0) invert(1)' 
      : (theme.name === 'dark' ? 'brightness(0) invert(1)' : 'none')
  };
  transition: filter 0.3s ease;
`;

const ThemeToggleButton = styled.button<{ $isModalOpen: boolean }>`
  background: ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.component.background}40`
  };
  border: 1px solid ${({ theme, $isModalOpen }) => 
    $isModalOpen 
      ? 'transparent'
      : `${theme.primary}40`
  };
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  
  &:hover {
    background-color: ${({ theme, $isModalOpen }) => 
      $isModalOpen 
        ? 'transparent'
        : `${theme.primary}20`
    };
  }
  
  &:active {
    background-color: ${({ theme, $isModalOpen }) => 
      $isModalOpen 
        ? 'transparent'
        : `${theme.primary}30`
    };
  }
  
  &:focus {
    outline: 2px solid ${({ theme, $isModalOpen }) => 
      $isModalOpen 
        ? '#ffffff'
        : theme.primary
    };
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  svg {
    filter: ${({ theme, $isModalOpen }) => 
      $isModalOpen 
        ? 'invert(1)'
        : theme.name === 'dark' ? 'invert(1)' : 'none'
    };
    transition: filter 0.3s ease;
  }
`;

// Navbar Component
interface NavbarProps {
  isModalOpen: boolean;
  coinValue: number;
}

const Navbar = memo(({ isModalOpen, coinValue }: NavbarProps) => {
  const scrollY = useScroll();
  const currentTime = useCurrentTime();
  const { toggleTheme } = useTheme();

  return (
    <NavbarContainer scrollY={scrollY} $isModalOpen={isModalOpen}>
      <LeftSection>
        <CoinLabel $isModalOpen={isModalOpen}>
          <CoinIconWrapper>
            <CoinIcon />
          </CoinIconWrapper>
          <CoinText $isModalOpen={isModalOpen}>{coinValue}</CoinText>
        </CoinLabel>
      </LeftSection>
      <NavLinks className="navbar" scrollY={scrollY} $isModalOpen={isModalOpen}>
        {NAVIGATION_SECTIONS.map((section) => (
          <NavLink 
            key={section.id} 
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </NavLink>
        ))}
      </NavLinks>
      <RightSection>
        <LocationIndicator $isModalOpen={isModalOpen}>
          <StyledLocationIcon $isModalOpen={isModalOpen} />
          <LocationText $isModalOpen={isModalOpen}>{LOCATION_CONFIG.location}</LocationText>
        </LocationIndicator>
        <TimeIndicator $isModalOpen={isModalOpen}>
          <StyledTimeIcon $isModalOpen={isModalOpen} />
          <TimeText $isModalOpen={isModalOpen}>{currentTime}</TimeText>
        </TimeIndicator>
        <ThemeToggleButton $isModalOpen={isModalOpen} onClick={toggleTheme}>
          <MoonIcon style={{ height: "1.25rem", width: "1.25rem" }} />
        </ThemeToggleButton>
      </RightSection>
    </NavbarContainer>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;