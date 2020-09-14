import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    color: #365df0;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0.36px;

    svg {
      margin-right: 3px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0 16px;
  }
`;

export const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background-color: transparent;
  border: transparent;
  border-radius: 50%;
  outline: none;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.36px;
  color: #365df0;

  &:disabled {
    cursor: not-allowed;
    color: #170c3a;
    background-color: #ebeaed;
  }
`;
