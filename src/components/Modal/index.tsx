import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { MdAdd, MdClose, MdEdit } from 'react-icons/md';

import { Container } from './styles';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  type?: 'add' | 'remove' | 'edit';
}

export interface ModalHandles {
  open(): void;
  close(): void;
}

const Modal: React.RefForwardingComponent<ModalHandles, ModalProps> = (
  { title, children, type = 'add' },
  ref,
) => {
  const icons = {
    add: <MdAdd size={30} />,
    remove: <MdClose size={30} />,
    edit: <MdEdit size={23} />,
  };

  const [visible, setVisible] = useState(false);

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [],
  );

  return (
    <Container visible={visible}>
      <div>
        <header>
          {icons[type]}
          <h4>{title}</h4>
          <button type="button" onClick={close}>
            <MdClose size={25} />
          </button>
        </header>
        {children}
      </div>
    </Container>
  );
};

export default forwardRef(Modal);
