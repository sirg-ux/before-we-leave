"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type TransitionContextType = {
  transitioning: boolean;

  transition: (
    callback: () => void,
    duration?: number
  ) => void;
};

const TransitionContext =
  createContext<TransitionContextType | null>(null);

export function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transitioning, setTransitioning] =
    useState(false);

  function transition(
    callback: () => void,
    duration = 450
  ) {
    setTransitioning(true);

    window.setTimeout(() => {
      callback();

      window.setTimeout(() => {
        setTransitioning(false);
      }, duration);
    }, duration);
  }

  return (
    <TransitionContext.Provider
      value={{
        transitioning,
        transition,
      }}
    >
      {children}

      {/* White Flash */}

      <div
        className={`
          pointer-events-none

          fixed
          inset-0

          z-[9999]

          bg-white

          transition-opacity
          duration-500

          ${
            transitioning
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      />

      {/* CRT Fade */}

      <div
        className={`
          pointer-events-none

          fixed
          inset-0

          z-[9998]

          bg-black

          transition-opacity
          duration-500

          ${
            transitioning
              ? "opacity-25"
              : "opacity-0"
          }
        `}
      />
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(
    TransitionContext
  );

  if (!context) {
    throw new Error(
      "useTransition must be used inside TransitionProvider"
    );
  }

  return context;
}