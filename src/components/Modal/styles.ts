import styled from 'styled-components';

interface ContainerProps {
  visible: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  > div {
    position: relative;
    width: 85vw;
    max-width: 600px;
    background-color: #ffffff;
    padding: 30px 60px;
    border-radius: 5px;

    header {
      display: flex;

      > svg {
        position: absolute;
        top: 32px;
        left: 20px;
      }

      h4 {
        color: #170c3a;
        letter-spacing: 0.52px;
        font-weight: 600;
      }

      button {
        position: absolute;
        top: 30px;
        right: 20px;
        background-color: transparent;
        outline: none;
        border: none;
        color: #8f8a9b;
      }
    }
  }
`;
