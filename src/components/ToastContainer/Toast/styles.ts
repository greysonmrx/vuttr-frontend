import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #b1adb9;
  `,
  success: css`
    background: #12db89;
  `,
  error: css`
    background: #f95e5a;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  max-width: 350px;
  position: relative;
  padding: 30px 40px 30px 30px;
  border-radius: 5px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  color: #ffffff;

  strong {
    letter-spacing: 0.4px;
    font-size: 20px;
    font-weight: 600;
  }

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']};

  > svg {
    margin-right: 20px;
    width: 25px;
    height: 25px;
    fill: #ffffff;
    stroke: #ffffff;
  }

  div {
    flex: 1;

    p {
      margin-top: 10px;
      font-size: 16px;
      letter-spacing: 0.36px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    border: 0;
    background: transparent;
    color: #ffffff;
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
