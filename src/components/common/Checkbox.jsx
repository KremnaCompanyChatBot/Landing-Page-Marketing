import React from 'react';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  required = false 
}) => {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="w-4 h-4 mt-1 text-[#4ECDC4] border-gray-300 rounded focus:ring-[#4ECDC4] cursor-pointer"
      />
      <label className="text-sm text-gray-700 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;