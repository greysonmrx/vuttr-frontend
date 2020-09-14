import styled from 'styled-components';

import RNButton from '../../components/Button';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 40px;
  }

  form {
    max-width: 400px;
    width: 85vw;
  }

  a {
    text-decoration: none;
    font-size: 18px;
    font-weight: 600;
  }
`;

export const Button = styled(RNButton)`
  margin: 30px 0;
`;
