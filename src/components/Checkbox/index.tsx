import React, { useRef, useImperativeHandle, forwardRef } from 'react';

import { Container } from './styles';

interface CheckboxProps {
  name: string;
  children?: React.ReactNode;
}

export interface CheckBoxHandles {
  getValue(): boolean;
}

const Checkbox: React.ForwardRefRenderFunction<
  CheckBoxHandles,
  CheckboxProps
> = ({ name, children }, ref) => {
  const checkBoxRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => checkBoxRef.current?.checked || false,
  }));

  return (
    <Container>
      <label htmlFor={name}>
        <input id={name} ref={checkBoxRef} type="checkbox" />
        {children}
      </label>
    </Container>
  );
};

export default forwardRef(Checkbox);
