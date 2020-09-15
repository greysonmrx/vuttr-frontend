import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';

import { Container } from './styles';

interface ToasContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToasContainerProps> = ({
  messages,
}: ToasContainerProps) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-105%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-105%', opacity: 0 },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;