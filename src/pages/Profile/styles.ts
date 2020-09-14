import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  > div {
    position: relative;
    width: 85vw;
    max-width: 500px;
    margin-bottom: 60px;

    header {
      display: flex;
      justify-content: center;
      margin: 60px 0 50px;

      a {
        position: absolute;
        background-color: transparent;
        border: none;
        outline: none;
        left: 0;
        top: 70px;
      }
    }

    form {
      margin-top: 60px;
      width: 100%;

      hr {
        margin: 20px 0;
      }

      button {
        margin-top: 30px;
      }

      button:last-child {
        margin-top: 15px;
      }
    }
  }
`;
