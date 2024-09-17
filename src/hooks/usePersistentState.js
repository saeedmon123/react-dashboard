import { useState, useEffect } from 'react';

const usePersistentState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error(`Error loading JSON for key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving JSON for key "${key}":`, error);
    }
  }, [state, key]);

  return [state, setState];
};

export default usePersistentState;
