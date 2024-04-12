import { forwardRef, useState } from 'react';
import { PiEyeLight, PiEyeClosedLight } from './Icons';
import { InputField } from './InputField';

export const PasswordInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputField
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="••••••••••••"
      ref={ref}
      {...props}
    >
      <button
        type="button"
        className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 text-lg text-text-tertiary transition-transform duration-300"
        onClick={() => props.value && setShowPassword(!showPassword)}
      >
        {showPassword ? <PiEyeClosedLight size={20} /> : <PiEyeLight size={20} />}
      </button>
    </InputField>
  );
});

PasswordInput.displayName = 'PasswordInput';
