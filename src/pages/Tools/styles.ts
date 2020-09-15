import styled from 'styled-components';

import RNInput from '../../components/Input';

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-child {
    max-width: 900px;
    width: 85vw;
    padding-bottom: 30px;

    header {
      display: flex;
      justify-content: space-between;
      margin: 60px 0 50px;

      a {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        outline: none;
        font-weight: 600;
        text-decoration: none;
        color: #170c3a;
        font-size: 18px;
        text-align: right;

        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 2px solid #170c3a;
          margin-left: 20px;
        }
      }
    }

    h1 {
      margin-bottom: 10px;
    }
  }

  > div:nth-child(2) {
    form {
      margin-top: 30px;

      > div:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        button {
          width: fit-content;
        }

        @media (max-width: 500px) {
          button {
            width: 100%;
          }
        }
      }
    }
  }

  > div:nth-child(3) {
    form {
      margin-top: 30px;

      > div:last-child {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        button {
          width: fit-content;
        }

        @media (max-width: 500px) {
          button {
            width: 100%;
          }
        }
      }
    }
  }

  > div:nth-child(4) {
    p {
      margin-top: 30px;
    }

    footer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin-top: 30px;

      button {
        width: fit-content;
      }

      button:last-child {
        margin: 0 0 0 15px;
        margin: 0 0 0 15px;
      }

      @media (max-width: 500px) {
        flex-direction: column;

        button {
          width: 100%;
        }

        button:last-child {
          margin: 15px 0 0 0;
        }
      }
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: block;
  }

  form {
    width: 350px;

    @media (max-width: 900px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 25px;

    @media (max-width: 900px) {
      padding: 0;
    }

    button {
      width: 120px;
    }
  }
`;

export const Input = styled(RNInput)``;

export const ToolsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  align-items: center;

  h5 {
    margin-top: 100px;
  }
`;
