import React from 'react';

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

/**
 * IngredientInput is a simple controlled input component.  It displays a
 * label and a text input where users can enter comma‑separated ingredients.
 */
export default function IngredientInput({ label, placeholder, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium" htmlFor={label.replace(/\s+/g, '-')}>{label}</label>
      <input
        id={label.replace(/\s+/g, '-')}
        type="text"
        className="border border-gray-300 rounded px-3 py-2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}