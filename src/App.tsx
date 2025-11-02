import { useEffect, useState, useCallback } from "react";
import GlobalStyles from "./GlobalStyles";
import { ThemeProviderWrapper } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coinValue, setCoinValue] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // Animate coin value from 0 to 100 on page load
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * 100);
      
      setCoinValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    // Start animation after a short delay
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Also handle browser back/forward navigation
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSpin = useCallback(() => {
    if (coinValue > 0 && !isSpinning) {
      setCoinValue(prev => prev - 1);
      setIsSpinning(true);
      
      // Stop spinning after 3 seconds
      setTimeout(() => {
        setIsSpinning(false);
      }, 3000);
    }
  }, [coinValue, isSpinning]);

  const handleScore = useCallback((score: number) => {
    setCoinValue(prev => prev + score);
  }, []);

  return (
    <ThemeProviderWrapper>
      <GlobalStyles />
      <Navbar 
        isModalOpen={isModalOpen} 
        coinValue={coinValue}
      />
      <main>
        <Home />
        <About />
        <Skills 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen}
          onSpin={handleSpin}
          isSpinning={isSpinning}
          onScore={handleScore}
        />
        <Projects />
        <Contact />
      </main>
    </ThemeProviderWrapper>
  );
}

export default App;