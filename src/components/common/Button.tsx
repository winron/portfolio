import styled from "styled-components";
import { ComponentType } from "react";

interface ButtonProps {
  ButtonIcon: ComponentType<{ style?: React.CSSProperties }>;
  onButtonClick: () => void;
  ariaLabel?: string;
}

const StyledButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    background: ${({ theme }) => theme.primary}10;
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
    background: ${({ theme }) => theme.primary}10;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    filter: ${({ theme }) => theme.name === 'dark' ? 'invert(1)' : 'none'};
    transition: filter 0.3s ease;
  }
`;

const Button = ({ ButtonIcon, onButtonClick, ariaLabel }: ButtonProps) => {
  return (
    <StyledButton 
      onClick={onButtonClick}
      aria-label={ariaLabel || "Social media link"}
      type="button"
    >
      <ButtonIcon style={{ height: "1.875rem", width: "1.875rem" }} />
    </StyledButton>
  );
};

export default Button;
