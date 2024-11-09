import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white"
      >
        {labelName}
      </label>
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-50 bg-opacity-10 border border-white text-white text-sm rounded-lg focus:ring-[#6469ff] focus:border-yellow-600 outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;