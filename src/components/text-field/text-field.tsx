import { EyeIcon, EyeOffIcon } from 'lucide-react';
import React, { useState, ChangeEvent } from 'react';
import {
  Input,
  Label,
  TextField as AriaTextField,
} from 'react-aria-components';

import './text-field.scss';

interface TextFieldProps {
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  isTextArea?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  autoFocus?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  text,
  onChange,
  label,
  autoFocus,
  type = 'text',
}: TextFieldProps) => {
  const [textValue, setTextValue] = useState<string>(() => text ?? '');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <AriaTextField className="text-field-base">
      <Label htmlFor={label} className="label">
        {label}
      </Label>
      <div className="input-wrapper">
        <Input
          className="text-input"
          value={textValue}
          onChange={handleInputChange}
          type={inputType}
          autoFocus={autoFocus}
        />
        {type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        )}
      </div>
    </AriaTextField>
  );
};
