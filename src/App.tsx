import React, { useState } from "react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { HomePhase } from "./components/Phases/HomePhase";
import { BrainstormingPhase } from "./components/Phases/BrainstormingPhase";
import { NetworkPhase } from "./components/Phases/NetworkPhase";
import { ReflectionPhase } from "./components/Phases/ReflectionPhase";
import { AuthModal } from "./components/AuthModal";
import { StarryBackground } from "./components/StarryBackground";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [phase, setPhase] = useState(0); // 0: Home, 1: Brainstorming, 2: Network, 3: Reflection
  const [basket, setBasket] = useState<any[]>([]);

  const handleStart = () => {
    setPhase(1);
    setBasket([]);
  };

  const handleBrainstormingContinue = (selectedItems: any[]) => {
    setBasket(selectedItems);
    setPhase(2);
  };

  const handleNetworkComplete = () => {
    setPhase(3);
  };

  return (
    <>
      <AuthModal />
      {phase !== 0 && <StarryBackground />}
      {phase !== 2 && <Header />}

      <AnimatePresence mode="wait">
        {phase === 0 && <HomePhase onStart={handleStart} key="home" />}
        {phase === 1 && (
          <BrainstormingPhase
            onContinue={handleBrainstormingContinue}
            key="brainstorming"
          />
        )}
        {phase === 2 && (
          <NetworkPhase
            basket={basket}
            onComplete={handleNetworkComplete}
            key="network"
          />
        )}
        {phase === 3 && <ReflectionPhase basket={basket} key="reflection" />}
      </AnimatePresence>

      {phase !== 0 && phase !== 2 && (
        <BottomNav currentPhase={phase} onPhaseChange={setPhase} />
      )}
    </>
  );
}

