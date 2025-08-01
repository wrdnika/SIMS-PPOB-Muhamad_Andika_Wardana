import React, { useState } from "react";
import { AtSign, User, Lock, Eye, EyeOff } from "lucide-react";

const iconMap = {
  email: <AtSign size={20} className="text-gray-400" />,
  first_name: <User size={20} className="text-gray-400" />,
  last_name: <User size={20} className="text-gray-400" />,
  password: <Lock size={20} className="text-gray-400" />,
  confirm_password: <Lock size={20} className="text-gray-400" />,
};

const InputField = ({ id, type, placeholder, value, onChange, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const borderColor = error ? "border-red-500" : "border-gray-300";
  const focusColor = error ? "focus:ring-red-500" : "focus:ring-red-400";

  return (
    <div className="relative mb-4">
      <div className="absolute top-3.5 left-0 flex items-center pl-3 pointer-events-none">
        {iconMap[id]}
      </div>
      <input
        id={id}
        name={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-10 py-3 border rounded-md focus:outline-none focus:ring-2 ${borderColor} ${focusColor}`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {isPasswordVisible ? (
            <EyeOff size={20} className="text-gray-500" />
          ) : (
            <Eye size={20} className="text-gray-500" />
          )}
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
