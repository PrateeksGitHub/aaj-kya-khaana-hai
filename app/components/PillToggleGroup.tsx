import React from 'react';

export interface PillOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface Props {
  options: PillOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

/**
 * PillToggleGroup renders a horizontal list of clickable pills.  Each pill is
 * highlighted when selected.  Clicking a pill toggles its presence in the
 * selectedIds array and calls onChange with the new list.  It’s a reusable
 * component for selecting staples, cuisines or other categories.
 */
export default function PillToggleGroup({ options, selectedIds, onChange }: Props) {
  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = selectedIds.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleToggle(opt.id)}
            className={`px-3 py-1 rounded-full border text-sm flex items-center gap-1 ${
              selected
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-800 border-gray-300'
            }`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}