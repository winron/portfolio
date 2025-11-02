import { useState, useEffect } from 'react';

interface UseTypingAnimationReturn {
  displayedTexts: string[];
  isTyping: boolean;
}

/**
 * Custom hook for typing animation effect
 * @param texts - Array of texts to type out
 * @param speed - Speed of typing in milliseconds (default: 100)
 * @returns Object with displayedTexts and isTyping state
 */
export const useTypingAnimation = (texts: readonly string[], speed: number = 100): UseTypingAnimationReturn => {
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentTextIndex >= texts.length) return;

    const timer = setTimeout(() => {
      if (currentCharIndex < texts[currentTextIndex].length) {
        setDisplayedTexts(prev => {
          const newTexts = [...prev];
          newTexts[currentTextIndex] = texts[currentTextIndex].substring(0, currentCharIndex + 1);
          return newTexts;
        });
        setCurrentCharIndex(prev => prev + 1);
      } else {
        // Move to next text after a pause
        setTimeout(() => {
          setCurrentTextIndex(prev => prev + 1);
          setCurrentCharIndex(0);
          setIsTyping(false);
          setTimeout(() => setIsTyping(true), 200);
        }, 1000);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentCharIndex, currentTextIndex, texts, speed]);

  return { displayedTexts, isTyping };
};
