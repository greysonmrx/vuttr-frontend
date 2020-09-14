import styled from 'styled-components';

interface ContainerProps {
  size: number;
}

export const Container = styled.div<ContainerProps>`
  img {
    width: ${({ size }) => size}px;
  }
`;
