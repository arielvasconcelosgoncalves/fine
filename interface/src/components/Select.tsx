import { ChevronDown } from "lucide-react";
import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: boolean | string;
  icon?: ReactNode;
  fullWidth?: boolean;
  options: SelectOption[];
}

const Select = ({
  label,
  options,
  icon,
  error,
  fullWidth = true,
  className = "",
  id,
  ...rest
}: SelectProps) => {
  const selectId = useId();
  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-50 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 pl-2 flex items-center text-gray-400">
            {icon}
          </div>
        )}
        <select
          id={selectId}
          {...rest}
          className={`block w-full bg-gray-800 py-3 pl-10 pr-4 border rounded-xl text-gray-50 text-sm ${
            error ? "border-red-500" : "border-gray-700"
          } ${
            error ? "focus:border-red-500" : "focus:border-primary-500"
          } outline-none appearance-none cursor-pointer`}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-50" />
        </div>
      </div>
    </div>
  );
};

export default Select;
