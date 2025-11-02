import { ComponentType } from 'react';
import PeaceIcon from '../assets/peace.svg?react';
import GithubIcon from '../assets/github.svg?react';
import LinkedinIcon from '../assets/linkedin.svg?react';
import GmailIcon from '../assets/gmail.svg?react';
import ResumeIcon from '../assets/resume.svg?react';

// Icon mapping for dynamic imports
export const iconMap = {
  "peace.svg": PeaceIcon,
} as const;

export const socialIconMap = {
  "github.svg": GithubIcon,
  "linkedin.svg": LinkedinIcon,
  "gmail.svg": GmailIcon,
  "resume.svg": ResumeIcon,
} as const;

/**
 * Get peace icon component by name
 * @param iconName - Name of the icon
 * @returns React component
 */
export const getPeaceIcon = (iconName: string): ComponentType<{ style?: React.CSSProperties }> => {
  return iconMap[iconName as keyof typeof iconMap] || iconMap['peace.svg'];
};

/**
 * Get social icon component by name
 * @param iconName - Name of the icon
 * @returns React component
 */
export const getSocialIcon = (iconName: string): ComponentType<{ style?: React.CSSProperties }> => {
  return socialIconMap[iconName as keyof typeof socialIconMap] || socialIconMap['github.svg'];
};
