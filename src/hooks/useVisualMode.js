import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    };
  };

  function back() {
    const eleHistory = [...history];
    if (history.length > 1) {
      eleHistory.pop();
      setMode(eleHistory[eleHistory.length - 1]);
      setHistory(eleHistory);
    };
  };

  return { mode, transition, back, history };
};