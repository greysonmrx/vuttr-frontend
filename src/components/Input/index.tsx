import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import Icon from '../Icon';

import { Container, InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  style?: React.CSSProperties;
  icon?: string;
  required?: boolean;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  style = {},
  icon,
  required,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style} isErrored={!!error} data-testid="input-container">
      {label && (
        <label>
          {label}
          {required && <span>*</span>}
        </label>
      )}
      <InputContainer
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        hasLabel={!!label}
      >
        {icon && <Icon name={icon} />}
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </InputContainer>
      {error && <p>{error}</p>}
    </Container>
  );
};
export default Input;
