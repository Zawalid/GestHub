import { forwardRef, useState } from "react";
import { PiEyeLight, PiEyeClosedLight } from "./Icons";
import { InputField } from "./InputField";

export const PasswordInput = forwardRef(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <InputField
        type={showPassword ? "text" : "password"}
        name="password"
        {...props}
        placeholder="••••••••••••"
        ref={ref}
      >
        <button
          type="button"
          className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 text-lg transition-transform duration-300 text-text-tertiary"
          onClick={() => props.value && setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <PiEyeClosedLight size={20} />
          ) : (
            <PiEyeLight size={20} />
          )}
        </button>
      </InputField>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
