'use client';
import { useState } from 'react';

interface ToggleButtonProps {
  options: string[];
  onChange?: (newOption: string) => void;
}

const ToggleModeButton = ({ options, onChange }: ToggleButtonProps) => {
  const [index, setIndex] = useState<number>(0);

  const currentOption = options[index];

  function handleToggleButtonClick() {
    const newIndex = (index + 1) % options.length;
    setIndex(newIndex);
    onChange?.(options[newIndex]);
  }

  return (
    <button
      className="rounded-full border border-white px-5 py-1"
      onClick={handleToggleButtonClick}
    >
      {currentOption}
    </button>
  );
};

export default ToggleModeButton;
