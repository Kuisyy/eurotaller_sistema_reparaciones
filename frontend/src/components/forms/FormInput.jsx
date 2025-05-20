const FormInput = ({ label, required, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-[#2c2c2c]">
      {label} {required && '*'}
    </label>
    <input
      className="h-12 px-4 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#005bac]"
      {...props}
    />
  </div>
);

export default FormInput;