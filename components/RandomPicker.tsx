"use client";

import { useRef, useState } from "react";

interface Props {
  restaurants: { id: string; name: string }[];
  onHighlight: (index: number | null) => void;
}

export default function RandomPicker({ restaurants, onHighlight }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function spin() {
    if (spinning || restaurants.length < 2) return;

    setWinner(null);
    setSpinning(true);

    const winnerIndex = Math.floor(Math.random() * restaurants.length);
    let current = 0;
    // Start fast (80ms), ease out to 300ms over ~2.5s
    let delay = 80;
    const maxDelay = 320;
    const totalSteps = 28;
    let step = 0;

    function tick() {
      current = (current + 1) % restaurants.length;
      onHighlight(current);
      step++;

      // Ease out: increase delay gradually in the last third
      if (step > totalSteps * 0.6) {
        delay = Math.min(delay * 1.18, maxDelay);
      }

      if (step < totalSteps) {
        intervalRef.current = setTimeout(tick, delay);
      } else {
        // Land on the predetermined winner
        onHighlight(winnerIndex);
        setWinner(restaurants[winnerIndex].name);
        setSpinning(false);
      }
    }

    intervalRef.current = setTimeout(tick, delay);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={spin}
        disabled={spinning || restaurants.length < 2}
        className="rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-orange-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {spinning ? "Picking..." : "Chomp! 🍽️"}
      </button>

      {restaurants.length < 2 && (
        <p className="text-xs text-gray-400">Add at least 2 restaurants to spin</p>
      )}

      {winner && !spinning && (
        <div className="rounded-xl bg-orange-50 border border-orange-200 px-6 py-4 text-center">
          <p className="text-xs text-orange-500 font-medium uppercase tracking-wide mb-1">
            Tonight you&apos;re eating at
          </p>
          <p className="text-2xl font-bold text-orange-600">{winner}</p>
        </div>
      )}
    </div>
  );
}
