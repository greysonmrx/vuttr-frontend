import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  text-align: left;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 7px #0000000d;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  position: relative;

  & + div {
    margin-top: 20px;
  }

  h4 {
    margin-bottom: 10px;

    a {
      color: #365df0;
    }
  }

  button {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 600;

    svg {
      margin-right: 3px;
    }
  }

  button:nth-child(2) {
    right: 130px;
    color: #ffbb43;
  }

  button:nth-child(3) {
    right: 20px;
    color: #f95e5a;
  }

  div {
    p {
      color: #8f8a9b;
    }

    ul {
      list-style: none;
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;

      li {
        color: #170c3a;
        padding: 2px 5px;
        border-radius: 8px;
        font-weight: 600;
        margin-bottom: 5px;

        & + li {
          margin-left: 8px;
        }
      }
    }
  }
`;
