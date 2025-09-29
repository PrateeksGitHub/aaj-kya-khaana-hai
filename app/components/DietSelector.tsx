import React from 'react';

interface DietOption {
  id: string;
  label: string;
}

interface Props {
  options: DietOption[];
  selectedId: string;
  onChange: (id: string) => void;
}

/**
 * DietSelector allows users to choose a single dietary preference.  It
 * displays the options as pills; clicking a pill selects it and deselects
 * any previously selected option.  An empty ID means no dietary restriction.
 */
export default function DietSelector({ options, selectedId, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">Dietary preference</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = selectedId === opt.id;
          return (
            <button
              key={opt.id || 'any'}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`px-3 py-1 rounded-full border text-sm ${
                selected
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-gray-100 text-gray-800 border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}