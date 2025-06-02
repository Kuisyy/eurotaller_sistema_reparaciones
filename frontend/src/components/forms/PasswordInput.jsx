import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ label, show, onToggle, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-[#2c2c2c]">{label} </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className="w-full h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
        {...props}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e6e]"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  </div>
);

export default PasswordInput;